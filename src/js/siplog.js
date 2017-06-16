/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */
cardjs.set({server_page: 'php/serv.php'});

/*
 * cache share keys:
 * main_article_board_update: 主窗口文章框提供的 update 函数 
 * art_select_id: 搜索结果中缓存的当前选中的文章ID
 * clear_cache: {msbox/asearch/mboard} 相应键为true时清空缓存。
 */

var sip = {
    f: {},
    o: {
        main: {},
        mgr: {},
        art: {}
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
    uset: {
        //显示留言信息
        show_mbox: true,

        //是否开启上传图片功能
        upload: true,

        atypes: ['默认分类'],

        msg_keep: 5
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
            var content = Mustache.render($('#tp-mp-msg').html(), {ids: [this.el(0), this.el(1), this.el(2)]});
            return sip.f.add_frame('tp-frame-tag-card', content, "留言板", 'margin:0px;margin-top:5px;');
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
                    console.log('msg:', d);
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
                this.el(2, true).innerHTML = Mustache.render($('#tp-mp-msg-list').html(), {msg: msg});
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
                    this.el(2, true).innerHTML = Mustache.render($('#tp-mp-msg-list').html(), {msg: msg});
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

    o.gen_ev_handler = function () {
        return([
            function () {
                if (this.el(4, true).value === '管理页面') {
                    //switch to admin
                    //console.log('switch to admin');
                    this.el(4, true).value = '返回主页';
                    o.show_mgr_page();
                } else {
                    //console.log('switch back to main_page');
                    this.el(4, true).value = '管理页面';
                    o.show_main_page();
                }
            }
        ]);
    };

    o.show_main_page = function () {
        //console.log('show_main_page:',this);
        clear_contents();
        var cnum = 0;
        o.contents.push(sip.o.main.article_board(o.el(cnum++)).show());
        o.contents.push(sip.o.main.search_box(o.el(cnum++)).show());
        if (sip.uset.show_mbox) {
            this.contents.push(sip.o.main.msg(o.el(cnum++)).show());
        }
    };

    o.show_mgr_page = function () {
        //console.log('show_mgr_page developing');
        //return;
        clear_contents();
        this.contents.push(sip.o.art.art_wrap(this.el(0)).show());
        this.contents.push(sip.o.mgr.user_panel(this.el(1)).show());
    };

    o.add_event = function () {
        o.f.on('click', 4, 0);
    };

    o.gen_html = function () {
        var ids = [];
        for (var i = 0; i < 5; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render($('#tp-main-wrap').html(), {ids: ids});
    };

    function clear_contents() {
        if (o.contents && o.contents.length > 0) {
            o.contents.forEach(function (e) {
                //console.log('main:',o);
                //console.log('contents:',e);
                e.destroy();
            });
        }
        o.contents = [];
        for (var i = 0; i < 4; i++) {
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

    o.after_add_event = function () {
        clear_contents();
        o.show_main_page();
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
                time: cardjs.lib.getYMD(c.mtime),
                author: filterXSS(c.name),
                type: (c.type < sip.uset.atypes.length) ? sip.uset.atypes[c.type] : '无',
                top: c.top === 0 ? false : true,
                lock: c.lock === 0 ? false : true
            });
        }
        return (Mustache.render($('#tp-uma-search-result').html(), this.d));
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
        return Mustache.render($('#tp-uma-loi').html(), this);
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

                this.clear_cache();

                this.el(5, true).innerHTML = '正在提交数据 ...';
                o.f.fetch('post_article', data, function () {
                    alert('提交成功!');
                    this.f.trigger('new');
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

                this.clear_cache();

                o.f.fetch('delete_article', cache.cache_id,
                        function () {
                            alert('删除成功！');

                            //sip.cache.search.content = null;
                            this.f.trigger('new');
                            //this.el(4,true).click();
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
        return Mustache.render($('#tp-uma-editor').html(), this);
    };

    o.clear_cache = function () {
        // clear_cache: {msbox/asearch/mboard} 相应键为true时清空缓存。
        var name = ['msbox', 'asearch', 'mboard'];
        var cache = {};
        for (var i = 0; i < name.length; i++) {
            cache[name[i]] = true;
        }
        this.f.cache(cache, 'clear_cache');
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
                var cache = this.f.restore();
                cache.cache_id = data.id;
                cache.title = cardjs.lib.base64_to_utf8(data.title);
                cache.html = cardjs.lib.base64_to_utf8(data.content);
                cache.type = data.type;
                cache.lock = !(data.lock === 0);
                cache.top = !(data.top === 0);

                this.f.cache(cache);
                //console.log('loadhtml', sip.cache.article.html);
                this.load_cache();
            }, false, function (r) {
                this.editor.$txt.html(r);
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
                $('[name="' + this.el(0) + '"]').each(function () {
                    if (this.value.length > 0) {
                        types.push(this.value);
                    }
                });
                //console.log(types);
                sip.uset.atypes = types;
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
                $('[name="' + this.el(0) + '"]').each(function () {
                    if (this.value.length > 0) {
                        types.push(this.value);
                    }
                });
                sip.uset.atypes = types;
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
        var content = Mustache.render($('#tp-uma-atypes').html(), d);
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

sip.o.mgr.logout = function (cid, parent_update) {
    return(cardjs.create({
        cid: cid,
        update: parent_update,
        child: null,
        settings: {
            header: 'mgr_logout',
            add_event: true
        },
        gen_html: function () {
            return Mustache.render($('#tp-um-logout').html(), {ids: [this.el(0), this.el(1), this.el(2)]});
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
        var content = Mustache.render($('#tp-um-change-password').html(), {ids: id});
        return sip.f.add_frame('tp-frame-tag-card', content, '修改信息');
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
            this.after_add_event();
        },
        after_add_event: function () {
            // dont use cache in this module.
            this.clean_up();
            this.f.fetch('fetch_all_user_info', function (data) {
                this.f.cache(data);
                this.child = sip.o.mgr.user_mgr(this.el(0), key, this.update.bind(this)).show();
            });
        },
        clean_up: function () {
            this.child && this.child.destroy();
            this.f.cache(null);
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
                var pv = $('[name=' + this.el(3) + ']');
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
                        pv = $('[name=' + this.el(3) + ']'),
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
                var pv = $('[name=' + this.el(3) + ']');
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
        return Mustache.render($("#tp-um-modify").html(), cache);
    };

    return o;
};

sip.o.art.set_wrap = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_set_wrap'
    });
    o.gen_html = function () {
        return Mustache.render($('#tp-uma-set-wrap').html(), {ids: [this.el(0), this.el(1)]});
    };
    o.child = [];
    o.after_add_event = function () {
        o.child.push(sip.o.art.types(this.el(0)).show());
        o.child.push(sip.o.art.settings(this.el(1)).show());
    };
    o.clean_up = function () {
        o.child.forEach(function (e) {
            e && e.destroy();
        });
        o.child = [];
    };
    return o;

};

sip.o.art.settings = function (cid) {
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
        var content = Mustache.render($('#tp-uma-settings').html(), data);
        return sip.f.add_frame('tp-frame-tag-card', content, '界面设置');
    };

    o.after_add_event = function () {
        var uset = $('[name=' + this.el(0) + ']');
        for (var i = 0; i < o.fn_name.length; i++) {
            uset[i].checked = sip.uset[o.fn_name[i]];
        }
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                var uset = $('[name=' + this.el(0) + ']');
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
        return Mustache.render($('#tp-uma-help').html());
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
            return Mustache.render($('#tp-uma-search-box').html(), {ids: [this.el(0), this.el(1), this.el(2)]});
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
            var cc = this.f.restore('clear_cache');
            if (cc && cc['asearch']) {
                //console.log('clean cache');
                this.f.cache(null);
                delete cc['asearch'];
                this.f.cache(cc, 'clear_cache');
            }

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

sip.o.AATest = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        id_num: 10,
        id_header: 'test',
        add_event: true
    });

    o.gen_ev_handler = function () {
        return [
            function () {
                o.f.fetch('test');
            }
        ];
    };

    o.add_event = function () {
        o.f.on('click', 0);
    };

    o.gen_html = function () {
        var html = '<div style="margin:10px;">' +
                '<input type="button" id="' + o.ids[0] + '" class="btn btn-info" value="test">' +
                '</div>';
        return html;
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
            var content = Mustache.render($('#tp-um-login').html(), {ids: id});
            return(sip.f.add_frame('tp-frame-tag-card', content, "登录", "width:185px;margin:8px;"));
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

sip.o.main.match_list = function (cid, key) {

    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: 'match_list'
    });

    o.update = o.f.restore('main_article_board_update')
            || (function () {
                throw new Error('error: main_article_board_update not exist!');
            }());

    o.data_parser = function () {
        o.cache = this.f.restore();
        o.settings.add_event = false;
        if (o.cache.result && o.cache.result.length > 0) {
            o.settings.add_event = true;
        }
    };

    o.updata_url = function (data) {
        cardjs.lib.url_set_param('index.html', {
            'y': data.ctime.substr(0, 4),
            'm': parseInt(data.ctime.substr(5, 2)),
            'id': data.id
        });
    };

    o.show_article = function (idx) {
        var data = this.cache.data[this.cache.result[idx]];
        this.update(data);
        this.updata_url(data);
        this.f.cache(data.id, 'art_select_id');
    };

    o.gen_ev_handler = function () {
        var evs = [];
        for (var i = 0; i < this.cache.result.length; i++) {
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
        for (var i = 0; i < this.cache.result.length; i++) {
            this.f.on('click', i);
        }
    };

    o.gen_html = function () {
        var data = [];
        var cache = this.f.restore();
        //console.log('main_search:',main_search);
        //console.log('from list:', sip.cache.mpsearch.list);
        for (var i = 0; i < this.cache.result.length; i++) {
            data.push({
                id: this.el(i),
                title: cache.data[this.cache.result[i]].title
            });
        }
        //console.log(data);
        return Mustache.render($('#tp-art-list').html(), {d: data});
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
            this.el(current_id++, true).innerHTML = Mustache.render($('#tp-um-welcome').html(), info);
            //}.bind(this), 0);
            if (info.prv['USERM']) {
                this.children.push(sip.o.mgr.user_mgr_wrap(o.el(current_id++)).show());
            }
            this.children.push(sip.o.mgr.logout(o.el(current_id++), o.update).show());
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

sip.o.main.article_board = function (cid) {

    var key = cardjs.lib.gen_key();
    /* cache={
     *      data: [{id: 1, content: string, ... }, ... ]
     * };
     */

    function get_url_ymid() {
        return({
            y: cardjs.lib.url_get_param('y'),
            m: cardjs.lib.url_get_param('m'),
            id: parseInt(cardjs.lib.url_get_param('id'))
        });
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
            this.f.cache(data);
            if (cardjs.lib.isArray(data)) {
                this.el(0, true).innerHTML = Mustache.render($('#tp-article-summary-container').html(), {recent: data});
            } else {
                this.el(0, true).innerHTML = Mustache.render($('#tp-single-article-container').html(), data);
            }
        },
        after_add_event: function () {
            this.f.cache(this.update.bind(this), 'main_article_board_update');
            // clear_cache: {msbox/asearch/mboard} 相应键为true时清空缓存。
            var cc = this.f.restore('clear_cache');
            if (cc && cc['mboard']) {
                //console.log('clean cache');
                this.f.cache(null);
                delete cc['mboard'];
                this.f.cache(cc, 'clear_cache');

            }

            var cache = this.f.restore();
            if (cache) {
                this.update(cache);
                return;
            }
            var param = get_url_ymid();
            if (param.y && param.m && param.id) {
                $.getJSON('upload/json/' + param.y + '/' + param.m + '.json', function (data) {
                    //console.log(data,tid);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === param.id) {
                            this.update(sip.f.parse_json(data[i]));
                            break;
                        }
                    }
                }.bind(this));
                return;
            }
            // no cache, no url params 
            $.getJSON(sip.s.top_art_path + '?t=' + cardjs.lib.rand(8), function (data) {
                var d = [];
                data.forEach(function (e) {
                    d.push(sip.f.parse_json(e));
                });
                this.update(d);
            }.bind(this)).fail(function () {
                this.el(0, true).innerHTML = "<font color=red>没有数据</font>";
            }.bind(this));
        }
    }));
};

sip.o.main.search_box = function (cid) {

    var key = cardjs.lib.gen_key();

    /*
     * cache={
     *     files: 文件名列表 upload/json/files.json
     *     data: 最近6个月的数据.
     *     kw: 上次的 key_word.
     *     result: [index1, index2] 上次搜索的结果.
     * }
     */

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'main_sbox',
        key: key,
        add_event: true
    });

    o.child = null;
    o.cache = null;

    function get_article(year, month) {
        //console.log('get_article:'+path);
        if (year < 2017 || month < 0 || month > 11) {
            return;
        }
        var key = '' + year + (month + 1);
        var cache = o.f.restore();
        //console.log('main_search:',files);
        if (!(key in cache.files) || !(cache.files[key])) {
            //console.log('key [' + key + '] not exist!');
            return;
        }
        //console.log('fetch file key [' + key + '] ');

        var path = sip.s.article_path + (year) + '/' + (month + 1) + '.json';

        $.getJSON(path + '?t=' + cardjs.lib.rand(8), function (data) {
            var cache = this.f.restore();
            cache.data = cache.data || {};
            data.forEach(function (e) {
                var d = sip.f.parse_json(e);
                var div = document.createElement("div");
                div.innerHTML = d.content;
                d.text = div.textContent || div.innerText || "";
                cache.data[d.id] = d;
            });
            o.f.cache(cache);
            //console.log('cache:',o.f.restore());
        }.bind(o));
    }

    o.gen_ev_handler = function () {
        return [
            //mouse over search box or search button
            function () {
                var cache = this.f.restore();
                if (!cache) {
                    console.log('请等文件列表加载完成再搜索!');
                    return;
                }
                if (!cache.data) {
                    console.log('准备加载数据!');
                    var year = new Date().getUTCFullYear(),
                            month = new Date().getUTCMonth();
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
                this.f.trigger(2);
                //this.el(1,true).click();
            },
            // click
            function () {
                var cache = this.f.restore();
                if (!cache || !cache.data) {
                    this.el(2, true).innerHTML = '<font color="red">没有数据</font>';
                    return;
                }
                //search
                cache.kw = this.el(0, true).value;
                var kw = cache.kw.split(' ').filter(function (e) {
                    return (e.length > 0);
                });

                var key = Object.keys(cache.data), result = [], td;
                var i = key.length - 1, j, mark, count = 0;
                while (count < 15 && i >= 0) {
                    if (kw.length <= 0) {
                        result.push(key[i--]);
                        count++;
                        continue;
                    }
                    td = cache.data[key[i]];
                    mark = 0;
                    for (j = 0; j < kw.length; j++) {
                        if (td.title.indexOf(kw[j]) >= 0 || td.text.indexOf(kw[j]) >= 0) {
                            mark++;
                        }
                    }
                    if (mark === kw.length) {
                        result.push(key[i]);
                        count++;
                    }
                    i--;
                }

                cache.result = result;
                this.f.cache(cache);

                if (result.length > 0) {
                    this.clean_up();
                    this.child = sip.o.main.match_list(this.el(2), this.settings.key).show();
                } else {
                    this.el(2, true).innerHTML = '<font color="red">搜索不到符合条件的记录</font>';
                }
            }
        ];
    };

    o.after_add_event = function () {
        //load files
        // clear_cache: {msbox/asearch/recent} 相应键为true时清空缓存。
        var cc = this.f.restore('clear_cache');
        if (cc && cc['msbox']) {
            //console.log('clean cache');
            this.f.cache(null);
            delete cc['msbox'];
            this.f.cache(cc, 'clear_cache');
        }
        var cache = this.f.restore();
        o.cache = cache;
        if (!cache) {
            //console.log('main_sbox: get new files');
            $.getJSON(sip.s.files_path + '?t=' + cardjs.lib.rand(8), function (data) {
                cache = {
                    files: data,
                    data: null,
                    kw: null,
                    result: null
                };
                this.f.cache(cache);
                o.cache = cache;
            }.bind(this));
        }
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
    };

    o.gen_html = function () {
        var id = [];
        for (var i = 0; i < 3; i++) {
            id.push(this.el(i));
        }
        var content = Mustache.render($('#tp-art-search-box').html(), {ids: id});
        return sip.f.add_frame('tp-frame-tag-card', content, '搜索', 'margin:0px;margin-top:5px;');
    };

    o.add_event = function () {
        //o.f.on('focus', 0, 0);
        this.f.on('mouseover', 0, 0);
        this.f.on('mouseover', 1, 0);
        this.f.on('keyup', 0, 1);
        this.f.on('click', 1, 2);
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
        return Mustache.render($('#tp-uma-backup').html(), {ids: [this.el(0), this.el(1)]});
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
                        cardjs.lib.url_set_param('index.html', {});
                        window.location.reload(true);
                    }, function (r) {
                        alert(r);
                        cardjs.lib.url_set_param('index.html', {});
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

