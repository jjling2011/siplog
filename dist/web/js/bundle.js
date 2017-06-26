/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):C.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/[^\x20\t\r\n\f]+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),
a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:X.test(a)?JSON.parse(a):a)}function $(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=Z(c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),$(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=$(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),ba=["Top","Right","Bottom","Left"],ca=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function ea(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&aa.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var fa={};function ga(a){var b,c=a.ownerDocument,d=a.nodeName,e=fa[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),fa[d]=e,e)}function ha(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ca(d)&&(e[f]=ga(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ha(this,!0)},hide:function(){return ha(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ca(this)?r(this).show():r(this).hide()})}});var ia=/^(?:checkbox|radio)$/i,ja=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ka=/^$|\/(?:java|ecma)script/i,la={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};la.optgroup=la.option,la.tbody=la.tfoot=la.colgroup=la.caption=la.thead,la.th=la.td;function ma(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function na(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var oa=/<|&#?\w+;/;function pa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(oa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ja.exec(f)||["",""])[1].toLowerCase(),i=la[h]||la._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=ma(l.appendChild(f),"script"),j&&na(g),c){k=0;while(f=g[k++])ka.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var qa=d.documentElement,ra=/^key/,sa=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ta=/^([^.]*)(?:\.(.+)|)/;function ua(){return!0}function va(){return!1}function wa(){try{return d.activeElement}catch(a){}}function xa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)xa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=va;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(qa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==wa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===wa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ua:va,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:va,isPropagationStopped:va,isImmediatePropagationStopped:va,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ua,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ua,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ua,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&ra.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&sa.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return xa(this,a,b,c,d)},one:function(a,b,c,d){return xa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=va),this.each(function(){r.event.remove(this,a,c,b)})}});var ya=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,za=/<script|<style|<link/i,Aa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ba=/^true\/(.*)/,Ca=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Ea(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Fa(a){var b=Ba.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ga(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ha(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ia.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ia(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Aa.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ia(f,b,c,d)});if(m&&(e=pa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(ma(e,"script"),Ea),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,ma(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Fa),l=0;l<i;l++)j=h[l],ka.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ca,""),k))}return a}function Ja(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(ma(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&na(ma(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(ya,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=ma(h),f=ma(a),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);if(b)if(c)for(f=f||ma(a),g=g||ma(h),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);else Ga(a,h);return g=ma(h,"script"),g.length>0&&na(g,!i&&ma(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ja(this,a,!0)},remove:function(a){return Ja(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.appendChild(a)}})},prepend:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(ma(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!za.test(a)&&!la[(ja.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(ma(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ia(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(ma(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ka=/^margin/,La=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),Ma=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",qa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,qa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Na(a,b,c){var d,e,f,g,h=a.style;return c=c||Ma(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&La.test(g)&&Ka.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Oa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Pa=/^(none|table(?!-c[ea]).+)/,Qa={position:"absolute",visibility:"hidden",display:"block"},Ra={letterSpacing:"0",fontWeight:"400"},Sa=["Webkit","Moz","ms"],Ta=d.createElement("div").style;function Ua(a){if(a in Ta)return a;var b=a[0].toUpperCase()+a.slice(1),c=Sa.length;while(c--)if(a=Sa[c]+b,a in Ta)return a}function Va(a,b,c){var d=aa.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Wa(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ba[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ba[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ba[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ba[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ba[f]+"Width",!0,e)));return g}function Xa(a,b,c){var d,e=!0,f=Ma(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Na(a,b,f),(d<0||null==d)&&(d=a.style[b]),La.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Wa(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Na(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=aa.exec(c))&&e[1]&&(c=ea(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Na(a,b,d)),"normal"===e&&b in Ra&&(e=Ra[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Pa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Xa(a,b,d):da(a,Qa,function(){return Xa(a,b,d)})},set:function(a,c,d){var e,f=d&&Ma(a),g=d&&Wa(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=aa.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Va(a,c,g)}}}),r.cssHooks.marginLeft=Oa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Na(a,"marginLeft"))||a.getBoundingClientRect().left-da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ba[d]+b]=f[d]||f[d-2]||f[0];return e}},Ka.test(a)||(r.cssHooks[a+b].set=Va)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=Ma(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Ya(a,b,c,d,e){return new Ya.prototype.init(a,b,c,d,e)}r.Tween=Ya,Ya.prototype={constructor:Ya,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Ya.propHooks[this.prop];return a&&a.get?a.get(this):Ya.propHooks._default.get(this)},run:function(a){var b,c=Ya.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ya.propHooks._default.set(this),this}},Ya.prototype.init.prototype=Ya.prototype,Ya.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Ya.propHooks.scrollTop=Ya.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Ya.prototype.init,r.fx.step={};var Za,$a,_a=/^(?:toggle|show|hide)$/,ab=/queueHooks$/;function bb(){$a&&(a.requestAnimationFrame(bb),r.fx.tick())}function cb(){return a.setTimeout(function(){Za=void 0}),Za=r.now()}function db(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ba[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function eb(a,b,c){for(var d,e=(hb.tweeners[b]||[]).concat(hb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function fb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ca(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],_a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ha([a],!0),j=a.style.display||j,k=r.css(a,"display"),ha([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ha([a],!0),m.done(function(){p||ha([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=eb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function gb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function hb(a,b,c){var d,e,f=0,g=hb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Za||cb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Za||cb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(gb(k,j.opts.specialEasing);f<g;f++)if(d=hb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,eb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(hb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return ea(c.elem,a,aa.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],hb.tweeners[c]=hb.tweeners[c]||[],hb.tweeners[c].unshift(b)},prefilters:[fb],prefilter:function(a,b){b?hb.prefilters.unshift(a):hb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:"number"!=typeof e.duration&&(e.duration in r.fx.speeds?e.duration=r.fx.speeds[e.duration]:e.duration=r.fx.speeds._default),null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=hb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(db(b,!0),a,d,e)}}),r.each({slideDown:db("show"),slideUp:db("hide"),slideToggle:db("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Za=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Za=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){$a||($a=a.requestAnimationFrame?a.requestAnimationFrame(bb):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame($a):a.clearInterval($a),$a=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var ib,jb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?ib:void 0)),
void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),ib={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=jb[b]||r.find.attr;jb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=jb[g],jb[g]=e,e=null!=c(a,b,d)?g:null,jb[g]=f),e}});var kb=/^(?:input|select|textarea|button)$/i,lb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):kb.test(a.nodeName)||lb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function mb(a){var b=a.match(K)||[];return b.join(" ")}function nb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,nb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,nb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,nb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=nb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(nb(c))+" ").indexOf(b)>-1)return!0;return!1}});var ob=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ob,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:mb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ia.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,"$1"),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=pa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=mb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||qa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Oa(o.pixelPosition,function(a,c){if(c)return c=Na(a,b),La.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.3.0';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.wangEditor=t()}(this,function(){"use strict";function e(e){var t=void 0;return t=document.createElement("div"),t.innerHTML=e,t.children}function t(e){return!!e&&(e instanceof HTMLCollection||e instanceof NodeList)}function n(e){var n=document.querySelectorAll(e);return t(n)?n:[n]}function i(o){if(o){if(o instanceof i)return o;this.selector=o;var A=[];1===o.nodeType?A=[o]:t(o)?A=o:"string"==typeof o&&(o=o.replace("/\n/mg","").trim(),A=0===o.indexOf("<")?e(o):n(o));var c=A.length;if(!c)return this;var r=void 0;for(r=0;r<c;r++)this[r]=A[r];this.length=c}}function o(e){return new i(e)}function A(e,t){var n=void 0;for(n in e)if(e.hasOwnProperty(n)&&!1===t.call(e,n,e[n]))break}function c(e,t){var n=void 0,i=void 0,o=e.length||0;for(n=0;n<o&&(i=e[n],!1!==t.call(e,i,n));n++);}function r(e){return e+Math.random().toString().slice(2)}function a(e){return null==e?"":e.replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;")}function s(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-bold"><i/>\n        </div>'),this.type="click",this._active=!1}function l(e,t){var n=this;this.menu=e,this.opt=t;var i=o('<div class="w-e-droplist"></div>'),A=t.$title;A&&(A.addClass("w-e-dp-title"),i.append(A));var c=t.list||[],r=t.type||"list",a=t.onClick||P,s=o('<ul class="'+("list"===r?"w-e-list":"w-e-block")+'"></ul>');i.append(s),c.forEach(function(e){var t=e.$elem,i=e.value,A=o('<li class="w-e-item"></li>');t&&(A.append(t),s.append(A),t.on("click",function(e){a(i),n.hideTimeoutId=setTimeout(function(){n.hide()},0)}))}),i.on("mouseleave",function(e){n.hideTimeoutId=setTimeout(function(){n.hide()},0)}),this.$container=i,this._rendered=!1,this._show=!1}function d(e){var t=this;this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-header"><i/></div>'),this.type="droplist",this._active=!1,this.droplist=new l(this,{width:100,$title:o("<p>设置标题</p>"),type:"list",list:[{$elem:o("<h1>H1</h1>"),value:"<h1>"},{$elem:o("<h2>H2</h2>"),value:"<h2>"},{$elem:o("<h3>H3</h3>"),value:"<h3>"},{$elem:o("<h4>H4</h4>"),value:"<h4>"},{$elem:o("<h5>H5</h5>"),value:"<h5>"},{$elem:o("<p>正文</p>"),value:"<p>"}],onClick:function(e){t._command(e)}})}function u(e,t){this.menu=e,this.opt=t}function h(e){this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-link"><i/></div>'),this.type="panel",this._active=!1}function p(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-italic"><i/>\n        </div>'),this.type="click",this._active=!1}function f(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-redo"><i/>\n        </div>'),this.type="click",this._active=!1}function g(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-strikethrough"><i/>\n        </div>'),this.type="click",this._active=!1}function m(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-underline"><i/>\n        </div>'),this.type="click",this._active=!1}function w(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-undo"><i/>\n        </div>'),this.type="click",this._active=!1}function v(e){var t=this;this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-list2"><i/></div>'),this.type="droplist",this._active=!1,this.droplist=new l(this,{width:120,$title:o("<p>设置列表</p>"),type:"list",list:[{$elem:o('<span><i class="w-e-icon-list-numbered"></i> 有序列表</span>'),value:"insertOrderedList"},{$elem:o('<span><i class="w-e-icon-list2"></i> 无序列表</span>'),value:"insertUnorderedList"}],onClick:function(e){t._command(e)}})}function b(e){var t=this;this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-paragraph-left"><i/></div>'),this.type="droplist",this._active=!1,this.droplist=new l(this,{width:100,$title:o("<p>对齐方式</p>"),type:"list",list:[{$elem:o('<span><i class="w-e-icon-paragraph-left"></i> 靠左</span>'),value:"justifyLeft"},{$elem:o('<span><i class="w-e-icon-paragraph-center"></i> 居中</span>'),value:"justifyCenter"},{$elem:o('<span><i class="w-e-icon-paragraph-right"></i> 靠右</span>'),value:"justifyRight"}],onClick:function(e){t._command(e)}})}function E(e){var t=this;this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-pencil2"><i/></div>'),this.type="droplist",this._active=!1,this.droplist=new l(this,{width:120,$title:o("<p>文字颜色</p>"),type:"inline-block",list:[{$elem:o('<i style="color:#000000;" class="w-e-icon-pencil2"></i>'),value:"#000000"},{$elem:o('<i style="color:#eeece0;" class="w-e-icon-pencil2"></i>'),value:"#eeece0"},{$elem:o('<i style="color:#1c487f;" class="w-e-icon-pencil2"></i>'),value:"#1c487f"},{$elem:o('<i style="color:#4d80bf;" class="w-e-icon-pencil2"></i>'),value:"#4d80bf"},{$elem:o('<i style="color:#c24f4a;" class="w-e-icon-pencil2"></i>'),value:"#c24f4a"},{$elem:o('<i style="color:#8baa4a;" class="w-e-icon-pencil2"></i>'),value:"#8baa4a"},{$elem:o('<i style="color:#7b5ba1;" class="w-e-icon-pencil2"></i>'),value:"#7b5ba1"},{$elem:o('<i style="color:#46acc8;" class="w-e-icon-pencil2"></i>'),value:"#46acc8"},{$elem:o('<i style="color:#f9963b;" class="w-e-icon-pencil2"></i>'),value:"#f9963b"},{$elem:o('<i style="color:#ffffff;" class="w-e-icon-pencil2"></i>'),value:"#ffffff"}],onClick:function(e){t._command(e)}})}function y(e){var t=this;this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-paint-brush"><i/></div>'),this.type="droplist",this._active=!1,this.droplist=new l(this,{width:120,$title:o("<p>背景色</p>"),type:"inline-block",list:[{$elem:o('<i style="color:#000000;" class="w-e-icon-paint-brush"></i>'),value:"#000000"},{$elem:o('<i style="color:#eeece0;" class="w-e-icon-paint-brush"></i>'),value:"#eeece0"},{$elem:o('<i style="color:#1c487f;" class="w-e-icon-paint-brush"></i>'),value:"#1c487f"},{$elem:o('<i style="color:#4d80bf;" class="w-e-icon-paint-brush"></i>'),value:"#4d80bf"},{$elem:o('<i style="color:#c24f4a;" class="w-e-icon-paint-brush"></i>'),value:"#c24f4a"},{$elem:o('<i style="color:#8baa4a;" class="w-e-icon-paint-brush"></i>'),value:"#8baa4a"},{$elem:o('<i style="color:#7b5ba1;" class="w-e-icon-paint-brush"></i>'),value:"#7b5ba1"},{$elem:o('<i style="color:#46acc8;" class="w-e-icon-paint-brush"></i>'),value:"#46acc8"},{$elem:o('<i style="color:#f9963b;" class="w-e-icon-paint-brush"></i>'),value:"#f9963b"},{$elem:o('<i style="color:#ffffff;" class="w-e-icon-paint-brush"></i>'),value:"#ffffff"}],onClick:function(e){t._command(e)}})}function B(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-quotes-left"><i/>\n        </div>'),this.type="click",this._active=!1}function C(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-terminal"><i/>\n        </div>'),this.type="panel",this._active=!1}function x(e){this.editor=e,this.$elem=o('<div class="w-e-menu">\n            <i class="w-e-icon-happy"><i/>\n        </div>'),this.type="panel",this._active=!1}function I(e){this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-table2"><i/></div>'),this.type="panel",this._active=!1}function Q(e){this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-play"><i/></div>'),this.type="panel",this._active=!1}function D(e){this.editor=e,this.$elem=o('<div class="w-e-menu"><i class="w-e-icon-image"><i/></div>'),this.type="panel",this._active=!1}function M(e){this.editor=e,this.menus={}}function k(e){var t=e.clipboardData||e.originalEvent&&e.originalEvent.clipboardData,n=void 0;return n=null==t?window.clipboardData&&window.clipboardData.getData("text"):t.getData("text/plain"),a(n)}function _(e){var t=e.clipboardData||e.originalEvent&&e.originalEvent.clipboardData,n=void 0,i=void 0;if(null==t?n=window.clipboardData&&window.clipboardData.getData("text"):(n=t.getData("text/plain"),i=t.getData("text/html")),!i&&n&&(i="<p>"+a(n)+"</p>"),i){var o=i.split("</html>");return 2===o.length&&(i=o[0]),i=i.replace(/<(meta|script|link).+?>/gim,""),i=i.replace(/\s?(class|style)=('|").+?('|")/gim,"")}}function U(e){var t=[];if(k(e))return t;var n=e.clipboardData||e.originalEvent&&e.originalEvent.clipboardData||{},i=n.items;return i?(A(i,function(e,n){var i=n.type;/image/i.test(i)&&t.push(n.getAsFile())}),t):t}function S(e){this.editor=e}function R(e){this.editor=e}function F(e){this.editor=e,this._currentRange=null}function N(e){this.editor=e,this._time=0,this._isShow=!1,this._isRender=!1,this._timeoutId=0,this.$textContainer=e.$textContainerElem,this.$bar=o('<div class="w-e-progress"></div>')}function T(e){this.editor=e}function H(e,t){if(null==e)throw new Error("错误：初始化编辑器时候未传入任何参数，请查阅文档");this.id="wangEditor-"+G++,this.toolbarSelector=e,this.textSelector=t,this.customConfig={}}i.prototype={constructor:i,forEach:function(e){var t=void 0;for(t=0;t<this.length;t++){var n=this[t];if(!1===e.call(n,n,t))break}return this},get:function(e){var t=this.length;return e>=t&&(e%=t),o(this[e])},first:function(){return this.get(0)},last:function(){var e=this.length;return this.get(e-1)},on:function(e,t,n){n||(n=t,t=null);var i=[];return i=e.split(/\s+/),this.forEach(function(e){i.forEach(function(i){if(i)return t?void e.addEventListener(i,function(e){var i=e.target;i.matches(t)&&n.call(i,e)},!1):void e.addEventListener(i,n,!1)})})},off:function(e,t){return this.forEach(function(n){n.removeEventListener(e,t,!1)})},attr:function(e,t){return null==t?this[0].getAttribute(e):this.forEach(function(n){n.setAttribute(e,t)})},addClass:function(e){return e?this.forEach(function(t){var n=void 0;t.className?(n=t.className.split(/\s/),n=n.filter(function(e){return!!e.trim()}),n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")):t.className=e}):this},removeClass:function(e){return e?this.forEach(function(t){var n=void 0;t.className&&(n=t.className.split(/\s/),n=n.filter(function(t){return!(!(t=t.trim())||t===e)}),t.className=n.join(" "))}):this},css:function(e,t){var n=e+":"+t+";";return this.forEach(function(t){var i=(t.getAttribute("style")||"").trim(),o=void 0,A=[];i?(o=i.split(";"),o.forEach(function(e){var t=e.split(":").map(function(e){return e.trim()});2===t.length&&A.push(t[0]+":"+t[1])}),A=A.map(function(t){return 0===t.indexOf(e)?n:t}),A.indexOf(n)<0&&A.push(n),t.setAttribute("style",A.join("; "))):t.setAttribute("style",n)})},show:function(){return this.css("display","block")},hide:function(){return this.css("display","none")},children:function(){var e=this[0];return e?o(e.children):null},append:function(e){return this.forEach(function(t){e.forEach(function(e){t.appendChild(e)})})},remove:function(){return this.forEach(function(e){if(e.remove)e.remove();else{var t=e.parentElement;t&&t.removeChild(e)}})},isContain:function(e){var t=this[0],n=e[0];return t.contains(n)},getSizeData:function(){return this[0].getBoundingClientRect()},getNodeName:function(){return this[0].nodeName},find:function(e){return o(this[0].querySelectorAll(e))},text:function(e){return e?this.forEach(function(t){t.innerHTML=e}):this[0].innerHTML.replace(/<.*?>/g,function(){return""})},html:function(e){var t=this[0];return null==e?t.innerHTML:(t.innerHTML=e,this)},val:function(){return this[0].value.trim()},focus:function(){return this.forEach(function(e){e.focus()})},parent:function(){return o(this[0].parentElement)},parentUntil:function(e,t){var n=document.querySelectorAll(e),i=n.length;if(!i)return null;var A=t||this[0];if("BODY"===A.nodeName)return null;var c=A.parentElement,r=void 0;for(r=0;r<i;r++)if(c===n[r])return o(c);return this.parentUntil(e,c)},equal:function(e){return 1===e.nodeType?this[0]===e:this[0]===e[0]},insertBefore:function(e){var t=o(e),n=t[0];return n?this.forEach(function(e){n.parentNode.insertBefore(e,n)}):this},insertAfter:function(e){var t=o(e),n=t[0];return n?this.forEach(function(e){var t=n.parentNode;t.lastChild===n?t.appendChild(e):t.insertBefore(e,n.nextSibling)}):this}};var Y={menus:["head","bold","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],zIndex:1e4,debug:!1,showLinkImg:!0,uploadImgMaxSize:5242880,uploadImgShowBase64:!1,uploadFileName:"",uploadImgParams:{token:"abcdef12345"},uploadImgHeaders:{},withCredentials:!1,uploadImgTimeout:5e3,uploadImgHooks:{before:function(e,t,n){},success:function(e,t,n){},fail:function(e,t,n){},error:function(e,t){},timeout:function(e,t){}}},L={_ua:navigator.userAgent,isWebkit:function(){return/webkit/i.test(this._ua)},isIE:function(){return"ActiveXObject"in window}};s.prototype={constructor:s,onClick:function(e){var t=this.editor,n=t.selection.isSelectionEmpty();n&&t.selection.createEmptyRange(),t.cmd.do("bold"),n&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t.cmd.queryCommandState("bold")?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}};var P=function(){};l.prototype={constructor:l,show:function(){this.hideTimeoutId&&clearTimeout(this.hideTimeoutId);var e=this.menu,t=e.$elem,n=this.$container;if(!this._show){if(this._rendered)n.show();else{var i=t.getSizeData().height||0,o=this.opt.width||100;n.css("margin-top",i+"px").css("width",o+"px"),t.append(n),this._rendered=!0}this._show=!0}},hide:function(){this.showTimeoutId&&clearTimeout(this.showTimeoutId);var e=this.$container;this._show&&(e.hide(),this._show=!1)}},d.prototype={constructor:d,_command:function(e){this.editor.cmd.do("formatBlock",e)},tryChangeActive:function(e){var t=this.editor,n=this.$elem,i=/^h/i,o=t.cmd.queryCommandValue("formatBlock");i.test(o)?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}};var j=function(){},z=[];u.prototype={constructor:u,show:function(){var e=this,t=this.menu;if(!(z.indexOf(t)>=0)){var n=t.editor,i=o("body"),A=n.$textContainerElem,c=this.opt,r=o('<div class="w-e-panel-container"></div>'),a=c.width||300;r.css("width",a+"px").css("margin-left",(0-a)/2+"px");var s=o('<i class="w-e-icon-close w-e-panel-close"></i>');r.append(s),s.on("click",function(){e.hide()});var l=o('<ul class="w-e-panel-tab-title"></ul>'),d=o('<div class="w-e-panel-tab-content"></div>');r.append(l).append(d);var u=c.height;u&&d.css("height",u+"px").css("overflow-y","auto");var h=c.tabs||[],p=[],f=[];h.forEach(function(e,t){if(e){var n=e.title||"",i=e.tpl||"",A=o('<li class="w-e-item">'+n+"</li>");l.append(A);var c=o(i);d.append(c),A._index=t,p.push(A),f.push(c),0===t?(A._active=!0,A.addClass("w-e-active")):c.hide(),A.on("click",function(e){A._active||(p.forEach(function(e){e._active=!1,e.removeClass("w-e-active")}),f.forEach(function(e){e.hide()}),A._active=!0,A.addClass("w-e-active"),c.show())})}}),r.on("click",function(e){e.stopPropagation()}),i.on("click",function(t){e.hide()}),A.append(r),h.forEach(function(t,n){if(t){(t.events||[]).forEach(function(t){var i=t.selector,o=t.type,A=t.fn||j;f[n].find(i).on(o,function(t){t.stopPropagation(),A(t)&&e.hide()})})}});var g=r.find("input[type=text],textarea");g.length&&g.get(0).focus(),this.$container=r,this._hideOtherPanels(),z.push(t)}},hide:function(){var e=this.menu,t=this.$container;t&&t.remove(),z=z.filter(function(t){return t!==e})},_hideOtherPanels:function(){z.length&&z.forEach(function(e){var t=e.panel||{};t.hide&&t.hide()})}},h.prototype={constructor:h,onClick:function(e){var t=this.editor,n=void 0;if(this._active){if(!(n=t.selection.getSelectionContainerElem()))return;t.selection.createRangeByElem(n),t.selection.restoreSelection(),this._createPanel(n.text(),n.attr("href"))}else t.selection.isSelectionEmpty()?this._createPanel("",""):this._createPanel(t.selection.getSelectionText(),"")},_createPanel:function(e,t){var n=this,i=r("input-link"),A=r("input-text"),c=r("btn-ok"),a=r("btn-del"),s=this._active?"inline-block":"none",l=new u(this,{width:300,tabs:[{title:"链接",tpl:'<div>\n                            <input id="'+A+'" type="text" class="block" value="'+e+'" placeholder="链接文字"/></td>\n                            <input id="'+i+'" type="text" class="block" value="'+t+'" placeholder="http://..."/></td>\n                            <div class="w-e-button-container">\n                                <button id="'+c+'" class="right">插入</button>\n                                <button id="'+a+'" class="gray right" style="display:'+s+'">删除链接</button>\n                            </div>\n                        </div>',events:[{selector:"#"+c,type:"click",fn:function(){var e=o("#"+i),t=o("#"+A),c=e.val(),r=t.val();return n._insertLink(r,c),!0}},{selector:"#"+a,type:"click",fn:function(){return n._delLink(),!0}}]}]});l.show(),this.panel=l},_delLink:function(){if(this._active){var e=this.editor;if(e.selection.getSelectionContainerElem()){var t=e.selection.getSelectionText();e.cmd.do("insertHTML","<span>"+t+"</span>")}}},_insertLink:function(e,t){if(e&&t){this.editor.cmd.do("insertHTML",'<a href="'+t+'" target="_blank">'+e+"</a>")}},tryChangeActive:function(e){var t=this.editor,n=this.$elem,i=t.selection.getSelectionContainerElem();i&&("A"===i.getNodeName()?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active")))}},p.prototype={constructor:p,onClick:function(e){var t=this.editor,n=t.selection.isSelectionEmpty();n&&t.selection.createEmptyRange(),t.cmd.do("italic"),n&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t.cmd.queryCommandState("italic")?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}},f.prototype={constructor:f,onClick:function(e){this.editor.cmd.do("redo")}},g.prototype={constructor:g,onClick:function(e){var t=this.editor,n=t.selection.isSelectionEmpty();n&&t.selection.createEmptyRange(),t.cmd.do("strikeThrough"),n&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t.cmd.queryCommandState("strikeThrough")?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}},m.prototype={constructor:m,onClick:function(e){var t=this.editor,n=t.selection.isSelectionEmpty();n&&t.selection.createEmptyRange(),t.cmd.do("underline"),n&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t.cmd.queryCommandState("underline")?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}},w.prototype={constructor:w,onClick:function(e){this.editor.cmd.do("undo")}},v.prototype={constructor:v,_command:function(e){var t=this.editor,n=t.$textElem;if(t.selection.restoreSelection(),!t.cmd.queryCommandState(e)){t.cmd.do(e);var i=t.selection.getSelectionContainerElem();if("LI"===i.getNodeName()&&(i=i.parent()),!1!==/^ol|ul$/i.test(i.getNodeName())&&!i.equal(n)){var o=i.parent();o.equal(n)||(i.insertAfter(o),o.remove())}}},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t.cmd.queryCommandState("insertUnOrderedList")||t.cmd.queryCommandState("insertOrderedList")?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}},b.prototype={constructor:b,_command:function(e){this.editor.cmd.do(e)}},E.prototype={constructor:E,_command:function(e){this.editor.cmd.do("foreColor",e)}},y.prototype={constructor:y,_command:function(e){this.editor.cmd.do("backColor",e)}},B.prototype={constructor:B,onClick:function(e){this.editor.cmd.do("formatBlock","<BLOCKQUOTE>")},tryChangeActive:function(e){var t=this.editor,n=this.$elem,i=/^BLOCKQUOTE$/i,o=t.cmd.queryCommandValue("formatBlock");i.test(o)?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}},C.prototype={constructor:C,onClick:function(e){var t=this.editor,n=t.selection.getSelectionStartElem(),i=t.selection.getSelectionEndElem(),A=t.selection.isSelectionEmpty(),c=t.selection.getSelectionText(),r=void 0;return n.equal(i)?A?void(this._active?this._createPanel(n.html()):this._createPanel()):(r=o("<code>"+c+"</code>"),t.cmd.do("insertElem",r),t.selection.createRangeByElem(r,!1),void t.selection.restoreSelection()):void t.selection.restoreSelection()},_createPanel:function(e){var t=this;e=e||"";var n=e?"edit":"new",i=r("texxt"),A=r("btn"),c=new u(this,{width:500,tabs:[{title:"插入代码",tpl:'<div>\n                        <textarea id="'+i+'" style="height:145px;;">'+e+'</textarea>\n                        <div class="w-e-button-container">\n                            <button id="'+A+'" class="right">插入</button>\n                        </div>\n                    <div>',events:[{selector:"#"+A,type:"click",fn:function(){var e=o("#"+i),A=e.val()||e.html();return A=a(A),"new"===n?t._insertCode(A):t._updateCode(A),!0}}]}]});c.show(),this.panel=c},_insertCode:function(e){this.editor.cmd.do("insertHTML","<pre><code>"+e+"</code></pre><p><br></p>")},_updateCode:function(e){var t=this.editor,n=t.selection.getSelectionContainerElem();n&&(n.html(e),t.selection.restoreSelection())},tryChangeActive:function(e){var t=this.editor,n=this.$elem,i=t.selection.getSelectionContainerElem();if(i){var o=i.parent();"CODE"===i.getNodeName()&&"PRE"===o.getNodeName()?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}}},x.prototype={constructor:x,onClick:function(){this._createPanel()},_createPanel:function(){var e=this,t="";"😀 😃 😄 😁 😆 😅 😂  😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁  😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐".split(/\s/).forEach(function(e){e&&(t+='<span class="w-e-item">'+e+"</span>")});var n="";"🙌 👏 👋 👍 👎 👊 ✊ ️👌 ✋ 👐 💪 🙏 ️👆 👇 👈 👉 🖕 🖐 🤘 🖖".split(/\s/).forEach(function(e){e&&(n+='<span class="w-e-item">'+e+"</span>")});var i=new u(this,{width:300,height:200,tabs:[{title:"表情",tpl:'<div class="w-e-emoticon-container">'+t+"</div>",events:[{selector:"span.w-e-item",type:"click",fn:function(t){var n=t.target;return e._insert(n.innerHTML),!0}}]},{title:"手势",tpl:'<div class="w-e-emoticon-container">'+n+"</div>",events:[{selector:"span.w-e-item",type:"click",fn:function(t){var n=t.target;return e._insert(n.innerHTML),!0}}]}]});i.show(),this.panel=i},_insert:function(e){this.editor.cmd.do("insertHTML","<span>"+e+"</span>")}},I.prototype={constructor:I,onClick:function(){this._active?this._createEditPanel():this._createInsertPanel()},_createInsertPanel:function(){var e=this,t=r("btn"),n=r("row"),i=r("col"),A=new u(this,{width:250,tabs:[{title:"插入表格",tpl:'<div>\n                        <p style="text-align:left; padding:5px 0;">\n                            创建\n                            <input id="'+n+'" type="text" value="5" style="width:40px;text-align:center;"/>\n                            行\n                            <input id="'+i+'" type="text" value="5" style="width:40px;text-align:center;"/>\n                            列的表格\n                        </p>\n                        <div class="w-e-button-container">\n                            <button id="'+t+'" class="right">插入</button>\n                        </div>\n                    </div>',events:[{selector:"#"+t,type:"click",fn:function(){var t=parseInt(o("#"+n).val()),A=parseInt(o("#"+i).val());return t&&A&&t>0&&A>0&&e._insert(t,A),!0}}]}]});A.show(),this.panel=A},_insert:function(e,t){var n=void 0,i=void 0,o='<table border="0" width="100%" cellpadding="0" cellspacing="0">';for(n=0;n<e;n++){if(o+="<tr>",0===n)for(i=0;i<t;i++)o+="<th>&nbsp;</th>";else for(i=0;i<t;i++)o+="<td>&nbsp;</td>";o+="</tr>"}o+="</table><p><br></p>";var A=this.editor;A.cmd.do("insertHTML",o),A.cmd.do("enableObjectResizing",!1),A.cmd.do("enableInlineTableEditing",!1)},_createEditPanel:function(){var e=this,t=r("add-row"),n=r("add-col"),i=r("del-row"),o=r("del-col"),A=r("del-table");new u(this,{width:320,tabs:[{title:"编辑表格",tpl:'<div>\n                        <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                            <button id="'+t+'" class="left">增加行</button>\n                            <button id="'+i+'" class="red left">删除行</button>\n                            <button id="'+n+'" class="left">增加列</button>\n                            <button id="'+o+'" class="red left">删除列</button>\n                        </div>\n                        <div class="w-e-button-container">\n                            <button id="'+A+'" class="gray left">删除表格</button>\n                        </dv>\n                    </div>',events:[{selector:"#"+t,type:"click",fn:function(){return e._addRow(),!0}},{selector:"#"+n,type:"click",fn:function(){return e._addCol(),!0}},{selector:"#"+i,type:"click",fn:function(){return e._delRow(),!0}},{selector:"#"+o,type:"click",fn:function(){return e._delCol(),!0}},{selector:"#"+A,type:"click",fn:function(){return e._delTable(),!0}}]}]}).show()},_getLocationData:function(){var e={},t=this.editor,n=t.selection.getSelectionContainerElem();if(n){var i=n.getNodeName();if("TD"===i||"TH"===i){var o=n.parent(),A=o.children(),c=A.length;A.forEach(function(t,i){if(t===n[0])return e.td={index:i,elem:t,length:c},!1});var r=o.parent(),a=r.children(),s=a.length;return a.forEach(function(t,n){if(t===o[0])return e.tr={index:n,elem:t,length:s},!1}),e}}},_addRow:function(){var e=this._getLocationData();if(e){var t=e.tr,n=o(t.elem),i=e.td,A=i.length,c=document.createElement("tr"),r="",a=void 0;for(a=0;a<A;a++)r+="<td>&nbsp;</td>";c.innerHTML=r,o(c).insertAfter(n)}},_addCol:function(){var e=this._getLocationData();if(e){var t=e.tr,n=e.td,i=n.index;o(t.elem).parent().children().forEach(function(e){var t=o(e),n=t.children(),A=n.get(i),c=A.getNodeName().toLowerCase();o(document.createElement(c)).insertAfter(A)})}},_delRow:function(){var e=this._getLocationData();if(e){o(e.tr.elem).remove()}},_delCol:function(){var e=this._getLocationData();if(e){var t=e.tr,n=e.td,i=n.index;o(t.elem).parent().children().forEach(function(e){o(e).children().get(i).remove()})}},_delTable:function(){var e=this.editor,t=e.selection.getSelectionContainerElem();if(t){var n=t.parentUntil("table");n&&n.remove()}},tryChangeActive:function(e){var t=this.editor,n=this.$elem,i=t.selection.getSelectionContainerElem();if(i){var o=i.getNodeName();"TD"===o||"TH"===o?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}}},Q.prototype={constructor:Q,onClick:function(){this._createPanel()},_createPanel:function(){var e=this,t=r("text-val"),n=r("btn"),i=new u(this,{width:350,tabs:[{title:"插入视频",tpl:'<div>\n                        <input id="'+t+'" type="text" class="block" placeholder="格式如：<iframe src=... ></iframe>"/>\n                        <div class="w-e-button-container">\n                            <button id="'+n+'" class="right">插入</button>\n                        </div>\n                    </div>',events:[{selector:"#"+n,type:"click",fn:function(){var n=o("#"+t),i=n.val().trim();return i&&e._insert(i),!0}}]}]});i.show(),this.panel=i},_insert:function(e){this.editor.cmd.do("insertHTML",e+"<p><br></p>")}},D.prototype={constructor:D,onClick:function(){this._active?this._createEditPanel():this._createInsertPanel()},_createEditPanel:function(){var e=this.editor,t=r("width-30"),n=r("width-50"),i=r("width-100"),o=r("del-btn"),A=[{title:"编辑图片",tpl:'<div>\n                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">最大宽度：</span>\n                        <button id="'+t+'" class="left">30%</button>\n                        <button id="'+n+'" class="left">50%</button>\n                        <button id="'+i+'" class="left">100%</button>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button id="'+o+'" class="gray left">删除图片</button>\n                    </dv>\n                </div>',events:[{selector:"#"+t,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","30%"),!0}},{selector:"#"+n,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","50%"),!0}},{selector:"#"+i,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","100%"),!0}},{selector:"#"+o,type:"click",fn:function(){var t=e._selectedImg;return t&&t.remove(),!0}}]}],c=new u(this,{width:300,tabs:A});c.show(),this.panel=c},_createInsertPanel:function(){var e=this.editor,t=e.uploadImg,n=e.config,i=r("up-trigger"),A=r("up-file"),c=r("link-url"),a=r("link-btn"),s=[{title:"上传图片",tpl:'<div class="w-e-up-img-container">\n                    <div id="'+i+'" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="'+A+'" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>',events:[{selector:"#"+i,type:"click",fn:function(){var e=o("#"+A),t=e[0];if(!t)return!0;t.click()}},{selector:"#"+A,type:"change",fn:function(){var e=o("#"+A),n=e[0];if(!n)return!0;var i=n.files;return i.length&&t.uploadImg(i),!0}}]},{title:"网络图片",tpl:'<div>\n                    <input id="'+c+'" type="text" class="block" placeholder="图片链接"/></td>\n                    <div class="w-e-button-container">\n                        <button id="'+a+'" class="right">插入</button>\n                    </div>\n                </div>',events:[{selector:"#"+a,type:"click",fn:function(){var e=o("#"+c),n=e.val().trim();return n&&t.insertLinkImg(n),!0}}]}],l=[];(n.uploadImgShowBase64||n.uploadImgServer)&&window.FileReader&&l.push(s[0]),n.showLinkImg&&l.push(s[1]);var d=new u(this,{width:300,tabs:l});d.show(),this.panel=d},tryChangeActive:function(e){var t=this.editor,n=this.$elem;t._selectedImg?(this._active=!0,n.addClass("w-e-active")):(this._active=!1,n.removeClass("w-e-active"))}};var $={};$.bold=s,$.head=d,$.link=h,$.italic=p,$.redo=f,$.strikeThrough=g,$.underline=m,$.undo=w,$.list=v,$.justify=b,$.foreColor=E,$.backColor=y,$.quote=B,$.code=C,$.emoticon=x,$.table=I,$.video=Q,$.image=D,M.prototype={constructor:M,init:function(){var e=this,t=this.editor;((t.config||{}).menus||[]).forEach(function(n){var i=$[n];i&&"function"==typeof i&&(e.menus[n]=new i(t))}),this._addToToolbar(),this._bindEvent()},_addToToolbar:function(){var e=this.editor,t=e.$toolbarElem;A(this.menus,function(e,n){var i=n.$elem;i&&t.append(i)})},_bindEvent:function(){var e=this.menus,t=this.editor;A(e,function(e,n){var i=n.type;if(i){var o=n.$elem,A=n.droplist;n.panel;"click"===i&&n.onClick&&o.on("click",function(e){null!=t.selection.getRange()&&n.onClick(e)}),"droplist"===i&&A&&o.on("mouseenter",function(e){null!=t.selection.getRange()&&(A.showTimeoutId=setTimeout(function(){A.show()},200))}).on("mouseleave",function(e){A.hideTimeoutId=setTimeout(function(){A.hide()},0)}),"panel"===i&&n.onClick&&o.on("click",function(e){e.stopPropagation(),null!=t.selection.getRange()&&n.onClick(e)})}})},changeActive:function(){A(this.menus,function(e,t){t.tryChangeActive&&setTimeout(function(){t.tryChangeActive()},100)})}},S.prototype={constructor:S,init:function(){this._bindEvent()},clear:function(){this.html("<p><br></p>")},html:function(e){var t=this.editor,n=t.$textElem;if(null==e)return n.html();n.html(e),t.initSelection()},text:function(e){var t=this.editor,n=t.$textElem;if(null==e)return n.text();n.text("<p>"+e+"</p>"),t.initSelection()},append:function(e){var t=this.editor;t.$textElem.append(o(e)),t.initSelection()},_bindEvent:function(){this._saveRangeRealTime(),this._enterKeyHandle(),this._clearHandle(),this._pasteHandle(),this._tabHandle(),this._imgHandle()},_saveRangeRealTime:function(){function e(e){t.selection.saveRange(),
t.menus.changeActive()}var t=this.editor,n=t.$textElem;n.on("keyup",e),n.on("mousedown",function(t){n.on("mouseleave",e)}),n.on("mouseup",function(t){e(),n.off("mouseleave",e)})},_enterKeyHandle:function(){function e(e){var t=n.selection.getSelectionContainerElem();if(t.parent().equal(i)&&("P"!==t.getNodeName()&&!t.text())){var A=o("<p><br></p>");A.insertBefore(t),n.selection.createRangeByElem(A,!0),n.selection.restoreSelection(),t.remove()}}function t(e){var t=n.selection.getSelectionContainerElem();if(t){var i=t.parent(),o=t.getNodeName(),A=i.getNodeName();if("CODE"===o&&"PRE"===A&&n.cmd.queryCommandSupported("insertHTML")){var c=n.selection.getRange().startOffset;n.cmd.do("insertHTML","\n"),n.selection.saveRange(),n.selection.getRange().startOffset===c&&n.cmd.do("insertHTML","\n"),e.preventDefault()}}}var n=this.editor,i=n.$textElem;i.on("keyup",function(t){13===t.keyCode&&e(t)}),i.on("keydown",function(e){13===e.keyCode&&t(e)})},_clearHandle:function(){var e=this.editor,t=e.$textElem;t.on("keydown",function(e){if(8===e.keyCode){return"<p><br></p>"===t.html().toLowerCase().trim()?void e.preventDefault():void 0}}),t.on("keyup",function(n){if(8===n.keyCode){var i=void 0,A=t.html().toLowerCase().trim();A&&"<br>"!==A||(i=o("<p><br/></p>"),t.html(""),t.append(i),e.selection.createRangeByElem(i,!1,!0),e.selection.restoreSelection())}})},_pasteHandle:function(){var e=this.editor,t=e.$textElem;t.on("paste",function(n){if(!L.isIE()){n.preventDefault();var i=_(n),o=k(n);o=o.replace(/\n/gm,"<br>");var A=e.selection.getSelectionContainerElem();if(A){var c=A.getNodeName();if("CODE"!==c&&"PRE"!==c&&"TD"!==c&&"TH"!==c)if("DIV"===c||"<p><br></p>"===t.html()){if(!i)return;try{e.cmd.do("insertHTML",i)}catch(t){e.cmd.do("insertHTML","<p>"+o+"</p>")}}else{if(!o)return;e.cmd.do("insertHTML","<p>"+o+"</p>")}}}}),t.on("paste",function(t){t.preventDefault();var n=U(t);if(n&&n.length){var i=e.selection.getSelectionContainerElem();if(i){var o=i.getNodeName();if("CODE"!==o&&"PRE"!==o){e.uploadImg.uploadImg(n)}}}})},_tabHandle:function(){var e=this.editor;e.$textElem.on("keydown",function(t){if(9===t.keyCode&&e.cmd.queryCommandSupported("insertHTML")){var n=e.selection.getSelectionContainerElem();if(n){var i=n.parent(),o=n.getNodeName(),A=i.getNodeName();"CODE"===o&&"PRE"===A?e.cmd.do("insertHTML","    "):e.cmd.do("insertHTML","&nbsp;&nbsp;&nbsp;&nbsp;"),t.preventDefault()}}})},_imgHandle:function(){var e=this.editor,t=e.$textElem;t.on("click","img",function(n){var i=this,A=o(i);t.find("img").removeClass("w-e-selected"),A.addClass("w-e-selected"),e._selectedImg=A,e.selection.createRangeByElem(A)}),t.on("click  keyup",function(n){n.target.matches("img")||(t.find("img").removeClass("w-e-selected"),e._selectedImg=null)})}},R.prototype={constructor:R,do:function(e,t){var n=this.editor;if(n.selection.getRange()){n.selection.restoreSelection();var i="_"+e;this[i]?this[i](t):this._execCommand(e,t),n.menus.changeActive(),n.selection.saveRange(),n.selection.restoreSelection(),n.change&&n.change()}},_insertHTML:function(e){var t=this.editor,n=t.selection.getRange();if(!/^<.+>$/.test(e)&&!L.isWebkit())throw new Error("执行 insertHTML 命令时传入的参数必须是 html 格式");this.queryCommandSupported("insertHTML")?this._execCommand("insertHTML",e):n.insertNode?(n.deleteContents(),n.insertNode(o(e)[0])):n.pasteHTML&&n.pasteHTML(e)},_insertElem:function(e){var t=this.editor,n=t.selection.getRange();n.insertNode&&(n.deleteContents(),n.insertNode(e[0]))},_execCommand:function(e,t){document.execCommand(e,!1,t)},queryCommandValue:function(e){return document.queryCommandValue(e)},queryCommandState:function(e){return document.queryCommandState(e)},queryCommandSupported:function(e){return document.queryCommandSupported(e)}},F.prototype={constructor:F,getRange:function(){return this._currentRange},saveRange:function(e){if(e)return void(this._currentRange=e);var t=window.getSelection();if(0!==t.rangeCount){var n=t.getRangeAt(0),i=this.getSelectionContainerElem(n);if(i){this.editor.$textElem.isContain(i)&&(this._currentRange=n)}}},collapseRange:function(e){null==e&&(e=!1);var t=this._currentRange;t&&t.collapse(e)},getSelectionText:function(){return this._currentRange?this._currentRange.toString():""},getSelectionContainerElem:function(e){e=e||this._currentRange;var t=void 0;if(e)return t=e.commonAncestorContainer,o(1===t.nodeType?t:t.parentNode)},getSelectionStartElem:function(e){e=e||this._currentRange;var t=void 0;if(e)return t=e.startContainer,o(1===t.nodeType?t:t.parentNode)},getSelectionEndElem:function(e){e=e||this._currentRange;var t=void 0;if(e)return t=e.endContainer,o(1===t.nodeType?t:t.parentNode)},isSelectionEmpty:function(){var e=this._currentRange;return!(!e||!e.startContainer||e.startContainer!==e.endContainer||e.startOffset!==e.endOffset)},restoreSelection:function(){var e=window.getSelection();e.removeAllRanges(),e.addRange(this._currentRange)},createEmptyRange:function(){var e=this.editor,t=this.getRange(),n=void 0;t&&this.isSelectionEmpty()&&(L.isWebkit()?(e.cmd.do("insertHTML","&#8203;"),t.setEnd(t.endContainer,t.endOffset+1),this.saveRange(t)):(n=o("<strong>&#8203;</strong>"),e.cmd.do("insertElem",n),this.createRangeByElem(n,!0)))},createRangeByElem:function(e,t,n){if(e.length){var i=e[0],o=document.createRange();n?o.selectNodeContents(i):o.selectNode(i),"boolean"==typeof t&&o.collapse(t),this.saveRange(o)}}},N.prototype={constructor:N,show:function(e){var t=this;if(!this._isShow){this._isShow=!0;var n=this.$bar;if(this._isRender)this._isRender=!0;else{this.$textContainer.append(n)}Date.now()-this._time>100&&e<=1&&(n.css("width",100*e+"%"),this._time=Date.now());var i=this._timeoutId;i&&clearTimeout(i),i=setTimeout(function(){t._hide()},500)}},_hide:function(){this.$bar.remove(),this._time=0,this._isShow=!1,this._isRender=!1}};var J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};T.prototype={constructor:T,_alert:function(e,t){if(this.editor.config.debug)throw new Error("wangEditor: "+(t||e));alert(e)},insertLinkImg:function(e){var t=this;if(e){var n=this.editor,i=document.createElement("img");i.onload=function(){i=null,n.cmd.do("insertHTML",'<img src="'+e+'" style="max-width:100%;"/>')},i.onerror=function(){i=null,t._alert("插入图片错误",'wangEditor: 插入图片出错，图片链接是 "'+e+'"，下载该链接失败')},i.onabort=function(){i=null},i.src=e}},uploadImg:function(e){var t=this;if(e&&e.length){var n=this.editor,i=n.config,o=i.uploadImgMaxSize,r=o/1e3/1e3,a=i.uploadImgMaxLength||1e4,s=i.uploadImgServer,l=i.uploadImgShowBase64,d=i.uploadFileName||"",u=i.uploadImgParams||{},h=i.uploadImgHeaders||{},p=i.uploadImgHooks||{},f=i.uploadImgTimeout||3e3,g=i.withCredentials;null==g&&(g=!1);var m=[],w=[];if(c(e,function(e){var t=e.name,n=e.size;return!1===/\.(jpg|jpeg|png|bmp|gif)$/i.test(t)?void w.push("【"+t+"】不是图片"):o<n?void w.push("【"+t+"】大于 "+r+"M"):void m.push(e)}),w.length)return void this._alert("图片验证未通过: \n"+w.join("\n"));if(m.length>a)return void this._alert("一次最多上传"+a+"张图片");var v=new FormData;if(c(m,function(e){var t=d||e.name;v.append(t,e)}),s&&"string"==typeof s){var b=s.split("#");s=b[0];var E=b[1]||"";A(u,function(e,t){t=encodeURIComponent(t),s.indexOf("?")>0?s+="&":s+="?",s=s+e+"="+t,v.append(e,t)}),E&&(s+="#"+E);var y=new XMLHttpRequest;return y.open("POST",s),y.timeout=f,y.ontimeout=function(){p.timeout&&"function"==typeof p.timeout&&p.timeout(y,n),t._alert("上传图片超时")},y.upload&&(y.upload.onprogress=function(e){var t=void 0,i=new N(n);e.lengthComputable&&(t=e.loaded/e.total,i.show(t))}),y.onreadystatechange=function(){var e=void 0;if(4===y.readyState){if(y.status<200||y.status>=300)return p.error&&"function"==typeof p.error&&p.error(y,n),void t._alert("上传图片发生错误","上传图片发生错误，服务器返回状态是 "+y.status);if(e=y.responseText,"object"!==(void 0===e?"undefined":J(e)))try{e=JSON.parse(e)}catch(i){return p.fail&&"function"==typeof p.fail&&p.fail(y,n,e),void t._alert("上传图片失败","上传图片返回结果错误，返回结果是: "+e)}if(p.customInsert||"0"==e.errno){if(p.customInsert&&"function"==typeof p.customInsert)p.customInsert(t.insertLinkImg.bind(t),e,n);else{(e.data||[]).forEach(function(e){t.insertLinkImg(e)})}p.success&&"function"==typeof p.success&&p.success(y,n,e)}else p.fail&&"function"==typeof p.fail&&p.fail(y,n,e),t._alert("上传图片失败","上传图片返回结果错误，返回结果 errno="+e.errno)}},p.before&&"function"==typeof p.before&&p.before(y,n,m),A(h,function(e,t){y.setRequestHeader(e,t)}),y.withCredentials=g,void y.send(v)}l&&c(e,function(e){var n=t,i=new FileReader;i.readAsDataURL(e),i.onload=function(){n.insertLinkImg(this.result)}})}}};var G=1;H.prototype={constructor:H,_initConfig:function(){var e={};this.config=Object.assign(e,Y,this.customConfig)},_initDom:function(){var e=this,t=this.toolbarSelector,n=o(t),i=this.textSelector,A=this.config,c=A.zIndex||"10000",r=void 0,a=void 0,s=void 0,l=void 0;null==i?(r=o("<div></div>"),a=o("<div></div>"),l=n.children(),n.append(r).append(a),r.css("background-color","#f1f1f1").css("border","1px solid #ccc"),a.css("border","1px solid #ccc").css("border-top","none").css("height","300px")):(r=n,a=o(i),l=a.children()),s=o("<div></div>"),s.attr("contenteditable","true").css("width","100%").css("height","100%"),l&&l.length?s.append(l):s.append(o("<p><br></p>")),a.append(s),r.addClass("w-e-toolbar"),a.addClass("w-e-text-container"),a.css("z-index",c),s.addClass("w-e-text"),this.$toolbarElem=r,this.$textContainerElem=a,this.$textElem=s,a.on("click keyup",function(){e.change&&e.change()}),r.on("click",function(){this.change&&this.change()})},_initCommand:function(){this.cmd=new R(this)},_initSelectionAPI:function(){this.selection=new F(this)},_initUploadImg:function(){this.uploadImg=new T(this)},_initMenus:function(){this.menus=new M(this),this.menus.init()},_initText:function(){this.txt=new S(this),this.txt.init()},initSelection:function(){var e=this.$textElem,t=e.children();if(!t.length)return e.append(o("<p><br></p>")),void this.initSelection();var n=t.last(),i=n.html().toLowerCase(),A=n.getNodeName();if("<br>"!==i&&"<br/>"!==i||"P"!==A)return e.append(o("<p><br></p>")),void this.initSelection();this.selection.createRangeByElem(n,!0),this.selection.restoreSelection()},_bindEvent:function(){var e=0,t=this.txt.html(),n=this.config,i=n.onchange;i&&"function"==typeof i&&(this.change=function(){var n=this.txt.html();n.length!==t.length&&(e&&clearTimeout(e),e=setTimeout(function(){i(n),t=n},200))})},create:function(){this._initConfig(),this._initDom(),this._initCommand(),this._initSelectionAPI(),this._initText(),this._initMenus(),this._initUploadImg(),this.initSelection(),this._bindEvent()}};try{document}catch(e){throw new Error("请在浏览器环境下运行")}!function(){"function"!=typeof Object.assign&&(Object.assign=function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),i=1;i<arguments.length;i++){var o=arguments[i];if(null!=o)for(var A in o)Object.prototype.hasOwnProperty.call(o,A)&&(n[A]=o[A])}return n}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1})}();var O=document.createElement("style");return O.type="text/css",O.innerHTML='.w-e-toolbar,.w-e-text-container,.w-e-menu-panel {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-toolbar *,.w-e-text-container *,.w-e-menu-panel * {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-clear-fix:after {  content: "";  display: table;  clear: both;}.w-e-toolbar .w-e-droplist {  position: absolute;  left: 0;  top: 0;  background-color: #fff;  border: 1px solid #f1f1f1;  border-right-color: #ccc;  border-bottom-color: #ccc;}.w-e-toolbar .w-e-droplist .w-e-dp-title {  text-align: center;  color: #999;  line-height: 2;  border-bottom: 1px solid #f1f1f1;  font-size: 13px;}.w-e-toolbar .w-e-droplist ul.w-e-list {  list-style: none;  line-height: 1;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {  color: #333;  padding: 5px 0;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item:hover {  background-color: #f1f1f1;}.w-e-toolbar .w-e-droplist ul.w-e-block {  list-style: none;  text-align: left;  padding: 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {  display: inline-block;  *display: inline;  *zoom: 1;  padding: 3px 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {  background-color: #f1f1f1;}@font-face {  font-family: \'icomoon\';  src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAABXAAAsAAAAAFXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIPAmNtYXAAAAFoAAAA9AAAAPRAxxN6Z2FzcAAAAlwAAAAIAAAACAAAABBnbHlmAAACZAAAEHwAABB8kRGt5WhlYWQAABLgAAAANgAAADYN4rlyaGhlYQAAExgAAAAkAAAAJAfEA99obXR4AAATPAAAAHwAAAB8cAcDvGxvY2EAABO4AAAAQAAAAEAx8jYEbWF4cAAAE/gAAAAgAAAAIAAqALZuYW1lAAAUGAAAAYYAAAGGmUoJ+3Bvc3QAABWgAAAAIAAAACAAAwAAAAMD3AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8fwDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEANgAAAAyACAABAASAAEAIOkG6Q3pEulH6Wbpd+m56bvpxunL6d/qDepl6mjqcep58A3wFPEg8dzx/P/9//8AAAAAACDpBukN6RLpR+ll6Xfpuem76cbpy+nf6g3qYupo6nHqd/AN8BTxIPHc8fz//f//AAH/4xb+FvgW9BbAFqMWkxZSFlEWRxZDFjAWAxWvFa0VpRWgEA0QBw78DkEOIgADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAAP/ABAADwAAEABMAAAE3AScBAy4BJxM3ASMBAyUBNQEHAYCAAcBA/kCfFzsyY4ABgMD+gMACgAGA/oBOAUBAAcBA/kD+nTI7FwERTgGA/oD9gMABgMD+gIAABAAAAAAEAAOAABAAIQAtADQAAAE4ATEROAExITgBMRE4ATEhNSEiBhURFBYzITI2NRE0JiMHFAYjIiY1NDYzMhYTITUTATM3A8D8gAOA/IAaJiYaA4AaJiYagDgoKDg4KCg4QP0A4AEAQOADQP0AAwBAJhr9ABomJhoDABom4Cg4OCgoODj9uIABgP7AwAAAAgAAAEAEAANAACgALAAAAS4DIyIOAgcOAxUUHgIXHgMzMj4CNz4DNTQuAicBEQ0BA9U2cXZ5Pz95dnE2Cw8LBgYLDws2cXZ5Pz95dnE2Cw8LBgYLDwv9qwFA/sADIAgMCAQECAwIKVRZWy8vW1lUKQgMCAQECAwIKVRZWy8vW1lUKf3gAYDAwAAAAAACAMD/wANAA8AAEwAfAAABIg4CFRQeAjEwPgI1NC4CAyImNTQ2MzIWFRQGAgBCdVcyZHhkZHhkMld1QlBwcFBQcHADwDJXdUJ4+syCgsz6eEJ1VzL+AHBQUHBwUFBwAAABAAAAAAQAA4AAIQAAASIOAgcnESEnPgEzMh4CFRQOAgcXPgM1NC4CIwIANWRcUiOWAYCQNYtQUItpPBIiMB5VKEAtGFCLu2oDgBUnNyOW/oCQNDw8aYtQK1FJQRpgI1ZibDlqu4tQAAEAAAAABAADgAAgAAATFB4CFzcuAzU0PgIzMhYXByERBy4DIyIOAgAYLUAoVR4wIhI8aYtQUIs1kAGAliNSXGQ1aruLUAGAOWxiViNgGkFJUStQi2k8PDSQAYCWIzcnFVCLuwACAAAAQAQBAwAAHgA9AAATMh4CFRQOAiMiLgI1JzQ+AjMVIgYHDgEHPgEhMh4CFRQOAiMiLgI1JzQ+AjMVIgYHDgEHPgHhLlI9IyM9Ui4uUj0jAUZ6o11AdS0JEAcIEgJJLlI9IyM9Ui4uUj0jAUZ6o11AdS0JEAcIEgIAIz1SLi5SPSMjPVIuIF2jekaAMC4IEwoCASM9Ui4uUj0jIz1SLiBdo3pGgDAuCBMKAgEAAAYAQP/ABAADwAADAAcACwARAB0AKQAAJSEVIREhFSERIRUhJxEjNSM1ExUzFSM1NzUjNTMVFREjNTM1IzUzNSM1AYACgP2AAoD9gAKA/YDAQEBAgMCAgMDAgICAgICAAgCAAgCAwP8AwED98jJAkjwyQJLu/sBAQEBAQAAGAAD/wAQAA8AAAwAHAAsAFwAjAC8AAAEhFSERIRUhESEVIQE0NjMyFhUUBiMiJhE0NjMyFhUUBiMiJhE0NjMyFhUUBiMiJgGAAoD9gAKA/YACgP2A/oBLNTVLSzU1S0s1NUtLNTVLSzU1S0s1NUsDgID/AID/AIADQDVLSzU1S0v+tTVLSzU1S0v+tTVLSzU1S0sAAwAAAAAEAAOgAAMADQAUAAA3IRUhJRUhNRMhFSE1ISUJASMRIxEABAD8AAQA/ACAAQABAAEA/WABIAEg4IBAQMBAQAEAgIDAASD+4P8AAQAAAAAAAgBT/8wDrQO0AC8AXAAAASImJy4BNDY/AT4BMzIWFx4BFAYPAQYiJyY0PwE2NCcuASMiBg8BBhQXFhQHDgEjAyImJy4BNDY/ATYyFxYUDwEGFBceATMyNj8BNjQnJjQ3NjIXHgEUBg8BDgEjAbgKEwgjJCQjwCNZMTFZIyMkJCNYDywPDw9YKSkUMxwcMxTAKSkPDwgTCrgxWSMjJCQjWA8sDw8PWCkpFDMcHDMUwCkpDw8PKxAjJCQjwCNZMQFECAckWl5aJMAiJSUiJFpeWiRXEBAPKw9YKXQpFBUVFMApdCkPKxAHCP6IJSIkWl5aJFcQEA8rD1gpdCkUFRUUwCl0KQ8rEA8PJFpeWiTAIiUAAAAABQAA/8AEAAPAABMAJwA7AEcAUwAABTI+AjU0LgIjIg4CFRQeAhMyHgIVFA4CIyIuAjU0PgITMj4CNw4DIyIuAiceAyc0NjMyFhUUBiMiJiU0NjMyFhUUBiMiJgIAaruLUFCLu2pqu4tQUIu7alaYcUFBcZhWVphxQUFxmFYrVVFMIwU3Vm8/P29WNwUjTFFV1SUbGyUlGxslAYAlGxslJRsbJUBQi7tqaruLUFCLu2pqu4tQA6BBcZhWVphxQUFxmFZWmHFB/gkMFSAUQ3RWMTFWdEMUIBUM9yg4OCgoODgoKDg4KCg4OAAAAAADAAD/wAQAA8AAEwAnADMAAAEiDgIVFB4CMzI+AjU0LgIDIi4CNTQ+AjMyHgIVFA4CEwcnBxcHFzcXNyc3AgBqu4tQUIu7amq7i1BQi7tqVphxQUFxmFZWmHFBQXGYSqCgYKCgYKCgYKCgA8BQi7tqaruLUFCLu2pqu4tQ/GBBcZhWVphxQUFxmFZWmHFBAqCgoGCgoGCgoGCgoAADAMAAAANAA4AAEgAbACQAAAE+ATU0LgIjIREhMj4CNTQmATMyFhUUBisBEyMRMzIWFRQGAsQcIChGXTX+wAGANV1GKET+hGUqPDwpZp+fnyw+PgHbIlQvNV1GKPyAKEZdNUZ0AUZLNTVL/oABAEs1NUsAAAIAwAAAA0ADgAAbAB8AAAEzERQOAiMiLgI1ETMRFBYXHgEzMjY3PgE1ASEVIQLAgDJXdUJCdVcygBsYHEkoKEkcGBv+AAKA/YADgP5gPGlOLS1OaTwBoP5gHjgXGBsbGBc4Hv6ggAAAAQCAAAADgAOAAAsAAAEVIwEzFSE1MwEjNQOAgP7AgP5AgAFAgAOAQP0AQEADAEAAAQAAAAAEAAOAAD0AAAEVIx4BFRQGBw4BIyImJy4BNTMUFjMyNjU0JiMhNSEuAScuATU0Njc+ATMyFhceARUjNCYjIgYVFBYzMhYXBADrFRY1MCxxPj5xLDA1gHJOTnJyTv4AASwCBAEwNTUwLHE+PnEsMDWAck5OcnJOO24rAcBAHUEiNWIkISQkISRiNTRMTDQ0TEABAwEkYjU1YiQhJCQhJGI1NExMNDRMIR8AAAAHAAD/wAQAA8AAAwAHAAsADwATABsAIwAAEzMVIzczFSMlMxUjNzMVIyUzFSMDEyETMxMhEwEDIQMjAyEDAICAwMDAAQCAgMDAwAEAgIAQEP0AECAQAoAQ/UAQAwAQIBD9gBABwEBAQEBAQEBAQAJA/kABwP6AAYD8AAGA/oABQP7AAAAKAAAAAAQAA4AAAwAHAAsADwATABcAGwAfACMAJwAAExEhEQE1IRUdASE1ARUhNSMVITURIRUhJSEVIRE1IRUBIRUhITUhFQAEAP2AAQD/AAEA/wBA/wABAP8AAoABAP8AAQD8gAEA/wACgAEAA4D8gAOA/cDAwEDAwAIAwMDAwP8AwMDAAQDAwP7AwMDAAAAFAAAAAAQAA4AAAwAHAAsADwATAAATIRUhFSEVIREhFSERIRUhESEVIQAEAPwAAoD9gAKA/YAEAPwABAD8AAOAgECA/wCAAUCA/wCAAAAAAAUAAAAABAADgAADAAcACwAPABMAABMhFSEXIRUhESEVIQMhFSERIRUhAAQA/ADAAoD9gAKA/YDABAD8AAQA/AADgIBAgP8AgAFAgP8AgAAABQAAAAAEAAOAAAMABwALAA8AEwAAEyEVIQUhFSERIRUhASEVIREhFSEABAD8AAGAAoD9gAKA/YD+gAQA/AAEAPwAA4CAQID/AIABQID/AIAAAAAAAQA/AD8C5gLmACwAACUUDwEGIyIvAQcGIyIvASY1ND8BJyY1ND8BNjMyHwE3NjMyHwEWFRQPARcWFQLmEE4QFxcQqKgQFxYQThAQqKgQEE4QFhcQqKgQFxcQThAQqKgQwxYQThAQqKgQEE4QFhcQqKgQFxcQThAQqKgQEE4QFxcQqKgQFwAAAAYAAAAAAyUDbgAUACgAPABNAFUAggAAAREUBwYrASInJjURNDc2OwEyFxYVMxEUBwYrASInJjURNDc2OwEyFxYXERQHBisBIicmNRE0NzY7ATIXFhMRIREUFxYXFjMhMjc2NzY1ASEnJicjBgcFFRQHBisBERQHBiMhIicmNREjIicmPQE0NzY7ATc2NzY7ATIXFh8BMzIXFhUBJQYFCCQIBQYGBQgkCAUGkgUFCCUIBQUFBQglCAUFkgUFCCUIBQUFBQglCAUFSf4ABAQFBAIB2wIEBAQE/oABABsEBrUGBAH3BgUINxobJv4lJhsbNwgFBQUFCLEoCBcWF7cXFhYJKLAIBQYCEv63CAUFBQUIAUkIBQYGBQj+twgFBQUFCAFJCAUGBgUI/rcIBQUFBQgBSQgFBgYF/lsCHf3jDQsKBQUFBQoLDQJmQwUCAgVVJAgGBf3jMCIjISIvAiAFBggkCAUFYBUPDw8PFWAFBQgAAgAHAEkDtwKvABoALgAACQEGIyIvASY1ND8BJyY1ND8BNjMyFwEWFRQHARUUBwYjISInJj0BNDc2MyEyFxYBTv72BgcIBR0GBuHhBgYdBQgHBgEKBgYCaQUFCP3bCAUFBQUIAiUIBQUBhf72BgYcBggHBuDhBgcHBh0FBf71BQgHBv77JQgFBQUFCCUIBQUFBQAAAAEAIwAAA90DbgCzAAAlIicmIyIHBiMiJyY1NDc2NzY3Njc2PQE0JyYjISIHBh0BFBcWFxYzFhcWFRQHBiMiJyYjIgcGIyInJjU0NzY3Njc2NzY9ARE0NTQ1NCc0JyYnJicmJyYnJiMiJyY1NDc2MzIXFjMyNzYzMhcWFRQHBiMGBwYHBh0BFBcWMyEyNzY9ATQnJicmJyY1NDc2MzIXFjMyNzYzMhcWFRQHBgciBwYHBhURFBcWFxYXMhcWFRQHBiMDwRkzMhoZMjMZDQgHCQoNDBEQChIBBxX+fhYHARUJEhMODgwLBwcOGzU1GhgxMRgNBwcJCQsMEA8JEgECAQIDBAQFCBIRDQ0KCwcHDho1NRoYMDEYDgcHCQoMDRAQCBQBBw8BkA4HARQKFxcPDgcHDhkzMhkZMTEZDgcHCgoNDRARCBQUCRERDg0KCwcHDgACAgICDAsPEQkJAQEDAwUMROAMBQMDBQzUUQ0GAQIBCAgSDwwNAgICAgwMDhEICQECAwMFDUUhAdACDQ0ICA4OCgoLCwcHAwYBAQgIEg8MDQICAgINDA8RCAgBAgEGDFC2DAcBAQcMtlAMBgEBBgcWDwwNAgICAg0MDxEICAEBAgYNT/3mRAwGAgIBCQgRDwwNAAACAAD/twP/A7cAEwA5AAABMhcWFRQHAgcGIyInJjU0NwE2MwEWFxYfARYHBiMiJyYnJicmNRYXFhcWFxYzMjc2NzY3Njc2NzY3A5soHh4avkw3RUg0NDUBbSEp/fgXJicvAQJMTHtHNjYhIRARBBMUEBASEQkXCA8SExUVHR0eHikDtxsaKCQz/plGNDU0SUkwAUsf/bErHx8NKHpNTBobLi86OkQDDw4LCwoKFiUbGhERCgsEBAIAAQAAAAAAANox8glfDzz1AAsEAAAAAADVYbp/AAAAANVhun8AAP+3BAEDwAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAA//8EAQABAAAAAAAAAAAAAAAAAAAAHwQAAAAAAAAAAAAAAAIAAAAEAAAABAAAAAQAAAAEAADABAAAAAQAAAAEAAAABAAAQAQAAAAEAAAABAAAUwQAAAAEAAAABAAAwAQAAMAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAyUAPwMlAAADvgAHBAAAIwP/AAAAAAAAAAoAFAAeAEwAlADaAQoBPgFwAcgCBgJQAnoDBAN6A8gEAgQ2BE4EpgToBTAFWAWABaoF7gamBvAH4gg+AAEAAAAfALQACgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA) format(\'truetype\');  font-weight: normal;  font-style: normal;}[class^="w-e-icon-"],[class*=" w-e-icon-"] {  /* use !important to prevent issues with browser extensions that change fonts */  font-family: \'icomoon\' !important;  speak: none;  font-style: normal;  font-weight: normal;  font-variant: normal;  text-transform: none;  line-height: 1;  /* Better Font Rendering =========== */  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}.w-e-icon-close:before {  content: "\\f00d";}.w-e-icon-upload2:before {  content: "\\e9c6";}.w-e-icon-trash-o:before {  content: "\\f014";}.w-e-icon-header:before {  content: "\\f1dc";}.w-e-icon-pencil2:before {  content: "\\e906";}.w-e-icon-paint-brush:before {  content: "\\f1fc";}.w-e-icon-image:before {  content: "\\e90d";}.w-e-icon-play:before {  content: "\\e912";}.w-e-icon-location:before {  content: "\\e947";}.w-e-icon-undo:before {  content: "\\e965";}.w-e-icon-redo:before {  content: "\\e966";}.w-e-icon-quotes-left:before {  content: "\\e977";}.w-e-icon-list-numbered:before {  content: "\\e9b9";}.w-e-icon-list2:before {  content: "\\e9bb";}.w-e-icon-link:before {  content: "\\e9cb";}.w-e-icon-happy:before {  content: "\\e9df";}.w-e-icon-bold:before {  content: "\\ea62";}.w-e-icon-underline:before {  content: "\\ea63";}.w-e-icon-italic:before {  content: "\\ea64";}.w-e-icon-strikethrough:before {  content: "\\ea65";}.w-e-icon-table2:before {  content: "\\ea71";}.w-e-icon-paragraph-left:before {  content: "\\ea77";}.w-e-icon-paragraph-center:before {  content: "\\ea78";}.w-e-icon-paragraph-right:before {  content: "\\ea79";}.w-e-icon-terminal:before {  content: "\\f120";}.w-e-icon-page-break:before {  content: "\\ea68";}.w-e-icon-cancel-circle:before {  content: "\\ea0d";}.w-e-toolbar {  display: -webkit-box;  display: -ms-flexbox;  display: flex;  padding: 0 5px;  /* 单个菜单 */}.w-e-toolbar .w-e-menu {  position: relative;  z-index: 10001;  text-align: center;  padding: 5px 10px;  cursor: pointer;}.w-e-toolbar .w-e-menu i {  color: #999;}.w-e-toolbar .w-e-menu:hover i {  color: #333;}.w-e-toolbar .w-e-active i {  color: #1e88e5;}.w-e-toolbar .w-e-active:hover i {  color: #1e88e5;}.w-e-text-container .w-e-panel-container {  position: absolute;  top: 0;  left: 50%;  border: 1px solid #ccc;  border-top: 0;  box-shadow: 1px 1px 2px #ccc;  color: #333;  background-color: #fff;  /* 为 emotion panel 定制的样式 */  /* 上传图片的 panel 定制样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-close {  position: absolute;  right: 0;  top: 0;  padding: 5px;  margin: 2px 5px 0 0;  cursor: pointer;  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-close:hover {  color: #333;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title {  list-style: none;  display: -webkit-box;  display: -ms-flexbox;  display: flex;  font-size: 14px;  margin: 2px 10px 0 10px;  border-bottom: 1px solid #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-item {  padding: 3px 5px;  color: #999;  cursor: pointer;  margin: 0 3px;  position: relative;  top: 1px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-active {  color: #333;  border-bottom: 1px solid #333;  cursor: default;  font-weight: 700;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content {  padding: 10px 15px 10px 15px;  font-size: 16px;  /* 输入框的样式 */  /* 按钮的样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content button:focus {  outline: none;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea {  width: 100%;  border: 1px solid #ccc;  padding: 5px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus {  border-color: #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text] {  border: none;  border-bottom: 1px solid #ccc;  font-size: 14px;  height: 20px;  color: #333;  text-align: left;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].small {  width: 30px;  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].block {  display: block;  width: 100%;  margin: 10px 0;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text]:focus {  border-bottom: 2px solid #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button {  font-size: 14px;  color: #1e88e5;  border: none;  padding: 5px 10px;  background-color: #fff;  cursor: pointer;  border-radius: 3px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.left {  float: left;  margin-right: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.right {  float: right;  margin-left: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.gray {  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.red {  color: #c24f4a;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button:hover {  background-color: #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container:after {  content: "";  display: table;  clear: both;}.w-e-text-container .w-e-panel-container .w-e-emoticon-container .w-e-item {  cursor: pointer;  font-size: 18px;  padding: 0 3px;  display: inline-block;  *display: inline;  *zoom: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container {  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn {  display: inline-block;  *display: inline;  *zoom: 1;  color: #999;  cursor: pointer;  font-size: 60px;  line-height: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn:hover {  color: #333;}.w-e-text-container {  position: relative;}.w-e-text-container .w-e-progress {  position: absolute;  background-color: #1e88e5;  bottom: 0;  left: 0;  height: 1px;}.w-e-text {  padding: 0 10px;  overflow-y: scroll;}.w-e-text p,.w-e-text h1,.w-e-text h2,.w-e-text h3,.w-e-text h4,.w-e-text h5,.w-e-text table,.w-e-text pre {  margin: 10px 0;  line-height: 1.5;}.w-e-text ul,.w-e-text ol {  margin: 10px 0 10px 20px;}.w-e-text blockquote {  display: block;  border-left: 8px solid #d0e5f2;  padding: 5px 10px;  margin: 10px 0;  line-height: 1.4;  font-size: 100%;  background-color: #f1f1f1;}.w-e-text code {  display: inline-block;  *display: inline;  *zoom: 1;  background-color: #f1f1f1;  border-radius: 3px;  padding: 3px 5px;  margin: 0 3px;}.w-e-text pre code {  display: block;}.w-e-text table {  border-top: 1px solid #ccc;  border-left: 1px solid #ccc;}.w-e-text table td,.w-e-text table th {  border-bottom: 1px solid #ccc;  border-right: 1px solid #ccc;  padding: 3px 5px;}.w-e-text table th {  border-bottom: 2px solid #ccc;  text-align: center;}.w-e-text:focus {  outline: none;}.w-e-text img {  cursor: pointer;}.w-e-text img:hover {  box-shadow: 0 0 5px #333;}.w-e-text img.w-e-selected {  border: 2px solid #1e88e5;}.w-e-text img.w-e-selected:hover {  box-shadow: none;}',document.getElementsByTagName("HEAD").item(0).appendChild(O),window.wangEditor||H});
//# sourceMappingURL=wangEditor.min.js.map
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.4.2
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer'];

  var blocks = [], buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = require('crypto');
    var Buffer = require('buffer').Buffer;
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else if (message.constructor === ArrayBuffer) {
        message = new Uint8Array(message);
      } else if (message.length === undefined) {
        return method(message);
      }
      return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString = typeof(message) != 'string';
    if (notString && message.constructor == root.ArrayBuffer) {
      message = new Uint8Array(message);
    }
    var code, index = 0, i, length = message.length || 0, blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | (code >> 6);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | (code >> 12);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              buffer8[i++] = 0xf0 | (code >> 18);
              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a, b, c, d, bc, da, blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
       HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
       HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
       HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
       HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
       HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
       HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
       HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
       HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
       HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
       HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
       HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
       HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
       HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
       HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
       HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
    ];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 默认配置
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var FilterCSS = require('cssfilter').FilterCSS;
var getDefaultCSSWhiteList = require('cssfilter').getDefaultWhiteList;
var _ = require('./util');

