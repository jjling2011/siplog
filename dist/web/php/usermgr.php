<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


require_once 'comm.php';

class UserMgr extends Reply {

    // public functions
    function __construct() {
        // 这两个函数可以通过ajax调用。
        parent::__construct();
        $this->fn = array_merge($this->fn, [
            'login',
            'fetch_user_info',
            'fetch_all_user_info',
            'logout',
            'user_add',
            'user_ban',
            'user_reset',
            'user_management',
            'user_modify'
        ]);
        // check_login() 只能在php中内部调用。
    }

    public function user_modify($raw_info) {
        //{login:bool,token:string,prv:string,name:string,id:int}
        //raw_info: {'name':name,'opsw':md5(org_psw),'npsw':md5(new_psw)}
        if (!($this->check_login())) {
            $this->fail('请先登录！');
            return;
        }
        $token = $this->utk;
        $info = json_decode($raw_info, true);
        $sql = 'select salt,psw,name from user where token=?';
        $r = CommLib::query($sql, 's', [$token]);

        if ($r === false || count($r) < 1) {
            $this->fail('查询失败');
            return;
        }

        $salt = $r[0]['salt'];
        $psw = $r[0]['psw'];


        if (strcmp(hash('md5', $salt . $info['opsw']), $psw) !== 0) {
            $this->fail('原密码错误，修改失败！');
            return;
        }

        $new_name = $r[0]['name'];

        $usr_name = CommLib::filter_str($info['name']);

        if (strlen($usr_name) > 0) {
            $s = CommLib::query('select name from user where name=?', 's', [$usr_name]);
            if ($s !== false && count($s) > 0) {
                $this->fail('名字重复，修改失败！');
                return;
            }
            $new_name = $usr_name;
        }

        $new_salt = CommLib::rand_str(48);
        $new_psw = hash('md5', $new_salt . $info['npsw']);

        $s = CommLib::query('update user set psw=?,salt=?,name=? where token=?', 'ssss', [$new_psw, $new_salt, $new_name, $token]);
        //error_log($r['count']);
        $this->haste($s !== false);
    }

    public function user_management($raw_info) {
        $user_info = $this->get_user_info();
        if (!$user_info['login'] || !$user_info['prv']['USERM']) {
            $this->fail('无权进行此操作！');
            return;
        }
        $info = json_decode($raw_info, true);
        $id = $info['id'] + 0;
        $name = CommLib::filter_str($info['name']);
        $user = CommLib::filter_str($info['user']);
        $prv = $this->prv_name_to_num($info['prv_list']);
        if ($user_info['id'] === $id && !in_array('USERM', $info['prv_list'])) {
            //error_log(print_r($info,true));
            $this->fail('不能取消自己的用户管理权限！');
            return;
        }
        //error_log("id:$id prv:$prv ");
        $r = CommLib::query('update user set prv=?,name=?,user=? where id=?', 'issi', [$prv, $name, $user, $id]);
        $this->haste($r !== false);
    }

    public function user_ban($raw_id) {
        $user = $this->get_user_info();
        if (!$user['login'] || !$user['prv']['USERM']) {
            $this->fail('无权进行此操作！');
            return;
        }
        $id = 0 + $raw_id;
        if ($id === $user['id']) {
            $this->fail('不能对自己进行此操作！');
            return;
        }
        $r = CommLib::query('update user set ban=1 where id=?', 'i', [$id]);
        $this->haste($r !== false);
    }

    public function user_reset($raw_id) {
        $id = 0 + $raw_id;
        if (!($this->check_login() && $this->check_prv('USERM'))) {
            $this->fail('无权进行此操作！');
            return;
        }
        $salt = CommLib::rand_str(48);
        $psw = hash('md5', $salt . hash('md5', RAINBOW . hash('md5', INIT_PASSWORD)));
        $r = CommLib::query('update user set salt=?,psw=?,prv=0,ban=0 where id=?', 'ssi', [$salt, $psw, $id]);
        $this->haste($r !== false);
    }

