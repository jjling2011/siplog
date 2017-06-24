/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */
cardjs.set({server_page: 'php/serv.php'});

/*
 * cache share keys:
 * event('main_article_board_update'): 主窗口文章框提供的 update 函数 
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
        //最近文章数据的位置
        top_art_path: 'upload/json/top.json',
        // 文章分类
        atypes_path: 'upload/json/atypes.json',
        msg_path: 'upload/json/msg.json',
        article_path: 'upload/json/',
        // 记录json文件是否存在，由serv.php生成。
        // {'20176':true,'201612':true}
        files_path: 'upload/json/files.json',
        uset_path: 'upload/json/uset.json'
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
    del: {}
};

sip.f.merge_uset = function (settings) {
    for (var key in settings) {
        sip.uset[key] = settings[key];
    }
};

sip.f.add_frame = function (frame_id, content, tag, style) {
    var d = {
        'style': style || "",
        'content': content
    };
    if (tag && tag.length > 0) {
        d['tag'] = tag;
    }
    return Mustache.render(cardjs.lib.load_html(frame_id), d);
};

sip.f.parse_json = function (e) {
    var f = {
        title: function (d) {
            return(filterXSS(cardjs.lib.base64_to_utf8(d)));
        },
        mtime: function (d) {
            return(cardjs.lib.getYMD(d));
        },
        ctime: function (d) {
            return(cardjs.lib.getYMD(d));
        },
        type: function (d) {
            return(sip.uset.atypes[(d < sip.uset.atypes.length ? d : 0)]);
        },
        name: function (d) {
            return(filterXSS(d));
        },
        content: function (d) {
            return(filterXSS(cardjs.lib.base64_to_utf8(d)));
        },
        top: function (d) {
            return(d === 0 ? false : true);
        },
        lock: function (d) {
            return(d === 0 ? false : true);
        }
    };

    var d = {};

    for (var key in e) {
        if (key in f) {
            d[key] = f[key](e[key]);
        } else {
            d[key] = e[key];
        }
    }

    return d;
};

sip.o.main.pager = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'pager',
        add_event: true
    });

    o.btn_num = 5;

    o.d = {};

    o.data_parser = function () {
        var cur = sip.db.d.page.cur_page;
        var size = sip.db.d.page.size;
        var max = Math.ceil(sip.db.d.total_article / size);
        var first = Math.max(0, (cur - Math.floor(this.btn_num / 2)));
        var last = Math.min(first + this.btn_num, max);
        first = Math.min(first, last - this.btn_num);
        first = Math.max(first, 0);
        if (cur > last) {
            cur = last;
        }
        if (cur < first) {
            cur = first;
        }
        sip.db.d.page.cur_page = cur;
        this.d.first = first;
        this.d.last = last;
        this.d.cur = cur;
        //console.log('data parser:', this.d);
    };

    o.gen_html = function () {
        var v = [];
        for (var i = this.d.first; i < this.d.last; i++) {
            v.push({id: this.el(i - this.d.first + 1), value: i + 1});
        }
        var first = {id: this.el(0), value: '首页'};
        return (Mustache.render(cardjs.lib.load_html('tp-main-pager'), {first: first, v: v}));
    };

    o.show_page = function (num) {
        //console.log('show page ' + num);
        //sip.db.d.page.cur_page = num;
        var min = Math.max(num * sip.db.d.page.size, 0);
        var first = 0, sum = 0, key = 0, skip = 0, per_sum = 0;
        var d = sip.db.d;

        while (sum <= min && key < d.file_key.length) {
            first = key;
            per_sum = sum;
            sum += d.files[d.file_key[key]];
            key++;
        }

        skip = Math.max(min - per_sum, 0);
        //var k = d.file_key[first];
        //console.log('show page: num/min/first/key/skip', num, min, first, k, skip);
        d = null;
        this.d.data = [];
        this.get_data.bind(this)(first, skip);
    };

    o.get_data = function (key_index, skip) {
        if (key_index >= sip.db.d.file_key.length) {
            console.log('Last page!');
            this.f.event('main_article_board_update', this.d.data);
            return;
        }
        var size = sip.db.d.page.size;
        var key = sip.db.d.file_key[key_index];
        //console.log('call get data:key/idx/skip', key, key_index, skip);
        if (key in sip.db.d.data) {
            var ids = Object.keys(sip.db.d.data[key]);
            for (var i = skip; i < ids.length && this.d.data.length < size; i++) {
                //console.log('push(key,idx)', key, i);
                this.d.data.push(sip.db.d.data[key][ids[i]]);
            }
            if (this.d.data.length < size) {
                this.get_data.bind(this, key_index + 1, 0)();
                return;
            }
            this.f.event('main_article_board_update', this.d.data);
        } else {
            //console.log('load json:', key);
            sip.db.load_json(key, this.get_data.bind(this, key_index, skip));
        }
    };

    o.gen_ev_handler = function () {
        var evs = [];
        evs.push(function () {
            sip.db.d.page.cur_page = 0;
            this.refresh();
            //this.show_page(0);
        });

        for (var i = this.d.first; i < this.d.last; i++) {
            evs.push((function () {
                var num = i;
                return(function () {
                    sip.db.d.page.cur_page = num;
                    this.refresh();
                    //this.show_page(num);
                }.bind(this));
            }.bind(this)()));
        }

        return evs;
    };

    o.add_event = function () {
        for (var i = 0; i < this.el(); i++) {
            this.f.on('click', i);
        }
    };

    o.after_add_event = function () {
        //this.f.trigger(0);
        this.el(this.d.cur - this.d.first + 1, true).style.backgroundColor = 'skyblue';
        this.show_page(sip.db.d.page.cur_page);
    };

    return o;
};

sip.o.db.article = function () {

    var data_key = cardjs.lib.gen_key();

    var o = new cardjs.package({
        key: data_key,
        d: {
            data: {},
            top: [],
            files: [],
            search: {
                kw_cache: null,
                kw_cur: '',
                result: []
            },
            page: {
                key: null,
                filter: '',
                size: 5,
                cur_page: 0,
                cur_key: 0,
                id_loaded: 0
            },
            file_key: [],
            total_article: 0
        }
    });

    o.set = function (key, value) {
        //this[key] = value;
        //console.log('set :',key,value);
        if (key === 'page_key') {
            //console.log(this.files,value,value in this.files);
            if (value in this.d.files) {
                this.d.page.key = value;
                this.f.event('main_clear_pager');
                this.show_page.bind(this)();
            }
        }
        if (key === 'filter') {
            //console.log('set filter:', value);
            this.f.event('main_clear_pager');
            this.d.page.filter = value;
            this.show_page.bind(this)();
        }
    };

    o.show_page = function () {
        //console.log(this);
        if (this.d.page.key in this.d.data) {
            this.push_main_art_board.bind(this)();
        } else {
            this.load_json.bind(this)(this.d.page.key, this.push_main_art_board.bind(this));
        }
    };

    o.push_main_art_board = function () {
        if (!(this.d.page.key in this.d.data)) {
            console.log('Error: key not exist!', this.d.page.key);
            return;
        }
        //console.log(this);
        var d = [], f = this.d.page.filter, k = this.d.page.key, db = this.d.data;
        if (k in db) {
            for (var id in db[k]) {
                if (f === '全部' || f === '' || db[k][id].type === f) {
                    d.push(db[k][id]);
                }
            }
        }
        //console.log('k/d/f/db' ,k, d,f,db);
        this.f.event('main_article_board_update', d);
        d = null;
        f = null;
        k = null;
        db = null;
    };

    o.search = function (raw_keywords) {

        if (this.d.search.kw_cache === raw_keywords) {
            //console.log('using cache!');
            this.f.event('show_main_search_result');
            return;
        }

        this.d.search.kw_cache = raw_keywords;

        var keywords = raw_keywords.split(' ').filter(function (e) {
            return (e.length > 0);
        });

        this.d.search.result = [];
        this.search_recursive.bind(this)(keywords, 0);
    };

    o.search_recursive = function (keywords, index) {
        if (index >= this.d.file_key.length) {
            this.f.event('show_main_search_result');
            console.log('search done!');
            return;
        }
        var key = this.d.file_key[index];
        if (key in this.d.data) {
            this.search_cache.bind(this)(keywords, key);
            if (this.search_result > 15) {
                console.log('find 15+ results, abort');
                return;
            }
            //console.log('cur_result:',this.search_result);
            this.f.event('show_main_search_result');
            this.search_recursive.bind(this)(keywords, index + 1);
            return;
        }
        //console.log('load file:', key);
        this.load_json(key, this.search_recursive.bind(this, keywords, index));
    };

    o.search_cache = function (keywords, key) {

        var id, e, mark, kw_idx;

        for (id in this.d.data[key]) {
            mark = 0;
            e = this.d.data[key][id];
            for (kw_idx in keywords) {
                if (e.title.indexOf(keywords[kw_idx]) >= 0
                        || e.text.indexOf(keywords[kw_idx]) >= 0) {
                    mark++;
                }
                //console.log('mark:',mark,' kw:',keywords[kw_idx],'e:',e);
            }

            if (keywords.length <= 0 || mark === keywords.length) {
                this.d.search.result.push({
                    key: key,
                    id: id,
                    title: e.title,
                    data: e
                });
            }
            e = null;
            if (this.d.search.result.length > 15) {
                break;
            }
        }

    };

    o.load_json = function (key, callback) {

        if (!cardjs.lib.isString(key)) {
            throw new Error('key muset be string.');
        }

        if (!(key in this.d.files)) {
            console.log('Key not exist:', key);
            return;
        }

        if (key in this.d.data) {
            //console.log('key exist, skip', key);
            return;
        }

        var y = key.substr(0, 4),
                m = key.substr(4),
                path = sip.s.article_path + (y) + '/' + (m) + '.json';

        console.log('Load data:'+key+'.json');

        $.getJSON(path + '?t=' + cardjs.lib.rand(8), this.got_json.bind(this, callback, key));

    };

    o.get = function (key) {
        if (key === 'files') {
            return o.d.files;
        }
    };

    o.got_json = function (callback, key, data) {

        /* cache.data={
         *   201706:{
         *      id1: content,id,txt, ... 
         *      id2: content,id,txt, ...
         *      ...
         *   },
         *   201707:{
         *     ...
         *   }
         * }
         */

        var d = {}, e, i, div = document.createElement("div");
        for (i = 0; i < data.length; i++) {
            e = sip.f.parse_json(data[i]);
            div.innerHTML = e.content;
            e.text = div.textContent || div.innerText || "";
            d[e.id] = e;
        }
        div = null;
        this.d.data[key] = d;

        if (cardjs.lib.isFunction(callback)) {
            callback();
        }
    };

    o.load_files = function () {

        this.d.files = [];
        this.d.top = [];
        this.d.search.kw_cache = null;
        this.d.search.kw_cur = null;
        this.d.result = [];
        this.d.page.key = null;
        this.d.page.filter = '';
        this.d.page.cur_page = 0;
        this.d.page.cur_key = 0;
        this.d.page.id_loaded = 0;
        this.d.file_key = [];
        this.d.total_article = 0;

        $.getJSON(sip.s.files_path + '?t=' + cardjs.lib.rand(8), function (data) {
            // console.log('files.json:', data);
            if ('files' in data) {
                this.d.files = data.files;
                //console.log('files', this.d.files);
                this.d.file_key = Object.keys(data.files).sort().reverse();
                if (this.d.file_key.length > 0) {
                    this.d.page.key = this.d.file_key[0];
                    var sum = 0;
                    for (var key in this.d.files) {
                        sum += this.d.files[key];
                    }
                    this.d.total_article = sum;
                }
            }
            if ('update' in data) {
                if (data.update in this.d.data) {
                    delete this.d.data[data.update];
                }
            }
            //console.log(this);
        }.bind(this)).always(function () {
            $.getJSON(sip.s.top_art_path + '?t=' + cardjs.lib.rand(8), function (data) {
                for (var i = 0; i < data.length; i++) {
                    this.d.top.push(sip.f.parse_json(data[i]));
                }
            }.bind(this));
        }.bind(this));
    };

    o.load_files();

    return o;
};