// 默认白名单
function getDefaultWhiteList () {
  return {
    a:      ['target', 'href', 'title'],
    abbr:   ['title'],
    address: [],
    area:   ['shape', 'coords', 'href', 'alt'],
    article: [],
    aside:  [],
    audio:  ['autoplay', 'controls', 'loop', 'preload', 'src'],
    b:      [],
    bdi:    ['dir'],
    bdo:    ['dir'],
    big:    [],
    blockquote: ['cite'],
    br:     [],
    caption: [],
    center: [],
    cite:   [],
    code:   [],
    col:    ['align', 'valign', 'span', 'width'],
    colgroup: ['align', 'valign', 'span', 'width'],
    dd:     [],
    del:    ['datetime'],
    details: ['open'],
    div:    [],
    dl:     [],
    dt:     [],
    em:     [],
    font:   ['color', 'size', 'face'],
    footer: [],
    h1:     [],
    h2:     [],
    h3:     [],
    h4:     [],
    h5:     [],
    h6:     [],
    header: [],
    hr:     [],
    i:      [],
    img:    ['src', 'alt', 'title', 'width', 'height','style'],
    ins:    ['datetime'],
    li:     [],
    mark:   [],
    nav:    [],
    ol:     [],
    p:      [],
    pre:    [],
    s:      [],
    section:[],
    small:  [],
    span:   [],
    sub:    [],
    sup:    [],
    strong: [],
    table:  ['width', 'border', 'align', 'valign'],
    tbody:  ['align', 'valign'],
    td:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
    tfoot:  ['align', 'valign'],
    th:     ['width', 'rowspan', 'colspan', 'align', 'valign'],
    thead:  ['align', 'valign'],
    tr:     ['rowspan', 'align', 'valign'],
    tt:     [],
    u:      [],
    ul:     [],
    video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']
  };
}

