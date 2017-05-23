/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cardjs, Mustache */

var ms = cardjs.cNew();

ms.d = {
    right: ['hello', 'content1', 'content2', 'content3']
};
ms.o.MPanel = {
    cNew: function (container_id) {
        var mp = ms.PANEL.cNew(container_id,
                [
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
ms.o.UMgr={
    cNew:function(container_id){
        var um=ms.CARD.cNew(container_id);
        
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



