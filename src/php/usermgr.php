<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


require_once 'comm.php';

class UserMgr extends Serv {

    // public functions
    function __construct() {
        // 这两个函数可以通过ajax调用。
        parent::__construct();
        $this->fn=array_merge($this->fn,['add_user','login']);
        // check_login() 只能在php中内部调用。
    }

    public function check_login() {
        $token = substr(filter_input(INPUT_COOKIE, "token", FILTER_SANITIZE_STRING), 0, 48);
        $user = substr(filter_input(INPUT_COOKIE, "user", FILTER_SANITIZE_STRING), 0, 48);
        $r = CommLib::query('select user from user where token=? and user=?', 'ss', [&$token, &$user]);

        if ($r['status'] && $r['count'] > 0) {
            $sql = 'select ban,timestampdiff(hour,tk_update,utc_timestamp()) from user where token=?';
            $db = CommLib::open_db();
            $stmt = $db->prepare($sql);
            $stmt->bind_param('s', $token);
            $dt = $ban = null;
            $stmt->execute();
            $stmt->bind_result($ban, $dt);
            $stmt->fetch();
            $stmt->free_result();
            if ($ban !== 0) {
                return false;
            }
            if ($dt > 24) {
                $this->update_cookie($user);
            }
            return true;
        }
        return false;
    }

    public function login($raw_user_info) {
        // $raw_user_info=[ user=>name,psw=>password];
        $user_info = json_decode($raw_user_info, true);
        //error_log($raw_user_info);
        //var_dump($user_info);
        if (!(is_array($user_info) && array_key_exists('user', $user_info) && array_key_exists('psw', $user_info))) {
            $this->fail('missing user_name or user_password!');
            return false;
        }
        if (!($this->check_user_password($user_info['user'], $user_info['psw']))) {
            //$this->fail('user_name and user_password do not match!');
            return false;
        }
        $ip = CommLib::get_ip();
        $user = $user_info['user'];
        $token = CommLib::rand_str(48);
        setcookie('user', $user, time() + COOKIE_EXPIRED);
        setcookie('token', $token, time() + COOKIE_EXPIRED);
        CommLib::query('update user set last=utc_timestamp(),ip=?,token=? where user=?', 'sss', [&$ip, &$token, &$user]);
        $this->ok($user . ', welcome!');
        return true;
    }

    private static function update_cookie($user) {
        $token = substr(filter_input(INPUT_COOKIE, "token", FILTER_SANITIZE_STRING), 0, 48);
        $new = CommLib::rand_str(48);
        $r = CommLib::query('update user set token=?,tk_update=utc_timestamp() where token=?', 'ss', [&$new, &$token]);
        //echo "new<br/>$new<br/>old<br/>$token<br/>";
        //var_dump($r);
        if ($r['status']) {
            setcookie('token', $new, time() + COOKIE_EXPIRED);
            setcookie('user', $user, time() + COOKIE_EXPIRED);
        }
        return $r['status'];
    }

    private function check_prv($prv) {
        global $PRVS;
        $token = substr(filter_input(INPUT_COOKIE, "token", FILTER_SANITIZE_STRING), 0, 48);
        $sql = 'select prv from user where token=?';
        $db = CommLib::open_db();
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $token);
        $db_prv = null;
        $stmt->execute();
        $stmt->bind_result($db_prv);
        $stmt->fetch();
        $stmt->free_result();
        if ($db_prv <= 0) {
            return false;
        }
        return ((($db_prv >> $PRVS[$prv]) % 2) === 1);
    }

    private static function user_exist($name) {
        $r = CommLib::query('select user from user where user=?', 's', [&$name]);
        return ($r['status'] && $r['count'] > 0);
    }

    private function check_user_password($raw_user, $raw_psw) {
        //[user=>name,psw=>md5(password)]
        $user = filter_var(substr($raw_user, 0, 48), FILTER_SANITIZE_STRIPPED);
        $psw = substr($raw_psw, 0, 48);
        if (!($this->user_exist($user))) {
            $this->fail('user do not exist!');
            return false;
        }
        // get salt
        $db = CommLib::open_db();
        $stmt = $db->prepare('select fail,psw,salt from user where user=?');
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->store_result();
        $db_psw = $db_salt = $fail = null;
        $stmt->bind_result($fail, $db_psw, $db_salt);
        $stmt->fetch();
        $stmt->free_result();
//        error_log($psw);
//        error_log(hash('md5','hello'));
//        error_log($db_salt);
//        error_log($db_psw);
        if ($fail > 10) {
            $this->fail('Try too many times. Please contact administrator!');
            return false;
        }
        if (strcmp(hash('md5', "$db_salt$psw"), $db_psw) !== 0) {
            $this->fail('password do not match!');
            CommLib::query('update user set fail=fail+1 where user=?', 's', [&$user]);
            return false;
        }
        CommLib::query('update user set fail=0 where user=?', 's', [&$user]);
        return true;
    }

    public function add_user($raw_user_info) {
        //$raw_user_info="[user=>name,psw=>hash.md5(password),prv=0]"
        if (!(self::check_login() )) {
            $this->fail('Please login first!');
            return false;
        }
        if (!( self::check_prv('USERM'))) {
            $this->fail('Unauthorized operation!');
            return false;
        }
        $user_info = json_decode($raw_user_info, true);
        if (!( array_key_exists('user', $user_info) &&
                array_key_exists('psw', $user_info) &&
                array_key_exists('prv', $user_info) )) {
            $this->fail('want user,psw,prv . but something is missing.');
            return false;
        }
        $user = filter_var(substr($user_info['user'], 0, 48), FILTER_SANITIZE_STRIPPED);
        $salt = CommLib::rand_str(48);
        $psw = hash('md5', $salt . substr($user_info['psw'], 0, 48));
        $token = CommLib::rand_str(48);
        $prv = 0 + $user_info['prv'];

        if (self::user_exist($user)) {
            $this->fail('user name exist! abort!');
            return false;
        }

        $r = CommLib::query('insert into user(user,psw,prv,salt,token) values(?,?,?,?,?)', 'ssiss', [&$user, &$psw, &$prv, &$salt, &$token]);
        //var_dump($r);
        if ($r['status']) {
            $this->ok('add user success!');
        } else {
            $this->fail('add user fail!');
        }
    }

}

if (false && DEBUG_MODE) {
    $um = new UserMgr();

    //$raw_user_info="[user=>name,psw=>hash.md5(password),prv=0]"
    $user1 = json_encode([
        'user' => 'jhon',
        'psw' => hash('md5', 'hello'),
        'prv' => 0
    ]);
    $user2 = json_encode([
        'user' => 'tom',
        'psw' => hash('md5', 'cat'),
        'prv' => 0
    ]);

    //$um->add_user($user2);
    //$um->check_user_password('jhon', hash('md5', 'hello!'));
    //$um->login($user1);
    $um->login($user1);
}