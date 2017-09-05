/* global cardjs, sip */

sip.db = cardjs.create({
    type: 'package',
    settings: {
        key: cardjs.lib.gen_key()
    },
    d: {
        data: {},
        files: undefined,
        search: {
            kw_cache: null,
            kw_cur: '',
            result: []
        },
        page: {
            key: null,
            filter: '',
            size: 5,
            cur_page: 0,
            cur_key: 0,
            id_loaded: 0
        },
        file_key: [],
        total_article: 0
    },
    set: function (key, value) {
        //this[key] = value;
        //console.log('set :',key,value);
        if (key === 'page_key') {
            //console.log(this.files,value,value in this.files);
            if (value in this.d.files) {
                this.d.page.key = value;
                this.f.event('main_clear_pager');
                this.show_page.bind(this)();
            }
        }
        if (key === 'filter') {
            //console.log('set filter:', value);
            this.f.event('main_clear_pager');
            this.d.page.filter = value;
            this.show_page.bind(this)();
        }
    },

    show_page: function () {
        //console.log(this);
        if (this.d.page.key in this.d.data) {
            this.push_main_art_board.bind(this)();
        } else {
            this.load_json.bind(this)(this.d.page.key, this.push_main_art_board.bind(this));
        }
    },

    push_main_art_board: function () {
        if (!(this.d.page.key in this.d.data)) {
            console.log('Error: key not exist!', this.d.page.key);
            return;
        }
        //console.log(this);
        var d = [], f = this.d.page.filter, k = this.d.page.key, db = this.d.data;
        if (k in db) {
            var idx = Object.keys(db[k]).sort(function (a, b) {
                return (a - b);
            }).reverse();
            //console.log(idx);
            for (var i = 0; i < idx.length; i++) {
                if (f === '全部' || f === '' || db[k][idx[i]].type === f) {
                    d.push(db[k][idx[i]]);
                }
            }
        }
        //console.log('k/d/f/db' ,k, d,f,db);
        this.f.event('main_article_board_update', d);
        d = f = k = db = null;

    },

    search: function (raw_keywords) {

        if (this.d.search.kw_cache === raw_keywords) {
            //console.log('using cache!');
            this.f.event('show_main_search_result');
            return;
        }

        this.d.search.kw_cache = raw_keywords;

        var keywords = raw_keywords.split(' ').filter(function (e) {
            return (e.length > 0);
        });

        this.d.search.result = [];
        this.search_recursive.bind(this)(keywords, 0);
    },
    search_recursive: function (keywords, index) {
        if (index >= this.d.file_key.length) {
            this.f.event('show_main_search_result');
            console.log('search done!');
            return;
        }
        var key = this.d.file_key[index];
        if (key in this.d.data) {
            this.search_cache.bind(this)(keywords, key);
            if (this.search_result > 15) {
                console.log('find 15+ results, abort');
                return;
            }
            //console.log('cur_result:',this.search_result);
            this.f.event('show_main_search_result');
            this.search_recursive.bind(this)(keywords, index + 1);
            return;
        }
        //console.log('load file:', key);
        this.load_json(key, this.search_recursive.bind(this, keywords, index));
    },

    search_cache: function (keywords, key) {

        var e, mark, kw_idx;

        var idx = Object.keys(this.d.data[key]).sort(function (a, b) {
            return (a - b);
        }).reverse();
        //console.log('search idx:',idx);

        for (var i = 0; i < idx.length; i++) {
            mark = 0;
            e = this.d.data[key][idx[i]];
            for (kw_idx in keywords) {
                if (e.title.indexOf(keywords[kw_idx]) >= 0
                        || e.text.indexOf(keywords[kw_idx]) >= 0) {
                    mark++;
                }
                //console.log('mark:',mark,' kw:',keywords[kw_idx],'e:',e);
            }

            if (keywords.length <= 0 || mark === keywords.length) {
                this.d.search.result.push({
                    key: key,
                    id: idx[i],
                    title: e.title,
                    data: e
                });
            }
            e = null;
            if (this.d.search.result.length > 15) {
                break;
            }

        }

    },

    load_json: function (key, callback) {

        if (!cardjs.lib.isString(key)) {
            throw new Error('key muset be string.');
        }

        if (!(key in this.d.files)) {
            console.log('Key not exist:', key);
            return;
        }

        if (key in this.d.data) {
            //console.log('key exist, skip', key);
            return;
        }

        var y = key.substr(0, 4),
                m = key.substr(4),
                path = sip.s.article_path + (y) + '/' + (m) + '.json';

        console.log('Load data:' + key + '.json');

        $.getJSON(path, this.got_json.bind(this, callback, key));

    },

    get: function (key) {
        var pub = ['files'];
        if (pub.indexOf(key)>=0) {
            return this.d[key];
        }
        return undefined;
    },

    got_json: function (callback, key, data) {

        /* cache.data={
         *   201706:{
         *      id1: content,id,txt, ... 
         *      id2: content,id,txt, ...
         *      ...
         *   },
         *   201707:{
         *     ...
         *   }
         * }
         */

        var d = {}, e, i, div = document.createElement("div");
        for (i = 0; i < data.length; i++) {
            e = sip.f.filter_json(data[i]);
            div.innerHTML = e.content;
            e.text = div.textContent || div.innerText || "";
            d[e.id] = e;
        }
        div = null;
        this.d.data[key] = d;

        if (cardjs.lib.isFunction(callback)) {
            callback();
        }
    },

    load_files: function () {

        this.d.files = undefined;
        this.d.search.kw_cache = null;
        this.d.search.kw_cur = null;
        this.d.result = [];
        this.d.page.key = null;
        this.d.page.filter = '';
        this.d.page.cur_page = 0;
        this.d.page.cur_key = 0;
        this.d.page.id_loaded = 0;
        this.d.file_key = [];
        this.d.total_article = 0;

        $.getJSON(sip.s.files_path, function (data) {
           //console.log('files.json:', data);
            if ('files' in data) {
                this.d.files = data.files;
                //console.log('files', this.d.files);
                this.d.file_key = Object.keys(data.files).sort(function (a, b) {
                    return (a - b);
                }).reverse();
                if (this.d.file_key.length > 0) {
                    this.d.page.key = this.d.file_key[0];
                    var sum = 0;
                    for (var key in this.d.files) {
                        sum += this.d.files[key];
                    }
                    this.d.total_article = sum;
                }
            }
            if ('update' in data) {
                if (data.update in this.d.data) {
                    delete this.d.data[data.update];
                }
            }
            //console.log(this);
        }.bind(this));
    },
    init: function () {

        this.load_files();
    }
});