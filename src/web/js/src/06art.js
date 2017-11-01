/* global cardjs, sip, Mustache */

sip.o.art.art_wrap = cardjs.create({
    type: 'panel',
    pages: {
        '编辑': ['sip.o.art.editor'],
        '搜索': ['sip.o.art.search_box'],
        '图片': ['sip.o.art.list_orphan_img'],
        '设置': ['sip.o.art.set_wrap'],
        '备份': ['sip.o.art.backup'],
        'MDE': ['sip.o.art.simplemde'],
        '说明': ['sip.o.art.help']
    },
    style: {
        'tags': ' ',
        'tag_active': 'tag-active',
        'tag_normal': 'tag-normal',
        'page': 'page',
        'card': ' '
    }
});

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
                    this.show();
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
                //console.log(cache.content[i -s]);
                var c = cache.content[i - s];
                var id = (c.id);
                var key = c.ctime.substr(0, 4) + parseInt(c.ctime.substr(5, 2));
                return(function () {
                    for (var i = s; i < e; i++) {
                        this.el(i, true).style.backgroundColor = '';
                    }
                    this.f.cache(id, 'art_select_id');
                    cardjs.lib.url_set_params('index.html', {id: id, key: key});
                    this.f.clear_cache('clear_art_board');
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
                    }.bind(this));
                    this.show();
                    if (this.data.length === 0) {
                        alert('没有孤儿图片');
                    }
                }.bind(this));
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