sip.db = sip.o.db.article();

sip.o.main.msg = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        settings: {
            key: key,
            header: 'main_mbox',
            add_event: true
        },
        gen_html: function () {
            var content = Mustache.render(cardjs.lib.load_html('tp-mp-msg'), {ids: [this.el(0), this.el(1), this.el(2)]});
            return sip.f.add_frame('tp-frame-tag-card', content, "", 'margin-bottom:8px;margin-top:0px;');
        },

        gen_ev_handler: function () {
            return [
                //enter
                function (e) {
                    //console.log('enter key!');
                    var k = e || window.event;
                    if (k.keyCode !== 13) {
                        return;
                    }
                    this.f.trigger(1);
                },
                //click
                function () {
                    //console.log('click');
                    var d = this.el(0, true).value;
                    //console.log('msg:', d);
                    if (d.length > 0) {
                        this.f.fetch('post_msg', d, function () {
                            var msg = this.f.restore();
                            if (!msg) {
                                msg = [];
                            }
                            msg.unshift({
                                ctime: new Date().toJSON().slice(0, 10),
                                name: 'me',
                                text: filterXSS(d)
                            });
                            while (msg.length > sip.uset.msg_keep) {
                                msg.pop();
                            }
                            this.f.cache(msg);
                            this.refresh();
                        }, function (r) {
                            alert(r);
                        });
                    }
                }
            ];
        },
        add_event: function () {
            this.f.on('click', 1);
            this.f.on('keyup', 0);
        },
        after_add_event: function () {
            this.el(0, true).focus();
            var msg = this.f.restore();
            if (msg && msg.length > 0) {
                //console.log('using cache.');
                this.el(2, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-mp-msg-list'), {msg: msg});
                return;
            }
            $.getJSON(sip.s.msg_path + '?t=' + cardjs.lib.rand(8), function (data) {
                var msg = [];
                data.forEach(function (e) {
                    msg.push({
                        text: filterXSS(e.text),
                        ctime: cardjs.lib.getYMD(e.time),
                        name: filterXSS(e.name)
                    });
                });
                this.f.cache(msg);
            }.bind(this)).fail(function () {
                console.log('留言文件加载失败！');
            }).always(function () {
                if (sip.uset.show_mbox) {
                    var msg = this.f.restore();
                    this.el(2, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-mp-msg-list'), {msg: msg});
                }
            }.bind(this));
        }
    }));

};

