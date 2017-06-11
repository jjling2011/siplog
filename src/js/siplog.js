/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global CardJS, Mustache */
CardJS.Lib.set({server_page: 'php/serv.php'});

var sip = {
    f: {},
    o: {
        main: {},
        mgr: {},
        art: {}
    }
};

sip.s = {
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
};


// 这些不太重要的设置，用户可以自己改。
sip.uset = {
    //显示留言信息
    show_mbox: true,

    //是否开启上传图片功能
    upload: true,

    atypes: ['默认分类'],

    msg_keep: 5
};

sip.cache = {
    // 记录有哪些json文件夹下导出的每月数据文件名。
    files: null,
    mpsearch: {
        data: null,
        result: [],
        output: null
    },
    msg: null,
    article: {
        top: null,
        title: null,
        html: null,
        type: null,
        lock: false,
        recent: null,
        cache_id: null,
        selected_id: null
    },
    search: {
        'current_kw': '',
        'pn': 0,
        'page_size': 15,
        'total': -1,
        'cache_kw': '',
        'content': null
    },
    um: {
        wrap: null,
        user_info: null,
        all_user_info: null
    }
};

sip.f.merge_uset = function (settings) {
    for (var key in settings) {
        sip.uset[key] = settings[key];
    }
};

sip.f.add_frame = function (frame_id, content, tag, style) {
    var d = {
        'tag': tag,
        'style': style || "",
        'content': content
    };
    return Mustache.render($('#' + frame_id).html(), d);
};

sip.o.main.msg = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 2,
        add_event: true
    });

    o.gen_html = function () {
        var d = {
            ids: o.ids,
            msg: sip.cache.msg
        };
        var content = Mustache.render($('#tp-mp-msg').html(), d);
        return sip.f.add_frame('tp-frame-tag-card', content, "留言板", 'margin:0px;margin-top:5px;');
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            //enter
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                o.objs[1].click();
            },
            //click
            function () {
                var d = o.objs[0].value;
                if (d.length > 0) {
                    o.f('fetch', 'post_msg', d, function () {
                        if (!sip.cache.msg) {
                            sip.cache.msg = [];
                        }
                        sip.cache.msg.unshift({
                            ctime: new Date().toJSON().slice(0, 10),
                            name: 'me',
                            text: filterXSS(d)
                        });
                        while (sip.cache.msg.length > sip.uset.msg_keep) {
                            sip.cache.msg.pop();
                        }
                        this.show();
                    }, function (r) {
                        alert(r);
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 1);
        o.f('on', 'keyup', 0);
    };

    o.after_add_event = function () {
        o.objs[0].focus();
    };

    return o;
};

sip.o.Main_wrap = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 5,
        id_header: 'main_wrap',
        add_event: true
    });

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                if (o.objs[4].value === '管理页面') {
                    //switch to admin
                    //console.log('switch to admin');
                    o.objs[4].value = '返回主页';
                    show_mgr_page();
                } else {
                    //console.log('switch back to main_page');
                    o.objs[4].value = '管理页面';
                    show_main_page();
                }
            }
        ];
    };

    function show_main_page() {
        clear_contents();
        var cnum = 1;
        sip.cache.mpsearch.output = o.ids[0];
        o.contents.push(sip.o.main.search_box(o.ids[cnum++]).show());

        if (!sip.cache.msg) {
            $.getJSON(sip.s.msg_path + '?t=' + CardJS.Lib.rand(), function (data) {
                sip.cache.msg = [];
                data.forEach(function (e) {
                    sip.cache.msg.push({
                        text: filterXSS(e.text),
                        ctime: CardJS.Lib.getYMD(e.time),
                        name: filterXSS(e.name)
                    });
                });
            }).fail(function () {
                console.log('留言文件加载失败！');
            }).always(function () {
                if (sip.uset.show_mbox) {
                    o.contents.push(sip.o.main.msg(o.ids[cnum++]).show());
                }
            });
        } else {
            if (sip.uset.show_mbox) {
                o.contents.push(sip.o.main.msg(o.ids[cnum++]).show());
            }
        }

        var y = CardJS.Lib.url_get_param('y'),
                m = CardJS.Lib.url_get_param('m'),
                id = parseInt(CardJS.Lib.url_get_param('id'));
        if (y && m && id) {
            $.getJSON('upload/json/' + y + '/' + m + '.json', function (data) {
                //console.log(data,tid);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        break;
                    }
                }
                //console.log(data[i]);
                if (data[i]) {
                    var e = data[i];
                    //console.log(e);
                    var d = {
                        recent: [{
                                title: filterXSS(CardJS.Lib.base64_to_utf8(e.title)),
                                mtime: CardJS.Lib.getYMD(e.mtime),
                                ctime: CardJS.Lib.getYMD(e.ctime),
                                id: e.id,
                                type: sip.uset.atypes[(e.type < sip.uset.atypes.length ? e.type : 0)],
                                name: filterXSS(e.name),
                                content: filterXSS(CardJS.Lib.base64_to_utf8(e.content)),
                                top: e.top === 0 ? false : true,
                                lock: e.lock === 0 ? false : true
                            }]
                    };
                    o.objs[0].innerHTML = Mustache.render($('#tp-article-summary-container').html(), d);
                    var obj = document.getElementsByName('article-content');
                    if (obj && obj[0]) {
                        obj[0].setAttribute('style', "font-size: 15px;width: 100%;text-align: left;color:#000; ");
                    }
                }
            });
        } else {
            if (!sip.cache.article.recent) {
                $.getJSON(sip.s.top_art_path + '?t=' + CardJS.Lib.rand(), function (data) {
                    sip.cache.article.recent = [];
                    data.forEach(function (e) {
                        sip.cache.article.recent.push({
                            title: filterXSS(CardJS.Lib.base64_to_utf8(e.title)),
                            mtime: CardJS.Lib.getYMD(e.mtime),
                            ctime: CardJS.Lib.getYMD(e.ctime),
                            id: e.id,
                            type: sip.uset.atypes[(e.type < sip.uset.atypes.length ? e.type : 0)],
                            name: filterXSS(e.name),
                            content: filterXSS(CardJS.Lib.base64_to_utf8(e.content)),
                            top: e.top === 0 ? false : true,
                            lock: e.lock === 0 ? false : true
                        });
                    });
                    o.objs[0].innerHTML = Mustache.render($('#tp-article-summary-container').html(), sip.cache.article);
                }).fail(function () {
                    o.objs[0].innerHTML = "<font color=red>无数据</font>";
                });
            } else {
                o.objs[0].innerHTML = Mustache.render($('#tp-article-summary-container').html(), sip.cache.article);
            }
        }
    }

    o.show_user_panel = function () {
        var info = sip.cache.um.user_info;
        var current_id = 1;
        if (info && info.login) {
            o.objs[current_id++].innerHTML = Mustache.render($('#tp-um-welcome').html(), info);
            if (info.prv['USERM']) {
                o.contents.push(sip.o.mgr.management(o.ids[current_id++]).show());
            }
            o.contents.push(sip.o.mgr.logout(o.ids[current_id++]).show());
        } else {
            o.contents.push(sip.o.mgr.login(o.ids[current_id++]).show());
        }
    };

    function show_mgr_page() {
        clear_contents();
        o.contents.push(sip.o.art.art_wrap(o.ids[0]).show());
        if (sip.cache.um.user_info) {
            //console.log('using cache');
            o.show_user_panel();
        } else {
            o.f('fetch', 'fetch_user_info', null, function (info) {
                sip.cache.um.user_info = info;
                this.show_user_panel();
            });
        }

    }

    o.add_event = function () {
        o.f('on', 'click', 4, 0);
    };

    o.gen_html = function () {
        return Mustache.render($('#tp-main-wrap').html(), o);
    };

    function clear_contents() {
        if (o.contents && o.contents.length > 0) {
            o.contents.forEach(function (e) {
                e.destroy();
            });
        }
        o.contents = [];
        for (var i = 0; i < 4; i++) {
            o.objs[i].innerHTML = '';
        }
    }

    o.refresh = function () {
        //console.log('call main_page.refresh()');
        sip.cache.um.all_user_info = null;
        sip.cache.um.user_info = null;
        clear_contents();
        show_mgr_page();
    };

    o.after_add_event = function () {
        sip.cache.um.wrap = o;
        clear_contents();

        show_main_page();
    };

    return o;
};

