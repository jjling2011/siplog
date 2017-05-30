<?php

require_once 'usermgr.php';

header("Content-Type:text/plain");

if (file_exists(UPLOAD_PATH . 'lock')) {
    err('图片上传功能已关闭！');
}

$um = new UserMgr();

!$um->check_login() && err("未登录不可上传文件！");

!($_FILES['upload']) && err('没有文件名！');

($_FILES['upload']['size'] > 2 * 1024 * 1024) && err("图片文件应在2MB以内。");

$tmp_file = $_FILES['upload']['tmp_name'];

(!$tmp_file || !file_exists($tmp_file)) && err('临时文件不存在！');

$file = make_dir() . date('His_', time()) . uniqid() . '.jpg';

move_uploaded_file($tmp_file, $file);

if (file_exists($file)) {
    $url=get_actual_link($file);
    CommLib::query('insert into pics set url=?,path=?','ss',[&$url,&$file]);
    die($url);
}

err("我也不知道哪里出错了，总之你上传的图片不见了。");

function err($msg) {
    err('' . $msg);
}

function make_dir() {
    $dir = UPLOAD_PATH . date('Y/m/d/H/', time());
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

function get_actual_link($file) {
    $link = "http://$_SERVER[HTTP_HOST]" . dirname($_SERVER['PHP_SELF']) . "/$file";
    //error_log($link);
    return str_replace('/php/../', '/', $link);
}