sip.o.Main_wrap = function (cid) {

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'main_wrap',
        add_event: true
    });

    o.pager = null;

    o.gen_ev_handler = function () {
        return([
            function () {
                this.el(0, true).className = 'tag-main-active';
                this.el(1, true).className = 'tag-main-normal';
                this.show_main_page();
            },
            function () {
                this.el(0, true).className = 'tag-main-normal';
                this.el(1, true).className = 'tag-main-active';

                this.show_mgr_page();
            }
        ]);
    };

    o.show_main_page = function () {
        //console.log('show_main_page:',this);
        clear_contents();
        o.contents.push(sip.o.main.article_board(o.el(5)).show());
        var cnum = 6;
        o.contents.push(sip.o.main.search_box(o.el(cnum++)).show());
        o.contents.push(sip.o.main.group_view(o.el(cnum++)).show());
        if (sip.uset.show_mbox) {
            this.contents.push(sip.o.main.msg(o.el(cnum++)).show());
        }
    };



    o.show_mgr_page = function () {
        //console.log('show_mgr_page developing');
        //return;
        clear_contents();
        this.contents.push(sip.o.art.art_wrap(this.el(4)).show());
        this.contents.push(sip.o.mgr.user_panel(this.el(6)).show());
    };

    o.add_event = function () {
        o.f.on('click', 0);
        o.f.on('click', 1);
    };

    o.gen_html = function () {
        var ids = [];
        for (var i = 0; i < 10; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-main-wrap'), {ids: ids});
    };

    o.show_pager = function () {
        this.clear_pager();
        this.pager = sip.o.main.pager(this.el(4)).show();
    };

    o.clear_pager = function () {
        this.pager && this.pager.destroy();
        this.pager = null;
        this.el(4, true).innerHTML = '';
    };

    function clear_contents() {

        o.clear_pager();

        if (o.contents && o.contents.length > 0) {
            o.contents.forEach(function (e) {
                //console.log('main:',o);
                //console.log('contents:',e);
                e.destroy();
            });
        }
        o.contents = [];
        for (var i = 4; i < 10; i++) {
            o.el(i, true).innerHTML = '';
        }
    }

    o.reload = function () {
        //console.log('call main_page.refresh()');
        o.f.cache(null, 'um_cur_user_info');
        o.f.cache(null, 'um_all_user_info');
        clear_contents();
        o.show_mgr_page();
    };

    o.update_banner = function (param) {
        var name, desc;

        param = param || {};


        name = param.name;
        desc = param.desc;

        if (name === undefined) {
            name = sip.uset.banner_name;
        }

        if (desc === undefined) {
            desc = sip.uset.banner_desc;
        }


        this.el(2, true).innerHTML = cardjs.lib.html_escape(name);

        this.el(3, true).innerHTML = cardjs.lib.html_escape(desc);


        name = null;
        desc = null;
    };

    o.after_add_event = function () {
        clear_contents();
        o.show_main_page();
        //this.update_banner();
        this.f.event('main_update_banner', this.update_banner);
        this.f.event('main_clear_pager', this.clear_pager);
        this.f.event('main_show_pager', this.show_pager);
    };

    return o;
};

sip.o.art.search_result = function (cid, key) {
    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: 'at_search_result',
        add_event: true
    });

    o.d = {
        id_num: 0,
        num: 0,
        page_num: 0
    };

    o.data_parser = function () {
        this.d.num = 0;
        var cache = this.f.restore();
        //console.log('s_result:',cache);
        if (!cache
                || !cache.content
                || !cache.content.length
                || cache.content.length <= 0) {
            return;
        }

        this.d.num = cache.content.length;
        this.d.page_num = Math.ceil(cache.total / cache.page_size);
        this.d.id_num = 2 + Math.min(this.d.page_num, 9) + this.d.num;
        this.d['first'] = Math.max(cache.pn - 5, 0);
        this.d['last'] = Math.min(this.d['first'] + 9, this.d.page_num);
    };

    o.show_page = function (pn) {
        var cache = this.f.restore();
        if (pn === cache.pn) {
            console.log('same page!');
            return;
        }
        cache.pn = pn;
        this.f.cache(cache);
        this.f.fetch('search', {'kw': cache.current_kw, 'pn': pn, 'get_total': false, 'page_size': cache.page_size},
                function (data) {
                    var cache = this.f.restore();
                    cache.content = data.data;
                    this.refresh();
                });
    };

    o.gen_ev_handler = function () {
        var evs = [];
        if (this.d.num <= 0) {
            return evs;
        }
        evs[0] = function () {
            this.show_page(0);
        };
        evs[1 + this.d.last - this.d.first] = function () {
            this.show_page(this.d.page_num - 1);
        };
        var i;
        for (i = 1; i < this.d.last - this.d.first + 1; i++) {
            evs[i] = (function () {
                var idx = i - 1;
                return function () {
                    this.show_page(idx);
                }.bind(this);
            }.bind(this)());
        }
        var start, end;
        start = this.d.last - this.d.first + 2;
        end = this.d.id_num;
        var cache = this.f.restore();
        for (i = start; i < end; i++) {
            evs[i] = (function () {
                var s = start, e = end, idx = i;
                //console.log(sip.cache.search.content);
                var id = (cache.content[i - s].id);
                return(function () {
                    for (var i = s; i < e; i++) {
                        this.el(i, true).style.backgroundColor = '';
                    }
                    this.f.cache(id, 'art_select_id');
                    //sip.cache.article.selected_id = id;
                    //console.log('select id=' + id);
                    this.el(idx, true).style.backgroundColor = 'lightsalmon';
                }.bind(this));
            }.bind(this)());
        }
        return evs;
    };

    o.add_event = function () {
        if (this.d.num <= 0) {
            return;
        }
        for (var i = 0; i < this.d.id_num; i++) {
            this.f.on('click', i);
        }
    };

    o.after_add_event = function () {
        //console.log('fire');
        if (this.d.num > 0) {
            var cache = this.f.restore();
            var idx = cache.pn - this.d.first + 1;
            this.el(idx).className = "btn btn-sm btn-info";
        }
    };

    o.gen_html = function () {
        if (this.d.num <= 0) {
            return('无数据');
        }
        var i;
        var m = this.d.last - this.d.first + 2;
        this.d.btn = [];
        for (i = 0; i < m; i++) {
            this.d.btn.push({id: this.el(i), value: this.d.first + i});
        }
        this.d.btn[0]['value'] = '首页';
        this.d.btn[m - 1]['value'] = '尾页';

        this.d.tb = [];
        var c;
        var cache = this.f.restore();
        for (; i < this.d.id_num; i++) {
            c = cache.content[i - m];
            this.d.tb.push({
                oid: this.el(i),
                title: filterXSS(c.title),
                ctime: cardjs.lib.getYMD(c.ctime),
                time: cardjs.lib.getYMD(c.mtime),
                author: filterXSS(c.name),
                type: (c.type < sip.uset.atypes.length) ? sip.uset.atypes[c.type] : '无',
                top: c.top === 0 ? false : true,
                lock: c.lock === 0 ? false : true
            });
        }
        return (Mustache.render(cardjs.lib.load_html('tp-uma-search-result'), this.d));
    };

    return o;
};