//    o.data_parser = function () {
//        this.editor && this.editor.destroy();
//        this.editor = null;
//    };

    o.gen_ev_handler = function () {
        return {
            'commit': function () {
                var content = this.editor.txt.html();
                var cache = this.f.restore();
                var data = {
                    'title': cardjs.lib.encode_utf8(this.el(0, true).value),
                    'content': cardjs.lib.encode_utf8(content),
                    'type': this.el(2, true).options[this.el(2, true).selectedIndex].value,
                    'id': cache.cache_id,
                    'top': this.el(10, true).checked ? 1 : 0,
                    'lock': this.el(9, true).checked ? 1 : 0
                };
                //console.log(data.content);
                if (!confirm('确定提交？')) {
                    return;
                }

                this.f.clear_cache('update_article');

                //cardjs.lib.url_set_params('index.html');

                this.el(5, true).innerHTML = '正在提交数据 ...';
                this.f.fetch('post_article', data, function (d) {
                    //this.f.trigger('new');
                    sip.db.load_files();
                    this.el(5, true).innerHTML = '文章: #' + d.id;
                    this.save_cache();
                    this.f.cache(d.id, 'art_select_id');
                    var cache = this.f.restore();
                    cache.cache_id = d.id;
                    this.f.cache(cache);
                    //console.log(cache);
                    alert('提交成功!');
                }.bind(this), function () {
                    this.el(5, true).innerHTML = '提交失败！';
                    alert('\n提交失败！');
                }.bind(this));
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
                this.editor.txt.clear();
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
                    var pos = cardjs.lib.get_DOM_offset(this.el(7, true));
                    // style.width= "123px"
                    this.el(8, true).style.left = (pos.left - window.parseInt(this.el(8, true).style.width)) + "px";
                    this.el(8, true).style.top = (pos.top + 8) + "px";
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
        var ids = [];
        var atype = this.article_type;
        for (var i = 0; i < 11; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-uma-editor'), {ids: ids, atype: atype});
    };

    function create_editor(eid, status_bar, upload_support) {

        var e = new wangEditor('#' + eid);

        if (upload_support) {
            e.customConfig.uploadImgServer = './web/php/upload.php';
            e.customConfig.uploadImgMaxSize = 4 * 1024 * 1024;
            e.customConfig.uploadImgMaxLength = 1;
            var param = {tk: cardjs.lib.cookie_get('tk')};

            e.customConfig.uploadImgParams = param;
            var func = {
                fail: function (xhr, editor, result) {
                    console.log(result.errno, result.msg);
                }
            };
            e.customConfig.uploadImgHooks = func;
            e.customConfig.uploadFileName = 'upload';
        }

        e.customConfig.onchange = function () {
            status_bar.innerHTML = "已修改，未保存";
        };

        e.create();

        // plugin full screen
        window.wangEditor.fullscreen.init('#' + eid);

        return e;
    }

    o.after_add_event = function () {

        this.editor = create_editor(this.el(1), this.el(5, true), sip.uset.upload);

        //读取缓存
        var sid, cid, uid, cache;

        cache = this.f.restore() || {
            cache_id: 0
        };

        cid = cache.cache_id;
        sid = this.f.restore('art_select_id') || 0;

        uid = window.Math.floor(cardjs.lib.url_get_param('id'));
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
            this.editor.txt.html('读取数据中 ...');
            this.f.fetch('fetch_article', {'id': sid}, function (data) {
                //$this->ok(array('id'=>$id,'type'=>$type,'title'=>$title,'content'=>$content));

                var cache = this.f.restore() || {};
                cache.cache_id = data.id;
                cache.title = cardjs.lib.decode_utf8(data.title);
                cache.html = cardjs.lib.decode_utf8(data.content);
                cache.type = data.type;
                cache.lock = !(data.lock === 0);
                cache.top = !(data.top === 0);

                this.f.cache(cache);
                //console.log('editor fetch (data,cache):',data,cache);
                //console.log('loadhtml', sip.cache.article.html);
                this.load_cache();
            }, false, function (r) {
                this.f.trigger('new');
                this.editor.txt.html('<font color="red">' + r + '</font>');
            });
        } else {
            this.f.trigger('new');
            //this.el(4,true).click();
        }
    };

    o.save_cache = function () {
        //console.log('save_cache');
        var cache = this.f.restore() ||
                {
                    title: '',
                    type: 0,
                    html: '',
                    lock: false,
                    top: false
                };


        var title = this.el(0, true);
        if (title) {
            cache.title = title.value;
        }

        var type = this.el(2, true);
        if (type) {
            cache.type = type.selectedIndex;
        }

        var e = this.editor;
        if (e && e.txt && e.txt.html) {
            cache.html = e.txt.html();
        }

        var lock = this.el(9, true);
        if (lock) {
            cache.lock = lock.checked;
        }

        var top = this.el(10, true);
        if (top) {
            cache.top = top.checked;
        }
        // console.log('save cache: ', cache);
        
        this.f.cache(cache);
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
            this.editor.txt.html(filterXSS(cache.html));
            //console.log('raw',cache.html);
            //console.log('fxss',filterXSS(cache.html));
            //this.editor.txt.html(cache.html);
            this.el(9, true).checked = cache.lock;
            this.el(10, true).checked = cache.top;
            var cid = cache.cache_id;
            if (cid) {
                this.el(5, true).innerHTML = "文章： #" + cid;
            } else {
                this.el(5, true).innerHTML = "新文章";
            }
        }
    };

    o.clean_up = function () {
        if (this.editor) {
            this.save_cache();
            //this.editor.destroy();
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
                this.show();
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
        var name = cardjs.lib.decode_utf8(sip.uset['banner_name']);
        var desc = cardjs.lib.decode_utf8(sip.uset['banner_desc']);
        if (name && name.length > 0) {
            this.el(0, true).value = cardjs.lib.html_escape(name);
        }
        if (desc && desc.length > 0) {
            this.el(1, true).value = cardjs.lib.html_escape(desc);
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
                sip.uset['banner_name'] = cardjs.lib.encode_utf8(this.el(0, true).value);
                sip.uset['banner_desc'] = cardjs.lib.encode_utf8(this.el(1, true).value);
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

sip.o.art.help = cardjs.create({
    settings: {header: 'art_help'},
    gen_html: function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-help'));
    }
});

sip.o.art.search_box = cardjs.create({
    child: null,
    settings: {
        header: 'main_search_box',
        add_event: true,
        key: cardjs.lib.gen_key()
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
            this.el(0, true).value = cardjs.lib.html_escape(cache.cache_kw);
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
});

sip.o.art.simplemde = function (cid) {
    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'smde',
        key: key
    });

    o.smde = null;

    o.clean_up = function () {
        //console.log('destory');
        this.smde && this.smde.toTextArea();
        this.smde = null;
    };

    o.save_cache = function () {
        if (!this.smde) {
            console.log('no editor');
            return;
        }
        var data = this.smde.value();
        this.f.cache(data);
    };

    o.after_add_event = function () {
        var cache = this.f.restore();
        if (!cache) {
            cache = '';
        }
        this.smde = new SimpleMDE({element: this.el(0, true)});
        this.smde.codemirror.on('change', this.save_cache.bind(this));
        this.smde.value(cache);
    };


    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-art-smde'), {ids: [this.el(0)]});
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