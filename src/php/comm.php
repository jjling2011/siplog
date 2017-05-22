<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include '../config/settings.php';

class CommLib {

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

    public static function query($sql) {
        $db = CommLib::open_db();
        $db->query($sql);
        $db->close();
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
        $result = $db->prepare($sql);
        $result->bind_param('s', $ip);
        $result->execute();
        if ($result->num_rows > 0) {
            $dt = $fail = null;
            $result->bind_result($dt, $fail);
            $result->fetch();
            if ($fail < 10) {
                CommLib::increase_fail($ip);
            } else {
                if ($dt > 15) {
                    CommLib::clear_fail($ip);
                } else {
                    return(true);
                }
            }
        } else {
            CommLib::insert_fail($ip);
        }
        $result->free();
        return(false);
    }

    private static function insert_fail($raw_ip) {
        $ip = substr($raw_ip, 0, 32);
        $db = CommLib::open_db();
        $sql = 'insert into ip set fail=0,stamp=utc_timestamp(),ip=?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $ip);
        $stmt->excute();
        $stmt->free();
    }

    private static function clear_fail($raw_ip) {
        $ip = substr($raw_ip, 0, 32);
        $db = CommLib::open_db();
        $sql = 'update ip set fail=0,stamp=utc_timestamp() where ip=?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $ip);
        $stmt->excute();
        $stmt->free();
    }

    private static function increase_fail($raw_ip) {
        $ip = substr($raw_ip, 0, 32);
        $db = CommLib::open_db();
        $sql = 'update ip set fail=fail+1 where ip=?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $ip);
        $stmt->excute();
        $stmt->free();
    }

}

class Serv {

    private $fn;

    function __construct($f) {
        $this->fn = [];
        if (is_array($f)) {
            $this->fn = $f;
        }
    }

    protected static function ok($data) {
        echo(json_encode(array(
            'status' => true,
            'data' => $data)));
    }

    protected static function fail($msg) {
        echo(json_encode(array(
            'status' => false,
            'data' => (string) $msg)));
    }

    public function reply() {

        header('Content-Type: application/json; charset=utf-8');

        if (CommLib::check_ddos()) {
            self::fail('操作过快！');
            return;
        }

        $func = substr(filter_input(INPUT_POST, 'op', FILTER_SANITIZE_STRING), 0, 32);
        $data = filter_input(INPUT_POST, "data", FILTER_UNSAFE_RAW);

        if (in_array($func, $this->fn)) {
            $this->$func($data);
        } else {
            self::fail('Operation not supported!');
        }
    }

}