sip.o.art.list_orphan_img = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'uma_loi',
        add_event: true
    });

    o.data = [];


    o.gen_ev_handler = function () {
        return [
            function () {
                //console.log('click1');
                this.f.fetch('list_orphan_img', function (data) {
                    this.data = [];
                    data.forEach(function (e) {
                        this.data.push({
                            'atid': e.atid,
                            'uptime': cardjs.lib.getYMD(e.uptime),
                            'deltime': cardjs.lib.getYMD(e.deltime),
                            'path': e.path && e.path.substr(3, e.path.length)
                        });
                    });
                    this.refresh();
                    if (this.data.length === 0) {
                        alert('没有孤儿图片');
                    }
                });
            },
            function () {
                //console.log('click1');
                if (confirm('删除所有孤儿图片？')) {
                    this.f.fetch('delete_all_orphan_img', function (r) {
                        alert(r);
                        this.f.trigger(0);
                        //this.el(0,true).click();
                    }, function (r) {
                        alert(r);
                        this.f.trigger(0);
                        //this.el(0,true).click();
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 0);
        this.f.on('click', 1);
    };

    o.gen_html = function () {
        this.ids = [this.el(0), this.el(1)];
        return Mustache.render(cardjs.lib.load_html('tp-uma-loi'), this);
    };

    return o;

};

sip.o.art.editor = function (cid) {

    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: 'art_edt',
        add_event: true
    });

    o.article_type = [[0, '无']];

    if (sip.uset.atypes) {
        o.article_type = [];
        sip.uset.atypes.forEach(function (e, i) {
            o.article_type.push([i, e]);
        });
    }

    o.data_parser = function () {
        this.editor && this.editor.destroy();
        this.editor = null;
    };

    o.gen_ev_handler = function () {
        return {
            'commit': function () {
                var content = this.editor.$txt.html();
                var cache = this.f.restore();
                var data = {
                    'title': cardjs.lib.utf8_to_base64(this.el(0, true).value),
                    'content': cardjs.lib.utf8_to_base64(content),
                    'type': this.el(2, true).options[this.el(2, true).selectedIndex].value,
                    'id': cache.cache_id,
                    'top': this.el(10, true).checked ? 1 : 0,
                    'lock': this.el(9, true).checked ? 1 : 0

                };
                //console.log(content);
                if (!confirm('确定提交？')) {
                    return;
                }

                this.f.clear_cache('update_article');

                cardjs.lib.url_set_params('index.html');

                this.el(5, true).innerHTML = '正在提交数据 ...';
                o.f.fetch('post_article', data, function () {
                    alert('提交成功!');
                    this.f.trigger('new');
                    sip.db.load_files();
                }, function (r) {
                    this.el(5, true).innerHTML = '提交失败！';
                    alert(r + '\n提交失败！');
                });
            },
            'new': function () {
                var cache = this.f.restore() || {};
                cache.cache_id = null;
                this.f.cache(0, 'art_select_id');
                cache.title = null;
                cache.html = null;
                cache.top = false;
                cache.lock = false;
                this.f.cache(cache);
                this.el(9, true).checked = false;
                this.el(10, true).checked = false;
                this.el(0, true).value = '';
                this.el(2, true).options[0].selected = true;
                o.editor.$txt.html('<p><br></p>');
                this.el(5, true).innerHTML = "新文章";
                this.f.clear_cache('clear_art_board');
                cardjs.lib.url_set_params('index.html');
            },
            'del': function () {
                var cache = this.f.restore();

                if (!cache || !(cache.cache_id > 0)) {
                    this.f.trigger('new');
                    return;
                }

                if (!confirm("确定删除文章？")) {
                    return;
                }

                this.f.clear_cache('update_article');

                cardjs.lib.url_set_params('index.html');

                o.f.fetch('delete_article', cache.cache_id,
                        function () {
                            alert('删除成功！');
                            this.f.trigger('new');
                            sip.db.load_files();
                        }, false, function (r) {
                    alert(r);
                });
            },
            'pop': function () {
                if (this.el(8, true).style.display === 'block') {
                    this.el(8, true).style.display = 'none';
                } else {
                    var pos = cardjs.lib.get_DOM_offset(this.el(1, true));
                    this.el(8, true).style.left = (pos.left - 8 - parseInt(this.el(8, true).style.width)) + "px";
                    this.el(8, true).style.top = (pos.top - 8 - parseInt(this.el(8, true).style.height)) + "px";
                    this.el(8, true).style.display = 'block';
                }
            }

        };
    };

    o.add_event = function () {
        this.f.on('click', 3, 'commit');
        this.f.on('click', 4, 'new');
        this.f.on('click', 6, 'del');
        this.f.on('click', 7, 'pop');
    };

    o.gen_html = function () {
        this.ids = [];
        for (var i = 0; i < 11; i++) {
            this.ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-uma-editor'), this);
    };

    o.after_add_event = function () {
        this.editor && this.editor.destroy();
        this.editor = new wangEditor(o.ids[1]);
        if (sip.uset.upload) {
            this.editor.config.uploadImgUrl = "./php/upload.php";
            this.editor.config.uploadImgFileName = 'upload';
        }
        this.editor.create();

        //console.log(sip.cache.article);

        //读取缓存
        var sid, cid, uid, cache;

        cache = this.f.restore() || {
            cache_id: 0
        };

        cid = cache.cache_id;
        sid = this.f.restore('art_select_id') || 0;

        uid = parseInt(cardjs.lib.url_get_param('id'));
        if (!sid && uid > 0) {
            sid = uid;
        }

        if (cache.html && cache.html.length > 0) {
            if (cid === sid || !(sid)) {
                //console.log('load_cache');
                this.load_cache();
                return;
            }
        }

        if (sid > 0) {
            this.editor.$txt.html('读取数据中 ...');
            this.f.fetch('fetch_article', {'id': sid}, function (data) {
                //$this->ok(array('id'=>$id,'type'=>$type,'title'=>$title,'content'=>$content));

                var cache = this.f.restore() || {};
                cache.cache_id = data.id;
                cache.title = cardjs.lib.base64_to_utf8(data.title);
                cache.html = cardjs.lib.base64_to_utf8(data.content);
                cache.type = data.type;
                cache.lock = !(data.lock === 0);
                cache.top = !(data.top === 0);

                this.f.cache(cache);
                //console.log('editor fetch (data,cache):',data,cache);
                //console.log('loadhtml', sip.cache.article.html);
                this.load_cache();
            }, false, function (r) {
                this.editor.$txt.html('<font color="red">' + r + '</font>');
            });
        } else {
            this.f.trigger('new');
            //this.el(4,true).click();
        }
    };

    o.save_cache = function () {
        //console.log('save_cache');
        var cache = this.f.restore();
        cache.title = this.el(0, true).value;
        cache.type = this.el(2, true).selectedIndex;
        if (this.editor) {
            cache.html = this.editor.$txt.html();
        }
        cache.lock = this.el(9, true).checked;
        cache.top = this.el(10, true).checked;
        this.f.cache(cache);
        // console.log(sip.cache.article);
    };

    o.load_cache = function () {
        //console.log('load_cache');
        var cache = this.f.restore();
        if (cache && cache.html) {
            this.el(0, true).value = filterXSS(cache.title);
            var type_no = 0;
            if (cache.type < sip.uset.atypes.length) {
                type_no = cache.type;
            }
            this.el(2, true).options[type_no].selected = true;
            this.editor.$txt.html(filterXSS(cache.html));
            this.el(9, true).checked = cache.lock;
            this.el(10, true).checked = cache.top;
            var cid = cache.cache_id;
            if (cid) {
                this.el(5, true).innerHTML = "修改文章： #" + cid;
            } else {
                this.el(5, true).innerHTML = "新文章";
            }
        }
    };

    o.clean_up = function () {
        if (this.editor) {
            this.save_cache();
            this.editor.destroy();
            this.editor = null;
        }
    };

    return o;

};

sip.o.art.types = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_types',
        add_event: true
    });

    o.gen_ev_handler = function () {

        return [
            //click submit
            function () {
                var types = [];
                var els = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < els.length; i++) {
                    var t = els[i].value.trim();

                    if (t.length > 0) {
                        types.push(t);
                    }
                }
                els = null;
                //console.log(types);
                sip.uset.atypes = types;
                types = null;
                o.f.fetch('update_uset', sip.uset, function () {
                    alert('分类信息修改成功！');
                    this.refresh();
                });
            },
            //key  up enter
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                var types = [];
                var els = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < els.length; i++) {
                    var t = els[i].value.trim();
                    //console.log(t,els[i]);
                    if (t.length > 0) {
                        types.push(t);
                    }
                }
                els = null;
                //console.log(types);
                sip.uset.atypes = types;
                types = null;
                this.refresh();
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 2, 0);
        this.f.on('keyup', 1);
    };

    o.gen_html = function () {
        var d = {
            name: this.el(0),
            new_type: this.el(1),
            btn_sumit: this.el(2),
            data: sip.uset.atypes,
            index: function () {
                return ++window['INDEX'] || (window['INDEX'] = 0);
            },
            resetIndex: function () {
                window['INDEX'] = -1;
                return;
            }
        };
        // create data view
        var content = Mustache.render(cardjs.lib.load_html('tp-uma-atypes'), d);
        return sip.f.add_frame('tp-frame-tag-card', content, '分类管理');
    };

    o.after_add_event = function () {
        // console.log(focus);
        this.el(1, true).focus();
    };
    return o;

};

