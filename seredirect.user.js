// ==UserScript==
// @name         使用我的搜索引擎
// @namespace    https://github.com/lxfly2000/secollection/raw/master/seredirect.user.js
// @version      0.1
// @updateURL    https://github.com/lxfly2000/secollection/raw/master/seredirect.user.js
// @downloadURL  https://github.com/lxfly2000/secollection/raw/master/seredirect.user.js
// @description  将常见的搜索引擎主页跳转到我的搜索引擎页面
// @author       lxfly2000
// @match        *://*.bing.com/
// @match        *://www.baidu.com/
// @match        *://www.bilibili.com/
// @icon         https://avatars0.githubusercontent.com/u/11847274
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var redirect={
        "bing":"https://lxfly2000.github.io/secollection/?se=https://bing.com/search?q={query}",
        "baidu":"https://lxfly2000.github.io/secollection/?se=https://www.baidu.com/s?wd={query}",
        "bilibili":"https://lxfly2000.github.io/secollection/?se=https://search.bilibili.com/all?keyword={query}"
    };
    for(var k of Object.keys(redirect)){
        if(location.host.indexOf(k)!==-1){
            location.href=redirect[k];
            return;
        }
    }
})();
