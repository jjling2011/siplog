<?php

define('DEBUG_MODE', false);

define('EXPORT_PATH', '../upload/json/top.json');
define('ATYPES_PATH', '../upload/json/atypes.json');
define('MSG_PATH', '../upload/json/msg.json');
define('USET_PATH', '../upload/json/uset.json');
define('ARTICLE_PATH', '../upload/json/');
define('UPLOAD_PATH','../upload/pics/');

define('MSG_KEEP', 5);

define('COOKIE_EXPIRED', 60 * 60 * 24 * 60);

define('INIT_PASSWORD', '123456');

define('TZ_SERVER', '+08:00');
define('TZ_LOCAL', '+08:00');
define('TZ_UTC', '+00:00');

define('DDOS', 10); // 10 operation in 30 seconds

$PRVS = array(
    // 添加、修改用户信息
    'USERM' => 0,
    // 发布、修改、删除文章
    'ARTM' => 1,
    // 修改界面设定，分类设定
    'SETM' => 2,
    // 锁定、置顶文章
    'ARTL' => 3
);