sip.o.art.art_wrap = function (cid) {
    return(cardjs.create({
        cid: cid,
        type: 'panel',
        pages: {
            '编辑': [sip.o.art.editor],
            '搜索': [sip.o.art.search_box],
            '图片管理': [sip.o.art.list_orphan_img],
            '设置': [sip.o.art.set_wrap],
            '备份': [sip.o.art.backup],
            '说明': [sip.o.art.help]
        },
        style: {
            'tags': ' ',
            'tag_active': 'tag-active',
            'tag_normal': 'tag-normal',
            'page': 'page',
            'card': ' '
        }
    }));
};

sip.o.mgr.logout = function (cid, parent_update, key) {
    return(cardjs.create({
        cid: cid,
        update: parent_update,
        child: null,
        settings: {
            key: key,
            header: 'mgr_logout',
            add_event: true
        },
        gen_html: function () {
            var info = this.f.restore();
            var content = Mustache.render(cardjs.lib.load_html('tp-um-logout'), {
                ids: [this.el(0), this.el(1), this.el(2)],
                name: info.name
            });
            return sip.f.add_frame('tp-frame-tag-card', content, '', 'margin-bottom:8px;');
        },
        clean_up: function () {
            this.child && this.child.destroy();
        },
        add_event: function () {
            this.f.on('click', 0);
            this.f.on('click', 1);
        },
        gen_ev_handler: function () {
            return [
                //change password
                function () {
                    this.child = sip.o.mgr.change_psw(this.el(2), this.update).show();
                },
                // logout
                function () {
                    this.f.clear_cache('clear_all_user_data');
                    this.f.fetch('logout', function (r) {
                        console.log(r);
                        this.update();
                    });
                }
            ];
        }
    }));
};

sip.o.mgr.change_psw = function (cid, parent_update) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'mgr_chpsw',
        add_event: true
    });

    o.update = parent_update;

    o.gen_html = function () {
        var id = [];
        for (var i = 0; i < 6; i++) {
            id.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-um-change-password'), {ids: id});
        //return sip.f.add_frame('tp-frame-tag-card', content, '修改信息', 'margin-top:8px;');
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                //console.log('hello');
                var name = "" + this.el(0, true).value;
                var org_psw = "" + this.el(1, true).value;
                var new_psw = "" + this.el(2, true).value;
                var re_psw = "" + this.el(3, true).value;

                if (new_psw !== re_psw) {
                    this.el(5, true).innerHTML = '两次输出密码不同！';
                    return;
                }

                if (new_psw.length <= 0 || org_psw.length <= 0) {
                    this.el(5, true).innerHTML = '内容过短！';
                    return;
                }
                // console.log(new_psw, org_psw, name);
                var data = {'name': name, 'opsw': md5(org_psw), 'npsw': md5(new_psw)};
                this.f.fetch('user_modify', data, function (r) {
                    this.el(5, true).innerHTML = cardjs.lib.html_escape(r);
                    o.update();
                }, false, function (r) {
                    this.el(5, true).innerHTML = cardjs.lib.html_escape(r);
                });
            }
        ];
    };

    o.add_event = function () {
        //console.log(o.ids[4]);
        this.f.on('click', 4, 0);
        //o.f.on('click',1,0);
    };

    return o;

};

sip.o.mgr.user_mgr_wrap = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        child: null,
        settings: {
            header: 'mgr_umgr_wrap',
            key: key
        },
        gen_html: function () {
            var html = '<div id="' + this.el(0) + '">正在读取数据 ...</div>';
            return sip.f.add_frame('tp-frame-tag-card', html, '账号管理');
        },
        update: function () {
            this.el(0, true).innerHTML = '更新数据中 ... ';
            this.f.cache(null);
            this.after_add_event();
        },
        after_add_event: function () {
            this.f.clear_cache('clear_all_user_data', true);
            this.clean_up();
            var cache = this.f.restore();
            if (cache) {
                this.child = sip.o.mgr.user_mgr(this.el(0), key, this.update.bind(this)).show();
                return;
            }
            this.f.fetch('fetch_all_user_info', function (data) {
                this.f.cache(data);
                this.child = sip.o.mgr.user_mgr(this.el(0), key, this.update.bind(this)).show();
            });
        },
        clean_up: function () {
            this.child && this.child.destroy();
            //this.f.cache(null);
        }
    }));
};

