/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */

var ms = cardjs.cNew({
    server_page: 'php/serv.php'
});

ms.f.add_frame = function (frame_id, content, tag, style) {
    var d = {
        'tag': tag,
        'style': style || "",
        'content': content
    };
    return Mustache.render($('#' + frame_id).html(), d);
};



ms.cache = {
    //article_type: ['其他', '资讯'],
    // 文章分类
    atypes: ['其他', '资讯'],
    article: {
        title: null,
        html: null,
        type: null,
        cache_id: null,
        selected_id: null,
        top10: null
    },
    search: {
        'current_kw': '',
        'pn': 0,
        'page_size': 15,
        'total': -1,
        'cache_kw': '',
        'content': null
    }
};

ms.o.MPanel = {
    cNew: function (container_id) {
        var mp = ms.PANEL.cNew(container_id,
                [
                    //['测试', ['Test']],
                    ['主页', ['MPage']],
                    ['登录', ['UM_wrap']]
                ],
                {
                    // 顶上的标签按钮
                    'tag': 'cjs-pn-tag',
                    // 各个“页”的外框
                    'page': 'cjs-pn-div',
                    // 各个“卡片”的外框
                    'card': 'cjs-card-div',
                    // 选中时
                    'active': 'cjs-pn-tag-active'
                }
        );

        return mp;
    }
};

ms.o.AT_search_result = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
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

            if (!ms.cache.search.content ||
                    !ms.cache.search.content.length ||
                    ms.cache.search.content.length <= 0) {
                return;
            }

            o.d.num = ms.cache.search.content.length;
            o.d.page_num = Math.ceil(ms.cache.search.total / ms.cache.search.page_size);
            o.f.merge({id_num: 2 + Math.min(o.d.page_num, 9) + o.d.num});
            o.d['first'] = Math.max(ms.cache.search.pn - 5, 0);
            o.d['last'] = Math.min(o.d['first'] + 9, o.d.page_num);
        };

        o.show_page = function (pn) {
            if (pn === ms.cache.search.pn) {
                console.log('same page!');
                return;
            }
            ms.cache.search.pn = pn;
            o.f.fetch('search', {'kw': ms.cache.search.current_kw, 'pn': pn, 'get_total': false, 'page_size': ms.cache.search.page_size},
                    function (data) {
                        ms.cache.search.content = data.data;
                        o.show();
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
                    //console.log(ms.cache.search.content);
                    var id = (ms.cache.search.content[i - s].id);
                    return(function () {
                        for (var i = s; i < e; i++) {
                            o.objs[i].style.backgroundColor = '';
                        }
                        ms.cache.article.selected_id = id;
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
                o.f.on('click', i);
            }
        };

        o.after_add_event = function () {
            //console.log('fire');
            if (o.d.num > 0) {
                var idx = ms.cache.search.pn - o.d.first + 1;
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
                c = ms.cache.search.content[i - m];
                o.d.tb.push({
                    oid: o.ids[i],
                    title: filterXSS(c.title),
                    time: ms.f.YMD(c.modify),
                    author: filterXSS(c.name),
                    type: ms.cache.atypes[c.type]
                });
            }
            return (Mustache.render($('#tp-at-search-result').html(), o.d));
        };

        return o;
    }

};

ms.o.AT_editor = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
            id_num: 7,
            id_header: 'edt',
            add_event: true
        });

        o.article_type = [];
        ms.cache.atypes.forEach(function (e, i) {
            o.article_type.push([i, e]);
        });


        o.data_parser = function () {
            o.editor && o.editor.destroy();
            o.editor = null;
        };

        o.gen_ev_handler = function () {
            o.ev_handler = [
                function () {
                    var data = {
                        'title': o.objs[0].value,
                        'content': o.editor.$txt.html(),
                        'type': o.objs[2].options[o.objs[2].selectedIndex].value,
                        'id': ms.cache.article.cache_id
                    };
                    if (!confirm('确定提交？')) {
                        return;
                    }
                    o.objs[5].innerHTML = '正在提交数据 ...';
                    o.f.fetch('post_article', data, function (r) {
                        alert('提交成功!');
                        o.objs[4].click();
                        //console.log(r);
                    }, false, function (r) {
                        o.objs[5].innerHTML = '提交失败！';
                        alert(r + '\n提交失败！');
                    });
                },
                function () {
                    ms.cache.article.cache_id = null;
                    ms.cache.article.selected_id = null;
                    ms.cache.article.title = null;
                    ms.cache.article.html = null;
                    o.objs[0].value = '';
                    o.objs[2].options[0].selected = true;
                    o.editor.$txt.html('<p><br></p>');
                    o.objs[5].innerHTML = "新文章";
                },
                function () {
                    if (!confirm("确定删除文章？")) {
                        return;
                    }
                    o.f.fetch('delete_article', ms.cache.article.cache_id,
                            function () {
                                alert('删除成功！');
                                ms.cache.search.content = null;
                                o.objs[4].click();
                            }, false, function (r) {
                        alert(r);
                    });
                }
            ];
        };

        o.add_event = function () {
            o.f.on('click', 3, 0);
            o.f.on('click', 4, 1);
            o.f.on('click', 6, 2);
        };

        o.gen_html = function () {
            return Mustache.render($('#tp-at-editor').html(), o);
        };

        o.after_add_event = function () {
            o.editor && o.editor.destroy();
            o.editor = null;
            o.editor = new wangEditor(o.ids[1]);
            o.editor.config.uploadImgUrl = "./php/upload.php";
            o.editor.config.uploadImgFileName = 'upload';
            o.editor.create();

            //console.log(ms.cache.article);

            //读取缓存
            var sid, cid;
            cid = ms.cache.article.cache_id;
            sid = ms.cache.article.selected_id;
            if (ms.cache.article.html && ms.cache.article.html.length > 0) {
                if (cid === sid || !(sid)) {
                    //console.log('load_cache');
                    o.load_cache();
                    return;
                }
            }

            if (sid > 0) {
                o.editor.$txt.html('读取数据中 ...');
                //console.log('fetch_article');
                o.f.fetch('fetch_article', {'id': sid}, function (data) {
                    //$this->ok(array('id'=>$id,'type'=>$type,'title'=>$title,'content'=>$content));
                    ms.cache.article.cache_id = data.id;
                    ms.cache.article.title = data.title;
                    ms.cache.article.html = data.content;
                    ms.cache.article.type = data.type;
                    o.load_cache();
                }, false, function (r) {
                    console.log(r);
                });
            } else {
                o.objs[4].click();
            }
        };

        o.save_cache = function () {
            //console.log('save_cache');
            ms.cache.article.title = o.objs[0].value;
            ms.cache.article.type = o.objs[2].selectedIndex;
            if (o.editor) {
                ms.cache.article.html = o.editor.$txt.html();
            }
            // console.log(ms.cache.article);
        };

        o.load_cache = function () {
            //console.log('load_cache');
            if (ms.cache.article.html) {
                o.objs[0].value = filterXSS(ms.cache.article.title);
                o.objs[2].options[ms.cache.article.type].selected = true;
                o.editor.$txt.html(filterXSS(ms.cache.article.html));
                var cid = ms.cache.article.cache_id;
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
    }
};

