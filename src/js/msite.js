/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */

var ms = cardjs.cNew({
    server_page: 'php/serv.php'
});

// 辅助类


ms.d = {
    right: ['hello', 'content1', 'content2', 'content3']
};

ms.f.add_frame = function (frame_id, content, tag, width) {
    var d = {
        'tag': tag,
        'width': width,
        'content': content
    };
    return Mustache.render($('#' + frame_id).html(), d);
};

ms.o.MPanel = {
    cNew: function (container_id) {
        var mp = ms.PANEL.cNew(container_id,
                [
                    ['账号', ['UM_wrap']],
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

ms.o.UM_change_psw = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);
        
        o.f.merge({
            id_num: 6,
            id_header: 'um_chpsw',
            add_event:true
        });

        o.gen_html = function () {
            var content=Mustache.render($('#tp-um-change-password').html(),o);
            return ms.f.add_frame('tp-frame-tag-card',content,'修改信息',175);
            //return Mustache.render($('#tp-frame-tag-card').html(),d);
            //return('debug');
        };
        
        o.gen_ev_handler=function(){
            o.ev_handler=[
               function(){
                   //console.log('hello');
                   var name=""+o.objs[0].value;
                   var org_psw=""+o.objs[1].value;
                   var new_psw=""+o.objs[2].value;
                   var re_psw=""+o.objs[3].value;
                   
                   if(new_psw!==re_psw){
                       o.objs[5].innerHTML='两次输出密码不同！';
                       return;
                   }
                   
                   if(new_psw.length <= 0 || org_psw.length <= 0 ){
                       o.objs[5].innerHTML= '内容过短！';
                       return;
                   }
                   console.log(new_psw,org_psw,name);
                   var data={'name':name,'opsw':md5(org_psw),'npsw':md5(new_psw)};
                   o.f.fetch('change_user_info',data,function(r){
                       o.objs[5].innerHTML=ms.f.html_escape(r);
                   },true);
               }
            ];
        };
        
        
        
        o.add_event=function(){
            //console.log(o.ids[4]);
            o.f.on('click',4,0);
            //o.f.on('click',1,0);
        };
        
        return o;
    }
};

ms.o.UM_modify = {
    cNew: function (cid) {
        var o = ms.CARD.cNew(cid);

        o.tpd = null;
        o.data = null;

        o.f.merge({
            id_num: 8,
            id_header: "um_mod",
            add_event: false,
            fetch: ['get_all_user_info']
                    //verbose: true
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
                    o.objs[1].innerHTML = ms.f.html_escape(o.tpd.name_list[id]);
                    var pv = $('[name=' + o.ids[3] + ']');
                    for (var i = 0; i < pv.length; i++) {
                        pv[i].checked = o.tpd.user_prv[id][o.tpd.prv_list[i]];
                    }
                },
                // reset psw
                function () {
                    var id = o.objs[0].value;
                    o.f.fetch('reset_user', id, function (d) {
                        console.log(d);
                        o.refresh();
                    });
                },
                //ban
                function () {
                    var id = o.objs[0].value;
                    o.f.fetch('ban_user', id, function (d) {
                        console.log(d);
                        o.refresh();
                    });
                },
                //modify user
                function () {
                    var id = o.objs[0].value;
                    var pv = $('[name=' + o.ids[3] + ']');
                    var p = [];
                    for (var i = 0; i < pv.length; i++) {
                        if (pv[i].checked) {
                            p.push(o.tpd.prv_list[i]);
                        }
                        ;
                    }
                    o.f.fetch('modify_user', {'id': id, 'prv_list': p}, function (r) {
                        console.log(r);
                        o.refresh();
                    });
                    //console.log(p);
                }
            ];
        };

        o.add_event = function () {
            o.f.on('change', 0);
            o.f.on('click', 5, 1);
            o.f.on('click', 6, 2);
            o.f.on('click', 4, 3);
        };

        o.gen_html = function () {
            if (!o.tpd) {
                return('正在读取数据 ...');
            }
            o.tpd['ids'] = o.ids;
            //console.log(o.tpd);
            //return 'debug';
            var content = Mustache.render($("#tp-um-modify").html(), o.tpd);
            return ms.f.add_frame('tp-frame-tag-card', content, '账号管理', 175);
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
        um.f.merge({
            id_num: 5,
            id_header: 'umgr'
        });
        um.o = [[], []];
        um.gen_html = function () {
            return Mustache.render($('#tp-umgr-wrap').html(), um);
        };
        um.after_add_event = function () {
            um.objs[0].innerHTML = '加载数据中  ...';
            um.f.fetch('get_user_info', null,
                    function (info) {
                        var current_id = 1;
                        um.uinfo = info;
                        if (info && info.login) {
                            um.objs[current_id++].innerHTML = Mustache.render($('#tp-umgr-welcome').html(), um.uinfo);
                            um.o[1].push(ms.o.UM_change_psw.cNew(um.ids[current_id++]).show());
                            if (info.prv['USERM']) {
                                um.o[1].push(ms.o.UM_modify.cNew(um.ids[current_id++]).show());
                            }
                        } else {
                            //um.objs[0].innerHTML='load usmgr login';
                            um.o[1].push(ms.o.UM_login.cNew(um.ids[1], um).show());
                        }
                    }, false,
                    function () {
                        um.objs[0].innerHTML = '读取数据失败。';
                    });
        };

        um.refresh = function () {
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

ms.o.UM_login = {
    cNew: function (container_id, parent) {
        var um = ms.CARD.cNew(container_id);
        um.parent = parent || null;
        um.f.merge({
            id_num: 5,
            id_header: 'um_login',
            add_event: true,
            fetch: ['get_user_info']
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
                                um.parent.refresh();
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
            return(Mustache.render($('#tp-umgr-login').html(), um));
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
            return '<div id="' + m.ids[0] + '" >编写中</div>';
        };

        m.after_add_event = function () {
            m.objs[0].innerHTML = 'hello, world!';
        };

        return m;
    }
};