// 默认CSS Filter
var defaultCSSFilter = new FilterCSS();

/**
 * 匹配到标签时的处理方法
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag (tag, html, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的标签时的处理方法
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag (tag, html, options) {
  // do nothing
}

/**
 * 匹配到标签属性时的处理方法
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr (tag, name, value) {
  // do nothing
}

/**
 * 匹配到不在白名单上的标签属性时的处理方法
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr (tag, name, value) {
  // do nothing
}

/**
 * HTML转义
 *
 * @param {String} html
 */
function escapeHtml (html) {
  return html.replace(REGEXP_LT, '&lt;').replace(REGEXP_GT, '&gt;');
}

/**
 * 安全的标签属性值
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue (tag, name, value, cssFilter) {
  // 转换为友好的属性值，再做判断
  value = friendlyAttrValue(value);

  if (name === 'href' || name === 'src') {
    // 过滤 href 和 src 属性
    // 仅允许 http:// | https:// | mailto: | / | # 开头的地址
    value = _.trim(value);
    if (value === '#') return '#';
    if (!(value.substr(0, 7) === 'http://' ||
         value.substr(0, 8) === 'https://' ||
         value.substr(0, 7) === 'mailto:' ||
         value[0] === '#' ||
         value[0] === '/' ||
         value.substr(0,11)==='web/upload/' ||
         value.substr(0,11)==='index.html?'
         )) {
      return '';
    }
  } else if (name === 'background') {
    // 过滤 background 属性 （这个xss漏洞较老了，可能已经不适用）
    // javascript:
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return '';
    }
  } else if (name === 'style') {
    // /*注释*/
    /*REGEXP_DEFAULT_ON_TAG_ATTR_3.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_3.test(value)) {
      return '';
    }*/
    // expression()
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return '';
    }
    // url()
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return '';
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // 输出时需要转义<>"
  value = escapeAttrValue(value);
  return value;
}

