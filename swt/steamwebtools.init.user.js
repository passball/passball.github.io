// ==UserScript==
// @name 	Steam Web Tools En
// @namespace 	http://v1t.su/projects/steam/webtools/
// @description Useful tools in Steam web sites
// @version     latest
// @date 	2013-01-15
// @creator vit@v1t.su
// @icon http://passball.github.io/swt/icon-64.png
// @include	http://store.steampowered.com/*
// @include	https://store.steampowered.com/*
// @include	http://steamcommunity.com/*
// @include	https://steamcommunity.com/*
// @homepage	http://v1t.su/projects/steam/webtools/
// ==/UserScript==

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//github.com/passball/passball.github.io/raw/master/swt/steamwebtools.base.js';
document.body.appendChild(script);