sip.o.mgr.user_mgr = function (cid, key, parent_update) {

    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: "um_manage",
        add_event: true
    });

    o.update = parent_update;

    o.after_add_event = function () {
        o.f.trigger(0);
    };

    o.gen_ev_handler = function () {
        return [
            // select change
            function () {
                var id = this.el(0, true).value,
                        uinfo = this.f.restore();

                this.el(1, true).value = cardjs.lib.html_escape(uinfo.name_list[id]);
                this.el(8, true).value = cardjs.lib.html_escape(uinfo.user_list[id]);
                if (uinfo.ban_list[id]) {
                    this.el(8, true).style.backgroundColor = 'lightgray';
                } else {
                    this.el(8, true).style.backgroundColor = 'transparent';
                }
                var pv = cardjs.lib.get_elsbyname(this.el(3));
                for (var i = 0; i < pv.length; i++) {
                    pv[i].checked = uinfo.user_prv[id][uinfo.prv_list[i]];
                }
            },
            // reset psw
            function () {
                var id = this.el(0, true).value;
                o.f.fetch('user_reset', id, function (d) {
                    //console.log(d);
                    alert(d);
                    this.update();
                }, function (r) {
                    alert(r);
                });
            },
            //ban
            function () {
                var id = this.el(0, true).value;
                o.f.fetch('user_ban', id, function (d) {
                    alert(d);

                    this.update();
                }, function (r) {
                    alert(r);
                });
            },
            //modify user
            function () {
                var cache = this.f.restore();
                var id = this.el(0, true).value,
                        name = this.el(1, true).value,
                        user = this.el(8, true).value,
                        pv = cardjs.lib.get_elsbyname(this.el(3)),
                        p = [];
                for (var i = 0; i < pv.length; i++) {
                    if (pv[i].checked) {
                        p.push(cache.prv_list[i]);
                    }
                }
                o.f.fetch('user_management', {'id': id, 'name': name, 'user': user, 'prv_list': p},
                        function (r) {
                            alert(r);
                            this.update();
                        }, function (r) {
                    alert(r);
                });
                //console.log(p);
            },
            // add user
            function () {
                var param = {
                    user: this.el(8, true).value,
                    name: this.el(1, true).value,
                    prv: []
                };
                var cache = this.f.restore();
                var pv = cardjs.lib.get_elsbyname(this.el(3));
                for (var i = 0; i < pv.length; i++) {
                    if (pv[i].checked) {
                        param.prv.push(cache.prv_list[i]);
                    }
                }
                //console.log(param);
                this.f.fetch('user_add', param, function (r) {
                    alert(r);
                    this.update();
                }, function (r) {
                    alert(r);
                });
            }
        ];
    };

    o.add_event = function () {
        o.f.on('change', 0);
        o.f.on('click', 5, 1);
        o.f.on('click', 6, 2);
        o.f.on('click', 4, 3);
        o.f.on('click', 7, 4);
    };

    o.gen_html = function () {
        var cache = this.f.restore();
        cache.ids = [];
        for (var i = 0; i < 9; i++) {
            cache.ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html("tp-um-modify"), cache);
    };

    return o;
};

sip.o.art.set_wrap = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_set_wrap'
    });
    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-set-wrap'), {
            ids: [
                this.el(0),
                this.el(1),
                this.el(2)
            ]});
    };
    o.child = [];
    o.after_add_event = function () {
        o.child.push(sip.o.art.types(this.el(0)).show());
        o.child.push(sip.o.art.set_main_page(this.el(1)).show());
        o.child.push(sip.o.art.set_banner(this.el(2)).show());
    };
    o.clean_up = function () {
        o.child.forEach(function (e) {
            e && e.destroy();
        });
        o.child = [];
    };
    return o;

};

sip.o.art.set_banner = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: "uma_set_banner",
        add_event: true
    });

    o.gen_html = function () {
        var data = {
            fn_label: this.fn_label,
            ids: [this.el(0), this.el(1), this.el(2)]
        };
        var content = Mustache.render(cardjs.lib.load_html("tp-uma-set-banner"), data);
        return sip.f.add_frame('tp-frame-tag-card', content, '横幅栏');
    };

    o.after_add_event = function () {
        var name = sip.uset['banner_name'];
        var desc = sip.uset['banner_desc'];
        if (name && name.length > 0) {
            this.el(0, true).value = name;
        }
        if (desc && desc.length > 0) {
            this.el(1, true).value = desc;
        }
        name = null;
        desc = null;
    };

    o.gen_ev_handler = function () {
        return {
            'commit': function () {
                if (!confirm('确定提交修改?')) {
                    return;
                }
                sip.uset['banner_name'] = this.el(0, true).value;
                sip.uset['banner_desc'] = this.el(1, true).value;
                this.f.fetch('update_uset', sip.uset, function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
                this.f.event('main_update_banner');
            },
            'update_banner': function () {
                this.f.event('main_update_banner', {
                    name: this.el(0, true).value,
                    desc: this.el(1, true).value
                });
            }

        };
    };

    o.add_event = function () {
        this.f.on('click', 2, 'commit');
        this.f.on('keyup', 1, 'update_banner');
        this.f.on('keyup', 0, 'update_banner');
    };

    o.clean_up = function () {
        this.f.event('main_update_banner');
    };

    return o;

};

sip.o.art.set_main_page = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: "uma_uset",
        add_event: true
    });

    o.fn_label = ['主页显示留言', '上传本地图片'];
    o.fn_name = ['show_mbox', 'upload'];

    o.gen_html = function () {
        var data = {
            fn_label: this.fn_label,
            ids: [this.el(0), this.el(1)]
        };
        var content = Mustache.render(cardjs.lib.load_html('tp-uma-settings'), data);
        return sip.f.add_frame('tp-frame-tag-card', content, '界面设置');
    };

    o.after_add_event = function () {
        var uset = cardjs.lib.get_elsbyname(this.el(0));
        for (var i = 0; i < o.fn_name.length; i++) {
            uset[i].checked = sip.uset[o.fn_name[i]];
        }
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                var uset = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < this.fn_name.length; i++) {
                    sip.uset[this.fn_name[i]] = uset[i].checked;
                }
                //console.log(sip.uset);
                this.f.fetch('set_upload_support', sip.uset.upload ? 1 : 0);
                this.f.fetch('update_uset', sip.uset, function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 1, 0);
    };

    return o;

};

sip.o.art.help = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'at_help'
    });

    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-help'));
    };

    return o;

};

sip.o.art.search_box = function (cid) {

    var key = cardjs.lib.gen_key();

    return(cardjs.create({
        cid: cid,
        child: null,
        settings: {
            header: 'main_search_box',
            add_event: true,
            key: key
        },
        gen_html: function () {
            return Mustache.render(cardjs.lib.load_html('tp-uma-search-box'), {ids: [this.el(0), this.el(1), this.el(2)]});
        },
        gen_ev_handler: function () {
            return [
                function () {
                    //console.log('fire');
                    var cache = this.f.restore();

                    var kw = this.el(0, true).value;

                    if (!cache
                            || kw !== cache.cache_kw
                            || !cache.content
                            || cache.content.length === 0) {
                        if (!cache) {
                            cache = {
                                'page_size': 15,
                                'total': -1,
                                'cache_kw': '',
                                'content': null
                            };
                        }
                        cache['current_kw'] = kw,
                                cache.pn = 0;
                        this.clean_up();
                        this.f.cache(cache);

                        this.el(2, true).innerHTML = "搜索中 ...";
                        this.f.fetch('search', {'kw': kw, 'pn': 0, 'get_total': true, 'page_size': cache.page_size},
                                function (data) {
                                    var cache = this.f.restore();
                                    cache.cache_kw = kw;
                                    cache.total = data.total;
                                    cache.content = data.data;
                                    this.f.cache(cache);

                                    //console.log(data);
                                    this.child = sip.o.art.search_result(this.el(2), this.settings.key).show();
                                },
                                function () {
                                    this.el(2, true).innerHTML = "此功能登录后才可使用";
                                    //console.log(r);
                                }, false);
                    } else {
                        console.log('using cache!');
                        if (!this.child) {
                            this.child = sip.o.art.search_result(this.el(2), this.settings.key).show();
                        }
                    }
                },
                function (e) {
                    var k = e || window.event;
                    if (k.keyCode === 13) {
                        //console.log('fire');
                        this.f.trigger(0);
                    }
                }
            ];
        },
        after_add_event: function () {
            // clear_cache: {msbox/asearch/mboard} 相应键为true时清空缓存。
            this.f.clear_cache('update_article', true);

            var cache = this.f.restore();
            this.el(0, true).focus();

            if (!this.child && cache && cache.content
                    && cache.content.length > 0) {
                this.el(0, true).value = cache.cache_kw;
                cache.current_kw = cache.cache_kw;
                this.chile = sip.o.art.search_result(this.el(2), this.settings.key).show();
            }

        },
        clean_up: function () {
            this.child && this.child.destroy();
        },
        add_event: function () {
            //console.log('add event');
            this.f.on('keyup', 0, 1);
            this.f.on('click', 1, 0);
        }
    }));
};