// 正则表达式
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/img;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/img;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/img;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//mg;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/ig;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/ig;

/**
 * 对双引号进行转义
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote (str) {
  return str.replace(REGEXP_QUOTE, '&quot;');
}

/**
 * 对双引号进行转义
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote (str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * 对html实体编码进行转义
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities (str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode (str, code) {
    return (code[0] === 'x' || code[0] === 'X')
            ? String.fromCharCode(parseInt(code.substr(1), 16))
            : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * 对html5新增的危险实体编码进行转义
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities (str) {
  return str.replace(REGEXP_ATTR_VALUE_COLON, ':')
            .replace(REGEXP_ATTR_VALUE_NEWLINE, ' ');
}

/**
 * 清除不可见字符
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter (str) {
  var str2 = '';
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? ' ' : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * 将标签的属性值转换成一般字符，便于分析
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue (str) {
  str = unescapeQuote(str);             // 双引号
  str = escapeHtmlEntities(str);         // 转换HTML实体编码
  str = escapeDangerHtml5Entities(str);  // 转换危险的HTML5新增实体编码
  str = clearNonPrintableCharacter(str); // 清除不可见字符
  return str;
}

/**
 * 转义用于输出的标签属性值
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue (str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * 去掉不在白名单中的标签onIgnoreTag处理方法
 */