sip.o.art.search_result = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 0,
        id_header: 'at_search_result',
        add_event: true
    });

    o.d = {
        //id_num: 0,
        num: 0,
        page_num: 0
    };

    o.data_parser = function () {
        o.d.num = 0;

        if (!sip.cache.search.content ||
                !sip.cache.search.content.length ||
                sip.cache.search.content.length <= 0) {
            return;
        }

        o.d.num = sip.cache.search.content.length;
        o.d.page_num = Math.ceil(sip.cache.search.total / sip.cache.search.page_size);
        o.f('merge', {id_num: 2 + Math.min(o.d.page_num, 9) + o.d.num});
        o.d['first'] = Math.max(sip.cache.search.pn - 5, 0);
        o.d['last'] = Math.min(o.d['first'] + 9, o.d.page_num);
    };

    o.show_page = function (pn) {
        if (pn === sip.cache.search.pn) {
            console.log('same page!');
            return;
        }
        sip.cache.search.pn = pn;
        o.f('fetch', 'search', {'kw': sip.cache.search.current_kw, 'pn': pn, 'get_total': false, 'page_size': sip.cache.search.page_size},
                function (data) {
                    sip.cache.search.content = data.data;
                    this.show();
                });
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [];
        if (o.d.num <= 0) {
            return;
        }
        o.ev_handler[0] = function () {
            o.show_page(0);
        };
        o.ev_handler[1 + o.d.last - o.d.first] = function () {
            o.show_page(o.d.page_num - 1);
        };
        var i;
        for (i = 1; i < o.d.last - o.d.first + 1; i++) {
            o.ev_handler[i] = (function () {
                var idx = i - 1;
                return function () {
                    o.show_page(idx);
                };
            }());
        }
        var start, end;
        start = o.d.last - o.d.first + 2;
        end = o.ids.length;
        for (i = start; i < end; i++) {
            o.ev_handler[i] = (function () {
                var s = start, e = end, idx = i;
                //console.log(sip.cache.search.content);
                var id = (sip.cache.search.content[i - s].id);
                return(function () {
                    for (var i = s; i < e; i++) {
                        o.objs[i].style.backgroundColor = '';
                    }
                    sip.cache.article.selected_id = id;
                    //console.log('select id=' + id);
                    o.objs[idx].style.backgroundColor = 'lightsalmon';
                });
            }());
        }
    };

    o.add_event = function () {
        if (o.d.num <= 0) {
            return;
        }
        for (var i = 0; i < o.ids.length; i++) {
            o.f('on', 'click', i);
        }
    };

    o.after_add_event = function () {
        //console.log('fire');
        if (o.d.num > 0) {
            var idx = sip.cache.search.pn - o.d.first + 1;
            o.objs[idx].className = "btn btn-sm btn-info";
        }
    };

    o.gen_html = function () {
        if (o.d.num <= 0) {
            return('无数据');
        }
        var i;
        var m = o.d.last - o.d.first + 2;
        o.d.btn = [];
        for (i = 0; i < m; i++) {
            o.d.btn.push({id: o.ids[i], value: o.d.first + i});
        }
        o.d.btn[0]['value'] = '首页';
        o.d.btn[m - 1]['value'] = '尾页';

        o.d.tb = [];
        var c;
        for (; i < o.ids.length; i++) {
            c = sip.cache.search.content[i - m];
            o.d.tb.push({
                oid: o.ids[i],
                title: filterXSS(c.title),
                time: CardJS.Lib.getYMD(c.mtime),
                author: filterXSS(c.name),
                type: (c.type < sip.uset.atypes.length) ? sip.uset.atypes[c.type] : '无',
                top: c.top === 0 ? false : true,
                lock: c.lock === 0 ? false : true
            });
        }
        return (Mustache.render($('#tp-uma-search-result').html(), o.d));
    };

    return o;
};

