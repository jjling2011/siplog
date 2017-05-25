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

class Serv extends UserMgr{
    //put your code here
    public function __construct() {
        parent::__construct();
        $this->fn = array_merge($this->fn, [
            'post_article'
        ]);
    }
    
    public function post_article($raw_data){
        // todo
        
    }
}

$serv=new Serv();
$serv->reply();