function onIgnoreTagStripAll () {
  return '';
}

/**
 * 删除标签体
 *
 * @param {array} tags 要删除的标签列表
 * @param {function} next 对不在列表中的标签的处理函数，可选
 */
function StripTagBody (tags, next) {
  if (typeof(next) !== 'function') {
    next = function () {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag (tag) {
    if (isRemoveAllTag) return true;
    return (_.indexOf(tags, tag) !== -1);
  }

  var removeList = [];   // 要删除的位置范围列表
  var posStart = false;  // 当前标签开始位置

  return {
    onIgnoreTag: function (tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = '[/removed]';
          var end = options.position + ret.length;
          removeList.push([posStart !== false ? posStart : options.position, end]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return '[removed]';
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function (html) {
      var rethtml = '';
      var lastPos = 0;
      _.forEach(removeList, function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
}

/**
 * 去除备注标签
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag (html) {
  return html.replace(STRIP_COMMENT_TAG_REGEXP, '');
}
var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

/**
 * 去除不可见字符
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar (html) {
  var chars = html.split('');
  chars = chars.filter(function (char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join('');
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;

},{"./util":4,"cssfilter":8}],2:[function(require,module,exports){
/**
 * 模块入口
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = require('./default');
var parser = require('./parser');
var FilterXSS = require('./xss');


/**
 * XSS过滤
 *
 * @param {String} html 要过滤的HTML代码
 * @param {Object} options 选项：whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml
 * @return {String}
 */
function filterXSS (html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];


// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterXSS = module.exports;
}

},{"./default":1,"./parser":3,"./xss":5}],3:[function(require,module,exports){
/**
 * 简单 HTML Parser
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = require('./util');

/**
 * 获取标签的名称
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {String}
 */
function getTagName (html) {
  var i = html.indexOf(' ');
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === '/') tagName = tagName.slice(1);
  if (tagName.slice(-1) === '/') tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * 是否为闭合标签
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing (html) {
  return (html.slice(0, 2) === '</');
}

/**
 * 分析HTML代码，调用相应的函数处理，返回处理后的HTML
 *
 * @param {String} html
 * @param {Function} onTag 处理标签的函数
 *   参数格式： function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml 对HTML进行转义的函数
 * @return {String}
 */
function parseTag (html, onTag, escapeHtml) {
  'user strict';

  var rethtml = '';        // 待返回的HTML
  var lastPos = 0;         // 上一个标签结束位置
  var tagStart = false;    // 当前标签开始位置
  var quoteStart = false;  // 引号开始位置
  var currentPos = 0;      // 当前位置
  var len = html.length;   // HTML长度
  var currentHtml = '';    // 当前标签的HTML代码
  var currentTagName = ''; // 当前标签的名称

  // 逐个分析字符
  for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === '<') {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === '<') {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === '>') {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(tagStart,
                           rethtml.length,
                           currentTagName,
                           currentHtml,
                           isClosing(currentHtml));
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        // HTML标签内的引号仅当前一个字符是等于号时才有效
        if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === '=') {
          quoteStart = c;
          continue;
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

// 不符合属性名称规则的正则表达式
var REGEXP_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/img;

/**
 * 分析标签HTML代码，调用相应的函数处理，返回HTML
 *
 * @param {String} html 如标签'<a href="#" target="_blank">' 则为 'href="#" target="_blank"'
 * @param {Function} onAttr 处理属性值的函数
 *   函数格式： function (name, value)
 * @return {String}
 */
function parseAttr (html, onAttr) {
  'user strict';

  var lastPos = 0;        // 当前位置
  var retAttrs = [];      // 待返回的属性列表
  var tmpName = false;    // 临时属性名称
  var len = html.length;  // HTML代码长度

  function addAttr (name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ATTR_NAME, '').toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || '');
    if (ret) retAttrs.push(ret);
  };

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === '=') {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      // HTML标签内的引号仅当前一个字符是等于号时才有效
      if (i === lastPos && (c === '"' || c === "'") && html.charAt(i - 1) === '=') {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (c === ' ') {
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(' '));
}

function findNextEqual (str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === ' ') continue;
    if (c === '=') return i;
    return -1;
  }
}

function findBeforeEqual (str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === ' ') continue;
    if (c === '=') return i;
    return -1;
  }
}

function isQuoteWrapString (text) {
  if ((text[0] === '"' && text[text.length - 1] === '"') ||
      (text[0] === '\'' && text[text.length - 1] === '\'')) {
    return true;
  } else {
    return false;
  }
};

function stripQuoteWrap (text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
};


exports.parseTag = parseTag;
exports.parseAttr = parseAttr;

},{"./util":4}],4:[function(require,module,exports){
module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }
};

},{}],5:[function(require,module,exports){
/**
 * 过滤XSS
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var FilterCSS = require('cssfilter').FilterCSS;
var DEFAULT = require('./default');
var parser = require('./parser');
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = require('./util');


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 取标签内的属性列表字符串
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs (html) {
  var i = html.indexOf(' ');
  if (i === -1) {
    return {
      html:    '',
      closing: (html[html.length - 2] === '/')
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = (html[html.length - 1] === '/');
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html:    html,
    closing: isClosing
  };
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * XSS过滤对象
 *
 * @param {Object} options
 *   选项：whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} css=false表示禁用cssfilter
 */
function FilterXSS (options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time');
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * 开始处理
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  // 兼容各种奇葩输入
  html = html || '';
  html = html.toString();
  if (!html) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // 是否清除不可见字符
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // 是否禁止备注标签
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // 如果开启了stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(options.stripIgnoreTagBody, onIgnoreTag);
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(html, function (sourcePosition, position, tag, html, isClosing) {
    var info = {
      sourcePosition: sourcePosition,
      position:       position,
      isClosing:      isClosing,
      isWhite:        (tag in whiteList)
    };

    // 调用onTag处理
    var ret = onTag(tag, html, info);
    if (!isNull(ret)) return ret;

    // 默认标签处理方法
    if (info.isWhite) {
      // 白名单标签，解析标签属性
      // 如果是闭合标签，则不需要解析属性
      if (info.isClosing) {
        return '</' + tag + '>';
      }

      var attrs = getAttrs(html);
      var whiteAttrList = whiteList[tag];
      var attrsHtml = parseAttr(attrs.html, function (name, value) {

        // 调用onTagAttr处理
        var isWhiteAttr = (_.indexOf(whiteAttrList, name) !== -1);
        var ret = onTagAttr(tag, name, value, isWhiteAttr);
        if (!isNull(ret)) return ret;

        // 默认的属性处理方法
        if (isWhiteAttr) {
          // 白名单属性，调用safeAttrValue过滤属性值
          value = safeAttrValue(tag, name, value, cssFilter);
          if (value) {
            return name + '="' + value + '"';
          } else {
            return name;
          }
        } else {
          // 非白名单属性，调用onIgnoreTagAttr处理
          var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;
          return;
        }
      });

      // 构造新的标签代码
      var html = '<' + tag;
      if (attrsHtml) html += ' ' + attrsHtml;
      if (attrs.closing) html += ' /';
      html += '>';
      return html;

    } else {
      // 非白名单标签，调用onIgnoreTag处理
      var ret = onIgnoreTag(tag, html, info);
      if (!isNull(ret)) return ret;
      return escapeHtml(html);
    }

  }, escapeHtml);

  // 如果开启了stripIgnoreTagBody，需要对结果再进行处理
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};


module.exports = FilterXSS;

},{"./default":1,"./parser":3,"./util":4,"cssfilter":8}],6:[function(require,module,exports){
/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = require('./default');
var parseStyle = require('./parser');
var _ = require('./util');


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Object} onAttr
 *   - {Object} onIgnoreAttr
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;

},{"./default":7,"./parser":9,"./util":10}],7:[function(require,module,exports){
/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = true; // default: none
  whiteList['float-offset'] = true; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;

},{}],8:[function(require,module,exports){
/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = require('./default');
var FilterCSS = require('./css');


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}

},{"./css":6,"./default":7}],9:[function(require,module,exports){
/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = require('./util');


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;

},{"./util":10}],10:[function(require,module,exports){
module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};

},{}]},{},[2]);
// https://github.com/jjling2011/card.js
// GPL-3.0

/* global define */