sip.o.AAChild = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        settings: {
            key: key
        },
        func1_child: function (p) {
            console.log('call child func1(' + p + ')');
        },
        func2_child: function (p) {
            console.log('call child func2(' + p + ')');
        },
        gen_html: function () {
            return 'child';
        },
        after_add_event: function () {
            this.f.event('hello', this.func1_child);
            this.f.event('world', this.func2_child);
        },
        clean_up: function () {
            this.self.innerHTML = '';
            //this.f.event('hello', this.func_child, false);
        }
    }));
};

sip.o.AATest = function (cid) {
    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);
    o.f.merge({
        key: key,
        header: 'test',
        add_event: true
    });

    o.func1 = function () {
        console.log('call parent func1:', this.settings.key);
    };

    o.child = null;
    o.gen_ev_handler = function () {
        return {
            't1': function () {
                //sip.db.load_last_six_month();
            },
            't2': function () {
                console.log('click t2');
                console.log(sip.db);
            }
        };
    };

    o.add_event = function () {
        o.f.on('click', 't1');
        o.f.on('click', 't2');
    };

    o.gen_html = function () {
        var html = '<div style="margin:10px;">' +
                '<input type="button" id="' + this.el('t1') + '" class="btn btn-info" value="t1">' +
                '<input type="button" id="' + this.el('t2') + '" class="btn btn-info" value="t2">' +
                '<div id="' + this.el('child') + '"></div>' +
                '</div>';
        return html;
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
        o.child = null;
    };


    return o;

};

sip.o.mgr.login = function (cid, parent_update) {
    return (cardjs.create({
        cid: cid,
        update: parent_update,
        settings: {
            header: 'mgr_login',
            add_event: true
        },
        gen_html: function () {
            var id = [];
            for (var i = 0; i < 5; i++) {
                id.push(this.el(i));
            }
            var content = Mustache.render(cardjs.lib.load_html('tp-um-login'), {ids: id});
            return(sip.f.add_frame('tp-frame-tag-card', content, "登录", "margin-bottom:8px;"));
        },
        add_event: function () {
            this.f.on('click', 2, 1);
            this.f.on('click', 3, 0);
            this.f.on('keyup', 1, 2);
        },
        gen_ev_handler: function () {
            return [
                function () {
                    this.el(0, true).value = '';
                    this.el(1, true).value = '';
                },
                function () {
                    var user_info = {
                        user: this.el(0, true).value,
                        psw: md5(this.el(1, true).value)
                    };
                    //console.log(user_info);
                    this.f.fetch('login', user_info,
                            function () {
                                //console.log('parent_update');
                                this.update();
                            },
                            function (d) {
                                this.el(4, true).innerHTML = d;
                            });
                },
                function (e) {
                    var k = e || window.event;
                    if (k.keyCode === 13) {
                        this.f.trigger(1);
                    }
                }
            ];
        }
    }));
};

sip.o.main.match_list = function (cid) {

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'match_list'
    });

    o.data_parser = function () {
        o.count = 0;
        o.settings.add_event = false;
        if (sip.db.d.search.result.length > 0) {
            o.count = sip.db.d.search.result.length;
            if (o.count > 0) {
                o.settings.add_event = true;
            }
        }
    };


    o.show_article = function (idx) {
        if (idx < 0 || idx >= sip.db.d.search.result.length) {
            console.log('Error: index out of range!');
            return;
        }
        var cache = sip.db.d.search.result;
        this.f.event('main_article_board_update', cache[idx].data);
        cardjs.lib.url_set_params('index.html', {key: cache[idx].key, id: cache[idx].id});
        this.f.cache(cache[idx].id, 'art_select_id');
        cache = null;
    };

    o.gen_ev_handler = function () {
        var cache = sip.db.d.search.result;
        if (cache.length <= 0) {
            cache = null;
            return [];
        }
        var evs = [];
        for (var i = 0; i < cache.length; i++) {
            evs.push((function () {
                var idx = i;
                return(function () {
                    //console.log('idx:', idx, ' fire!');
                    this.show_article(idx);
                }.bind(o));
            })());
        }
        return evs;
    };

    o.add_event = function () {
        for (var i = 0; i < sip.db.d.search.result.length; i++) {
            this.f.on('click', i);
        }
    };

    o.gen_html = function () {

        var cache = sip.db.d.search.result;
        if (cache.length <= 0) {
            cache = null;
            return('<font color="red">没有找到相应数据</font>');
        }
        var data = [];
        for (var i = 0; i < cache.length; i++) {
            data.push({
                id: this.el(i),
                title: cache[i].title
            });
        }
        //console.log(data);
        cache = null;
        return Mustache.render(cardjs.lib.load_html('tp-art-list'), {d: data});
    };

    return o;

};

sip.o.mgr.user_panel = function (cid) {
    var key = cardjs.lib.gen_key();
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'user_panel',
        //add_event: true,
        key: key
    });

    o.children = [];

    o.gen_html = function () {
        var html = '';
        for (var i = 0; i < 4; i++) {
            html += '<div id="' + this.el(i) + '"></div>';
        }
        return html;
    };

    o.gen_ev_handler = function () {
        return ([]);
    };

    o.update = function () {
        //console.log('user_panel: update()');
        this.clean_up();
        for (var i = 0; i < this.el(); i++) {
            this.el(i, true).innerHTML = '';
        }
        this.f.cache(null);
        this.after_add_event();
    }.bind(o);

    o.show_user_panel = function () {
        //console.log('developing: show_user_panel ');
        var info = this.f.restore();
        //console.log('info:', info);
        var current_id = 0;
        if (info && info.login) {
            //window.setTimeout(function () {
            //this.el(current_id++, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-um-welcome'), info);
            //}.bind(this), 0);
            this.children.push(sip.o.mgr.logout(o.el(current_id++), o.update, this.settings.key).show());

            if (info.prv['USERM']) {
                this.children.push(sip.o.mgr.user_mgr_wrap(o.el(current_id++)).show());
            }

        } else {
            this.children.push(sip.o.mgr.login(o.el(current_id++), o.update).show());
        }
    };

    o.after_add_event = function () {

        var cache = this.f.restore();

        if (cache) {
            this.show_user_panel();
            return;
        }

        //console.log('fetch user info.');
        this.f.fetch('fetch_user_info', null, function (info) {
            this.f.cache(info);
            this.show_user_panel();
        });
    };

    o.clean_up = function () {
        o.children.forEach(function (e) {
            e && e.destroy();
        });
        o.children = [];
    };

    return o;
};

