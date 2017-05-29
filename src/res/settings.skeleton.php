<?php

define('DEBUG_MODE',false);

define('UPLOAD_SUPPORT',true);

define('EXPORT_PATH','../json/top.json');
define('ATYPES_PATH','../json/atypes.json');
define('MSG_PATH','../json/msg.json');
define('ARTICLE_PATH','../json/article.json');
define('MSG_KEEP',5);

define('COOKIE_EXPIRED',60*60*24*60);

define('INIT_PASSWORD','123456');

define('TZ_SERVER', '+08:00');
define('TZ_LOCAL', '+08:00');
define('TZ_UTC', '+00:00');

define('DDOS',10); // 10 operation in 30 seconds

$PRVS = array(
    'USERM' => 0,
    'ARTM' => 1
);