(function (name, context, definition) {
    // copy from https://github.com/ded/qwery/blob/master/src/qwery.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return definition();
        });
    } else {
        context[name] = definition();
    }
})('cardjs', this, function () {

    "use strict";
    
    var root = window;

    var Package = function (params) {

        var key;
        var skip = {'key': true};

        for (key  in params) {
            if (!(key in skip)) {
                this[key] = params[key];
            }
        }

        this.settings = {
            key: params.key || 'pkgshare'
        };

        this.cjsv = {
            // 登记 this.f.event()的时候记录下事件名.close的时候销毁事件.
            cevs: {}
        };

        this.f = {};

        for (key in Database) {
            this.f[key] = Database[key].bind(this);
        }

        this.self = true;
    };

    Package.prototype.destroy = function () {
        call_method.bind(this)('clean_up');
        var key;
        for (key in this.cjsv.cevs) {
            this.f.event(key, false);
            delete this.cjsv.cevs[key];
        }
        for (key in this.f) {
            this.f[key] = null;
            delete this.f[key];
        }
        for (key in this) {
            this[key] = null;
        }
        this.self = false;
    };

    var Card = function (container_id) {

        var key;

        this.self = root.document.getElementById(container_id);

        this.settings = {
            // 服务页面url
            server_page: 'serv.php',
            key: 'share',
            // 自动生成的id以什么开头（方便调试）
            header: 'card',
            // 这个卡片是否需要绑定事件
            add_event: false,
            // 显示debug信息 
            verbose: false
        };

        for (key in gset) {
            this.settings[key] = gset[key];
        }

        /* 
         * CARD内部使用的变量，设个奇怪的名包装起来不用占太多变量名。
         * fyi. cjsv = cardjs_variables
         */
        this.cjsv = {
            timer: {},
            evs: [], // this.f.on 绑定的事件
            ev_handler: {}, // 事件响应函数
            cevs: {}, // this.f.event 登记的事件
            ids: {},
            objs: {}, // cache
            cid: container_id,
            //wrapid: gen_id('card_wrap', 0, 16),
            //wrap: null,
            rendered: false,
            event_flag: false
        };

        this.f = {};

        for (key in funcs) {
            this.f[key] = funcs[key].bind(this);
        }

        for (key in Database) {
            this.f[key] = Database[key].bind(this);
        }

        key = null;
    };

    /**
     * 如果 key = undefine 返回当前id数量.
     * 如果 obj = undefine 返回string类型的id.
     * 如果 obj = true 返回 key 对应的 DOM object.
     * 
     * @param {null/num/string} key 
     * @param {boolean} obj
     * @returns {num/string/DOM object}
     */
    Card.prototype.el = function (key, obj) {
        // Card.el() return current elements number;
        if (key === undefined) {
            return Object.keys(this.cjsv.ids).length;
        }
        // Card.el('name') return { id: header_name_GlobalCounter_randstr, obj: documnet.getElementById(id)};
        if (obj === undefined) {
            var id;
            if (!(key in this.cjsv.ids)) {
                this.cjsv.ids[key] = id = gen_id(this.settings.header, key);
            } else {
                id = this.cjsv.ids[key];
            }
            return id;
        }

        var dom = null;

        if (key in this.cjsv.objs) {
            dom = this.cjsv.objs[key];
        } else if (key in this.cjsv.ids) {
            dom = root.document.getElementById(this.cjsv.ids[key]);
            // cache
            if (dom !== null) {
                this.cjsv.objs[key] = dom;
            }
        }

        return dom;
    };

    Card.prototype.show = function () {
        if (!this.cjsv.rendered) {
            return this.refresh();
        }
        return this;
    };

    Card.prototype.refresh = function () {
        render.bind(this)();
        this.cjsv.rendered = true;
        return this;
    };

    // 关键方法，生成、绑定、解绑事件，生成、显示界面，数据处理。
    function render() {
        if (this.cjsv.event_flag) {
            for (var key in this.cjsv.timer) {
                this.f.clear_timer(key);
            }

            call_method.bind(this)('remove_event', true);
            release_event.bind(this)();
            this.cjsv.event_flag = false;
        }

        for (var key in this.cjsv.ids) {
            if (this.cjsv.objs[key]) {
                this.cjsv.objs[key] = null;
                delete this.cjsv.objs[key];
            }
            delete this.cjsv.ids[key];
        }

        call_method.bind(this)('data_parser');
        this.self.innerHTML = this.gen_html();
        call_method.bind(this)('before_add_event');
        if (this.el() > 0 && this.settings.add_event) {
            var evh = call_method.bind(this)('gen_ev_handler', true);

            if (!(Lib.isArray(evh) || Lib.isObject(evh))) {
                throw new Error('Card.cjsv.ev_handler should be [func1(), ... ] or { name1:func1(), ... }');
            }

            for (var key in evh) {
                this.cjsv.ev_handler[key] = evh[key].bind(this);
            }

            evh = null;

            if (!this.cjsv.event_flag) {
                call_method.bind(this)('add_event', true);
                this.cjsv.event_flag = true;
            }
        }
        call_method.bind(this)('after_add_event');
        return this;
    }
    ;
    /* 
     * 销毁时进行一些清理工作。
     * 如果还有些其他要清理的东西可以写个
     * card.clean_up=function(){
     *   ... 你想清理的东西 ...
     * };
     */
    Card.prototype.destroy = function () {

        for (var key in this.cjsv.timer) {
            this.f.clear_timer(key);
        }

        if (this.cjsv.event_flag) {
            call_method.bind(this)('remove_event', true);
            release_event.bind(this)();
            this.cjsv.event_flag = false;
        }

        for (var key in this.cjsv.cevs) {
            this.f.event(key, false);
            delete this.cjsv.cevs[key];
        }

        call_method.bind(this)('clean_up');
        //this.cjsv.timer={};
        for (var key in this.cjsv.ids) {
            if (this.cjsv.objs[key]) {
                //this.cjsv.objs[key] = null;
                delete this.cjsv.objs[key];
            }
            delete this.cjsv.ids[key];
        }

        for (var key in this.f) {
            delete this.f[key];
        }
        for (var key in this) {
            this[key] = null;
        }
    };

    var gen_id = (function () {
        var id_counter = 0;
        return (
                function (header, key, len) {
                    len = len || 8;
                    return  header + '_' + key + '_' + (id_counter++) + '_' + Lib.rand(len);
                });
    }());



    // 我真的不知道为什么我喜欢给他设个根本用不上的名字 ...
    Card.prototype.name = 'CARD';
    Card.prototype.gen_html = function () {
        throw new Error('Card.prototype.gen_html(): Please rewrite this function.');
        return '';
    };

    // 自动释放通过 card.f.on 绑定的事件。后面的 remove_event 是手动。
    function release_event() {
        var key;
        if (this.cjsv.evs.length > 0) {
            //console.log('before release_event:', this.cjsv.evs);
            var e = this.cjsv.evs;
            for (key in e) {
                e[key] && this.f.off(e[key][0], e[key][1], e[key][2]);
                delete e[key];
            }
            //console.log('after release_event:', this.cjsv.evs);
            e = null;

        }
        this.cjsv.evs = [];
        for (key in this.cjsv.ev_handler) {
            delete this.cjsv.ev_handler[key];
        }
        key = null;
    }

    // 如果card中有就调用，没有就显示一行debug信息。
    function call_method(fn, warn) {
        //console.log(this,fn,warn);
        if (fn in this) {
            return(this[fn]());
        }
        if (warn && this.settings.verbose) {
            console.log('Call undefine method: Card.prototype.funcs.' + fn + '()');
        }
        return false;
    }

    var Page = function (cid, cards, style) {
        // style={'cards':css_name,'card':css_name};
        if (!(Lib.isString(cid) && Lib.isArray(cards))) {
            console.log('cid:', cid, ' cards:', cards);
            throw new Error('Error: new Page(cid,[ card1, card2, ...] )');
        }

        Card.call(this, cid);
        this.style = style || null;
        this.cards = cards;
        this.settings.header = 'page';
        this.children = [];
    };

    inherit(Page, Card);

    Page.prototype.name = 'PAGE';

    Page.prototype.clean_up = function () {
        for (var key in this.children) {
            //console.log('page destroy:',this.children[key]);
            this.children[key] && this.children[key].destroy();
        }
        this.children = [];
    };

    Page.prototype.gen_html = function () {
        var html = '';

        for (var i = 0; i < this.cards.length; i++) {
            html += '<div id="' + this.el(i) + '" ';
            if (this.style && this.style['card']) {
                html += ' class="' + this.style['card'] + '" ';
            }
            html += '></div>';
        }
        return html;
    };

    Page.prototype.after_add_event = function () {
        this.clean_up();
        for (var i = 0; i < this.cards.length; i++) {
            this.children.push(this.cards[i](this.el(i)).show());
        }
    };

    var Panel = function (cid, pages, style) {
        //console.log('pages.type:', Lib.type(pages));
        if (!(Lib.isString(cid) && Lib.type(pages) === 'Object')) {
            console.log('cid:', cid, ' pages:', pages, ' style:', style);
            throw new Error('Error: new Panel(cid,{name1:[card1, card2, ...],name2:[card, ...], ... )');
        }
        Card.call(this, cid);
        // style={'tags':css,'tag_active':css,'tag_normal':css,'page':css,'card':css};
        this.style = style || null;
        this.tags = Object.keys(pages);
        this.pages = pages;
        this.child = null;
        this.settings.header = 'panel';
        this.settings.add_event = true;
    };

    inherit(Panel, Card);

    // I really don't know why I like to set a name.
    Panel.prototype.name = 'PANEL';

    Panel.prototype.clean_up = function () {
        this.child && this.child.destroy();
        this.child = null;
    };

    Panel.prototype.gen_html = function () {
        var html = '<div ';
        if (this.style && this.style['tags']) {
            html += ' class="' + this.style['tags'] + '"';
        }
        html += '>';
        for (var i = 0; i < this.tags.length; i++) {
            html += '<input type="button" id="' + this.el(i) + '" value="' + this.tags[i] + '" >';
        }
        html += '</div><div id="' + this.el(i) + '" ';
        if (this.style && this.style['page']) {
            html += ' class="' + this.style['page'] + '"';
        }
        html += '></div>';
        return html;
    };

    Panel.prototype.gen_ev_handler = function () {
        var evs = [];
        //console.log('gen_ev_handler.this:',this);
        for (var i = 0; i < this.tags.length; i++) {
            (function () {
                var id = i;
                evs.push(function () {
                    //console.log('panel_switch:',this);
                    this.clean_up();
                    if (this.style && this.style['tag_active'] && this.style['tag_normal']) {
                        for (var j = 0; j < this.tags.length; j++) {
                            //pn.objs[i].setAttribute('class',
                            this.el(j, true).setAttribute('class', this.style['tag_normal']);
                        }
                        this.el(id, true).setAttribute('class', this.style['tag_active']);
                    }
                    var page;
                    if (this.style && this.style['card']) {
                        page = new Page(this.el(this.tags.length), this.pages[this.tags[id]], {'card': this.style['card']});
                    } else {
                        page = new Page(this.el(this.tags.length), this.pages[this.tags[id]]);
                    }
                    this.child = page.show();
                    page = null;
                });
            }());
        }
        //console.log('panel.gen_ev_handler:',evs);
        return evs;
    };

    Panel.prototype.add_event = function () {
        for (var i = 0; i < this.tags.length; i++) {
            this.f.on('click', i);
        }
    };

    Panel.prototype.after_add_event = function () {
        this.f.trigger(0);
    };

    var funcs = {
        trigger: function (key) {
            //console.log(this);
            if (!(key in this.cjsv.ev_handler)) {
                throw new Error('Error: Card.cjsv.ev_handler[' + key + '] not define!');
            }
            this.cjsv.ev_handler[key]();
        },
        on: function (event, id_key, ev_key) {

            // 绑定事件
            if (ev_key === undefined) {
                ev_key = id_key;
            }

            if (!(ev_key in this.cjsv.ev_handler)) {
                throw new Error('Error: Card.f.on: ev_handler[' + ev_key + '] not define!');
            }

            if (this.el(id_key, true).addEventListener) {
                this.el(id_key, true).addEventListener(event, this.cjsv.ev_handler[ev_key], false);
            } else {
                //ie
                this.el(id_key, true).attachEvent("on" + event, this.cjsv.ev_handler[ev_key]);
            }
            this.cjsv.evs.push([event, id_key, ev_key]);
        },
        off: function (event, id_key, ev_key) {
            // 解绑事件
            if (ev_key === undefined) {
                ev_key = id_key;
            }

            if (this.el(id_key, true).removeEventListener) {
                this.el(id_key, true).removeEventListener(event, this.cjsv.ev_handler[ev_key], false);
            } else {
                //ie
                this.el(id_key, true).detachEvent("on" + event, this.cjsv.ev_handler[ev_key]);
            }
        },
        merge: function (s) {
            for (var key in s) {
                this.settings[key] = s[key];
            }
        },
        clear_timer: function (num) {
            num = num || 0;
            if (num in this.cjsv.timer) {
                if (this.cjsv.timer[num]) {
                    root.clearInterval(this.cjsv.timer[num]);
                }
                delete this.cjsv.timer[num];
            }
        },
        set_timer: function (call_back, interval, num) {
            num = num || 0;
            interval = interval || 3000;
            this.f.clear_timer(num);
            call_back.bind(this)();
            this.cjsv.timer[num] = root.setInterval(call_back, interval);
        },
        fetch: function () {

            /* 
             * fetch( op,param,func_ok,func_fail,verbose)
             * 
             * 这些参数的位置可变
             * 
             * 第一个出现的函数为 func_ok(json_object) 操作成功时的回调函数。
             * 第二个出再的函数为 func_fail(string) 操作失败时的回调函数。
             * 
             * 非函数参数以下简称参数：
             * 第一个出现的参数必须为字符串，内容为 serv.php 中相应的函数名。
             * 第二个出现的参数为调用 serv.php 的函数的参数。
             * 如果最后一个参数是 Boolean 型，则作为是否显示调试信息开关：verbose。
             * 
             * 注意！如果只有两个参数，且最后一个为 Boolean 则此参数解释为调试信息开关。
             *                    
             */



            var i, params = [], func = [];

            for (i = 0; i < arguments.length; i++) {
                switch (Lib.type(arguments[i])) {
                    case 'Function':
                        func.push(arguments[i]);
                        break;
                    default:
                        params.push(arguments[i]);
                        break;
                }
            }
            //console.log('param',params,'func',func);
            //console.log('fetch arguments:',arguments,'params:',params,'func:',func);


            if (params.length < 1 || Lib.type(params[0]) !== 'String') {
                throw new Error('error: cardjs.CARD.fetch()', 'parameters not match!');
            }

            var op, param = null, verbose = false;
            op = params[0];
            if (params.length > 1) {
                if (Lib.isString(params[1])) {
                    param = params[1];
                } else {
                    if (Lib.type(params[1]) === "Boolean" && params.length === 2) {
                        param = null;
                    } else {
                        param = root.JSON.stringify(params[1]);
                    }
                }
            }

            if (params.length > 1) {
                if (Lib.type(params[params.length - 1]) === "Boolean") {
                    verbose = params[params.length - 1];
                }
            }
            params = null;

            if (func.length === 0) {
                func.push(function (r) {
                    var flag = verbose;
                    if (flag) {
                        console.log('Fetch:func_ok not set! \n Server response:');
                    }
                    console.log(r);
                });
            }
            if (func.length === 1) {
                func.push(function (r) {
                    var flag = verbose;
                    if (flag) {
                        console.log('Fetch:func_fail not set! \n Server response:');
                    }
                    console.log(r);
                });
            }

            var xhr = new root.XMLHttpRequest();
            xhr.open('POST', this.settings.server_page);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //console.log('fetch.this:',this);
            xhr.onload = function () {
                //console.log('fetch.onload.this:',this);
                if (xhr.status !== 200) {
                    console.log('Fetch: Error code ' + xhr.status);
                    return;
                }
                if (!(this.self)) {
                    console.log('Fetch error: Object has been destroyed!');
                    return;
                }
                var raw_rsp = xhr.responseText;
                if (verbose) {
                    console.log('Fetch.raw:\n' + raw_rsp);
                }
                var rsp = root.JSON.parse(raw_rsp);
                if (rsp && rsp.tk) {
                    //console.log('update token:',rsp.tk);
                    Lib.cookie_set('tk', rsp.tk);
                }
                if (rsp && rsp.status && rsp.data) {
                    //function ok
                    func[0].bind(this)(rsp.data);
                } else {
                    // function fial
                    func[1].bind(this)(rsp.msg);
                }
                func = null;
            }.bind(this);
            var cookie = Lib.cookie_get('tk');
            //console.log('fetch read local cookie:',cookie);
            xhr.send(encodeURI('op=' + op + '&data=' + param + '&tk=' + cookie));
            cookie = null;
        }
    };

    var Set = function (params) {
        if (!(Lib.type(params) === 'Object')) {
            throw new Error('Error: CardJS.Lib.set( {key1:value1,key2:value2, ... });');
        }
        for (var key in params) {
            gset[key] = params[key];
        }
    };

    var Lib = {
        expand: function () {
            if (arguments.length < 1) {
                throw new Error('Error: Lib.expand(obj1, obj2, ... )');
            }
            var o = arguments[0];
            if (!(Lib.isObject(arguments[0]) || Lib.isArray(arguments[0]))) {
                throw new Error('Error: Lib.expand() first param should be {} or []');
            }
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    o[key] = arguments[i][key];
                }
            }
            o = null;
        },
        utf8_to_base64: function (text_utf8) {
            //对应 php decode:
            // $txt_utf8 = urldecode(base64_decode($txt_b64));
            return root.btoa(root.encodeURIComponent(text_utf8));
        },
        base64_to_utf8: function (text_base64) {
            // 对应 php encode: 
            // $txt_b64 =base64_encode(rawurlencode($txt_utf8));
            // **** 注意是带raw三个字母 **** 
            // 不要问为什么！记住php是世界上最好的语言就对了！！
            return (root.decodeURIComponent(root.atob(text_base64)));
        },
        load_html: function (id) {
            return(root.document.getElementById(id).innerHTML);
        },
        get_elsbyname: function (name) {
            return (root.document.getElementsByName(name));
        },
        pad: function (n, width, leading_str) {
            var z = leading_str || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },
        clamp: function (val, min, max) {
            return root.Math.min(root.Math.max(val, min), max);
        },
        html_escape: function (unsafe) {
            if (!unsafe || unsafe.length === 0) {
                return '';
            }
            return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
        },
        array_remove_all: function (arr, value) {
            if (!Lib.isArray(arr)) {
                throw new Error('Error: arr is not an array!');
            }
            for (var i = arr.length; i >= 0; --i) {
                if (arr[i] === value) {
                    arr.splice(i, 1);
                }
            }
        },
        array_cut_tail: function (arr, len) {
            if (!Lib.isArray(arr)) {
                throw new Error('Error: arr is not an array!');
            }
            len = len || 25;
            while (arr.length > len) {
                arr.pop();
            }
        },
        array_unshift: function (arr, el, len) {
            if (!Lib.isArray(arr)) {
                throw new Error('Error: arr is not an array!');
            }
            len = len || 25;
            Lib.array_remove_all(el);
            arr.unshift(el);
            Lib.array_cut_tail(arr);
        },
        rand: function (len) {
            len = len || 32;
            var chars = 'abcdefghijklmnopqrstuvwxyz'
                    + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    + '0123456789';
            var maxPos = chars.length;
            var rtv = '';
            for (var i = 0; i < len; i++) {
                rtv += chars.charAt(root.Math.floor(root.Math.random() * maxPos));
            }
            return rtv;
        },
        get_DOM_offset: function (el) {
            var left, top, rect;
            rect = el.getBoundingClientRect();
            var sx = (root.pageXOffset !== undefined)
                    ? root.pageXOffset
                    : (root.document.documentElement || root.document.body.parentNode || root.document.body).scrollLeft;

            var sy = (root.pageYOffset !== undefined)
                    ? root.pageYOffset
                    : (root.document.documentElement || root.document.body.parentNode || root.document.body).scrollTop;

            left = rect.left + sx + rect.width;
            top = rect.top + sy + rect.height;
            //console.log('rect:', rect, ' root.sx/sy:', root.scrollX, root.scrollY, ' left/top:', left, top);
            el = null;
            rect = null;
            return {
                left: left,
                top: top
            };
        },
        url_get_page: function () {
            var url = root.document.location.href;
            url = url.substring(0, (url.indexOf("#") === -1) ? url.length : url.indexOf("#"));
            url = url.substring(0, (url.indexOf("?") === -1) ? url.length : url.indexOf("?"));
            url = url.substring(url.lastIndexOf("/") + 1, url.length);
            return url;
        },
        url_set_params: function (page, params) {
            params = params || {};
            //console.log('url_set_param:',page,params);
            if (root.history.pushState) {
                var pstr = '', dl = '?';
                for (var key in params) {
                    pstr += dl + key + '=' + params[key];
                    dl = '&';
                }
                root.history.pushState({}, null, page + pstr);
            }
        },
        url_get_param: function (name) {
            var url = root.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
            regex = null;
            if (!results || !results[2]) {
                return false;
            }
            return root.decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        type: function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1);
        },
        getYMD: function (date_str) {
            //var date_str = "2011-08-03 09:15:11"; 
            var d = date_str.split(" ");
            if (d && d[0]) {
                return d[0];
            }
            return 'none';
        },
        getTime: function (date_str) {
            var d = date_str.split(" ");
            if (d && d[1]) {
                return d[1];
            }
            return 'none';
        },
        cookie_set: function (name, value, expires) {
            //默认一年,expires默认一个月
            expires = expires || 30 * 24 * 60 * 60;
            expires = expires * 1000;
            var exp = new Date(), str;  //获得当前时间  
            exp.setTime(exp.getTime() + expires);  //换成毫秒  
            str = name + "=" + root.escape(value) + ";expires=" + exp.toGMTString();
            exp = null;
            root.document.cookie = str;
        },
        cookie_get: function (name) {
            var arr = root.document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr !== null) {
                var r = arr[2];
                arr = null;
                return root.unescape(r);
            } else {
                return "";
            }
        },
        cookie_del: function (name) {
            var exp = new Date();  //当前时间  
            exp.setTime(exp.getTime() - 1);
            var cval = Lib.cookie_get(name);
            var r = name + "=" + cval + ";expires=" + exp.toGMTString();
            exp = null;
            if (cval !== null) {
                root.document.cookie = r;
            }
        },
        isBoolean: function (o) {
            return (Lib.type(o) === 'Boolean');
        },
        isFunction: function (o) {
            return (Lib.type(o) === 'Function');
        },
        isObject: function (o) {
            return (Lib.type(o) === 'Object');
        },
        isString: function (v) {
            return (typeof v === 'string' || v instanceof String);
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        }

    };

    // gen_key 只可以在 js 文件里调用,返回js文件名及调用行号。
    Lib.gen_key = (function () {
        var e = new Error();
        if (!e.stack)
            try {
                // IE requires the Error to actually be throw or else the Error's 'stack'
                // property is undefined.
                throw e;
            } catch (e) {
                if (!e.stack) {
                    console.log('Error: your browser do not support Error.stack!');
                    throw new Error('Error: your browser do not support Error.stack!');
                    return 0; // IE < 10, likely
                }
            }
        var stack = e.stack.toString().split(/\r\n|\n/),
                frame,
                frameRE = /:(\d+):(?:\d+)[^\d]*$/,
                scriptRE = /\/(\w+)\.js/;

        e = null;

        do {
            frame = stack.shift();
        } while (!frameRE.exec(frame) && stack.length);

        frame = (stack.shift());

        var line = frameRE.exec(frame)[1],
                script = scriptRE.exec(frame)[1];
        frameRE = null;
        scriptRE = null;
        //console.log(script);
        return 'key_' + script + '_js_' + line;
    });

    var gset = {};

    var console = root.console || {log: function () {}};

    function inherit(SubType, SuperType) {
        if (Object.create) {
            var prototype = Object.create(SuperType.prototype);
            prototype.constructor = SubType;
            SubType.prototype = prototype;
            return;
        }
        function F() {}
        F.prototype = SuperType.prototype;
        var prototype = new F();
        prototype.constructor = SubType;
        SubType.prototype = prototype;
    }

    function Create(params) {

        if (!Lib.isObject(params)) {
            throw new Error('CardJS.Create({type:\'Card/Page/Panel\', settings:{header:\'card\', gen_html:function(){}, ...} });');
        }

        if (!('cid' in params)) {
            throw new Error('CardJS.Create(params): params must have key cid');
        }
        var o = null;
        var style = undefined;
        var cid = params['cid'];

        switch (params['type']) {
            case('page'):
                if (!('cards' in params)) {
                    throw new Error('CardJS.Create(): page must contain cards.');
                }
                if ('style' in params) {
                    style = params['style'];
                }
                o = new Page(cid, params['cards'], style);
                break;
            case('panel'):
                if (!('pages' in params)) {
                    throw new Error('CardJS.Create(): page must contain pages.');
                }
                if ('style' in params) {
                    style = params['style'];
                }
                o = new Panel(cid, params['pages'], style);
                break;
            default:
                o = new Card(cid);
                break;
        }

        if ('settings' in params) {
            Lib.expand(o.settings, params['settings']);
        }

        var skip = {'cards': null, 'type': null, 'settings': null, 'pages': null, 'style': null};

        for (var key in params) {
            if (!(key in skip)) {
                if (Lib.isFunction(params[key])) {
                    o[key] = params[key].bind(o);
                } else {
                    o[key] = params[key];
                }
            }
        }

        cid = null;
        style = null;
        skip = null;
        params = null;


        return o;
    }

    var Database = (function () {
        var d = {};
        var e = {};
        var f = {};
        return ({
            event: function (ev, func, status) {
                /**
                 * 如果 status=false 则 delete e[ev][this.settings.key]
                 * 如果 func 是函数，添加到 f[ev].push({obj:this, func: func})
                 * 如果 func 是 false ，则清理 f[ev][this,*]
                 * @param {string} ev 事件名
                 * @param {function} func 监听函数
                 * @param {boolean} status 选项
                 * @returns {boolean} 操作成功/失败(通常用不上)
                 */

                var i, flag;

                f[ev] = f[ev] || [];
                if (Lib.isFunction(func)) {
                    if (status === false) {
                        //delete func
                        flag = false;
                        //root.console.log('before delete:', f);
                        for (i = f[ev].length - 1; i >= 0; i--) {
                            if (f[ev][i].obj === this && f[ev][i].func === func) {
                                //console.log('match:', i);
                                f[ev].splice(i, 1);
                                flag = true;
                            }
                        }
                        //root.console.log('after delete func:', f);
                        return flag;
                    }

                    for (i = 0; i < f[ev].length; i++) {
                        if (f[ev][i].obj === this && f[ev][i].func === func) {
                            root.console.log('Function has already registed!', f);
                            return false;
                        }
                    }

                    this.cjsv.cevs[ev] = true; // 记录下事件名,在destroy时自动清理.
                    f[ev].push({obj: this, func: func});
                    //root.console.log('after regist new function:', f);
                    return true;
                }

                if (func === false) {
                    //delete ev listener
                    flag = false;
                    //root.console.log('before delete:', f);
                    for (i = f[ev].length - 1; i >= 0; i--) {
                        if (f[ev][i].obj === this) {
                            //console.log('match:', i);
                            f[ev].splice(i, 1);
                            flag = true;
                        }
                    }
                    //root.console.log('after delete ev:', f);
                    return flag;
                }

                // trigger event
                flag = true;
                var el;
                for (i = f[ev].length - 1; i >= 0; i--) {
                    el = f[ev][i];
                    if (el.obj && el.obj.self) {
                        //root.console.log('call func:',el);
                        el.func.bind(el.obj)(func);
                    } else {
                        f[ev].splice(i, 1);
                        console.log('Error: object not exist， event listener deleted.');
                        flag = false;
                    }
                }
                el = null;
                return flag;
            },
            cc_debug: function () {
                root.console.log('d:', d, ' e:', e);
            },
            clear_cache: function (ev, status) {
                /**
                 * 如果 status=undefined 触发ev定义的事件
                 * 如果 status=true 添加 e[ev][this.settings.key]=true
                 * 如果 status=false 则 delete e[ev][this.settings.key]
                 * @param {string} ev 事件名
                 * @param {boolean} status 选项
                 * @returns {boolean} 操作成功/失败(通常用不上)
                 */

                e[ev] = e[ev] || {};

                // delete event[key]
                if (status === false) {
                    if ((ev in e) && (this.settings.key in e[ev])) {
                        delete e[ev][this.settings.key];
                        return true;
                    }
                    return false;
                }
                // add event[key]
                if (status === true) {
                    //console.log('call: clear_cache(ev,key)', ev, key);
                    //console.log(e[ev]);
                    e[ev][this.settings.key] = true;
                    //root.console.log('after add key:', e);
                    return true;
                }
                //trigger event
                if (status === undefined) {
                    if (ev in e) {
                        //console.log('call: clear_cache(ev)', ev);
                        for (var k in e[ev]) {
                            if (k in d) {
                                d[k] = null;
                            }
                        }
                        //console.log('after delete cache:\n', ' d:', d, '\ne:', e);
                        return true;
                    }
                }
                throw new Error('Error: CardJS.Card.f.cc_cache(ev,status) ev:string status:true/false/undefined');
                return false;
            },
            cache: function (data, key) {
                //console.log('db:',this);
                if (key === undefined) {
                    key = this.settings.key;
                }
                if (!Lib.isString(key)) {
                    throw new Error('CardJS.Database.save(data,key) key must be string.');
                }
                d[key] = data;
                key = null;
            },
            restore: function (key) {

                if (key !== undefined && (key in d)) {
                    return (d[key]);
                }

                if (this.settings.key in d) {
                    return (d[this.settings.key]);
                }

                return null;
            }
        });
    }());

    var exports = {
        package: Package,
        card: Card,
        //page: Page,
        //panel: Panel,
        //db: Database,
        lib: Lib,
        set: Set,
        create: Create
    };

    //root[module_name] = exports;

    return (exports);
});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global  Mustache,cardjs */