ms.o.AT_wrap = {
    cNew: function (cid) {
        var pn = ms.PANEL.cNew(cid,
                [
                    ['搜索', ['AT_search_box']],
                    ['编辑', ['AT_editor']],
                    ['说明', ['AT_help']]
                ],
                {
                    // 顶上的标签按钮
                    'tag': 'cjs-pn-tag',
                    // 各个“页”的外框
                    'page': 'cjs-patw-div',
                    // 各个“卡片”的外框
                    'card': 'cjs-card-div',
                    // 选中时
                    'active': 'cjs-pn-tag-active'
                }
        );
        return pn;
    }
};

ms.o.UM_logout = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
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
                    o.child = ms.o.UM_change_psw.cNew(o.ids[2], o.parent).show();
                },
                // logout
                function () {
                    o.f.fetch('logout', null, function (r) {
                        ms.cache.umwrap && ms.cache.umwrap.refresh();
                    });
                }
            ];
        };

        o.clean_up = function () {
            o.child && o.child.destroy();
        };

        o.add_event = function () {
            o.f.on('click', 0);
            o.f.on('click', 1);
        };

        return o;
    }
};

ms.o.UM_change_psw = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);

        o.f.merge({
            id_num: 6,
            id_header: 'um_chpsw',
            add_event: true
        });

        o.gen_html = function () {
            var content = Mustache.render($('#tp-um-change-password').html(), o);
            return ms.f.add_frame('tp-frame-tag-card', content, '修改信息');
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
                    o.f.fetch('user_modify', data, function (r) {
                        o.objs[5].innerHTML = ms.f.html_escape(r);
                        ms.cache.umwrap && ms.cache.umwrap.refresh();
                    }, false, function (r) {
                        o.objs[5].innerHTML = ms.f.html_escape(r);
                    });
                }
            ];
        };

        o.add_event = function () {
            //console.log(o.ids[4]);
            o.f.on('click', 4, 0);
            //o.f.on('click',1,0);
        };

        return o;
    }
};

