<?php

require_once 'usermgr.php';

class Serv extends UserMgr {

    //put your code here
    public function __construct() {
        parent::__construct();
        $this->fn = array_merge($this->fn, [
            'post_article',
            'fetch_article',
            'delete_all_orphan_img',
            'post_msg',
            'list_orphan_img',
            'set_upload_support',
            'delete_article',
            'update_uset',
            'search',
            'export_picdb',
            'import_from_json',
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

    public function export_picdb() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['BACKUP'])) {
            $this->fail('无权操作!');
            return;
        }
        $data = CommLib::fetch_assoc('select * from pics');
        if ($data === false) {
            $this->fail('导出数据出错，请看php错误日志！');
            return;
        }
        //id	url	uptime	deltime	path	atid	tag
        file_put_contents(PICDB_PATH, json_encode($data));
        $this->ok('导出了 ' . (count($data)) . ' 条记录');
    }

    public function import_from_json() {
        $user_info = $this->get_user_info();
        if (!($user_info['login'] && $user_info['prv']['BACKUP'])) {
            $this->fail('无权操作!');
            return;
        }

        ignore_user_abort(true);
        ini_set('max_execution_time', 300);

        CommLib::query('truncate pics');
        if (file_exists(PICDB_PATH)) {
            $datas = json_decode(file_get_contents(PICDB_PATH), true);
            if ($datas !== false) {
                foreach ($datas as $d) {
                    $sql = 'insert into pics set `id`=?,`url`=?,`uptime`=?,`deltime`=?,`path`=?,`atid`=?,`tag`=?';
                    CommLib::fetch_assoc($sql, 'issssii', [
                        $d['id'],
                        $d['url'],
                        $d['uptime'],
                        $d['deltime'],
                        $d['path'],
                        $d['atid'],
                        $d['tag']
                    ]);
                }
            }
        }

        CommLib::query('truncate article');
        $files = [];
        if (file_exists(FILE_PATH)) {
            $files = array_keys(json_decode(file_get_contents(FILE_PATH), true));
        }
        foreach ($files as $file) {
            $filename = '../upload/json/' . substr($file, 0, 4) . '/' . substr($file, 4) . '.json';
            //error_log($filename);
            if (file_exists($filename)) {
                $datas = json_decode(file_get_contents($filename), true);
                //$msg.='read file:'.$filename."\nrecords:".count($datas);
                //error_log($msg);
                foreach ($datas as $d) {
                    //	id userid type title content tag ctime mtime name lock top 
                    $sql = 'insert into article set '
                            . '`id`=?,`userid`=?,`type`=?,`title`=?,`content`=?,'
                            . '`tag`=?,`ctime`=?,`mtime`=?,`name`=?,`lock`=?,`top`=? ';
                    CommLib::fetch_assoc($sql, 'iiississsii', [
                        $d['id'] + 0,
                        $d['userid'] + 0,
                        $d['type'] + 0,
                        CommLib::base64_to_utf8($d['title']),
                        CommLib::base64_to_utf8($d['content']),
                        $d['tag'] + 0,
                        $d['ctime'],
                        $d['mtime'],
                        $d['name'],
                        $d['lock'] + 0,
                        $d['top'] + 0
                    ]);
                }
            }
        }
        $this->ok('导入完成');
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

    private function export_article($year, $month) {
        $top_articles = CommLib::fetch_assoc('select * from article where `top`=1 order by mtime desc ');
        $recent_articles = CommLib::fetch_assoc('select * from article where `top`=0 order by mtime desc limit 15');
        file_put_contents(EXPORT_PATH, $this->article_array_to_json($top_articles, $recent_articles));
        //$this->ok('完成!');
        if ($year > 0 && $month > 0 && $month < 13) {
            $sql = 'select * from article where year(ctime)=? and month(ctime)=?';
            $articles = CommLib::fetch_assoc($sql, 'ii', [$year, $month]);
            if ($articles !== false) {
                CommLib::mkdir(ARTICLE_PATH . $year);
                file_put_contents(ARTICLE_PATH . $year . '/' . $month . '.json', $this->article_array_to_json($articles));
                //gen files.json
                $files = [];
                if (file_exists(FILE_PATH)) {
                    $files = json_decode(file_get_contents(FILE_PATH), true);
                }
                $files["$year$month"] = true;
                file_put_contents(FILE_PATH, json_encode($files));
            } else {
                error_log('Error: serv.php.export_article() query fail!');
            }
        }
    }

    private function article_array_to_json(...$params) {
        $d = [];
        foreach ($params as $param) {
            foreach ($param as $p) {
                $d[] = [
                    'title' => CommLib::utf8_to_base64($p['title']),
                    'content' => CommLib::utf8_to_base64($p['content']),
                    'mtime' => $p['mtime'],
                    'ctime' => $p['ctime'],
                    'id' => $p['id'] + 0,
                    'tag' => $p['tag'] + 0,
                    'userid' => $p['userid'] + 0,
                    'type' => $p['type'] + 0,
                    'name' => $p['name'],
                    'top' => $p['top'],
                    'lock' => $p['lock']
                ];
            }
        }
        return (json_encode($d));
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
        if ($r !== false) {
            $total = $r[0]['total'];
        }
        $this->ok(array('total' => $total, 'data' => $data, 'page_size' => $page_size));
    }

    public function fetch_article($raw_param) {
        $param = json_decode($raw_param, true);
        $aid = $param['id'] + 0;
        $sql = 'select id,type,title,content,`top`,`lock` from article where id=?';
        $r = CommLib::fetch_assoc($sql, 'i', [$aid]);
        if($r && count($r)>0){
            $d=$r[0];
            $d['title'] = CommLib::utf8_to_base64($d['title']);
            $d['content'] = CommLib::utf8_to_base64($d['content']);    
            $this->ok($d);
            return;
        }
        $this->fail('没有数据');
        return;
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
        $r = CommLib::fetch_assoc('insert into msg set msg=?,name=?,ip=?,ctime=utc_timestamp()', 'sss', [$msg, $name, $ip]);
//        error_log(print_r($r,true));
//        error_log(($r)?'true':'false');
//        error_log((!$r)?'true':'false');
//        error_log((!!$r)?'true':'false');
        if ($r !== false) {
            $data = CommLib::fetch_assoc('select name,ctime,msg as text from msg order by ctime desc limit ' . MSG_KEEP);
            if ($data !== false) {
                file_put_contents(MSG_PATH, json_encode($data));
            }
        }
        $this->haste($r !== false);
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

        $t = CommLib::fetch_assoc('select `lock`,month(ctime) as m,year(ctime) as y from article where id=?', 'i', [$id]);

        if (!($user_info['prv']['ARTL']) && $t !== false) {
            $this->fail('文件已经锁定，不能删除！');
            return;
        }

        CommLib::fetch_assoc('update pics set  tag=4 where atid=?', 'i', [$id]);
        $r = CommLib::fetch_assoc('delete from article where id=?', 'i', [$id]);

        $this->haste($r !== false);
        if ($t !== false) {
            $this->export_article($t[0]['y'], $t[0]['m']);
        }
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

            if ($temp_d !== false) {
                if (!$user_info['prv']['ARTL']) {
                    $data['top'] = $temp_d[0]['top'];
                    $data['lock'] = $temp_d[0]['lock'];
                }
                if ($user_info['prv']['ARTL'] || $temp_d[0]['lock'] === 0) {
                    //can modify
                    CommLib::fetch_assoc('update article set mtime=utc_timestamp(),title=?,content=?,type=?,userid=?,name=?,`top`=?,`lock`=? where id=?', 'ssiisiii', [
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

            $sql = 'insert into article set ctime=utc_timestamp(),title=?,content=?,type=?,userid=?,name=?,`top`=?,`lock`=?';
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
            CommLib::fetch_assoc('update pics set atid=? where url=?', 'is', [$id, $url]);
        }

        $this->haste($r !== false);

        if ($id > 0) {
            $t = CommLib::fetch_assoc('select month(ctime) as m,year(ctime) as y from article where id=?', 'i', [$id]);
            if ($t !== false) {
                $this->export_article($t[0]['y'], $t[0]['m']);
            }
        }
    }

}

$serv = new Serv();
$serv->reply();