sip.o.art.list_orphan_img = function (cid) {
    var o = new CardJS.Card(cid);

    o.f('merge', {
        id_header: 'uma_loi',
        id_num: 2,
        add_event: true
    });

    o.data = [];

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                o.f('fetch', 'list_orphan_img', function (data) {
                    this.data = [];
                    data.forEach(function (e) {
                        this.data.push({
                            'atid': e.atid,
                            'uptime': CardJS.Lib.getYMD(e.uptime),
                            'deltime': CardJS.Lib.getYMD(e.deltime),
                            'path': e.path && e.path.substr(3, e.path.length)
                        });
                    });
                    this.show();
                    if (this.data.length === 0) {
                        alert('没有孤儿图片');
                    }
                });
            },
            function () {
                if (confirm('删除所有孤儿图片？')) {
                    o.f('fetch', 'delete_all_orphan_img', function (r) {
                        alert(r);
                        this.objs[0].click();
                    }, function (r) {
                        alert(r);
                        this.objs[0].click();
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 0);
        o.f('on', 'click', 1);
    };

    o.gen_html = function () {
        return Mustache.render($('#tp-uma-loi').html(), o);
    };

    return o;

};

sip.o.art.editor = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 11,
        id_header: 'edt',
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
        o.editor && o.editor.destroy();
        o.editor = null;
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                var content = o.editor.$txt.html();
                var data = {
                    'title': CardJS.Lib.utf8_to_base64(o.objs[0].value),
                    'content': CardJS.Lib.utf8_to_base64(content),
                    'type': o.objs[2].options[o.objs[2].selectedIndex].value,
                    'id': sip.cache.article.cache_id,
                    'top': o.objs[10].checked ? 1 : 0,
                    'lock': o.objs[9].checked ? 1 : 0

                };
                //console.log(content);
                if (!confirm('确定提交？')) {
                    return;
                }

                // clean cache
                sip.cache.article.recent = null;
                sip.cache.mpsearch.data = null;
                sip.cache.files = null;

                o.objs[5].innerHTML = '正在提交数据 ...';
                o.f('fetch', 'post_article', data, function () {
                    alert('提交成功!');
                    this.objs[4].click();
                    //console.log(r);
                }, function (r) {
                    this.objs[5].innerHTML = '提交失败！';
                    alert(r + '\n提交失败！');
                });
            },
            function () {
                sip.cache.article.cache_id = null;
                sip.cache.article.selected_id = null;
                sip.cache.article.title = null;
                sip.cache.article.html = null;
                sip.cache.article.top = false;
                sip.cache.article.lock = false;
                o.objs[9].checked = false;
                o.objs[10].checked = false;
                o.objs[0].value = '';
                o.objs[2].options[0].selected = true;
                o.editor.$txt.html('<p><br></p>');
                o.objs[5].innerHTML = "新文章";

            },
            function () {
                if (!sip.cache.article.cache_id > 0) {
                    o.objs[4].click();
                    return;
                }

                if (!confirm("确定删除文章？")) {
                    return;
                }

                // clean cache
                sip.cache.article.recent = null;
                sip.cache.mpsearch.data = null;
                sip.cache.files = null;

                o.f('fetch', 'delete_article', sip.cache.article.cache_id,
                        function () {
                            alert('删除成功！');
                            sip.cache.search.content = null;
                            this.objs[4].click();
                        }, false, function (r) {
                    alert(r);
                });
            },
            function () {
                if (o.objs[8].style.display === 'block') {
                    o.objs[8].style.display = 'none';
                } else {
                    var pos = CardJS.Lib.get_DOM_offset(o.objs[1]);
                    o.objs[8].style.left = (pos.left - 8 - parseInt(o.objs[8].style.width)) + "px";
                    o.objs[8].style.top = (pos.top - 8 - parseInt(o.objs[8].style.height)) + "px";
                    o.objs[8].style.display = 'block';
                }
            }

        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 3, 0);
        o.f('on', 'click', 4, 1);
        o.f('on', 'click', 6, 2);
        o.f('on', 'click', 7, 3);
    };

    o.gen_html = function () {
        return Mustache.render($('#tp-uma-editor').html(), o);
    };

    o.after_add_event = function () {
        o.editor && o.editor.destroy();
        o.editor = null;
        o.editor = new wangEditor(o.ids[1]);
        if (sip.uset.upload) {
            o.editor.config.uploadImgUrl = "./php/upload.php";
            o.editor.config.uploadImgFileName = 'upload';
        }
        o.editor.create();

        //console.log(sip.cache.article);

        //读取缓存
        var sid, cid, uid;
        cid = sip.cache.article.cache_id;
        sid = sip.cache.article.selected_id;
        uid = parseInt(CardJS.Lib.url_get_param('id'));
        if (!sid && uid > 0) {
            sid = uid;
        }

        if (sip.cache.article.html && sip.cache.article.html.length > 0) {
            if (cid === sid || !(sid)) {
                //console.log('load_cache');
                o.load_cache();
                return;
            }
        }

        if (sid > 0) {
            o.editor.$txt.html('读取数据中 ...');
            o.f('fetch', 'fetch_article', {'id': sid}, function (data) {
                //$this->ok(array('id'=>$id,'type'=>$type,'title'=>$title,'content'=>$content));
                sip.cache.article.cache_id = data.id;
                sip.cache.article.title = CardJS.Lib.base64_to_utf8(data.title);
                sip.cache.article.html = CardJS.Lib.base64_to_utf8(data.content);
                sip.cache.article.type = data.type;
                sip.cache.article.lock = !(data.lock === 0);
                sip.cache.article.top = !(data.top === 0);
                //console.log('loadhtml', sip.cache.article.html);
                this.load_cache();
            }, false, function (r) {
                this.editor.$txt.html(r);
            });
        } else {
            o.objs[4].click();
        }
    };

    o.save_cache = function () {
        //console.log('save_cache');
        sip.cache.article.title = o.objs[0].value;
        sip.cache.article.type = o.objs[2].selectedIndex;
        if (o.editor) {
            sip.cache.article.html = o.editor.$txt.html();
        }
        sip.cache.article.lock = o.objs[9].checked;
        sip.cache.article.top = o.objs[10].checked;

        // console.log(sip.cache.article);
    };

    o.load_cache = function () {
        //console.log('load_cache');
        if (sip.cache.article.html) {
            o.objs[0].value = filterXSS(sip.cache.article.title);
            var type_no = 0;
            if (sip.cache.article.type < sip.uset.atypes.length) {
                type_no = sip.cache.article.type;
            }
            o.objs[2].options[type_no].selected = true;
            o.editor.$txt.html(filterXSS(sip.cache.article.html));
            o.objs[9].checked = sip.cache.article.lock;
            o.objs[10].checked = sip.cache.article.top;
            var cid = sip.cache.article.cache_id;
            if (cid) {
                o.objs[5].innerHTML = "修改文章： #" + cid;
            } else {
                o.objs[5].innerHTML = "新文章";
            }
        }
    };

    o.clean_up = function () {
        if (o.editor) {
            o.save_cache();
            o.editor.destroy();
            o.editor = null;
        }
    };

    return o;

};

