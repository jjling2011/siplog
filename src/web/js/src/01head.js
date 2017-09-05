/* global  cardjs */

cardjs.set({server_page: 'web/php/serv.php'});
//cardjs.set({verbose: true});

/*
 * cache share keys:
 * event('main_article_board_update'): 主窗口文章框提供的 update 函数 
 * event('main_article_board_show_front_page'): 主窗口文章框显示首页
 * event('main_show_pager');
 * event('main_clear_pager');
 * event('main_update_banner'); 更新bannery
 * art_select_id: 搜索结果中缓存的当前选中的文章ID
 * 'show_main_search_result' 得到搜索结果时,显示搜索结果.
 * clear_cache('update_article') 更新文章时清理相应缓存
 * clear_cache('clear_art_board') 更新主页文章窗口
 * clear_cache('clear_all_user_data') 退出登录时,清除用户设定
 */

var sip = {
    f: {},
    o: {
        main: {},
        mgr: {},
        art: {},
        db: {}
    },
    s: {
        rainbow: "4YpcTwRat7A8hqlAKW4B7jOUJyBUEvnr",
        json_path: 'web/upload/json/',
        //最近文章数据的位置
        top_art_path: 'web/upload/json/top.json',
        // 文章分类
        atypes_path: 'web/upload/json/atypes.json',
        msg_path: 'web/upload/json/msg.json',
        article_path: 'web/upload/json/',
        // 记录json文件是否存在，由serv.php生成。
        // {'20176':true,'201612':true}
        files_path: 'web/upload/json/files.json',
        uset_path: 'web/upload/json/uset.json'
    },
    // 这些不太重要的设置，用户可以自己改。
    // 会被 upload/uset.json 覆盖。
    uset: {

        banner_name: "Siplog",
        banner_desc: '一个简洁的单面博客',

        //显示留言信息
        show_mbox: true,

        //是否开启上传图片功能
        upload: true,

        atypes: ['默认分类'],

        msg_keep: 5
    },
    del: {
        // for debug
    }
};
