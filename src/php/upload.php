<?php


header("Content-Type:text/plain");

function err($msg){
    die('error|'.$msg);
}

if(!UPLOAD_SUPPORT){
    err('图片上传功能未开启！');
}

require_once 'usermgr.php';

$um = new UserMgr();


if (!$um->check_login()) {
    die("error|未登录不可上传文件！");
}

if (!($_FILES['upload'])) {
    die('error|没有文件名！');
}

$size = $_FILES['upload']['size'];
if ($size > 2 * 1024 * 1024 || $size < 1024) {
    die("error|图片文件应在[1KB-2MB]");
}

$tmp_file = $_FILES['upload']['tmp_name'];

if (!$tmp_file || !file_exists($tmp_file)) {
    die('error|临时文件不存在！');
}

function make_dir() {
    $dir = '../pic/' . date('Y/m/d/H/', time());
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

function get_actual_link($file){
    $link="http://$_SERVER[HTTP_HOST]" . dirname($_SERVER['PHP_SELF']) . "/$file";
    //error_log($link);
    return str_replace('/php/../', '/', $link);
}

$file = make_dir() . date('His_', time()) . uniqid() . '.jpg';
move_uploaded_file($tmp_file, $file);
if(file_exists($file)){
    die(get_actual_link($file));
}

die("error|我也不知道哪里出错了，总之你上传的图片不见了。");