sip.o.mgr.types = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_header: 'at_types',
        add_event: true,
        id_num: 3
    });

    o.gen_ev_handler = function () {

        o.ev_handler = [
            //click submit
            function () {
                var types = [];
                $('[name="' + o.ids[0] + '"]').each(function () {
                    if (this.value.length > 0) {
                        types.push(this.value);
                    }
                });
                //console.log(types);
                sip.uset.atypes = types;
                o.f('fetch', 'update_uset', sip.uset, function () {
                    alert('分类信息修改成功！');
                    this.show();
                });
            },
            //key  up enter
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                var types = [];
                $('[name="' + o.ids[0] + '"]').each(function () {
                    if (this.value.length > 0) {
                        types.push(this.value);
                    }
                });
                sip.uset.atypes = types;
                o.show();
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 2, 0);
        o.f('on', 'keyup', 1);
    };

    o.gen_html = function () {
        var d = {
            name: o.ids[0],
            new_type: o.ids[1],
            btn_sumit: o.ids[2],
            data: sip.uset.atypes,
            index: function () {
                return ++window['INDEX'] || (window['INDEX'] = 0);
            },
            resetIndex: function () {
                window['INDEX'] = -1;
                return;
            }
        };

        o.after_add_event = function () {
            // console.log(focus);
            o.objs[1].focus();
        };
        // create data view
        var content = Mustache.render($('#tp-uma-atypes').html(), d);
        return sip.f.add_frame('tp-frame-tag-card', content, '分类管理');
    };

    return o;

};

