<?php

require_once 'usermgr.php';

$um = new UserMgr();

header("Content-Type:text/plain");

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

$file = make_dir() . date('His_', time()) . uniqid() . '.jpg';

move_uploaded_file($tmp_file, $file);

$actual_link = "http://$_SERVER[HTTP_HOST]/" . dirname($_SERVER['PHP_SELF']) . "/$file";

die($actual_link);