cardjs.set({server_page: 'web/php/serv.php'});

/*
 * cache share keys:
 * event('main_article_board_update'): 主窗口文章框提供的 update 函数 
 * event('main_show_pager');
 * event('main_clear_pager');
 * event('main_update_banner'); 更新bannery
 * art_select_id: 搜索结果中缓存的当前选中的文章ID
 * 'show_main_search_result' 得到搜索结果时,显示搜索结果.
 * clear_cache('update_article') 更新文章时清理相应缓存
 * clear_cache('clear_art_board') 更新主页文章窗口
 * clear_cache('clear_all_user_data') 退出登录时,清除用户设定
 */

var sip = {
    f: {},
    o: {
        main: {},
        mgr: {},
        art: {},
        db: {}
    },
    s: {
        //最近文章数据的位置
        json_path:'web/upload/json/',
        top_art_path: 'web/upload/json/top.json',
        // 文章分类
        atypes_path: 'web/upload/json/atypes.json',
        msg_path: 'web/upload/json/msg.json',
        article_path: 'web/upload/json/',
        // 记录json文件是否存在，由serv.php生成。
        // {'20176':true,'201612':true}
        files_path: 'web/upload/json/files.json',
        uset_path: 'web/upload/json/uset.json'
    },
    // 这些不太重要的设置，用户可以自己改。
    // 会被 upload/uset.json 覆盖。
    uset: {

        banner_name: "Siplog",
        banner_desc: '一个简洁的单面博客',

        //显示留言信息
        show_mbox: true,

        //是否开启上传图片功能
        upload: true,

        atypes: ['默认分类'],

        msg_keep: 5
    },
    del: {}
};

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

sip.f.parse_json = function (e) {
    var f = {
        title: function (d) {
            return(filterXSS(cardjs.lib.base64_to_utf8(d)));
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
            return(filterXSS(cardjs.lib.base64_to_utf8(d)));
            //return((cardjs.lib.base64_to_utf8(d)));
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

sip.o.main.pager = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'pager',
        add_event: true
    });

    o.btn_num = 5;

    o.d = {};

    o.data_parser = function () {
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
    };

    o.gen_html = function () {
        var v = [];
        for (var i = this.d.first; i < this.d.last; i++) {
            v.push({id: this.el(i - this.d.first + 1), value: i + 1});
        }
        var first = {id: this.el(0), value: '首页'};
        return (Mustache.render(cardjs.lib.load_html('tp-main-pager'), {first: first, v: v}));
    };

    o.show_page = function (num) {
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
    };

    o.get_data = function (key_index, skip) {
        if (key_index >= sip.db.d.file_key.length) {
            console.log('Last page!');
            this.f.event('main_article_board_update', this.d.data);
            return;
        }
        var size = sip.db.d.page.size;
        var key = sip.db.d.file_key[key_index];
        //console.log('call get data:key/idx/skip', key, key_index, skip);
        if (key in sip.db.d.data) {
            var ids = Object.keys(sip.db.d.data[key]).sort(function(a,b){return (a-b);}).reverse();
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
    };

    o.gen_ev_handler = function () {
        var evs = [];
        evs.push(function () {
            sip.db.d.page.cur_page = 0;
            this.refresh();
            //this.show_page(0);
        });

        for (var i = this.d.first; i < this.d.last; i++) {
            evs.push((function () {
                var num = i;
                return(function () {
                    sip.db.d.page.cur_page = num;
                    this.refresh();
                    //this.show_page(num);
                }.bind(this));
            }.bind(this)()));
        }

        return evs;
    };

    o.add_event = function () {
        for (var i = 0; i < this.el(); i++) {
            this.f.on('click', i);
        }
    };

    o.after_add_event = function () {
        //this.f.trigger(0);
        this.el(this.d.cur - this.d.first + 1, true).style.backgroundColor = 'skyblue';
        this.show_page(sip.db.d.page.cur_page);
    };

    return o;
};

sip.o.db.article = function () {

    var data_key = cardjs.lib.gen_key();

    var o = new cardjs.package({
        key: data_key,
        d: {
            data: {},
            files: [],
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
        }
    });

    o.set = function (key, value) {
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
    };

    o.show_page = function () {
        //console.log(this);
        if (this.d.page.key in this.d.data) {
            this.push_main_art_board.bind(this)();
        } else {
            this.load_json.bind(this)(this.d.page.key, this.push_main_art_board.bind(this));
        }
    };

    o.push_main_art_board = function () {
        if (!(this.d.page.key in this.d.data)) {
            console.log('Error: key not exist!', this.d.page.key);
            return;
        }
        //console.log(this);
        var d = [], f = this.d.page.filter, k = this.d.page.key, db = this.d.data;
        if (k in db) {
            var idx=Object.keys(db[k]).sort(function(a,b){return (a-b);}).reverse();
            //console.log(idx);
            for (var i=0;i<idx.length;i++) {
                if (f === '全部' || f === '' || db[k][idx[i]].type === f) {
                    d.push(db[k][idx[i]]);
                }
            }
        }
        //console.log('k/d/f/db' ,k, d,f,db);
        this.f.event('main_article_board_update', d);
        d = null;
        f = null;
        k = null;
        db = null;
    };

    o.search = function (raw_keywords) {

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
    };

    o.search_recursive = function (keywords, index) {
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
    };

    o.search_cache = function (keywords, key) {

        var  e, mark, kw_idx;
        
        var idx=Object.keys(this.d.data[key]).sort(function(a,b){return (a-b);}).reverse();
        //console.log('search idx:',idx);

        for (var i=0;i<idx.length;i++) {
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

    };

    o.load_json = function (key, callback) {

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

        $.getJSON(path + '?t=' + cardjs.lib.rand(8), this.got_json.bind(this, callback, key));

    };

    o.get = function (key) {
        if (key === 'files') {
            return o.d.files;
        }
    };

    o.got_json = function (callback, key, data) {

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
            e = sip.f.parse_json(data[i]);
            div.innerHTML = e.content;
            e.text = div.textContent || div.innerText || "";
            d[e.id] = e;
        }
        div = null;
        this.d.data[key] = d;

        if (cardjs.lib.isFunction(callback)) {
            callback();
        }
    };

    o.load_files = function () {

        this.d.files = [];
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

        $.getJSON(sip.s.files_path + '?t=' + cardjs.lib.rand(8), function (data) {
            // console.log('files.json:', data);
            if ('files' in data) {
                this.d.files = data.files;
                //console.log('files', this.d.files);
                this.d.file_key = Object.keys(data.files).sort(function(a,b){return (a-b);}).reverse();
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
    };

    o.load_files();

    return o;
};

sip.db = sip.o.db.article();

sip.o.main.msg = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        settings: {
            key: key,
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
                            this.refresh();
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
            $.getJSON(sip.s.msg_path + '?t=' + cardjs.lib.rand(8), function (data) {
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
    }));

};

sip.o.Main_wrap = function (cid) {

    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'main_wrap',
        add_event: true
    });

    o.pager = null;

    o.gen_ev_handler = function () {
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
    };

    o.show_main_page = function () {
        //console.log('show_main_page:',this);
        clear_contents();
        o.contents.push(sip.o.main.article_board(o.el(5)).show());
        var cnum = 6;
        o.contents.push(sip.o.main.search_box(o.el(cnum++)).show());
        o.contents.push(sip.o.main.group_view(o.el(cnum++)).show());
        if (sip.uset.show_mbox) {
            this.contents.push(sip.o.main.msg(o.el(cnum++)).show());
        }
    };



    o.show_mgr_page = function () {
        //console.log('show_mgr_page developing');
        //return;
        clear_contents();
        this.contents.push(sip.o.art.art_wrap(this.el(4)).show());
        this.contents.push(sip.o.mgr.user_panel(this.el(6)).show());
    };

    o.add_event = function () {
        o.f.on('click', 0);
        o.f.on('click', 1);
    };

    o.gen_html = function () {
        var ids = [];
        for (var i = 0; i < 10; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-main-wrap'), {ids: ids});
    };

    o.show_pager = function () {
        this.clear_pager();
        this.pager = sip.o.main.pager(this.el(4)).show();
    };

    o.clear_pager = function () {
        this.pager && this.pager.destroy();
        this.pager = null;
        this.el(4, true).innerHTML = '';
    };

    function clear_contents() {

        o.clear_pager();

        if (o.contents && o.contents.length > 0) {
            o.contents.forEach(function (e) {
                //console.log('main:',o);
                //console.log('contents:',e);
                e.destroy();
            });
        }
        o.contents = [];
        for (var i = 4; i < 10; i++) {
            o.el(i, true).innerHTML = '';
        }
    }

    o.reload = function () {
        //console.log('call main_page.refresh()');
        o.f.cache(null, 'um_cur_user_info');
        o.f.cache(null, 'um_all_user_info');
        clear_contents();
        o.show_mgr_page();
    };

    o.update_banner = function (param) {
        var name, desc;

        param = param || {};


        name = param.name;
        desc = param.desc;

        //console.log('update_banner',name,desc);

        if (name === undefined) {
            name = cardjs.lib.base64_to_utf8(sip.uset.banner_name);
        }

        if (desc === undefined) {
            desc = cardjs.lib.base64_to_utf8(sip.uset.banner_desc);
        }


        this.el(2, true).innerHTML = cardjs.lib.html_escape(name);

        this.el(3, true).innerHTML = cardjs.lib.html_escape(desc);


        name = null;
        desc = null;
    };

    o.after_add_event = function () {
        clear_contents();
        o.show_main_page();
        //this.update_banner();
        this.f.event('main_update_banner', this.update_banner);
        this.f.event('main_clear_pager', this.clear_pager);
        this.f.event('main_show_pager', this.show_pager);

        this.f.event('main_update_banner');
    };

    return o;
};

sip.o.art.search_result = function (cid, key) {
    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: 'at_search_result',
        add_event: true
    });

    o.d = {
        id_num: 0,
        num: 0,
        page_num: 0
    };

    o.data_parser = function () {
        this.d.num = 0;
        var cache = this.f.restore();
        //console.log('s_result:',cache);
        if (!cache
                || !cache.content
                || !cache.content.length
                || cache.content.length <= 0) {
            return;
        }

        this.d.num = cache.content.length;
        this.d.page_num = Math.ceil(cache.total / cache.page_size);
        this.d.id_num = 2 + Math.min(this.d.page_num, 9) + this.d.num;
        this.d['first'] = Math.max(cache.pn - 5, 0);
        this.d['last'] = Math.min(this.d['first'] + 9, this.d.page_num);
    };

    o.show_page = function (pn) {
        var cache = this.f.restore();
        if (pn === cache.pn) {
            console.log('same page!');
            return;
        }
        cache.pn = pn;
        this.f.cache(cache);
        this.f.fetch('search', {'kw': cache.current_kw, 'pn': pn, 'get_total': false, 'page_size': cache.page_size},
                function (data) {
                    var cache = this.f.restore();
                    cache.content = data.data;
                    this.refresh();
                });
    };

    o.gen_ev_handler = function () {
        var evs = [];
        if (this.d.num <= 0) {
            return evs;
        }
        evs[0] = function () {
            this.show_page(0);
        };
        evs[1 + this.d.last - this.d.first] = function () {
            this.show_page(this.d.page_num - 1);
        };
        var i;
        for (i = 1; i < this.d.last - this.d.first + 1; i++) {
            evs[i] = (function () {
                var idx = i - 1;
                return function () {
                    this.show_page(idx);
                }.bind(this);
            }.bind(this)());
        }
        var start, end;
        start = this.d.last - this.d.first + 2;
        end = this.d.id_num;
        var cache = this.f.restore();
        for (i = start; i < end; i++) {
            evs[i] = (function () {
                var s = start, e = end, idx = i;
                //console.log(sip.cache.search.content);
                var id = (cache.content[i - s].id);
                return(function () {
                    for (var i = s; i < e; i++) {
                        this.el(i, true).style.backgroundColor = '';
                    }
                    this.f.cache(id, 'art_select_id');
                    //sip.cache.article.selected_id = id;
                    //console.log('select id=' + id);
                    this.el(idx, true).style.backgroundColor = 'lightsalmon';
                }.bind(this));
            }.bind(this)());
        }
        return evs;
    };

    o.add_event = function () {
        if (this.d.num <= 0) {
            return;
        }
        for (var i = 0; i < this.d.id_num; i++) {
            this.f.on('click', i);
        }
    };

    o.after_add_event = function () {
        //console.log('fire');
        if (this.d.num > 0) {
            var cache = this.f.restore();
            var idx = cache.pn - this.d.first + 1;
            this.el(idx).className = "btn btn-sm btn-info";
        }
    };

    o.gen_html = function () {
        if (this.d.num <= 0) {
            return('无数据');
        }
        var i;
        var m = this.d.last - this.d.first + 2;
        this.d.btn = [];
        for (i = 0; i < m; i++) {
            this.d.btn.push({id: this.el(i), value: this.d.first + i});
        }
        this.d.btn[0]['value'] = '首页';
        this.d.btn[m - 1]['value'] = '尾页';

        this.d.tb = [];
        var c;
        var cache = this.f.restore();
        for (; i < this.d.id_num; i++) {
            c = cache.content[i - m];
            this.d.tb.push({
                oid: this.el(i),
                title: filterXSS(c.title),
                ctime: cardjs.lib.getYMD(c.ctime),
                time: cardjs.lib.getYMD(c.mtime),
                author: filterXSS(c.name),
                type: (c.type < sip.uset.atypes.length) ? sip.uset.atypes[c.type] : '无',
                top: c.top === 0 ? false : true,
                lock: c.lock === 0 ? false : true
            });
        }
        return (Mustache.render(cardjs.lib.load_html('tp-uma-search-result'), this.d));
    };

    return o;
};

