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
        parent::__construct(['check_login']);
    }

    public function check_login() {
        // todo 
        return true;
    }

    private function check_prv($prv) {

        //todo
        return true;
    }

    public function add_user($raw_user_info) {
        if (!(self::check_login && self::check_prv('USERM'))) {
            $this->fail('无权操作！');
            return false;
        }
    }

}

$um = new UserMgr();
$um->reply();