sip.o.art.art_wrap = function (cid) {
    var pn = new CardJS.Panel(cid,
            {
                '编辑': [sip.o.art.editor],
                '搜索': [sip.o.art.search_box],
                //['分类', ['UMA_types']],
                '图片管理': [sip.o.art.list_orphan_img],
                '设置': [sip.o.mgr.set_wrap],
                '备份': [sip.o.mgr.backup],
                '说明': [sip.o.mgr.help]
            }, {'tags': ' ', 'tag_active': 'tag-active', 'tag_normal': 'tag-normal', 'page': 'page', 'card': ' '}
    );
    return pn;

};

sip.o.mgr.logout = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 3,
        add_event: true,
        id_header: 'um_logout'
    });

    o.child = null;

    o.gen_html = function () {
        return Mustache.render($('#tp-um-logout').html(), o);
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            //change password
            function () {
                o.child = sip.o.mgr.change_psw(o.ids[2]).show();
            },
            // logout
            function () {
                o.f('fetch', 'logout', function (r) {
                    console.log(r);
                    sip.cache.um.user_info = null;
                    sip.cache.um.all_user_info = null;
                    sip.cache.um.wrap && sip.cache.um.wrap.refresh();
                });
            }
        ];
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
    };

    o.add_event = function () {
        o.f('on', 'click', 0);
        o.f('on', 'click', 1);
    };

    return o;

};

sip.o.mgr.change_psw = function (cid) {
    var o = new CardJS.Card(cid);

    o.f('merge', {
        id_num: 6,
        id_header: 'um_chpsw',
        add_event: true
    });

    o.gen_html = function () {
        var content = Mustache.render($('#tp-um-change-password').html(), o);
        return sip.f.add_frame('tp-frame-tag-card', content, '修改信息');
        //return Mustache.render($('#tp-frame-tag-card').html(),d);
        //return('debug');
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                //console.log('hello');
                var name = "" + o.objs[0].value;
                var org_psw = "" + o.objs[1].value;
                var new_psw = "" + o.objs[2].value;
                var re_psw = "" + o.objs[3].value;

                if (new_psw !== re_psw) {
                    o.objs[5].innerHTML = '两次输出密码不同！';
                    return;
                }

                if (new_psw.length <= 0 || org_psw.length <= 0) {
                    o.objs[5].innerHTML = '内容过短！';
                    return;
                }
                // console.log(new_psw, org_psw, name);
                var data = {'name': name, 'opsw': md5(org_psw), 'npsw': md5(new_psw)};
                o.f('fetch', 'user_modify', data, function (r) {
                    this.objs[5].innerHTML = CardJS.Lib.html_escape(r);
                    sip.cache.um.user_info = null;
                    sip.cache.um.all_user_info = null;
                    sip.cache.um.wrap && sip.cache.um.wrap.refresh();
                }, false, function (r) {
                    this.objs[5].innerHTML = CardJS.Lib.html_escape(r);
                });
            }
        ];
    };

    o.add_event = function () {
        //console.log(o.ids[4]);
        o.f('on', 'click', 4, 0);
        //o.f('on','click',1,0);
    };

    return o;

};

