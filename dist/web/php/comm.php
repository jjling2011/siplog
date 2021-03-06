<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include '../upload/config/settings.php';

class CommLib {

    public static function mkdir($path) {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    public static function query($sql, $types = false, $params = false) {

        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        
        //error_log('query('.$sql.','.$types.','.print_r($params,true));
        // bind params
        if (is_string($types) && is_array($params) && count($params) === strlen($types)) {
            $p = [];
            for ($i = 0; $i < strlen($types); $i++) {
                $p[$i] = &$params[$i];
            }
            call_user_func_array(array($stmt, 'bind_param'), array_merge(array($types), $p));
        }

        if (!$stmt->execute()) {
            // some thing wrong
            return false;
        }
        $stmt->store_result();

        // get column name 
        $metadata = $stmt->result_metadata();
        $datas = [];
        if ($metadata) {
            $fields = $metadata->fetch_fields();

            $results = [];
            $ref_results = [];
            foreach ($fields as $field) {
                $results[$field->name] = null;
                $ref_results[] = &$results[$field->name];
            }

            call_user_func_array(array($stmt, 'bind_result'), $ref_results);


            while ($stmt->fetch()) {
                $data = [];
                foreach ($results as $key => $value) {
                    $data[$key] = $value;
                }
                $datas[] = $data;
            }

            $stmt->free_result();
        }
        return $datas;
    }

    public static function decode_utf8($txt_b64) {
        //return urldecode(base64_decode($txt_b64));
        return urldecode($txt_b64);
    }

    public static function encode_utf8($txt_utf8) {
        //return base64_encode(rawurlencode($txt_utf8));
        return rawurlencode($txt_utf8);
    }

    public static function filter_str($s, $len = 48) {
        return filter_var(substr($s, 0, $len), FILTER_SANITIZE_STRING);
    }

    public static function filter_quote($s, $len = 48) {
        return filter_var(substr($s, 0, $len), FILTER_SANITIZE_MAGIC_QUOTES);
    }

    public static function rand_str($length = 48) {
        $result = uniqid(date('YmdHis', time()));
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $max = strlen($chars) - 1;
        for ($i = strlen($result); $i < $length; $i++) {
            $result .= $chars[rand(0, $max)];
        }
        return substr($result, 0, $length);
    }

    public static function get_ip() {
        $ip = false;
        if (!empty(getenv('HTTP_CLIENT_IP'))) {
            $ip = getenv('HTTP_CLIENT_IP');
        }
        if (!empty(getenv('HTTP_X_FORWARDED_FOR'))) {
            $ips = explode(', ', getenv('HTTP_X_FORWARDED_FOR'));
            if ($ip) {
                array_unshift($ips, $ip);
                $ip = FALSE;
            }
            for ($i = 0; $i < count($ips); $i++) {
                if (!preg_match('/^(10|172\.16|192\.168)\./i', $ips[$i])) {
                    $ip = $ips[$i];
                    break;
                }
            }
        }
        $real_ip = $ip ? $ip : getenv('REMOTE_ADDR');
        return (substr(filter_var($real_ip, FILTER_SANITIZE_FULL_SPECIAL_CHARS), 0, 32));
    }

    public static function open_db() {
        $db = new MySQLi(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $db->set_charset('utf8');
        return ($db);
    }

    public static function utc_to_local($t) {
        // select convert_tz(utc_timestamp(),'+00:00','+08:00');
        $s = 'convert_tz(' . $t . ',"' . TZ_UTC . '","' . TZ_LOCAL . '")';
        return ($s);
    }

    public static function utc_to_server($t) {
        $s = 'convert_tz(' . $t . ',"' . TZ_UTC . '","' . TZ_SERVER . '")';
        return ($s);
    }

    public static function check_ddos() {
        $ip = CommLib::get_ip();
        $db = CommLib::open_db();
        $sql = 'select timestampdiff(second,stamp,utc_timestamp()) as dt,fail from ip where ip=?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $ip);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $dt = $fail = null;
            $stmt->bind_result($dt, $fail);
            $stmt->fetch();
            $stmt->free_result();
            if ($fail < DDOS) {
                //error_log('check_ddos: increase!');
                CommLib::query('update ip set fail=fail+1 where ip=?', 's', [$ip]);
            } else {
                if ($dt > 30) {
                    //error_log('check_ddos: clear');
                    CommLib::query('update ip set fail=0,stamp=utc_timestamp() where ip=?', 's', [$ip]);
                } else {
                    error_log("check_ddos: true ip=$ip");
                    return(true);
                }
            }
        } else {
            //error_log('check_ddos: insert');
            CommLib::query('insert into ip set fail=0,stamp=utc_timestamp(),ip=?', 's', [$ip]);
        }
        return(false);
    }

}

class Reply {
    
    /*
     * cookie:
     * CommLib::get_tokne()
     * setcookie
     * getcookie
     */

    protected $fn;

    function __construct() {
        $this->fn = [];
        $this->token = false;
        
        // 记录当前用户提交过来的token
        $this->utk = '';
    }

    protected function ok($data) {
        //$token=$this->token;
        //error_log('set token:'.$this->token);
        echo(json_encode(array(
            'status' => true,
            'data' => $data,
            'tk' => $this->token
        )));
    }

    protected function fail($msg) {
        //error_log('set token:'.$this->token);
        echo(json_encode(array(
            'status' => false,
            'msg' => (string) $msg,
            'tk' => $this->token
        )));
    }

    public function haste($status) {
        if ($status) {
            self::ok('成功');
        } else {
            self::fail('失败');
        }
    }
    
    public function check_token(){
        // for upload pictures
        $this->utk = substr(filter_input(INPUT_POST, 'tk', FILTER_SANITIZE_STRING), 0, 50);
        //console.log('tk:'.$this->utk);
        return $this->check_login();
    }

    public function reply() {

        header('Content-Type: application/json; charset=utf-8');

        if (CommLib::check_ddos()) {
            self::fail('操作过快！');
            return;
        }

        $func = substr(filter_input(INPUT_POST, 'op', FILTER_SANITIZE_STRING), 0, 32);
        $this->utk = substr(filter_input(INPUT_POST, 'tk', FILTER_SANITIZE_STRING), 0, 50);
        //error_log($this->utk);
        $data = filter_input(INPUT_POST, "data", FILTER_UNSAFE_RAW);
        
        //error_log('user token:'.$this->utk);

        if (in_array($func, $this->fn)) {
            $this->$func($data);
        } else {
            //error_log("$func & $data");
            self::fail('Operation not supported!');
        }
    }

}
