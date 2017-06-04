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
            'update_all_article',
            'delete_all_orphan_img',
            'post_msg',
            'wakeup',
            'list_orphan_img',
            'set_upload_support',
            'delete_article',
            'update_uset',
            'search',
            'test'
        ]);
    }

    public function test() {
        $this->ok('Hellooooo');        
    }

    public function delete_all_orphan_img() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $data = $this->get_orphan_imag();
        $count = 0;
        foreach ($data as $d) {
            if (file_exists($d['path'])) {
                unlink($d['path']);
                $count++;
            }
        }
        CommLib::query('delete from pics where tag=4 or atid=0');
        $this->ok("删除了 $count 张图片");
    }

    public function set_upload_support($raw_setting) {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['SETM'])) {
            $this->fail('无权操作!');
            return;
        }
        if (($raw_setting + 0) === 0) {
            file_put_contents(UPLOAD_PATH . 'lock', date('Y-m-d H:i:s'));
            $this->ok('locked');
        } else {
            if (file_exists(UPLOAD_PATH . 'lock')) {
                unlink(UPLOAD_PATH . 'lock');
            }
            $this->ok('unlock');
        }
    }

    public function update_uset($raw_json_string) {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['SETM'])) {
            $this->fail('无权操作!');
            return;
        }
        file_put_contents(USET_PATH, $raw_json_string);
        $this->ok('设置已更新');
    }

    private function export_article() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            //$this->fail('无权操作!');
            return;
        }
        file_put_contents(EXPORT_PATH, json_encode($this->get_recent_articles(10)));
        //$this->ok('完成!');
    }

    private function get_recent_articles($raw_num = 5) {
        $num = $raw_num + 0;
        if ($num > 20) {
            $num = 20;
        }
        $data1 = CommLib::fetch_assoc('select title,mtime,ctime,id,name,content,type,`top`,`lock` from article where `top`=1 order by mtime ');
        $sql = 'select title,mtime,ctime,id,name,content,type,`top`,`lock` from article where `top`=0 order by mtime desc limit ' . $num;
        $data2 = CommLib::fetch_assoc($sql);

        $r = [];
        foreach ($data1 as $d1) {
            $r[] = [
                'title' => CommLib::utf8_to_base64($d1['title']),
                'content' => CommLib::utf8_to_base64($d1['content']),
                'mtime' => $d1['mtime'],
                'ctime' => $d1['ctime'],
                'id' => $d1['id'] + 0,
                'type' => $d1['type'] + 0,
                'name' => $d1['name'],
                'top' => $d1['top'],
                'lock' => $d1['lock']
            ];
        }

        foreach ($data2 as $d1) {
            $r[] = [
                'title' => CommLib::utf8_to_base64($d1['title']),
                'content' => CommLib::utf8_to_base64($d1['content']),
                'mtime' => $d1['mtime'],
                'ctime' => $d1['ctime'],
                'id' => $d1['id'] + 0,
                'type' => $d1['type'] + 0,
                'name' => $d1['name'],
                'top' => $d1['top'],
                'lock' => $d1['lock']
            ];
        }

        return $r;
    }

    private function gen_sql($raw_key_words, $page = 0, $page_size = 25) {

        $begin = (int) (0 + $page) * $page_size;

        if ($begin < 0) {
            $begin = 0;
        }

        $key_words = explode(' ', $this->patch_key_word(CommLib::filter_str($raw_key_words, 200)));

        $sql_head = 'select id,title,name,mtime,type,`top`,`lock` from article ';
        $sql_total_head = 'select count(*) as total from article ';
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
        $data = CommLib::fetch_assoc($sql['query']);
        $total = -1;
        $r = CommLib::fetch_assoc($sql['total']);
        if ($r) {
            $total = $r[0]['total'];
        }
        $this->ok(array('total' => $total, 'data' => $data, 'page_size' => $page_size));
    }

    public function fetch_article($raw_param) {
        $param = json_decode($raw_param, true);
        $aid = $param['id'] + 0;
        $db = CommLib::open_db();
        $stmt = $db->prepare('select id,type,title,content,`top`,`lock` from article where id=?');
        $stmt->bind_param('i', $aid);
        $stmt->execute();
        $id = $type = $title = $content = $top = $lock = null;
        $stmt->store_result();
        $stmt->bind_result($id, $type, $title, $content, $top, $lock);
        $stmt->fetch();
        $this->ok(array(
            'id' => $id,
            'type' => $type,
            'title' => CommLib::utf8_to_base64($title),
            'content' => CommLib::utf8_to_base64($content),
            'top' => $top,
            'lock' => $lock
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

    public function update_all_article() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $this->export_all_article();
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

        $sql = 'select id,title,content,type,name,mtime,`lock`,`top` from article '
                . 'where mtime >= date_sub(utc_timestamp(), interval 1 year)'
                . ' order by mtime desc';

        $data = CommLib::fetch_assoc($sql);
        file_put_contents(ARTICLE_PATH, json_encode($data));
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

        file_put_contents(MSG_PATH, json_encode($data));
    }

    public function list_orphan_img() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $this->ok($this->get_orphan_imag());
    }

    private function get_orphan_imag() {
        $sql = 'select atid,path,uptime,deltime from pics where atid=0 or tag=4';
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $atid = $path = $uptime = $deltime = null;
        $stmt->bind_result($atid, $path, $uptime, $deltime);
        $stmt->store_result();
        $data = [];
        while ($stmt->fetch()) {
            $data[] = [
                'atid' => $atid,
                'path' => $path,
                'uptime' => $uptime,
                'deltime' => $deltime
            ];
        }
        $stmt->free_result();
        return($data);
    }

    public function delete_article($raw_id) {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        $id = $raw_id + 0;

        $t = CommLib::fetch_assoc('select `lock` from article where id=?', 'i', [$id]);

        if (!($user_info['prv']['ARTL']) && $t['lock'] !== 0) {
            $this->fail('文件已经锁定，不能删除！');
            return;
        }

        CommLib::query('update pics set  tag=4 where atid=?', 'i', [&$id]);
        $r = CommLib::query('delete from article where id=?', 'i', [&$id]);
        $this->haste($r['status']);
        $this->export_article();
    }

    public function post_article($raw_data) {
        // todo
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['ARTM'])) {
            $this->fail('无权操作！');
            return;
        }
        //error_log(print_r($user_info, true));

        $data = json_decode($raw_data, true);

        $content = CommLib::base64_to_utf8($data['content']);
        $title = CommLib::base64_to_utf8($data['title']);

        /*
         * var data = {
          'title': o.objs[0].value,
          'content': o.editor.$txt.html(),
          'type': o.objs[2].options[o.objs[2].selectedIndex].value,
          'id': ms.cache.article.current_id,
          'top','lock'
          };
         */
        $r = false;
        $id = 0;

        if ($data['id'] + 0 > 0) {
            //modify
            $id = $data['id'] + 0;
            $temp_d = CommLib::fetch_assoc('select `lock`,`top` from article where id=?', 'i', [$id]);
            //error_log(print_r($temp_d,true));
            if ($temp_d) {
                if (!$user_info['prv']['ARTL']) {
                    $data['top'] = $temp_d[0]['top'];
                    $data['lock'] = $temp_d[0]['lock'];
                }
                if ($user_info['prv']['ARTL'] || $temp_d[0]['lock'] === 0) {
                    //can modify
                    CommLib::fetch_assoc('update article set title=?,content=?,type=?,userid=?,name=?,`top`=?,`lock`=? where id=?', 'ssiisiii', [
                        $title,
                        $content,
                        $data['type'] + 0,
                        $user_info['id'] + 0,
                        $user_info['name'],
                        $data['top'] + 0,
                        $data['lock'] + 0,
                        $data['id'] + 0]
                    );
                    $r = true;
                }
            }
        } else {
            //insert new
            if (!($user_info['prv']['ARTL'])) {
                $data['top'] = 0;
                $data['lock'] = 0;
            }

            $sql = 'insert into article set title=?,content=?,type=?,userid=?,name=?,`top`=?,`lock`=?';
            $db = CommLib::open_db();
            $stmt = $db->prepare($sql);
            $stmt->bind_param('ssiisii', $title, $content, $data['type'], $user_info['id'], $user_info['name'], $data['top'], $data['lock']);
            if ($stmt->execute()) {
                $r = true;
                $id = $stmt->insert_id + 0;
            }
        }

        $doc = new DOMDocument();
        @$doc->loadHTML($content);

        $tags = $doc->getElementsByTagName('img');
        foreach ($tags as $tag) {
            $url = $tag->getAttribute('src');
            CommLib::query('update pics set atid=? where url=?', 'is', [&$id, &$url]);
        }
        $this->haste($r);
        $this->export_article();
    }

}

$serv = new Serv();
$serv->reply();
