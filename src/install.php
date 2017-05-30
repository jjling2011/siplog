<?php
if (file_exists('upload/config/lock')) {
    die('不能重复安装，请删除所有文件再重新安装。');
}

$param = [];

$r = check_param();

//debug();

if ($r[0]) {
    install();
    die('安装完成！<a href="index.html" >点击跳转到主页</a>');
}

function install() {
    global $param;
    
    del_file('upload/json/top.json');
    del_file('upload/json/msg.json');
    del_file('upload/json/uset.json');
    del_file('upload/json/article.json');
    del_file('upload/config/settings.php');
    
    make_dir('upload');
    make_dir('upload/config');
    make_dir('upload/json');
    make_dir('upload/pics');
    
    copy('res/settings.skeleton.php', 'upload/config/settings.php');
    copy('res/article.json', 'upload/json/article.json');
    copy('res/uset.json', 'upload/json/uset.json');
    copy('res/top.json', 'upload/json/top.json');
    copy('res/msg.json', 'upload/json/msg.json');

    set('DB_HOST', $param['host']);
    set('DB_USER', $param['dbuser']);
    set('DB_PASS', $param['dbpass1']);
    set('DB_NAME', $param['dbname']);

    $tables = ['article', 'ip', 'log', 'msg', 'sys', 'user','pics'];
    $sql = gen_sql();

    foreach ($tables as $t) {
        //query("DROP TABLE IF EXISTS `$t`");
        query($sql[$t]);
    }

    query('insert into sys set utime=utc_timestamp(),id=1');
    $salt = rand_str();
    $token = rand_str();
    $pass = hash('md5', $salt . hash('md5', $param['pass1']));

    // insert admin 
    query("insert into user set user='" . $param['user'] . "',psw='$pass',prv=3,salt='$salt',token='$token',name='" . $param['name'] . "'");

    file_put_contents('upload/config/lock', date('Y-m-d H:i:s'));
}

function del_file($file){
    if(file_exists($file)){
        unlink($file);
    }
}

function make_dir($dir) {
    if (!file_exists($dir)) {
        mkdir($dir, 0755, true);
    }
}

function rand_str($length = 48) {
    $result = uniqid(date('YmdHis', time()));
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $max = strlen($chars) - 1;
    for ($i = strlen($result); $i < $length; $i++) {
        $result .= $chars[rand(0, $max)];
    }
    return substr($result, 0, $length);
}

function gen_sql() {
    $sql = [];
    
    $sql['pics']="CREATE TABLE IF NOT EXISTS `pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uptime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deltime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `path` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atid` int(11) NOT NULL DEFAULT '0',
  `tag` int(11) NOT NULL DEFAULT '0',
  KEY `id` (`id`),
  KEY `url` (`url`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='上传图片数据'";

    $sql['user'] = "CREATE TABLE IF NOT EXISTS `user` (
  `user` char(50) NOT NULL,
  `prv` tinyint(4) NOT NULL,
  `psw` char(50) NOT NULL,
  `salt` char(50) NOT NULL,
  `last` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` char(50) DEFAULT NULL,
  `fail` smallint(6) NOT NULL DEFAULT '0',
  `token` char(50) NOT NULL,
  `tk_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` tinytext,
  `tag` tinyint(4) NOT NULL DEFAULT '0',
  `ban` tinyint(4) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `user` (`user`),
  KEY `token` (`token`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='user info';";

    $sql['sys'] = "CREATE TABLE IF NOT EXISTS `sys` (
  `utime` timestamp NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统信息'";

    $sql['msg'] = "CREATE TABLE IF NOT EXISTS `msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `ctime` (`ctime`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='留言'";

    $sql['log'] = "CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text,
  KEY `id` (`id`),
  KEY `stamp` (`stamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='记录登录失败信息'";

    $sql['ip'] = "CREATE TABLE IF NOT EXISTS `ip` (
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` char(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fail` smallint(6) NOT NULL DEFAULT '0',
  UNIQUE KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    $sql['article'] = "CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `type` smallint(6) NOT NULL DEFAULT '0',
  `title` char(199) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '无',
  `content` text COLLATE utf8mb4_unicode_ci,
  `tag` tinyint(4) NOT NULL DEFAULT '0',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `modify` (`mtime`),
  FULLTEXT KEY `title` (`title`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='存放文章数据'";

    return $sql;
}

function set($key, $value) {
    // define('DB_HOST', 'localhost');
    file_put_contents('upload/config/settings.php', "\ndefine('$key','$value');", FILE_APPEND);
}

function query($sql) {
    global $param;
    $db = new MySQLi($param['host'], $param['dbuser'], $param['dbpass1'], $param['dbname']);
    if ($db->connect_errno) {
        die("MySQL connect failed: " . $db->connect_error);
    }
    $db->set_charset('utf8');
    if (!$db->query($sql)) {
        die('Error:' . $db->error);
    }
    $db->close();
}

function debug() {
    require_once 'test/test_install.php';
    load_install_setting();
}

function check_param() {
    global $param;
    $name = ['host', 'dbname', 'dbuser', 'dbpass1', 'dbpass2', 'user', 'pass1', 'pass2', 'name'];
    $empty = false;
    foreach ($name as $n) {
        $param[$n] = filter_input(INPUT_POST, $n, FILTER_SANITIZE_STRING);
        if (strlen($param[$n]) <= 0) {
            $empty = true;
        }
    }
    if ($empty) {
        return [false, '部分信息未填写！'];
    }
    if (strcmp($param['dbpass1'], $param['dbpass2']) !== 0) {
        return [false, '数据库两次输入密码不一致'];
    }
    if (strcmp($param['pass1'], $param['pass2']) !== 0) {
        return [false, '管理员两次密码不一致。'];
    }
    return [true, '通过初步检查'];
}
?>

<html>
    <head>
        <title>安装</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <br>
        <b>欢迎使用安装页面</b><br>
        <font color="red"><?= $r[1]; ?></font><br><br>
        <b>数据库</b><br>
        **注意，数据库中的表将被删除**<br>
        <form action="install.php" method="post">
            主机(localhost):<br>
            <input type="text" name="host" value="<?= $param['host'] ?>"><br>
            数据库名:<br>
            <input type="text" name="dbname" value="<?= $param['dbname'] ?>"><br>
            用户名:<br>
            <input type="text" name="dbuser" value="<?= $param['dbuser'] ?>"><br>
            密码;<br>
            <input type="password" name="dbpass1" value=""><br>
            重复密码;<br>
            <input type="password" name="dbpass2" value=""><br><br>

            <b>网页管理员</b><br>
            账号:<br>
            <input type="text" name="user" value="<?= $param['user'] ?>"><br>
            密码;<br>
            <input type="password" name="pass1" value=""><br>
            重复密码;<br>
            <input type="password" name="pass2" value=""><br>
            显示名字:<br>
            <input type="text" name="name" value="<?= $param['name'] ?>"><br><br>
            <input type="submit" value="安装">
        </form>
    </body>
</html>