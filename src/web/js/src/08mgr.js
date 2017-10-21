/* global cardjs, Mustache, sip */

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
                var data = {'name': name, 'opsw': md5(sip.s.rainbow + md5(org_psw)), 'npsw': md5(sip.s.rainbow + md5(new_psw))};
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

sip.o.mgr.user_mgr_wrap = cardjs.create({
    child: null,
    settings: {
        header: 'mgr_umgr_wrap',
        key: cardjs.lib.gen_key()
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
            this.child = sip.o.mgr.user_mgr(this.el(0), this.settings.key, this.update.bind(this)).show();
            return;
        }
        this.f.fetch('fetch_all_user_info', function (data) {
            this.f.cache(data);
            this.child = sip.o.mgr.user_mgr(this.el(0), this.settings.key, this.update.bind(this)).show();
        });
    },
    clean_up: function () {
        this.child && this.child.destroy();
        //this.f.cache(null);
    }
});

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
                        psw: md5(sip.s.rainbow + md5(this.el(1, true).value))
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
        this.f.cache(null);  //?
        this.after_add_event();
    }.bind(o);

    o.show_user_panel = function () {
        //console.log('developing: show_user_panel ');
        var info = this.f.restore();
        //console.log('user_info:', info);
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
            //console.log(info);
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