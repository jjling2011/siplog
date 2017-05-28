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
            'post_msg',
            'wakeup',
            'delete_article',
            'update_atypes',
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
        file_put_contents(EXPORT_PATH, json_encode($this->get_top_article(10)));
        //$this->ok('完成!');
    }

    private function get_top_article($raw_num = 5) {
        $num = $raw_num + 0;
        if ($num > 20) {
            $num = 20;
        }
        $sql = 'select title,mtime,ctime,id,name,content,type from article order by mtime desc limit ' . $num;
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $title = $mtime = $id = $ctime = $name = $content = $type = null;
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($title, $mtime, $ctime, $id, $name, $content, $type);
        $data = [];
        while ($stmt->fetch()) {
            $data[] = array(
                'title' => CommLib::utf8_to_base64($title),
                'mtime' => $mtime,
                'ctime' => $ctime,
                'id' => $id,
                'type' => $type,
                'name' => $name,
                'content' => CommLib::utf8_to_base64($content)
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

        $sql_head = 'select id,title,name,mtime,type from article ';
        $sql_total_head = 'select count(*) from article ';
        $sql_tail = 'order by mtime desc limit ' . $begin . ',' . $page_size;

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
        //'select id,title,name,mtime,type from article '
        $id = $title = $name = $mtime = $type = null;
        $stmt->execute();
        $stmt->bind_result($id, $title, $name, $mtime, $type);
        $stmt->store_result();
        $data = array();
        while ($stmt->fetch()) {
            $data[] = array(
                'id' => $id,
                'title' => $title,
                'name' => $name,
                'mtime' => $mtime,
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
        $this->ok(array(
            'id' => $id,
            'type' => $type,
            'title' => CommLib::utf8_to_base64($title),
            'content' => CommLib::utf8_to_base64($content)
        ));
    }

    public function post_msg($raw_data) {
        $msg = filter_var(substr($raw_data, 0, 199), FILTER_SANITIZE_STRIPPED);
        $user = $this->get_user_info();
        if ($user['login']) {
            $name = $user['name'];
        } else {
            $name = '';
        }
        $ip = CommLib::get_ip();
        $r = CommLib::query('insert into msg set msg=?,name=?,ip=?', 'sss', [&$msg, &$name, &$ip]);
        if ($r['status']) {
            $this->update_msg();
        }
        $this->haste($r['status']);
    }

    public function wakeup() {
        if (!file_exists(ARTICLE_PATH)) {
            $this->export_all_article();
            return;
        }
        $sql = 'select timestampdiff(hour,utime,utc_timestamp()) from sys where id=1';
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $dt = null;
        $stmt->store_result();
        $stmt->bind_result($dt);
        $stmt->fetch();
        $stmt->free_result();
        if (abs($dt) < 24) {
            $this->fail('不需要更新！上次更新时间：' . $dt . ' 小时前。');
            return;
        }
        $this->export_all_article();
    }

    private function export_all_article() {
        CommLib::query('update sys set utime=utc_timestamp where id=1');
        //$this->ok('调用 export_all_article');

        ignore_user_abort(true);
        set_time_limit(20 * 60);

        ob_start();
        header('Content-Encoding: none');
        $this->ok('后台更新数据完成！');
        header('Content-Length: ' . ob_get_length());
        header('Connection: close');
        ob_end_flush();
        ob_flush();
        flush();

        if (session_id()) {
            session_write_close();
        }

        $sql = 'select id,title,content,type,name,mtime from article '
                . 'where mtime >= date_sub(utc_timestamp(), interval 1 year)'
                . ' order by mtime desc';
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $title = $content = $id = $type = $name = $mtime = null;
        $stmt->bind_result($id, $title, $content, $type, $name, $mtime);
        $stmt->store_result();
        $data = [];
        while ($stmt->fetch()) {
            $data[] = [
                'id' => $id,
                'title' => $title,
                'content' => $content,
                'type' => $type,
                'name' => $name,
                'mtime' => $mtime
            ];
        }
        $stmt->free_result();
        file_put_contents(ARTICLE_PATH, json_encode($data));
//        error_log('begin');
//        for ($i = 0; $i < 5; $i++) {
//            sleep($i);
//            error_log('wait');
//        }
//        error_log('end');
    }

    private function update_msg() {
        $db = CommLib::open_db();
        $stmt = $db->prepare('select name,ctime,msg from msg order by ctime desc limit ' . MSG_KEEP);
        $stmt->execute();
        $ctime = $msg = $name = null;
        $stmt->store_result();
        $data = [];
        $stmt->bind_result($name, $ctime, $msg);
        while ($stmt->fetch()) {
            $data[] = array('name' => $name, 'ctime' => $ctime, 'text' => $msg);
        }

        file_put_contents(MSG_PATH, json_encode(array_reverse($data)));
    }

    public function update_atypes($raw_types) {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        file_put_contents(ATYPES_PATH, $raw_types);
        $this->ok('成功！');
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

        $content = CommLib::base64_to_utf8($data['content']);
        $title = CommLib::base64_to_utf8($data['title']);

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
                        &$title,
                        &$content,
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
                        &$title,
                        &$content,
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
