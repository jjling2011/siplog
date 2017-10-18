/* global cardjs, Mustache, sip */

sip.o.main.pager = cardjs.create({
    settings: {
        header: 'pager',
        add_event: true
    },
    btn_num: 5,
    d: {},
    data_parser: function () {
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
    },
    gen_html: function () {
        var v = [];
        for (var i = this.d.first; i < this.d.last; i++) {
            v.push({id: this.el(i - this.d.first + 1), value: i + 1});
        }
        var first = {id: this.el(0), value: '首页'};
        return (Mustache.render(cardjs.lib.load_html('tp-main-pager'), {first: first, v: v}));
    },
    show_page: function (num) {
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
    },

    get_data: function (key_index, skip) {
        if (key_index >= sip.db.d.file_key.length) {
            console.log('Last page!');
            this.f.event('main_article_board_update', this.d.data);
            return;
        }
        var size = sip.db.d.page.size;
        var key = sip.db.d.file_key[key_index];
        //console.log('call get data:key/idx/skip', key, key_index, skip);
        if (key in sip.db.d.data) {
            var ids = Object.keys(sip.db.d.data[key]).sort(function (a, b) {
                return (a - b);
            }).reverse();
            //console.log(ids);
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
    },

    gen_ev_handler: function () {
        var evs = [];
        evs.push(function () {
            sip.db.d.page.cur_page = 0;
            this.show();
            //this.show_page(0);
        });

        for (var i = this.d.first; i < this.d.last; i++) {
            evs.push((function () {
                var num = i;
                return(function () {
                    sip.db.d.page.cur_page = num;
                    this.show();
                    //this.show_page(num);
                }.bind(this));
            }.bind(this)()));
        }

        return evs;
    },

    add_event: function () {
        for (var i = 0; i < this.el(); i++) {
            this.f.on('click', i);
        }
    },

    after_add_event: function () {
        //this.f.trigger(0);
        this.el(this.d.cur - this.d.first + 1, true).style.backgroundColor = 'skyblue';
        this.show_page(sip.db.d.page.cur_page);
    }
});

sip.o.main.msg = cardjs.create({
    settings: {
        key: cardjs.lib.gen_key(),
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
                        this.show();
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
        $.getJSON(sip.s.msg_path, function (data) {
            var msg = [];
            data.forEach(function (e) {
                msg.push({
                    text: filterXSS(e.text),
                    ctime: cardjs.lib.getYMD(e.ctime),
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
});

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
        var content = '<div style="color:red;">获取数据中</div>';
        if (this.data && this.data.length <= 0) {
            content = '<div style="color:red;">无数据</div>';
        }
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
            content = Mustache.render(cardjs.lib.load_html('tp-group-view'), {
                tag: tag,
                cat: cat,
                all: this.el(j + i + 1),
                front: this.el(j + i + 2)
            });
            tag = null;
        }
        return(sip.f.add_frame('tp-frame-tag-card', content, '分类浏览', 'margin-bottom:8px;'));
    };

    o.set_btn_bgcolor = function () {
        var i;
        for (i = 0; i < this.el(); i++) {
            this.el(i, true).style.backgroundColor = 'white';
        }
        for (i = 0; i < this.data.length; i++) {
            if (this.el(i, true).value === sip.db.d.page.key) {
                this.el(i, true).style.backgroundColor = 'skyblue';
            }
        }
        for (; i < this.el() - 2; i++) {
            if (this.el(i, true).value === sip.db.d.page.filter) {
                this.el(i, true).style.backgroundColor = 'skyblue';
            }
        }
    };

    o.gen_ev_handler = function () {
        var evs = [], i, j;

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
            this.el(this.el() - 2, true).style.backgroundColor = 'skyblue';
            this.f.event('main_show_pager');
        }.bind(this)));
        evs.push((function () {
            //console.log('clicked: all article');
            for (var k = 0; k < this.el(); k++) {
                this.el(k, true).style.backgroundColor = 'white';
            }
            this.el(this.el() - 1, true).style.backgroundColor = 'skyblue';
            this.f.event('main_clear_pager');
            this.f.event('main_article_board_show_front_page');
            cardjs.lib.url_set_params('index.html');
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
        var files = sip.db.get('files');
        // console.log('gv:files:',files);
        if (files === undefined) {
            // console.log('group view: reload in 3 seconds');
            setTimeout(this.show.bind(this), 5000);
            return;
        }
        this.data = Object.keys(files);
        this.f.cache(this.data);
        this.show();
    };

    return o;
};

sip.o.main.article = function (cid, data, show_all) {
    var init_style = 0;
    if (show_all) {
        init_style = 1;
    }
    return(cardjs.create({
        cid: cid,
        style: init_style,
        styles: ['article-summary', 'article-all-content'],
        data: data,
        settings: {
            header: 'single_art',
            add_event: true
        },
        gen_html: function () {
            this.data.els = [this.el('title'), this.el('content')];
            this.data.style = this.styles[this.style];
            return Mustache.render(cardjs.lib.load_html('tp-article-summary-container'), this.data);
        },
        gen_ev_handler: function () {
            return {'title': function () {
                    var id = this.data.id;
                    cardjs.lib.url_set_params('index.html', {id: id});
                    this.f.cache(id, 'art_select_id');
                    this.style = (this.style + 1) % 2;
                    this.el('content', true).className = this.styles[this.style];
                }
            };
        },
        add_event: function () {
            this.f.on('click', 'title');
        }
    }));
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
                id = window.Math.floor(cardjs.lib.url_get_param('id'));
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
        children: [],
        gen_html: function () {
            return '<div id="' + this.el(0) + '"></div>';
        },
        update: function (data) {

            if (!data || (data && data.length && data.length === 0)) {
                data = null;
            }

            // console.log('call main_art_board_update:', data);
            this.f.cache(data);
            if (!data) {
                this.el(0, true).innerHTML = "<font color=red>查无此“文”</font>";
                return;
            }

            var datas = data, show_all = 0;

            if (!cardjs.lib.isArray(data)) {
                this.f.event('main_clear_pager');
                show_all = 1;
                datas = [data];
            }

            var html = '', i;

            for (i = 0; i < this.children.length; i++) {
                this.children[i].destroy();
            }
            this.children = [];

            for (i = 0; i < datas.length; i++) {
                html += '<div id="' + this.el(i + 1) + '"></div>';
            }

            this.el(0, true).innerHTML = html;

            for (i = 0; i < datas.length; i++) {
                this.children.push(
                        sip.o.main.article(
                                this.el(i + 1),
                                datas[i],
                                show_all
                                ).show()
                        );
            }

        },
        show_front_page: function () {
            $.getJSON(sip.s.top_art_path, function (data) {
                //console.log('show_front_page');
                var d = [];
                data.forEach(function (e) {
                    d.push(sip.f.filter_json(e));
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
        },
        after_add_event: function () {
            // regist a clear_cache event for other module clear this cache;
            this.f.clear_cache('update_article', true);
            this.f.clear_cache('clear_art_board', true);

            //export a function for other module
            this.f.event('main_article_board_update', this.update, true);
            this.f.event('main_article_board_show_front_page', this.show_front_page, true);

            var cache = this.f.restore();
            if (cache) {
                this.update(cache);
                return;
            }
            var param = get_url_keyid();
            if (param.y && param.m && param.id) {
                var path = sip.s.json_path + param.y + '/' + param.m + '.json';
                $.getJSON(path, function (data) {
                    //console.log(data,tid);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === param.id) {
                            this.update(sip.f.filter_json(data[i]));
                            return;
                        }
                    }
                    this.update(null);
                }.bind(this));
                return;
            }
            // no cache, no url params 
            this.show_front_page();
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