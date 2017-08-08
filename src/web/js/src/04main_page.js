/* global cardjs, sip, Mustache */

sip.o.Main_wrap = cardjs.create({

    settings: {
        header: 'main_wrap',
        add_event: true
    },

    contents: [],

    pager: null,

    gen_ev_handler: function () {
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
    },

    show_main_page: function () {
        //console.log('show_main_page:',this);
        this.clear_contents();
        this.contents.push(sip.o.main.article_board(this.el(5)).show());
        var cnum = 6;
        this.contents.push(sip.o.main.search_box(this.el(cnum++)).show());
        this.contents.push(sip.o.main.group_view(this.el(cnum++)).show());
        if (sip.uset.show_mbox) {
            this.contents.push(sip.o.main.msg(this.el(cnum++)).show());
        }
    },

    show_mgr_page: function () {
        //console.log('show_mgr_page developing');
        //return;
        this.clear_contents();
        this.contents.push(sip.o.art.art_wrap(this.el(4)).show());
        this.contents.push(sip.o.mgr.user_panel(this.el(6)).show());
    },

    add_event: function () {
        this.f.on('click', 0);
        this.f.on('click', 1);
    },
    gen_html: function () {
        var ids = [];
        for (var i = 0; i < 10; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-main-wrap'), {ids: ids});
    },
    show_pager: function () {
        this.clear_pager();
        this.pager = sip.o.main.pager(this.el(4)).show();
    },

    clear_pager: function () {
        //console.log('clear_pager');
        this.pager && this.pager.destroy();
        this.pager = null;
        this.el(4, true).innerHTML = '';
    },

    clear_contents: function () {

        this.clear_pager();

        //console.log('clear_contents:',this.contents);

        if (this.contents && this.contents.length > 0) {
            this.contents.forEach(function (e) {
                //console.log('main:',o);
                //console.log('clear contents:',e);
                e.destroy();
            });
        }

        this.contents = [];

        for (var i = 4; i < 10; i++) {
            this.el(i, true).innerHTML = '';
        }
    },

    reload: function () {
        //console.log('call main_page.show()');
        this.f.cache(null, 'um_cur_user_info');
        this.f.cache(null, 'um_all_user_info');
        this.clear_contents();
        this.show_mgr_page();
    },

    update_banner: function (param) {
        var name, desc;

        param = param || {};

        name = param.name;
        desc = param.desc;

        //console.log('update_banner',name,desc);

        if (name === undefined) {
            name = cardjs.lib.decode_utf8(sip.uset.banner_name);
        }

        if (desc === undefined) {
            desc = cardjs.lib.decode_utf8(sip.uset.banner_desc);
        }


        this.el(2, true).innerHTML = cardjs.lib.html_escape(name);

        this.el(3, true).innerHTML = cardjs.lib.html_escape(desc);


        name = null;
        desc = null;
    },

    after_add_event: function () {
        this.clear_contents();
        this.show_main_page();

        this.f.event('main_update_banner', this.update_banner);
        this.f.event('main_clear_pager', this.clear_pager);
        this.f.event('main_show_pager', this.show_pager);

        this.f.event('main_update_banner');
    }
});