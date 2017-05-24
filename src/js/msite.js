/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */

var ms = cardjs.cNew({
    server_page: 'php/serv.php'
});

ms.d = {
    right: ['hello', 'content1', 'content2', 'content3']
};
ms.o.MPanel = {
    cNew: function (container_id) {
        var mp = ms.PANEL.cNew(container_id,
                [
                    ['账号', ['UMgr']],
                    ['主页', ['MPage']]
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
ms.o.UMgr = {
    cNew: function (container_id) {
        var um = ms.CARD.cNew(container_id);

        um.f.merge({
            id_num: 0,
            id_header: 'umgr',
            fetch: ['get_user_info']
        });

        um.data = um.tpd = null;

        um.gen_ev_handler = function () {
            if (um.data.login) {
                um.ev_handler = [
                    function () {
                        um.f.fetch('logout', null, function () {
                            //console.log('refresh');
                            um.refresh();
                        });
                    }
                ];
            } else {
                um.ev_handler = [
                    function () {
                        um.objs[0].value = '';
                        um.objs[1].value = '';
                    }, function () {
                        var user_info = {
                            user: um.objs[0].value,
                            psw: md5(um.objs[1].value)
                        };
                        //console.log(user_info);
                        um.f.fetch('login', user_info,
                                function () {
                                    um.refresh();
                                },
                                false,
                                function (d) {
                                    um.objs[4].innerHTML=d;
                                });
                    }
                ];
            }

        };
        um.add_event = function () {
            if (um.data.login) {
                um.f.on('click', 0);
            } else {
                um.f.on('click', 2, 1);
                um.f.on('click', 3, 0);
            }
        };

        um.data_parser = function () {
            um.tpd = null;
            um.f.merge({
                id_num: 0,
                add_event: false
            });
            if (!um.data) {
                return;
            }
            um.tpd = um.data;
            um.f.merge({add_event: true});
            if (!um.tpd.login) {
                um.f.merge({id_num: 5});
                return;
            }
            um.f.merge({id_num: 1});
        };

        um.gen_html = function () {
            if (!um.tpd) {
                return "正在获取登录信息 ...";
            }
            if (um.tpd.login) {
                um.tpd.id = um.ids;
                return(Mustache.render($('#umgr-welcome').html(), um.tpd));
            } else {
                um.tpd.id = um.ids;
                return(Mustache.render($('#umgr-login').html(), um.tpd));
            }
        };
        um.after_add_event = function () {
            if (!um.tpd) {
                um.refresh();
            }
        };
        return um;
    }
};
ms.o.MPage = {
    cNew: function (container_id) {
        var m = ms.CARD.cNew(container_id);
        m.f.merge({
            id_num: 1,
            id_header: 'main'
        });
        m.gen_html = function () {
            //return (Mustache.render(document.getElementById('main-page').innerHTML, m));
            var d = {
                'ids': m.ids,
                'right': ms.d.right
            };
            return (Mustache.render(document.getElementById('main-card').innerHTML, d));
        };

        m.after_add_event = function () {
            m.objs[0].innerHTML = 'hello, world!';
        };

        return m;
    }
};



