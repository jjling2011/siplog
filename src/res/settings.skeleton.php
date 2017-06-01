<?php

define('DEBUG_MODE', false);

define('EXPORT_PATH', '../upload/json/top.json');
define('ATYPES_PATH', '../upload/json/atypes.json');
define('MSG_PATH', '../upload/json/msg.json');
define('USET_PATH', '../upload/json/uset.json');
define('ARTICLE_PATH', '../upload/json/article.json');
define('UPLOAD_PATH','../upload/pics/');

define('MSG_KEEP', 5);

define('COOKIE_EXPIRED', 60 * 60 * 24 * 60);

define('INIT_PASSWORD', '123456');

define('TZ_SERVER', '+08:00');
define('TZ_LOCAL', '+08:00');
define('TZ_UTC', '+00:00');

define('DDOS', 10); // 10 operation in 30 seconds

$PRVS = array(
    'USERM' => 0,
    'ARTM' => 1,
    'SETM' => 2,
    'ARTL' => 3
);


