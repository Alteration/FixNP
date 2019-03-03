// ==UserScript==
// @name         QU Navigation
// @namespace    AlteredCreations
// @version      0.1
// @description  Add keybound navigation to QU
// @author       Alteration
// @match        https://www.qidianunderground.com/book/*/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==

document.onkeyup = function(event){
    if (event.which === 37){
        //left
        window.location = $("li:has(a.yellow)").prev()[0].children[0].href;
    }else if (event.which === 39){
        //right
        window.location = $("li:has(a.yellow)").next()[0].children[0].href
    }
};