ms.o.UM_management = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);

        o.tpd = null;
        o.data = null;

        o.f.merge({
            id_num: 9,
            id_header: "um_mod",
            add_event: false,
            fetch: ['fetch_all_user_info']
        });

        o.data_parser = function () {
            if (o.data) {
                o.f.merge({add_event: true});
                o.tpd = o.data;
                //console.log(o.tpd);
            }
        };

        o.gen_ev_handler = function () {
            o.ev_handler = [
                // select change
                function () {
                    var id = o.objs[0].value;
                    o.objs[1].value = ms.f.html_escape(o.tpd.name_list[id]);
                    o.objs[8].value = ms.f.html_escape(o.tpd.user_list[id]);
                    if (o.tpd.ban_list[id]) {
                        o.objs[8].style.backgroundColor = 'lightgray';
                    } else {
                        o.objs[8].style.backgroundColor = 'transparent';
                    }
                    var pv = $('[name=' + o.ids[3] + ']');
                    for (var i = 0; i < pv.length; i++) {
                        pv[i].checked = o.tpd.user_prv[id][o.tpd.prv_list[i]];
                    }
                },
                // reset psw
                function () {
                    var id = o.objs[0].value;
                    o.f.fetch('user_reset', id, function (d) {
                        console.log(d);
                        o.refresh();
                    });
                },
                //ban
                function () {
                    var id = o.objs[0].value;
                    o.f.fetch('user_ban', id, function (d) {
                        console.log(d);
                        o.refresh();
                    }, function (r) {
                        console.log(r);
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
                            p.push(o.tpd.prv_list[i]);
                        }
                    }
                    o.f.fetch('user_management', {'id': id, 'name': name, 'user': user, 'prv_list': p},
                            function (r) {
                                console.log(r);
                                o.refresh();
                            }, false, function (r) {
                        console.log(r);
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
                            param.prv.push(o.tpd.prv_list[i]);
                        }
                    }
                    //console.log(param);
                    o.f.fetch('user_add', param, function (r) {
                        console.log(r);
                        o.refresh();
                    }, false, function (r) {
                        console.log(r);
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
            if (!o.tpd) {
                return('正在读取数据 ...');
            }
            o.tpd['ids'] = o.ids;
            //console.log(o.tpd);
            //return 'debug';
            var content = Mustache.render($("#tp-um-modify").html(), o.tpd);
            return ms.f.add_frame('tp-frame-tag-card', content, '账号管理');
        };

        o.after_add_event = function () {
            if (!o.tpd) {
                o.refresh();
            } else {
                o.ev_handler[0]();
            }
        };

        return o;
    }

};

ms.o.UM_wrap = {
    cNew: function (container_id) {
        var um = ms.CARD.cNew(container_id);
        ms.cache.umwrap = um;

        um.f.merge({
            id_num: 5,
            id_header: 'um-wrap'
        });
        um.o = [[], []];

        um.gen_html = function () {
            return Mustache.render($('#tp-um-wrap').html(), um);
        };

        um.show_user_panel = function () {
            if (!ms.cache.user_info) {
                return;
            }
            var info = ms.cache.user_info;
            um.o[0].push(ms.o.AT_wrap.cNew(um.ids[0]).show());
            var current_id = 1;
            if (info && info.login) {
                um.objs[current_id++].innerHTML = Mustache.render($('#tp-um-welcome').html(), info);
                if (info.prv['USERM']) {
                    um.o[1].push(ms.o.UM_management.cNew(um.ids[current_id++]).show());
                }
                um.o[1].push(ms.o.UM_logout.cNew(um.ids[current_id++]).show());
            } else {
                um.o[1].push(ms.o.UM_login.cNew(um.ids[current_id++]).show());
            }

        };

        um.after_add_event = function () {
            if (ms.cache.user_info) {
                //console.log('using cache');
                um.show_user_panel();
            } else {
                um.f.fetch('fetch_user_info', null, function (info) {
                    ms.cache.user_info = info;
                    um.show_user_panel();
                });
            }
        };

        um.refresh = function () {
            ms.cache.user_info = null;
            um.clean_up();
            um.show();
        };

        um.clean_up = function () {
            um.o.forEach(function (side) {
                side.forEach(function (e) {
                    if (e) {
                        e.destroy();
                    }
                });
            });
            um.o = [[], []];
        };
        return um;
    }
};

ms.o.AT_help = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
            id_num: 1,
            id_header: 'at_help'
        });

        o.gen_html = function () {
            return $('#tp-at-help').html();
        };

        return o;
    }
};