sip.o.mgr.management = function (cid) {
    var o = new CardJS.Card(cid);

    o.f('merge', {
        id_num: 9,
        id_header: "um_mod",
        add_event: false
    });

    o.refresh = function () {
        sip.cache.um.all_user_info = null;
        o.f('fetch', 'fetch_all_user_info', function (data) {
            sip.cache.um.all_user_info = data;
            this.show();
        }, function (r) {
            alert(r);
        });
    };

    o.after_add_event = function () {
        if (!sip.cache.um.all_user_info) {
            o.refresh();
        } else {
            o.ev_handler[0]();
        }
    };

    o.data_parser = function () {

        if (sip.cache.um.all_user_info) {
            o.f('merge', {add_event: true});
        } else {
            o.f('merge', {add_event: false});
        }
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            // select change
            function () {
                var id = o.objs[0].value,
                        uinfo = sip.cache.um.all_user_info;

                o.objs[1].value = CardJS.Lib.html_escape(uinfo.name_list[id]);
                o.objs[8].value = CardJS.Lib.html_escape(uinfo.user_list[id]);
                if (uinfo.ban_list[id]) {
                    o.objs[8].style.backgroundColor = 'lightgray';
                } else {
                    o.objs[8].style.backgroundColor = 'transparent';
                }
                var pv = $('[name=' + o.ids[3] + ']');
                for (var i = 0; i < pv.length; i++) {
                    pv[i].checked = uinfo.user_prv[id][uinfo.prv_list[i]];
                }
            },
            // reset psw
            function () {
                var id = o.objs[0].value;
                o.f('fetch', 'user_reset', id, function (d) {
                    //console.log(d);
                    sip.cache.um.all_user_info = null;
                    alert(d);
                    this.refresh();
                }, function (r) {
                    alert(r);
                });
            },
            //ban
            function () {
                var id = o.objs[0].value;
                o.f('fetch', 'user_ban', id, function (d) {
                    alert(d);
                    this.refresh();
                }, function (r) {
                    alert(r);
                });
            },
            //modify user
            function () {
                var id = o.objs[0].value,
                        name = o.objs[1].value,
                        user = o.objs[8].value,
                        pv = $('[name=' + o.ids[3] + ']'),
                        p = [];
                for (var i = 0; i < pv.length; i++) {
                    if (pv[i].checked) {
                        p.push(sip.cache.um.all_user_info.prv_list[i]);
                    }
                }
                o.f('fetch', 'user_management', {'id': id, 'name': name, 'user': user, 'prv_list': p},
                        function (r) {
                            alert(r);
                            this.refresh();
                        }, function (r) {
                    alert(r);
                });
                //console.log(p);
            },
            // add user
            function () {
                var param = {
                    user: o.objs[8].value,
                    name: o.objs[1].value,
                    prv: []
                };
                var pv = $('[name=' + o.ids[3] + ']');
                for (var i = 0; i < pv.length; i++) {
                    if (pv[i].checked) {
                        param.prv.push(sip.cache.um.all_user_info.prv_list[i]);
                    }
                }
                //console.log(param);
                o.f('fetch', 'user_add', param, function (r) {
                    alert(r);
                    this.refresh();
                }, function (r) {
                    alert(r);
                });
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'change', 0);
        o.f('on', 'click', 5, 1);
        o.f('on', 'click', 6, 2);
        o.f('on', 'click', 4, 3);
        o.f('on', 'click', 7, 4);
    };

    o.gen_html = function () {
        if (sip.cache.um.all_user_info) {
            sip.cache.um.all_user_info.ids = o.ids;
            var content = Mustache.render($("#tp-um-modify").html(), sip.cache.um.all_user_info);
            return sip.f.add_frame('tp-frame-tag-card', content, '账号管理');
        } else {
            return('正在读取数据 ...');
        }
    };

    return o;


};

sip.o.mgr.set_wrap = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 2,
        id_header: 'uma_swrap'
    });
    o.gen_html = function () {
        return Mustache.render($('#tp-uma-set-wrap').html(), o);
    };
    o.child = [];
    o.after_add_event = function () {
        o.child.push(sip.o.mgr.types(o.ids[0]).show());
        o.child.push(sip.o.mgr.settings(o.ids[1]).show());
    };
    o.clean_up = function () {
        o.child.forEach(function (e) {
            e && e.destroy();
        });
        o.child = [];
    };
    return o;

};

sip.o.mgr.settings = function (cid) {
    var o = new CardJS.Card(cid);

    o.f('merge', {
        id_header: "uma_uset",
        id_num: 2,
        add_event: true
    });

    o.fn_label = ['主页显示留言', '上传本地图片'];
    o.fn_name = ['show_mbox', 'upload'];

    o.gen_html = function () {
        var content = Mustache.render($('#tp-uma-settings').html(), o);
        return sip.f.add_frame('tp-frame-tag-card', content, '界面设置');
    };

    o.after_add_event = function () {
        var uset = $('[name=' + o.ids[0] + ']');
        for (var i = 0; i < o.fn_name.length; i++) {
            uset[i].checked = sip.uset[o.fn_name[i]];
        }
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                var uset = $('[name=' + o.ids[0] + ']');
                for (var i = 0; i < o.fn_name.length; i++) {
                    sip.uset[o.fn_name[i]] = uset[i].checked;
                }
                //console.log(sip.uset);
                o.f('fetch', 'set_upload_support', sip.uset.upload ? 1 : 0);
                o.f('fetch', 'update_uset', sip.uset, function (r) {
                    alert(r);
                });
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 1, 0);
    };

    return o;

};

sip.o.mgr.help = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_header: 'at_help'
    });

    o.gen_html = function () {
        return Mustache.render($('#tp-uma-help').html());
    };

    return o;

};

