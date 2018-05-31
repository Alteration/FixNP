// ==UserScript==
// @name         Escapist Fixer
// @namespace    AlteredCreations
// @version      0.1
// @description  Allows videos to autoplay on escapist, unmutes them and autoplays a random video when complete
// @author       Alteration
// @match        http://www.escapistmagazine.com/videos/view/*/*
// @grant        none
// ==/UserScript==

var videos = document.getElementsByTagName('video');
window.addEventListener('load', modifyVideo, false);
function modifyVideo()
{
    videos[0].addEventListener('ended', function(){
        console.log("Video Ended");
        window.location.href = 'http://www.escapistmagazine.com/videos/view/zero-punctuation.random';
    }, false);
    videos[0].muted = false;
    videos[0].volume = 0.4333333;
    videos[0].play();
}