ms.o.AT_search_box = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
            id_num: 3,
            id_header: 'at_search',
            add_event: true
        });

        o.gen_html = function () {
            return Mustache.render($('#tp-at-search-box').html(), o);
        };

        o.child = null;

        o.gen_ev_handler = function () {
            o.ev_handler = [
                function () {
                    //console.log('fire');
                    var kw = o.objs[0].value;
                    ms.cache.search.current_kw = kw;

                    if (kw !== ms.cache.search.cache_kw
                            || !ms.cache.search.content
                            || ms.cache.search.content.length === 0) {
                        ms.cache.search.pn = 0;
                        o.child && o.child.destroy();
                        o.objs[2].innerHTML = "搜索中 ...";
                        o.f.fetch('search', {'kw': kw, 'pn': 0, 'get_total': true, 'page_size': ms.cache.search.page_size},
                                function (data) {
                                    ms.cache.search.cache_kw = kw;
                                    ms.cache.search.total = data.total;
                                    ms.cache.search.content = data.data;
                                    //console.log(data);

                                    o.child = ms.o.AT_search_result.cNew(o.ids[2]).show();
                                }, false,
                                function (r) {
                                    console.log(r);
                                });
                    } else {
                        console.log('using cache!');
                        if (!o.child) {
                            o.child = ms.o.AT_search_result.cNew(o.ids[2]).show();
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
            if (!o.child && ms.cache.search.content
                    && ms.cache.search.content.length > 0) {
                o.objs[0].value = ms.cache.search.cache_kw;
                ms.cache.search.current_kw = ms.cache.search.cache_kw;
                o.child = ms.o.AT_search_result.cNew(o.ids[2]).show();
            }
            o.objs[0].focus();
        };

        o.clean_up = function () {
            o.child && o.child.destroy();
        };

        o.add_event = function () {
            //console.log('add event');
            o.f.on('keyup', 0, 1);
            o.f.on('click', 1, 0);
        };

        return o;
    }
};

ms.o.Test = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
            id_num: 10,
            id_header: 'test',
            add_event: true
        });

        o.gen_ev_handler = function () {
            o.ev_handler = [
                function () {
                    o.test('aaa', function () {
                        console.log('hello 1');
                    }, true, 'bbb', [1, 2, 3], {a: 1, b: 2}, function () {
                        console.log('hello 2');
                    });
                }
            ];
        };

        o.add_event = function () {
            o.f.on('click', 0);
        };

        o.test = function () {
            console.log("arguments", arguments, "type");
            function type(obj) {
                return Object.prototype.toString.call(obj).slice(8, -1);
            }
            var i, param = [], func = [];
            for (i = 0; i < arguments.length; i++) {
                console.log(type(arguments[i]));
                switch (type(arguments[i])) {
                    case 'Function':
                        func.push(arguments[i]);
                        break;
                    default:
                        param.push(arguments[i]);
                        break;
                }
            }
            console.log(param, func);
            func[0]();
            func[1]();

        };

        o.gen_html = function () {
            var html = '<div style="margin:10px;">' +
                    '<input type="button" id="' + o.ids[0] + '" class="btn btn-info" value="test">' +
                    '</div>';
            return html;
        };


        return o;
    }
};

ms.o.UM_login = {
    cNew: function (container_id) {
        var um = ms.CARD.cNew(container_id);

        um.f.merge({
            id_num: 5,
            id_header: 'um_login',
            add_event: true,
            fetch: ['fetch_user_info']
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
                    um.f.fetch('login', user_info,
                            function () {
                                //console.log('reload');
                                //um.parent && um.parent.refresh();
                                ms.cache.umwrap && ms.cache.umwrap.refresh();
                            },
                            false,
                            function (d) {
                                um.objs[4].innerHTML = d;
                            });
                }
            ];
        };

        um.add_event = function () {
            um.f.on('click', 2, 1);
            um.f.on('click', 3, 0);
        };

        um.gen_html = function () {
            var content = Mustache.render($('#tp-um-login').html(), um);
            return(ms.f.add_frame('tp-frame-tag-card', content, "登录", "width:185px;margin:8px;"));
        };

        return um;
    }
};

ms.o.ShowTop10 = {
    cNew: function (cid, type) {
        var o = ms.CARD.cNew(cid);
        o.f.merge({
            id_header: 'st10',
            id_num: 1,
            add_event: true
        });

        o.data = [];
        ms.cache.article.top10[type].forEach(function (e) {
            o.data.push({
                title: filterXSS(e.title),
                time: ms.f.YMD(e.time)
            });
        });

        o.gen_html = function () {
            return Mustache.render($('#tp-top-10').html(), o);
        };

        return o;
    }
};

ms.o.MPage = {
    cNew: function (container_id) {
        var m = ms.CARD.cNew(container_id);
        m.f.merge({
            id_num: 2,
            id_header: 'main',
            add_event: true
        });

        m.child = [];

        m.gen_html = function () {
            return Mustache.render($('#tp-main-page').html(), m);
        };

        m.after_add_event = function () {
            $.getJSON('json/top10.json', function (data) {
                ms.cache.article.top10 = data;
                m.child.push(ms.o.ShowTop10.cNew(m.ids[0], 0).show());
                m.child.push(ms.o.ShowTop10.cNew(m.ids[1], 1).show());
            });
        };

        m.clean_up = function () {
            m.child.forEach(function (e) {
                e.destroy();
            });
            m.child = [];
        };
        return m;
    }
};