sip.o.main.group_view = function (cid) {

    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'gview',
        key: key
    });

    o.data = null;

    o.data_parser = function () {
        this.settings.add_event = false;

        if (this.data && this.data.length > 0) {
            this.settings.add_event = true;
        }

    };

    o.gen_html = function () {
        var content = '<div style="color:red;">无数据</div>';
        if (this.data && this.data.length > 0) {
            var i, tag = [], cat = [], j, types;
            for (i = 0; i < this.data.length; i++) {
                tag.unshift({v: this.data[i], id: this.el(i)});
            }
            types = sip.uset.atypes;
            cat.push({v: '全部', id: this.el(i)});
            for (j = 0; j < types.length; j++) {
                cat.push({v: types[j], id: this.el(j + i + 1)});
            }
            types = null;
            content = Mustache.render(cardjs.lib.load_html('tp-group-view'), {tag: tag, cat: cat, all: this.el(j + i + 1)});
            tag = null;
        }
        return(sip.f.add_frame('tp-frame-tag-card', content, '分类浏览', 'margin-bottom:8px;'));
    };

    o.set_btn_bgcolor = function () {
        var i;
        for(i=0;i<this.el();i++){
            this.el(i,true).style.backgroundColor='white';
        }
        for (i = 0; i < this.data.length; i++) {
            if (this.el(i, true).value === sip.db.d.page.key) {
                this.el(i, true).style.backgroundColor = 'skyblue';
            }
        }
        for (; i < this.el()-1; i++) {
            if (this.el(i, true).value === sip.db.d.page.filter) {
                this.el(i, true).style.backgroundColor = 'skyblue';
            }
        }
    };

    o.gen_ev_handler = function () {
        var evs = [], i, j, id, last = this.el();

        for (i = 0; i < this.data.length; i++) {
            var value = this.data[i];
            evs.push((function () {
                var v = value;
                return (function () {
                    //console.log(this);
                    sip.db.set('page_key', v);
                    this.set_btn_bgcolor();
                }.bind(this));
            }.bind(this)()));
        }
        evs.push((function () {
            var v = '全部';   
            return(function () {
                //console.log('clicked:', v);
                sip.db.set('filter', v);
                this.set_btn_bgcolor();
            }.bind(this));
        }.bind(this)()));

        for (j = 0; j < sip.uset.atypes.length; j++) {
            var value = sip.uset.atypes[j];
            evs.push((function () {
                var v = value;
                return(function () {
                    //console.log('clicked:', v);
                    sip.db.set('filter', v);
                    this.set_btn_bgcolor();
                });
            }.bind(this)()));
        }
        evs.push((function () {
            //console.log('clicked: all article');
            for (var k = 0; k < this.el(); k++) {
                this.el(k, true).style.backgroundColor = 'white';
            }
            this.el(this.el()-1, true).style.backgroundColor = 'skyblue';
            this.f.event('main_show_pager');
        }.bind(this)));

        return evs;
    };

    o.add_event = function () {
        for (var i = 0; i < this.el(); i++) {
            this.f.on('click', i);
        }
    };

    o.after_add_event = function () {
        if (this.data) {
            return;
        }
        this.data = Object.keys(sip.db.get('files'));
        this.f.cache(this.data);
        this.refresh();
    };

    return o;
};

sip.o.main.article_board = function (cid) {

    var key = cardjs.lib.gen_key();
    /* cache={
     *      data: [{id: 1, content: string, ... }, ... ]
     * };
     */

    function get_url_keyid() {
        var y = null, m = null,
                key = cardjs.lib.url_get_param('key'),
                id = parseInt(cardjs.lib.url_get_param('id'));
        if (key.length > 4) {
            y = key.substr(0, 4);
            m = key.substr(4);
        }
        return({y: y, m: m, id: id});
    }

    return (cardjs.create({
        cid: cid,
        settings: {
            key: key,
            header: 'main_art_brd'
        },
        gen_html: function () {
            return '<div id="' + this.el(0) + '"></div>';
        },
        update: function (data) {
            if (data === undefined || data.length === 0) {
                data = null;
            }
            //console.log('call main_art_board_update:', data);
            this.f.cache(data);
            if (!data) {
                this.el(0, true).innerHTML = "<font color=red>没有数据</font>";
                return;
            }
            if (cardjs.lib.isArray(data)) {
                this.el(0, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-article-summary-container'), {
                    recent: data,
                    style: 'article-summary'
                });
            } else {
                this.f.event('main_clear_pager');
                this.el(0, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-article-summary-container'), {
                    recent: data,
                    style: 'article-all-content'
                });
            }
        },
        after_add_event: function () {
            // regist a clear_cache event for other module clear this cache;
            this.f.clear_cache('update_article', true);
            this.f.clear_cache('clear_art_board', true);

            //export a function for other module
            this.f.event('main_article_board_update', this.update, true);

            var cache = this.f.restore();
            if (cache) {
                this.update(cache);
                return;
            }
            var param = get_url_keyid();
            if (param.y && param.m && param.id) {
                $.getJSON('upload/json/' + param.y + '/' + param.m + '.json', function (data) {
                    //console.log(data,tid);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === param.id) {
                            this.update(sip.f.parse_json(data[i]));
                            return;
                        }
                    }
                    this.update(null);
                }.bind(this));
                return;
            }
            // no cache, no url params 
            $.getJSON(sip.s.top_art_path + '?t=' + cardjs.lib.rand(8), function (data) {
                var d = [];
                data.forEach(function (e) {
                    d.push(sip.f.parse_json(e));
                });
                if (!this.self) {
                    console.log('sip.o.main.article_board: Object 已经销毁,取消更新操作');
                    return;
                }
                if (d.length > 0) {
                    this.update(d);
                } else {
                    this.update(null);
                }
            }.bind(this)).fail(function () {
                this.el(0, true).innerHTML = "<font color=red>获取数据失败</font>";
            }.bind(this));
        }
    }));
};

sip.o.main.search_box = function (cid) {

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'main_sbox',
        add_event: true
    });

    o.child = null;

    o.gen_ev_handler = function () {
        return [
            //keyup
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                this.f.trigger(1);
                //this.el(1,true).click();
            },
            // click
            function () {
                var kw = this.el(0, true).value;
                sip.db.search(kw);
            }
        ];
    };

    o.show_search_result = function () {
        this.clean_up();
        this.child = sip.o.main.match_list(this.el(2)).show();
    };

    o.after_add_event = function () {
        this.f.event('show_main_search_result', this.show_search_result);
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
    };

    o.gen_html = function () {
        var id = [];
        for (var i = 0; i < 3; i++) {
            id.push(this.el(i));
        }
        var content = Mustache.render(cardjs.lib.load_html('tp-art-search-box'), {ids: id});
        return sip.f.add_frame('tp-frame-tag-card', content, '', 'margin-bottom:8px;margin-top:0px;');
    };

    o.add_event = function () {
        this.f.on('keyup', 0);
        this.f.on('click', 1);
    };

    return o;
};

sip.o.art.backup = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_backup',
        add_event: true
    });

    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-backup'), {ids: [this.el(0), this.el(1)]});
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                o.f.fetch('export_picdb', function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
            },
            function () {
                if (confirm('现有数据将被清除，确定要导入数据？')) {
                    o.f.fetch('import_from_json', function (r) {
                        alert(r);
                        cardjs.lib.url_set_params('index.html', {});
                        window.location.reload(true);
                    }, function (r) {
                        alert(r);
                        cardjs.lib.url_set_params('index.html', {});
                        window.location.reload(true);
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        o.f.on('click', 0);
        o.f.on('click', 1);
    };

    return o;

};

