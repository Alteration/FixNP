// ==UserScript==
// @name         Skip Duplicate Chapters
// @namespace    AlteredCreations
// @version      0.1
// @description  attempts to adjust the links on NovelPlanet to skip any duplicate chapters
// @author       Alteration
// @match        https://novelplanet.com/Novel/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==

var prev;
var next;

document.onkeyup = function(event){
    if (event.which === 37){
        //left
        window.location = prev;
    }else if (event.which === 39){
        //right
        window.location = next;
    }
};


(function() {
    'use strict';

    var a = $(".row")[0].children;
    var b = $(".row")[1].children;
    var pre = a[0].textContent;
    var cur = a[2].children[0].selectedOptions[0].textContent;
    var nex = a[4].textContent;
    var pNewUrl = a[0].children[0].href;

    prev = pNewUrl;

    if(cur !== nex){
        next = a[4].children[0].href;
        return false;
    }

    var n = a[2].children[0].selectedIndex + 2;

    while(cur === nex){
        nex = a[2].children[0][n].textContent;
        n++;
    }
    n--;
    var m = a[2].children[0][n]
    var baseURL = document.baseURI;
    var newURL = baseURL.substring(0,baseURL.lastIndexOf("/")+1)+m.value;

    next = newURL;

    console.log("GoodURL = " + newURL);
    a[4].children[0].href = newURL;
    a[4].children[0].innerHTML = m.text;
    b[4].children[0].href = newURL;
    b[4].children[0].innerHTML = m.text;
})();