    public function fetch_all_user_info() {
        global $PRVS;
        //error_log('hello!');
        if (!($this->check_login() && $this->check_prv('USERM'))) {
            $this->fail('无权操作!');
            return;
        }
        //error_log('reading data');
        $db = CommLib::open_db();
        $stmt = $db->prepare('select user,name,id,prv,ban from user');

        $data = [
            'id_list' => [],
            'prv_list' => array_keys($PRVS),
            // {id1:name1,id2:name2}
            'name_list' => [],
            'user_list' => [],
            // {id:{prv_list},id2:{}...
            'user_prv' => [],
            'ban_list' => []
        ];
        //$data['prv_list']= array_keys($PRVS);
//            foreach ($PRVS as $key => $_) {
//                $data['prv_list'][] = $key;
//            }
        $name = $prv = $id = $user = $ban = null;
        $stmt->execute();
        $stmt->bind_result($user, $name, $id, $prv, $ban);
        //$stmt->store_result();
        while ($stmt->fetch()) {
            array_push($data['id_list'], $id);
            $data['name_list'][$id] = $name;
            $data['user_list'][$id] = $user;
            $data['ban_list'][$id] = !($ban === 0);
            $data['user_prv'][$id] = $this->prv_num_to_name($prv);
        }
        $stmt->free_result();
        $this->ok($data);
    }

    public function fetch_user_info() {
        $this->ok($this->get_user_info());
    }

    protected function get_user_info() {
        //{login:bool,token:string,prv:{userm:true,artm:false},name:string,id:int}
        $user = [
            'login' => $this->check_login(),
            'token' => $this->utk
        ];

        if ($user['login']) {
            $db = CommLib::open_db();
            $stmt = $db->prepare('select prv,name,id from user where token=?');
            $stmt->bind_param('s', $user['token']);
            $prv = $name = $id = null;
            $stmt->bind_result($prv, $name, $id);
            $stmt->execute();
            $stmt->store_result();
            $stmt->fetch();
            $stmt->free_result();
            $user['prv'] = $this->prv_num_to_name($prv);
            $user['name'] = $name;
            $user['id'] = $id;
        }
        return($user);
    }

    private static function prv_name_to_num($prv_names) {
        global $PRVS;
        $sum = 0;
        foreach ($prv_names as $key) {
            if (array_key_exists($key, $PRVS)) {
                $sum += pow(2, $PRVS[$key]);
            }
        }
        return $sum;
    }

    private static function prv_num_to_name($prv_num) {
        global $PRVS;
        $data = [];
        foreach ($PRVS as $key => $value) {
            $data[$key] = (( ($prv_num >> $value ) % 2) === 1);
        }
        return $data;
    }

    public function check_login() {
        $token = $this->utk;

        $r = CommLib::query('select id from user where token=?', 's', [$token]);

        if ($r === false) {
            return false;
        }

        if (count($r) > 0) {
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
            if (abs($dt) > 24) {
                $this->update_cookie();
            }
            return true;
        }
        return false;
    }

    public function logout() {
        if ($this->check_login()) {
            $token = $this->utk;
            $new = CommLib::rand_str(48);
            $r = CommLib::query('update user set token=?,tk_update=utc_timestamp() where token=?', 'ss', [$new, $token]);
            $this->haste($r !== false);
        } else {
            $this->fail('登录后才可以操作！');
        }
    }

    public function login($raw_user_info) {
        // $raw_user_info=[ user=>name,psw=>md5(password)];
        $user_info = json_decode($raw_user_info, true);
        //error_log($raw_user_info);
        //var_dump($user_info);
        if (!(is_array($user_info) && array_key_exists('user', $user_info) && array_key_exists('psw', $user_info))) {
            $this->fail('用户名或密码为空!');
            return false;
        }
        if (!($this->check_user_password($user_info['user'], $user_info['psw']))) {
            // 由check_user_password 生成信息。
            return false;
        }
        $ip = CommLib::get_ip();
        $user = $user_info['user'];
        $token = CommLib::rand_str(48);
        $this->token = $token;
        CommLib::query('update user set last=utc_timestamp(),ip=?,token=? where user=?', 'sss', [$ip, $token, $user]);
        $this->ok("欢迎！");
        return true;
    }