sip.o.art.search_box = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 3,
        id_header: 'at_search',
        add_event: true
    });

    o.gen_html = function () {
        return Mustache.render($('#tp-uma-search-box').html(), o);
    };

    o.child = null;

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                //console.log('fire');
                var kw = o.objs[0].value;
                sip.cache.search.current_kw = kw;

                if (kw !== sip.cache.search.cache_kw
                        || !sip.cache.search.content
                        || sip.cache.search.content.length === 0) {
                    sip.cache.search.pn = 0;
                    o.child && o.child.destroy();
                    o.objs[2].innerHTML = "搜索中 ...";
                    o.f('fetch', 'search', {'kw': kw, 'pn': 0, 'get_total': true, 'page_size': sip.cache.search.page_size},
                            function (data) {
                                sip.cache.search.cache_kw = kw;
                                sip.cache.search.total = data.total;
                                sip.cache.search.content = data.data;
                                //console.log(data);

                                this.child = sip.o.art.search_result(o.ids[2]).show();
                            },
                            function () {
                                this.objs[2].innerHTML = "此功能登录后才可使用";
                                //console.log(r);
                            }, false);
                } else {
                    console.log('using cache!');
                    if (!o.child) {
                        o.child = sip.o.art.search_result(o.ids[2]).show();
                    }
                }

            },
            function (e) {
                var k = e || window.event;
                if (k.keyCode === 13) {
                    //console.log('fire');
                    o.objs[1].click();
                }
            }
        ];
    };

    o.after_add_event = function () {
        if (!o.child && sip.cache.search.content
                && sip.cache.search.content.length > 0) {
            o.objs[0].value = sip.cache.search.cache_kw;
            sip.cache.search.current_kw = sip.cache.search.cache_kw;
            o.child = sip.o.art.search_result(o.ids[2]).show();
        }
        o.objs[0].focus();
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
    };

    o.add_event = function () {
        //console.log('add event');
        o.f('on', 'keyup', 0, 1);
        o.f('on', 'click', 1, 0);
    };

    return o;
};

sip.o.AATest = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_num: 10,
        id_header: 'test',
        add_event: true
    });

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                o.f('fetch', 'test');
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 0);
    };

    o.gen_html = function () {
        var html = '<div style="margin:10px;">' +
                '<input type="button" id="' + o.ids[0] + '" class="btn btn-info" value="test">' +
                '</div>';
        return html;
    };


    return o;

};

sip.o.mgr.login = function (container_id) {
    var um = new CardJS.Card(container_id);

    um.f('merge', {
        id_num: 5,
        id_header: 'um_login',
        add_event: true
    });

    um.gen_ev_handler = function () {
        um.ev_handler = [
            function () {
                um.objs[0].value = '';
                um.objs[1].value = '';
            },
            function () {
                var user_info = {
                    user: um.objs[0].value,
                    psw: md5(um.objs[1].value)
                };
                //console.log(user_info);
                um.f('fetch', 'login', user_info,
                        function () {
                            sip.cache.um.user_info = null;
                            sip.cache.um.all_user_info = null;
                            sip.cache.um.wrap && sip.cache.um.wrap.refresh();
                        },
                        false,
                        function (d) {
                            um.objs[4].innerHTML = d;
                        });
            },
            function (e) {
                var k = e || window.event;
                if (k.keyCode === 13) {
                    um.objs[2].click();
                }
            }
        ];
    };

    um.add_event = function () {
        um.f('on', 'click', 2, 1);
        um.f('on', 'click', 3, 0);
        um.f('on', 'keyup', 1, 2);
    };

    um.gen_html = function () {
        var content = Mustache.render($('#tp-um-login').html(), um);
        return(sip.f.add_frame('tp-frame-tag-card', content, "登录", "width:185px;margin:8px;"));
    };

    return um;

};

sip.o.main.art_list = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_header: 'art_list'
    });

    o.out_put = $('#' + sip.cache.mpsearch.output) || null;

    o.data_parser = function () {
        o.settings.id_num = sip.cache.mpsearch.result.length;
        o.settings.add_event = false;
        if (o.settings.id_num > 0) {
            o.settings.add_event = true;
        }
    };

    o.show_article = function (idx) {
        if (o.out_put) {
            var data = {recent: [sip.cache.mpsearch.data[sip.cache.mpsearch.result[idx]]]};
            //console.log(data);
            //o.out_put.html(Mustache.render($('#tp-art-viewer').html(), data));
            o.out_put.html(Mustache.render($('#tp-article-summary-container').html(), data));
            var obj = document.getElementsByName('article-content');
            if (obj && obj[0]) {
                obj[0].setAttribute('style', "font-size: 15px;width: 100%;text-align: left;color:#000; ");
            }
            var d = data.recent[0];
            CardJS.Lib.url_set_param('index.html', {
                'y': d.ctime.substr(0, 4),
                'm': parseInt(d.ctime.substr(5, 2)),
                'id': d.id
            });
            sip.cache.article.selected_id = d.id;
        } else {
            console.log('没容器可以用来输出选中的文章！');
        }
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [];
        for (var i = 0; i < o.ids.length; i++) {
            o.ev_handler.push((function () {
                var idx = i;
                return(function () {
                    //console.log('idx:', idx, ' fire!');
                    o.show_article(idx);
                });
            })());
        }
    };

    o.add_event = function () {
        for (var i = 0; i < o.ids.length; i++) {
            o.f('on', 'click', i);
        }
    };

    o.gen_html = function () {
        var data = {
            d: []
        };
        //console.log('from list:', sip.cache.mpsearch.list);
        sip.cache.mpsearch.result.forEach(function (e, i) {
            data.d.push({
                id: o.ids[i],
                title: sip.cache.mpsearch.data[e].title
            });
        });
        //console.log(data);
        return Mustache.render($('#tp-art-list').html(), data);
    };
    return o;

};

