// ==UserScript==
// @name         Repair Novel Pages (Button)
// @namespace    AlteredCreations
// @version      0.2
// @description  Removes Unicode characters and TLN's with
// @author       Alteration
// @match        http://*.wordpress.com/*
// @match        https://*.wordpress.com/*
// @match        *://*novelplanet.com/*
// @noframes
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

// Register Config Page
var cfg = new MonkeyConfig({
    title: 'Repair Novel Options',
    parameters: {
        'auto_TLN': {
            type: 'select',
            choices: [ 'Enabled', 'Disabled' ],
            default: 'Enabled'
        }
    },
    menuCommand: true
});

//Script actual starts here
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "#NvlOpts {background: none; max-height:25px; overflow:hidden; transition: max-height 0.1s ease-out;}" +
    "#NvlOpts:hover {max-height: inherit; transition: max-height 0.3s ease-in 0.25s}";
head.appendChild(style);

var zNode = document.createElement('div');
zNode.id = "NvlOpts";
zNode.style.cssText = "position:fixed; top:40px; right: 10px; width: 100px; height 50px; text-align: center;";
var title = document.createElement('a');
title.id = "rmvOpts";
title.innerHTML = "Remove ...";
var jCharButton = document.createElement('button');
jCharButton.id = "jCharButton";
jCharButton.type = "button";
jCharButton.innerHTML = "Unicode";
jCharButton.style.width = "80px";
var TLNButton = document.createElement('button');
TLNButton.id = "tlnButton";
TLNButton.type = "button";
TLNButton.innerHTML = "TLN's";
TLNButton.style.width = "80px";

zNode.appendChild(title);
zNode.appendChild(jCharButton);
zNode.appendChild(TLNButton);
document.body.appendChild(zNode);

document.getElementById("jCharButton").addEventListener ("click", RemoveUnicode, false);
document.getElementById("tlnButton").addEventListener ("click", RemoveNotes, false);

if(cfg.get('auto_TLN') === 'Enabled'){
    RemoveNotes();
}

function RemoveUnicode (zEvent) {
    var uChars = new RegExp('[\\u3040-\\u309F]|[\\u30A0-\\u30FF]|[\\uFF00-\\uFFEF]|[\\u4E00-\\u9FAF]|[\\u2605-\\u2606]|[\\u2190-\\u2195]|\\u203B', "g");
    RegexReplace(uChars);
}

// Old Regex: '[\\(\\[]TE?D?\??L?N?C?:.*\\n*(?:&nbsp;| )*\\n*.*[\\)\\]]'
// New Regex: '(?<!》\W\s)[\(\[](?:T.?N?|E.?\w?|\w{1,3})+:.*\n*(?:&nbsp;| )*\n*.*[\)\]]'
function RemoveNotes (zEvent) {
    var tln = new RegExp('(?<!》\\W\\s)[\\(\\[](?:T.?N?|E.?\\w?|\\w{1,3})+:.*\\n*(?:&nbsp;| )*\\n*.*[\\)\\]]',"g");
    RegexReplace(tln);
}

function RegexReplace (regex) {
    var types = ['p','strong'];
    for (var i = 0; i < types.length; i++){
        var elements = document.getElementsByTagName('' + types[i]);
        for (var j = 0; j < elements.length; j++){
            if(regex.test(elements[j].innerHTML)) {
                console.log("Regex Matched");
                var damaged = elements[j].innerHTML;
                var repaired = damaged.replace(regex, "");
                elements[j].innerHTML = repaired;
            }
        }
    }
}
