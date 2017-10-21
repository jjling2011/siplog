/* global sip, cardjs */

sip.o.AATest = function (cid) {
    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);
    o.f.merge({
        key: key,
        header: 'test',
        add_event: true
    });

    o.func1 = function () {
        console.log('click t1');
    };

    o.child = null;
    o.gen_ev_handler = function () {
        return {
            't1': function () {
                console.log('click t1');
                var salt = this.el('input1', true).value;
                var psw = this.el('input2', true).value;
                console.log('salt:', salt, ' psw:', psw, ' enc_psw:', md5(salt + md5(sip.s.rainbow + md5(psw))));
            },
            't2': function () {
                console.log('click t2');

            }
        };
    };

    o.add_event = function () {
        o.f.on('click', 't1');
        o.f.on('click', 't2');
    };

    o.gen_html = function () {
        var html = '<div style="margin:10px;">' +
                '<input type="text" id="' + this.el('input1') + '" ><br>' +
                '<input type="text" id="' + this.el('input2') + '" ><br>' +
                '<input type="button" id="' + this.el('t1') + '" class="btn btn-info" value="t1">' +
                '<input type="button" id="' + this.el('t2') + '" class="btn btn-info" value="t2">' +
                '<div id="' + this.el('child') + '"></div>' +
                '</div>';
        return html;
    };

    o.clean_up = function () {
        o.child && o.child.destroy();
        o.child = null;
    };


    return o;

};