sip.o.main.search_box = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_header: 'art_sbox',
        id_num: 3,
        add_event: true
    });

    o.child = null;

    function get_article(year, month) {
        //console.log('get_article:'+path);
        if (year < 2017 || month < 0 || month > 11) {
            return;
        }
        var key = '' + year + (month + 1);
        if (!(key in sip.cache.files) || !(sip.cache.files[key])) {
            //console.log('key [' + key + '] not exist!');
            return;
        }
        //console.log('fetch file key [' + key + '] ');
        var path = sip.s.article_path + (year) + '/' + (month + 1) + '.json';

        $.getJSON(path + '?t=' + CardJS.Lib.rand(), function (data) {
            //sip.cache.mpsearch.data = [];
            //console.log('got '+data.length+' record!');
            data.forEach(function (e) {
                sip.cache.mpsearch.data.push({
                    title: filterXSS(CardJS.Lib.base64_to_utf8(e.title)),
                    mtime: CardJS.Lib.getYMD(e.mtime),
                    ctime: CardJS.Lib.getYMD(e.ctime),
                    id: e.id,
                    type: sip.uset.atypes[(e.type < sip.uset.atypes.length ? e.type : 0)],
                    name: filterXSS(e.name),
                    content: filterXSS(CardJS.Lib.base64_to_utf8(e.content)),
                    top: e.top === 0 ? false : true,
                    lock: e.lock === 0 ? false : true
                });
            });
        });
    }

    o.gen_ev_handler = function () {
        o.ev_handler = [

            //focus in search box
            function () {
                if (!sip.cache.mpsearch.data) {
                    //console.log('准备加载数据!');

                    var year = new Date().getUTCFullYear(),
                            month = new Date().getUTCMonth();

                    sip.cache.mpsearch.data = [];
                    for (var i = 0; i < 6; i++) {
                        //path = dir + (year) + '/' + (month + 1) + '.json';
                        get_article(year, month);
                        month--;
                        if (month < 0) {
                            month += 12;
                            year--;
                        }
                    }
                }
            },
            //keyup
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                o.objs[1].click();
            },
            // click
            function () {
                if (!sip.cache.mpsearch.data) {
                    o.objs[2].innerHTML = '<font color="red">没有数据</font>';
                    return;
                }
                //search
                var kw = o.objs[0].value.split(' ').filter(function (e) {
                    return (e.length > 0);
                });
                var i, j, td, result = [], count = 0;
                for (i = 0; i < 15 && i < sip.cache.mpsearch.data.length; i++) {
                    td = sip.cache.mpsearch.data[i];
                    //console.log(td);
                    if (kw.length > 0) {
                        count = 0;
                        for (j = 0; j < kw.length; j++) {
                            if (td.title.indexOf(kw[j]) >= 0
                                    || td.content.indexOf(kw[j]) >= 0) {

                                count++;
                            }
                        }
                        if (count === kw.length) {
                            result.push(i);
                        }
                    } else {
                        result.push(i);
                    }
                }
                sip.cache.mpsearch.result = result;
                if (result.length > 0) {
                    o.child && o.child.destroy();
                    o.child = sip.o.main.art_list(o.ids[2]).show();
                } else {
                    o.objs[2].innerHTML = '<font color="red">搜索不到符合条件的记录</font>';
                }
            }
        ];
    };

    o.after_add_event = function () {
        if (!sip.cache.files) {
            // fetch json.
            $.getJSON(sip.s.files_path + '?t=' + CardJS.Lib.rand(), function (data) {
                sip.cache.files = data;
                //console.log("files:", sip.cache.files);
            });
        }
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
    };
    o.gen_html = function () {
        var content = Mustache.render($('#tp-art-search-box').html(), o);
        return sip.f.add_frame('tp-frame-tag-card', content, '搜索', 'margin:0px;margin-top:5px;');
    };
    o.add_event = function () {
        //o.f('on','focus', 0, 0);
        o.f('on', 'mouseover', 0, 0);
        o.f('on', 'mouseover', 1, 0);
        o.f('on', 'keyup', 0, 1);
        o.f('on', 'click', 1, 2);
    };
    return o;

};

sip.o.mgr.backup = function (cid) {
    var o = new CardJS.Card(cid);
    o.f('merge', {
        id_header: 'uma_backup',
        id_num: 3,
        add_event: true
    });

    o.gen_html = function () {
        return Mustache.render($('#tp-uma-backup').html(), o);
    };

    o.gen_ev_handler = function () {
        o.ev_handler = [
            function () {
                o.f('fetch', 'export_picdb', function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
            },
            function () {
                if (confirm('现有数据将被清除，确定要导入数据？')) {
                    o.f('fetch', 'import_from_json', function (r) {
                        alert(r);
                        CardJS.Lib.url_set_param('index.html', {});
                        window.location.reload(true);
                    }, function (r) {
                        alert(r);
                        CardJS.Lib.url_set_param('index.html', {});
                        window.location.reload(true);
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        o.f('on', 'click', 1, 0);
        o.f('on', 'click', 2, 1);
    };

    return o;

};