    private function update_cookie() {
        $token = $this->utk;
        $new = CommLib::rand_str(48);
        $r = CommLib::query('update user set token=?,tk_update=utc_timestamp() where token=?', 'ss', [$new, $token]);
        if ($r !== false) {
            $this->token = $new;
            $this->utk = $new;
        }
        return ($r !== false);
    }

    protected function check_prv($prv_name) {
        global $PRVS;
        if (!array_key_exists($prv_name, $PRVS)) {
            return false;
        }

        $token = $this->utk;
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
        return ((($db_prv >> $PRVS[$prv_name]) % 2) === 1);
    }

    private static function user_exist($name) {
        $r = CommLib::query('select user from user where user=?', 's', [$name]);
        return ($r !== false && count($r) > 0);
    }

    private static function name_exist($name) {
        $r = CommLib::query('select name from user where name=?', 's', [$name]);
        return ($r !== false && count($r) > 0);
    }

    private function check_user_password($raw_user, $raw_psw) {
        //[user=>name,psw=>md5(password)]
        $user = CommLib::filter_str($raw_user);
        $psw = substr($raw_psw, 0, 48);
        if (!($this->user_exist($user))) {
            $this->fail('用户不存在！');
            return false;
        }
        // get salt
        $db = CommLib::open_db();
        $stmt = $db->prepare('select ban,fail,psw,salt from user where user=?');
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->store_result();
        $ban = $db_psw = $db_salt = $fail = null;
        $stmt->bind_result($ban, $fail, $db_psw, $db_salt);
        $stmt->fetch();
        $stmt->free_result();

        if (false && $fail > 10) {
            // 预防admin被恶意锁定
            $this->fail('尝试次数过多，账号已锁定，请与管理员联系！');
            return false;
        }
        
        if($ban!==0){
            $this->fail('账号已被停用,请与管理员联系!');
            return false;
        }
        
        if (strcmp(hash('md5', "$db_salt$psw"), $db_psw) !== 0) {
            $this->fail('账号密码不符！');
            CommLib::query('update user set fail=fail+1 where user=?', 's', [$user]);
            return false;
        }
        
        CommLib::query('update user set fail=0 where user=?', 's', [$user]);
        return true;
    }

    public function user_add($raw_user_info) {
        //$raw_user_info="[user=>name,psw=>hash.md5(password),prv=0]"

        if (!(self::check_login() )) {
            $this->fail('Please login first!');
            return false;
        }

        if (!( self::check_prv('USERM'))) {
            $this->fail('无权操作!');
            return false;
        }

        $user_info = json_decode($raw_user_info, true);

        if (!( array_key_exists('user', $user_info) &&
                array_key_exists('name', $user_info) &&
                array_key_exists('prv', $user_info) )) {
            $this->fail('信息不全，需要提供账号及权限！');
            return false;
        }

        $user = CommLib::filter_str($user_info['user']);
        $name = CommLib::filter_str($user_info['name']);
        $salt = CommLib::rand_str(48);
        $psw = hash('md5', $salt . hash('md5', RAINBOW . hash('md5', INIT_PASSWORD)));
        $token = CommLib::rand_str(48);
        $prv = $this->prv_name_to_num($user_info['prv']);

        if ($this->name_exist($name) || $this->user_exist($user)) {
            $this->fail('用户名或账号重复，添加失败！');
            return;
        }

        $r = CommLib::query('insert into user(user,psw,prv,salt,token,name) values(?,?,?,?,?,?)', 'ssisss', [$user, $psw, $prv, $salt, $token, $name]);
        $this->haste($r !== false);
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

    //$um->user_add($user2);
    //$um->check_user_password('jhon', hash('md5', 'hello!'));
    //$um->login($user1);
    $um->login($user1);
}