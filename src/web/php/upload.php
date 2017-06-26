<?php

define('_upload_mod_on', 'nothing');

require_once 'serv.php';



if (file_exists(UPLOAD_PATH . 'lock')) {
    myemsg('图片上传功能已关闭！');
}


$serv = new Serv();
$login = $serv->check_token();

// 待解决：跨域无法验证用户登录情况。 20170616
!$login && myemsg("未登录不可上传文件！");


!($_FILES['upload']) && myemsg('没有文件名！');

($_FILES['upload']['size'] > 2 * 1024 * 1024) && myemsg("图片文件应在2MB以内。");

$tmp_file = $_FILES['upload']['tmp_name'];

(!$tmp_file || !file_exists($tmp_file)) && myemsg('临时文件不存在！');

$file = make_dir() . date('His_', time()) . uniqid() . '.jpg';

move_uploaded_file($tmp_file, $file);

if (file_exists($file)) {
    $url = get_actual_link($file);
    CommLib::query('insert into pics set url=?,path=?', 'ss', [&$url, &$file]);
    header('Content-Type: application/json; charset=utf-8');
    $r=['errno'=>0,'data'=>[$url]];
    die(json_encode($r));
}

myemsg("我也不知道哪里出错了，总之你上传的图片不见了。");

function myemsg($msg) {
    header('Content-Type: application/json; charset=utf-8');
    $r=['errno'=>1,'msg'=>$msg];
    die(json_encode($r));
}

function make_dir() {
    $dir = UPLOAD_PATH . date('Y/m/d/H/', time());
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

function get_actual_link($file) {
    //$link = "http://$_SERVER[HTTP_HOST]" . dirname($_SERVER['PHP_SELF']) . "/$file";
    $link = str_replace('../', 'web/', $file);
    //$link = str_replace('/php/../', '/', $link);
    return ($link);
}
