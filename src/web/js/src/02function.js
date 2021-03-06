/* global sip, cardjs, Mustache */

sip.f.merge_uset = function (settings) {
    for (var key in settings) {
        sip.uset[key] = settings[key];
    }
};

sip.f.add_frame = function (frame_id, content, tag, style) {
    var d = {
        'style': style || "",
        'content': content
    };
    if (tag && tag.length > 0) {
        d['tag'] = tag;
    }
    return Mustache.render(cardjs.lib.load_html(frame_id), d);
};

sip.f.filter_json = function (e) {

    //id userid type title content tag ctime mtime name lock top

    var f = {
        msg: function (d) {
            return(filterXSS(d));
        },
        title: function (d) {
            return(filterXSS(cardjs.lib.decode_utf8(d)));
        },
        mtime: function (d) {
            //console.log('mtime:'+d);
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
            return(filterXSS(cardjs.lib.decode_utf8(d)));
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