sip.o.art.list_orphan_img = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: 'uma_loi',
        add_event: true
    });

    o.data = [];


    o.gen_ev_handler = function () {
        return [
            function () {
                //console.log('click1');
                this.f.fetch('list_orphan_img', function (data) {
                    this.data = [];
                    data.forEach(function (e) {
                        this.data.push({
                            'atid': e.atid,
                            'uptime': cardjs.lib.getYMD(e.uptime),
                            'deltime': cardjs.lib.getYMD(e.deltime),
                            'path': e.path && e.path.substr(3, e.path.length)
                        });
                    }.bind(this));
                    this.refresh();
                    if (this.data.length === 0) {
                        alert('没有孤儿图片');
                    }
                }.bind(this));
            },
            function () {
                //console.log('click1');
                if (confirm('删除所有孤儿图片？')) {
                    this.f.fetch('delete_all_orphan_img', function (r) {
                        alert(r);
                        this.f.trigger(0);
                        //this.el(0,true).click();
                    }, function (r) {
                        alert(r);
                        this.f.trigger(0);
                        //this.el(0,true).click();
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 0);
        this.f.on('click', 1);
    };

    o.gen_html = function () {
        this.ids = [this.el(0), this.el(1)];
        return Mustache.render(cardjs.lib.load_html('tp-uma-loi'), this);
    };

    return o;

};

sip.o.art.editor = function (cid) {

    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);

    o.f.merge({
        key: key,
        header: 'art_edt',
        add_event: true
    });

    o.article_type = [[0, '无']];

    if (sip.uset.atypes) {
        o.article_type = [];
        sip.uset.atypes.forEach(function (e, i) {
            o.article_type.push([i, e]);
        });
    }

    o.data_parser = function () {
        this.editor && this.editor.destroy();
        this.editor = null;
    };

    o.gen_ev_handler = function () {
        return {
            'commit': function () {
                var content = this.editor.txt.html();
                var cache = this.f.restore();
                var data = {
                    'title': cardjs.lib.utf8_to_base64(this.el(0, true).value),
                    'content': cardjs.lib.utf8_to_base64(content),
                    'type': this.el(2, true).options[this.el(2, true).selectedIndex].value,
                    'id': cache.cache_id,
                    'top': this.el(10, true).checked ? 1 : 0,
                    'lock': this.el(9, true).checked ? 1 : 0

                };
                //console.log(content);
                if (!confirm('确定提交？')) {
                    return;
                }

                this.f.clear_cache('update_article');

                cardjs.lib.url_set_params('index.html');

                this.el(5, true).innerHTML = '正在提交数据 ...';
                this.f.fetch('post_article', data, function () {
                    alert('提交成功!');
                    this.f.trigger('new');
                    sip.db.load_files();
                }, function (r) {
                    this.el(5, true).innerHTML = '提交失败！';
                    alert(r + '\n提交失败！');
                });
            },
            'new': function () {
                var cache = this.f.restore() || {};
                cache.cache_id = null;
                this.f.cache(0, 'art_select_id');
                cache.title = null;
                cache.html = null;
                cache.top = false;
                cache.lock = false;
                this.f.cache(cache);
                this.el(9, true).checked = false;
                this.el(10, true).checked = false;
                this.el(0, true).value = '';
                this.el(2, true).options[0].selected = true;
                this.editor.txt.clear();
                this.el(5, true).innerHTML = "新文章";
                this.f.clear_cache('clear_art_board');
                cardjs.lib.url_set_params('index.html');
            },
            'del': function () {
                var cache = this.f.restore();

                if (!cache || !(cache.cache_id > 0)) {
                    this.f.trigger('new');
                    return;
                }

                if (!confirm("确定删除文章？")) {
                    return;
                }

                this.f.clear_cache('update_article');

                cardjs.lib.url_set_params('index.html');

                o.f.fetch('delete_article', cache.cache_id,
                        function () {
                            alert('删除成功！');
                            this.f.trigger('new');
                            sip.db.load_files();
                        }, false, function (r) {
                    alert(r);
                });
            },
            'pop': function () {
                if (this.el(8, true).style.display === 'block') {
                    this.el(8, true).style.display = 'none';
                } else {
                    var pos = cardjs.lib.get_DOM_offset(this.el(7, true));
                    this.el(8, true).style.left = (pos.left - parseInt(this.el(8, true).style.width)) + "px";
                    this.el(8, true).style.top = (pos.top + 8 ) + "px";
                    this.el(8, true).style.display = 'block';
                }
            }

        };
    };

    o.add_event = function () {
        this.f.on('click', 3, 'commit');
        this.f.on('click', 4, 'new');
        this.f.on('click', 6, 'del');
        this.f.on('click', 7, 'pop');
    };

    o.gen_html = function () {
        var ids = [];
        var atype = this.article_type;
        for (var i = 0; i < 11; i++) {
            ids.push(this.el(i));
        }
        return Mustache.render(cardjs.lib.load_html('tp-uma-editor'), {ids: ids, atype: atype});
    };

    o.after_add_event = function () {
        //this.editor && this.editor.destroy();

        this.editor = new wangEditor('#' + this.el(1));
        //this.editor = new wangEditor(o.ids[1]);
        if (sip.uset.upload) {
            this.editor.customConfig.uploadImgServer = './web/php/upload.php';
            this.editor.customConfig.uploadImgMaxSize = 4 * 1024 * 1024;
            this.editor.customConfig.uploadImgMaxLength = 1;
            var param = {tk: cardjs.lib.cookie_get('tk')};

            this.editor.customConfig.uploadImgParams = param;
            var func = {
                fail: function (xhr, editor, result) {
                    console.log(result.errno, result.msg);
                }
            };
            this.editor.customConfig.uploadImgHooks = func;
            this.editor.customConfig.uploadFileName = 'upload';
//            this.editor.customConfig.debug = true;
//            this.editor.customConfig.uploadImgHeaders = {
//                'Accept': 'text/x-json'
//            };
        }
        this.editor.create();

        //console.log(sip.cache.article);

        //读取缓存
        var sid, cid, uid, cache;

        cache = this.f.restore() || {
            cache_id: 0
        };

        cid = cache.cache_id;
        sid = this.f.restore('art_select_id') || 0;

        uid = parseInt(cardjs.lib.url_get_param('id'));
        if (!sid && uid > 0) {
            sid = uid;
        }

        if (cache.html && cache.html.length > 0) {
            if (cid === sid || !(sid)) {
                //console.log('load_cache');
                this.load_cache();
                return;
            }
        }

        if (sid > 0) {
            this.editor.txt.html('读取数据中 ...');
            this.f.fetch('fetch_article', {'id': sid}, function (data) {
                //$this->ok(array('id'=>$id,'type'=>$type,'title'=>$title,'content'=>$content));

                var cache = this.f.restore() || {};
                cache.cache_id = data.id;
                cache.title = cardjs.lib.base64_to_utf8(data.title);
                cache.html = cardjs.lib.base64_to_utf8(data.content);
                cache.type = data.type;
                cache.lock = !(data.lock === 0);
                cache.top = !(data.top === 0);

                this.f.cache(cache);
                //console.log('editor fetch (data,cache):',data,cache);
                //console.log('loadhtml', sip.cache.article.html);
                this.load_cache();
            }, false, function (r) {
                this.editor.txt.html('<font color="red">' + r + '</font>');
            });
        } else {
            this.f.trigger('new');
            //this.el(4,true).click();
        }
    };

    o.save_cache = function () {
        //console.log('save_cache');
        var cache = this.f.restore();
        cache.title = this.el(0, true).value;
        cache.type = this.el(2, true).selectedIndex;
        if (this.editor) {
            cache.html = this.editor.txt.html();
        }
        cache.lock = this.el(9, true).checked;
        cache.top = this.el(10, true).checked;
        this.f.cache(cache);
        // console.log(sip.cache.article);
    };

    o.load_cache = function () {
        //console.log('load_cache');
        var cache = this.f.restore();
        if (cache && cache.html) {
            this.el(0, true).value = filterXSS(cache.title);
            var type_no = 0;
            if (cache.type < sip.uset.atypes.length) {
                type_no = cache.type;
            }
            this.el(2, true).options[type_no].selected = true;
            this.editor.txt.html(filterXSS(cache.html));
            this.el(9, true).checked = cache.lock;
            this.el(10, true).checked = cache.top;
            var cid = cache.cache_id;
            if (cid) {
                this.el(5, true).innerHTML = "修改文章： #" + cid;
            } else {
                this.el(5, true).innerHTML = "新文章";
            }
        }
    };

    o.clean_up = function () {
        if (this.editor) {
            this.save_cache();
            //this.editor.destroy();
            this.editor = null;
        }
    };

    return o;

};

sip.o.art.types = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_types',
        add_event: true
    });

    o.gen_ev_handler = function () {

        return [
            //click submit
            function () {
                var types = [];
                var els = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < els.length; i++) {
                    var t = els[i].value.trim();

                    if (t.length > 0) {
                        types.push(t);
                    }
                }
                els = null;
                //console.log(types);
                sip.uset.atypes = types;
                types = null;

                o.f.fetch('update_uset', sip.uset, function () {
                    alert('分类信息修改成功！');
                    this.refresh();
                });
            },
            //key  up enter
            function (e) {
                var k = e || window.event;
                if (k.keyCode !== 13) {
                    return;
                }
                var types = [];
                var els = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < els.length; i++) {
                    var t = els[i].value.trim();
                    //console.log(t,els[i]);
                    if (t.length > 0) {
                        types.push(t);
                    }
                }
                els = null;
                //console.log(types);
                sip.uset.atypes = types;
                types = null;
                this.refresh();
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 2, 0);
        this.f.on('keyup', 1);
    };

    o.gen_html = function () {
        var d = {
            name: this.el(0),
            new_type: this.el(1),
            btn_sumit: this.el(2),
            data: sip.uset.atypes,
            index: function () {
                return ++window['INDEX'] || (window['INDEX'] = 0);
            },
            resetIndex: function () {
                window['INDEX'] = -1;
                return;
            }
        };
        // create data view
        var content = Mustache.render(cardjs.lib.load_html('tp-uma-atypes'), d);
        return sip.f.add_frame('tp-frame-tag-card', content, '分类管理');
    };

    o.after_add_event = function () {
        // console.log(focus);
        this.el(1, true).focus();
    };
    return o;

};

sip.o.art.art_wrap = function (cid) {
    return(cardjs.create({
        cid: cid,
        type: 'panel',
        pages: {
            '编辑': [sip.o.art.editor],
            '搜索': [sip.o.art.search_box],
            '图片管理': [sip.o.art.list_orphan_img],
            '设置': [sip.o.art.set_wrap],
            '备份': [sip.o.art.backup],
            '说明': [sip.o.art.help]
        },
        style: {
            'tags': ' ',
            'tag_active': 'tag-active',
            'tag_normal': 'tag-normal',
            'page': 'page',
            'card': ' '
        }
    }));
};

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
                var data = {'name': name, 'opsw': md5(org_psw), 'npsw': md5(new_psw)};
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

sip.o.mgr.user_mgr_wrap = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        child: null,
        settings: {
            header: 'mgr_umgr_wrap',
            key: key
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
                this.child = sip.o.mgr.user_mgr(this.el(0), key, this.update.bind(this)).show();
                return;
            }
            this.f.fetch('fetch_all_user_info', function (data) {
                this.f.cache(data);
                this.child = sip.o.mgr.user_mgr(this.el(0), key, this.update.bind(this)).show();
            });
        },
        clean_up: function () {
            this.child && this.child.destroy();
            //this.f.cache(null);
        }
    }));
};

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

sip.o.art.set_wrap = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_set_wrap'
    });
    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-set-wrap'), {
            ids: [
                this.el(0),
                this.el(1),
                this.el(2)
            ]});
    };
    o.child = [];
    o.after_add_event = function () {
        o.child.push(sip.o.art.types(this.el(0)).show());
        o.child.push(sip.o.art.set_main_page(this.el(1)).show());
        o.child.push(sip.o.art.set_banner(this.el(2)).show());
    };
    o.clean_up = function () {
        o.child.forEach(function (e) {
            e && e.destroy();
        });
        o.child = [];
    };
    return o;

};

sip.o.art.set_banner = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: "uma_set_banner",
        add_event: true
    });

    o.gen_html = function () {
        var data = {
            fn_label: this.fn_label,
            ids: [this.el(0), this.el(1), this.el(2)]
        };
        var content = Mustache.render(cardjs.lib.load_html("tp-uma-set-banner"), data);
        return sip.f.add_frame('tp-frame-tag-card', content, '横幅栏');
    };

    o.after_add_event = function () {
        var name = cardjs.lib.base64_to_utf8(sip.uset['banner_name']);
        var desc = cardjs.lib.base64_to_utf8(sip.uset['banner_desc']);
        if (name && name.length > 0) {
            this.el(0, true).value = name;
        }
        if (desc && desc.length > 0) {
            this.el(1, true).value = desc;
        }
        name = null;
        desc = null;
    };

    o.gen_ev_handler = function () {
        return {
            'commit': function () {
                if (!confirm('确定提交修改?')) {
                    return;
                }
                sip.uset['banner_name'] = cardjs.lib.utf8_to_base64(this.el(0, true).value);
                sip.uset['banner_desc'] = cardjs.lib.utf8_to_base64(this.el(1, true).value);
                this.f.fetch('update_uset', sip.uset, function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
                this.f.event('main_update_banner');
            },
            'update_banner': function () {
                this.f.event('main_update_banner', {
                    name: this.el(0, true).value,
                    desc: this.el(1, true).value
                });
            }

        };
    };

    o.add_event = function () {
        this.f.on('click', 2, 'commit');
        this.f.on('keyup', 1, 'update_banner');
        this.f.on('keyup', 0, 'update_banner');
    };

    o.clean_up = function () {
        this.f.event('main_update_banner');
    };

    return o;

};

sip.o.art.set_main_page = function (cid) {
    var o = new cardjs.card(cid);

    o.f.merge({
        header: "uma_uset",
        add_event: true
    });

    o.fn_label = ['主页显示留言', '上传本地图片'];
    o.fn_name = ['show_mbox', 'upload'];

    o.gen_html = function () {
        var data = {
            fn_label: this.fn_label,
            ids: [this.el(0), this.el(1)]
        };
        var content = Mustache.render(cardjs.lib.load_html('tp-uma-settings'), data);
        return sip.f.add_frame('tp-frame-tag-card', content, '界面设置');
    };

    o.after_add_event = function () {
        var uset = cardjs.lib.get_elsbyname(this.el(0));
        for (var i = 0; i < o.fn_name.length; i++) {
            uset[i].checked = sip.uset[o.fn_name[i]];
        }
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                var uset = cardjs.lib.get_elsbyname(this.el(0));
                for (var i = 0; i < this.fn_name.length; i++) {
                    sip.uset[this.fn_name[i]] = uset[i].checked;
                }
                //console.log(sip.uset);
                this.f.fetch('set_upload_support', sip.uset.upload ? 1 : 0);
                this.f.fetch('update_uset', sip.uset, function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
            }
        ];
    };

    o.add_event = function () {
        this.f.on('click', 1, 0);
    };

    return o;

};

sip.o.art.help = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'at_help'
    });

    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-help'));
    };

    return o;

};

sip.o.art.search_box = function (cid) {

    var key = cardjs.lib.gen_key();

    return(cardjs.create({
        cid: cid,
        child: null,
        settings: {
            header: 'main_search_box',
            add_event: true,
            key: key
        },
        gen_html: function () {
            return Mustache.render(cardjs.lib.load_html('tp-uma-search-box'), {ids: [this.el(0), this.el(1), this.el(2)]});
        },
        gen_ev_handler: function () {
            return [
                function () {
                    //console.log('fire');
                    var cache = this.f.restore();

                    var kw = this.el(0, true).value;

                    if (!cache
                            || kw !== cache.cache_kw
                            || !cache.content
                            || cache.content.length === 0) {
                        if (!cache) {
                            cache = {
                                'page_size': 15,
                                'total': -1,
                                'cache_kw': '',
                                'content': null
                            };
                        }
                        cache['current_kw'] = kw,
                                cache.pn = 0;
                        this.clean_up();
                        this.f.cache(cache);

                        this.el(2, true).innerHTML = "搜索中 ...";
                        this.f.fetch('search', {'kw': kw, 'pn': 0, 'get_total': true, 'page_size': cache.page_size},
                                function (data) {
                                    var cache = this.f.restore();
                                    cache.cache_kw = kw;
                                    cache.total = data.total;
                                    cache.content = data.data;
                                    this.f.cache(cache);

                                    //console.log(data);
                                    this.child = sip.o.art.search_result(this.el(2), this.settings.key).show();
                                },
                                function () {
                                    this.el(2, true).innerHTML = "此功能登录后才可使用";
                                    //console.log(r);
                                }, false);
                    } else {
                        console.log('using cache!');
                        if (!this.child) {
                            this.child = sip.o.art.search_result(this.el(2), this.settings.key).show();
                        }
                    }
                },
                function (e) {
                    var k = e || window.event;
                    if (k.keyCode === 13) {
                        //console.log('fire');
                        this.f.trigger(0);
                    }
                }
            ];
        },
        after_add_event: function () {
            // clear_cache: {msbox/asearch/mboard} 相应键为true时清空缓存。
            this.f.clear_cache('update_article', true);

            var cache = this.f.restore();
            this.el(0, true).focus();

            if (!this.child && cache && cache.content
                    && cache.content.length > 0) {
                this.el(0, true).value = cache.cache_kw;
                cache.current_kw = cache.cache_kw;
                this.chile = sip.o.art.search_result(this.el(2), this.settings.key).show();
            }

        },
        clean_up: function () {
            this.child && this.child.destroy();
        },
        add_event: function () {
            //console.log('add event');
            this.f.on('keyup', 0, 1);
            this.f.on('click', 1, 0);
        }
    }));
};

sip.o.AAChild = function (cid) {
    var key = cardjs.lib.gen_key();
    return(cardjs.create({
        cid: cid,
        settings: {
            key: key
        },
        func1_child: function (p) {
            console.log('call child func1(' + p + ')');
        },
        func2_child: function (p) {
            console.log('call child func2(' + p + ')');
        },
        gen_html: function () {
            return 'child';
        },
        after_add_event: function () {
            this.f.event('hello', this.func1_child);
            this.f.event('world', this.func2_child);
        },
        clean_up: function () {
            this.self.innerHTML = '';
            //this.f.event('hello', this.func_child, false);
        }
    }));
};

sip.o.AATest = function (cid) {
    var key = cardjs.lib.gen_key();

    var o = new cardjs.card(cid);
    o.f.merge({
        key: key,
        header: 'test',
        add_event: true
    });

    o.func1 = function () {
        console.log('call parent func1:', this.settings.key);
    };

    o.child = null;
    o.gen_ev_handler = function () {
        return {
            't1': function () {
                //sip.db.load_last_six_month();
            },
            't2': function () {
                console.log('click t2');
                console.log(sip.db);
            }
        };
    };

    o.add_event = function () {
        o.f.on('click', 't1');
        o.f.on('click', 't2');
    };

    o.gen_html = function () {
        var html = '<div style="margin:10px;">' +
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
                        psw: md5(this.el(1, true).value)
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
        this.f.cache(null);
        this.after_add_event();
    }.bind(o);

    o.show_user_panel = function () {
        //console.log('developing: show_user_panel ');
        var info = this.f.restore();
        //console.log('info:', info);
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
        var content = '<div style="color:red;">无数据</div>';
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
            content = Mustache.render(cardjs.lib.load_html('tp-group-view'), {tag: tag, cat: cat, all: this.el(j + i + 1)});
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
        for (; i < this.el() - 1; i++) {
            if (this.el(i, true).value === sip.db.d.page.filter) {
                this.el(i, true).style.backgroundColor = 'skyblue';
            }
        }
    };

    o.gen_ev_handler = function () {
        var evs = [], i, j, id, last = this.el();

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
            this.el(this.el() - 1, true).style.backgroundColor = 'skyblue';
            this.f.event('main_show_pager');
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
        this.data = Object.keys(sip.db.get('files'));
        this.f.cache(this.data);
        this.refresh();
    };

    return o;
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
                id = parseInt(cardjs.lib.url_get_param('id'));
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
        gen_html: function () {
            return '<div id="' + this.el(0) + '"></div>';
        },
        update: function (data) {
            if (data === undefined || (data.length && data.length === 0)) {
                data = null;
            }
            
            //console.log('call main_art_board_update:', data);
            this.f.cache(data);
            if (!data) {
                this.el(0, true).innerHTML = "<font color=red>没有数据</font>";
                return;
            }
            if (cardjs.lib.isArray(data)) {
                this.el(0, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-article-summary-container'), {
                    recent: data,
                    style: 'article-summary'
                });
            } else {
                this.f.event('main_clear_pager');
                this.el(0, true).innerHTML = Mustache.render(cardjs.lib.load_html('tp-article-summary-container'), {
                    recent: data,
                    style: 'article-all-content'
                });
            }
        },
        after_add_event: function () {
            // regist a clear_cache event for other module clear this cache;
            this.f.clear_cache('update_article', true);
            this.f.clear_cache('clear_art_board', true);

            //export a function for other module
            this.f.event('main_article_board_update', this.update, true);

            var cache = this.f.restore();
            if (cache) {
                this.update(cache);
                return;
            }
            var param = get_url_keyid();
            if (param.y && param.m && param.id) {
                $.getJSON(sip.s.json_path + param.y + '/' + param.m + '.json', function (data) {
                    //console.log(data,tid);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === param.id) {
                            this.update(sip.f.parse_json(data[i]));
                            return;
                        }
                    }
                    this.update(null);
                }.bind(this));
                return;
            }
            // no cache, no url params 
            $.getJSON(sip.s.top_art_path + '?t=' + cardjs.lib.rand(8), function (data) {
                var d = [];
                data.forEach(function (e) {
                    d.push(sip.f.parse_json(e));
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

sip.o.art.backup = function (cid) {
    var o = new cardjs.card(cid);
    o.f.merge({
        header: 'art_backup',
        add_event: true
    });

    o.gen_html = function () {
        return Mustache.render(cardjs.lib.load_html('tp-uma-backup'), {ids: [this.el(0), this.el(1)]});
    };

    o.gen_ev_handler = function () {
        return [
            function () {
                o.f.fetch('export_picdb', function (r) {
                    alert(r);
                }, function (r) {
                    alert(r);
                });
            },
            function () {
                if (confirm('现有数据将被清除，确定要导入数据？')) {
                    o.f.fetch('import_from_json', function (r) {
                        alert(r);
                        cardjs.lib.url_set_params('index.html', {});
                        window.location.reload(true);
                    }, function (r) {
                        alert(r);
                        cardjs.lib.url_set_params('index.html', {});
                        window.location.reload(true);
                    });
                }
            }
        ];
    };

    o.add_event = function () {
        o.f.on('click', 0);
        o.f.on('click', 1);
    };

    return o;

};


