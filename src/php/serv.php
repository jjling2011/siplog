<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of serv
 *
 * @author luke2
 */
require_once 'usermgr.php';

class Serv extends UserMgr {

    //put your code here
    public function __construct() {
        parent::__construct();
        $this->fn = array_merge($this->fn, [
            'post_article',
            'fetch_article',
            'delete_article',
            //'export_article',
            'search'
        ]);
    }

    private function export_article() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            //$this->fail('无权操作!');
            return;
        }
        file_put_contents('../json/top10.json', json_encode(array(
            '0' => $this->get_top_article(0, 10),
            '1' => $this->get_top_article(1, 10)
        )));
        //$this->ok('完成!');
    }

    private function get_top_article($raw_type = 0, $raw_num = 5) {
        $type = $raw_type + 0;
        $num = $raw_num + 0;
        if ($num > 20) {
            $num = 20;
        }
        $sql = 'select title,modify,id,name,content from article where type=' . $type . ' order by modify desc limit ' . $num;
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $title = $modify = $id = $name = $content = null;
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($title, $modify, $id, $name, $content);
        $data = [];
        while ($stmt->fetch()) {
            $data[] = array(
                'title' => $title,
                'time' => $modify,
                'id' => $id,
                'name' => $name,
                'content' => $content
            );
        }
        $stmt->free_result();
        return $data;
    }

    private function gen_sql($raw_key_words, $page = 0, $page_size = 25) {

        $begin = (int) (0 + $page) * $page_size;

        if ($begin < 0) {
            $begin = 0;
        }

        $key_words = explode(' ', $this->patch_key_word(CommLib::filter_str($raw_key_words, 200)));

        $sql_head = 'select id,title,name,modify,type from article ';
        $sql_total_head = 'select count(*) from article ';
        $sql_tail = 'order by modify desc limit ' . $begin . ',' . $page_size;

        $sql_conditions = '';
        $c = 0;
        $and = false;
        foreach ($key_words as $kw) {
            $pass = true;
            $flag = false;
            switch ($kw) {
                case 'and':
                    $flag = true;
                case 'or':
                    $pass = false;
                    if ($c > 0) {
                        --$c;
                        $and = $flag;
                        if (strlen($sql_conditions) <= 0) {
                            $sql_conditions .= ' where ';
                            # $sql_t5k_conditions.=' where ';
                        }
                        $sql_conditions .= ' ' . $kw . ' ';
                        # $sql_t5k_conditions.=' ' . $kw . ' ';
                    }
                    break;
                case '(':
                case ')':
                    $pass = false;
                    if (strlen($sql_conditions) <= 0) {
                        $sql_conditions .= ' where ';
                        # $sql_t5k_conditions.=' where ';
                    }
                    $sql_conditions .= ' ' . $kw . ' ';
                    # $sql_t5k_conditions.=' ' . $kw . ' ';
                    break;
            }
            if ($pass) {
                $part1 = $part2 = null;
                switch (substr($kw, 0, 1)) {
                    case '@':
                        $part1 = 'name like "%' . CommLib::filter_quote(substr($kw, 1)) . '%"';
                        break;
                    case '#':
                        $part1 = 'title like "%' . CommLib::filter_quote(substr($kw, 1)) . '%"';
                        break;
                    case '=':
                        $part1 = 'type = ' . (0 + substr($kw, 1));
                        break;
                    default:
                        if (strlen($kw) > 0) {
                            $part1 = 'content like "%' . CommLib::filter_quote($kw) . '%"';
                        }
                }
                if ($part1) {
                    if (strlen($sql_conditions) <= 0) {
                        $sql_conditions .= ' where ';
                    }
                    ++$c;
                    if ($c === 2) {
                        --$c;
                        $sql_conditions .= ' and ';
                    }
                    $sql_conditions .= $part1 . ' ' . $part2;
                }
            }
        }

        $sql_cdt = $this->patch_sql($sql_conditions, $c, $and);

        $sql_query = "$sql_head $sql_cdt $sql_tail";
        $sql_total = "$sql_total_head $sql_cdt";
        //error_log($sql);
        return array('query' => $sql_query, 'total' => $sql_total);
    }

    private static function patch_key_word($kw) {
        return str_replace(')', ' ) ', str_replace('(', ' ( ', $kw));
    }

    private static function str_rreplace($search, $replace, $subject) {
        $pos = strrpos($subject, $search);

        if ($pos !== false) {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }

        return $subject;
    }

    private function patch_sql($sql, $cnt, $and) {
        if (strlen($sql) <= 0) {
            return '';
        }

        if ($cnt === 0) {
            if ($and) {
                $tmp1 = $this->str_rreplace('and', 'and 1 ', $sql);
            } else {
                $tmp1 = $this->str_rreplace('or', 'or 0 ', $sql);
            }
        } else {
            $tmp1 = $sql;
        }

        $arr = str_split($tmp1);
        $c = 0;
        foreach ($arr as $a) {
            switch ($a) {
                case '(':
                    ++$c;
                    break;
                case ')':
                    --$c;
                    break;
            }
        }
        if ($c > 0) {
            return ($tmp1 . str_repeat(')', $c));
        }
        if ($c < 0) {
            $s2 = str_repeat('(', -1 * $c);
            return str_replace('where', 'where ' . $s2, $tmp1);
        }
        return $tmp1;
    }

    public function search($raw_param) {
        if (!$this->check_login()) {
            $this->fail('无权操作!');
            return;
        }
        $param = json_decode($raw_param, true);
        $pn = $param['pn'] + 0;
        $page_size = $param['page_size'] + 0;
        $sql = $this->gen_sql($param['kw'], $pn, $page_size);

        $db = CommLib::open_db();
        $stmt = $db->prepare($sql['query']);
        //'select id,title,name,modify,type from article '
        $id = $title = $name = $modify = $type = null;
        $stmt->execute();
        $stmt->bind_result($id, $title, $name, $modify, $type);
        $stmt->store_result();
        $data = array();
        while ($stmt->fetch()) {
            $data[] = array(
                'id' => $id,
                'title' => $title,
                'name' => $name,
                'modify' => $modify,
                'type' => $type + 0
            );
        }
        $stmt->free_result();
        $total = -1;
        if ($param['get_total']) {
            //error_log($sql['total']);
            $stmt2 = $db->prepare($sql['total']);
            $stmt2->execute();
            $stmt2->bind_result($total);
            $stmt2->store_result();
            $stmt2->fetch();
            $stmt2->free_result();
        }
        $this->ok(array('total' => $total, 'data' => $data, 'page_size' => $page_size));
    }

    public function fetch_article($raw_param) {
        $param = json_decode($raw_param, true);
        $aid = $param['id'] + 0;
        $db = CommLib::open_db();
        $stmt = $db->prepare('select id,type,title,content from article where id=?');
        $stmt->bind_param('i', $aid);
        $stmt->execute();
        $id = $type = $title = $content = null;
        $stmt->store_result();
        $stmt->bind_result($id, $type, $title, $content);
        $stmt->fetch();
        $this->ok(array('id' => $id, 'type' => $type, 'title' => $title, 'content' => $content));
    }

    public function delete_article($raw_id) {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $id = $raw_id + 0;
        $r = CommLib::query('delete from article where id=?', 'i', [&$id]);
        $this->haste($r['status']);
    }

    public function post_article($raw_data) {
        // todo
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $data = json_decode($raw_data, true);
        /*
         * var data = {
          'title': o.objs[0].value,
          'content': o.editor.$txt.html(),
          'type': o.objs[2].options[o.objs[2].selectedIndex].value,
          'id': ms.cache.article.current_id
          };
         */
        if ($data['id'] + 0 > 0) {
            //modify
            $sql = 'update article set title=?,content=?,type=?,userid=?,name=? where id=?';
            $type = 'ssiiss';
            $r = CommLib::query($sql, $type, [
                        &$data['title'],
                        &$data['content'],
                        &$data['type'],
                        &$user_info['id'],
                        &$user_info['name'],
                        &$data['id']
            ]);
            $this->haste($r['status']);
        } else {
            //insert new
            $sql = 'insert into article set title=?,content=?,type=?,userid=?,name=?';
            $type = 'ssiis';
            $r = CommLib::query($sql, $type, [
                        &$data['title'],
                        &$data['content'],
                        &$data['type'],
                        &$user_info['id'],
                        &$user_info['name']
            ]);
            $this->haste($r['status']);
        }
        $this->export_article();
    }

}

$serv = new Serv();
$serv->reply();
