'use strict'

let wordlist = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
let scatCount = 5;
let before = Math.floor(Math.random() * scatCount);
let after = scatCount - before;

console.log('test');
chrome.webRequest.onBeforeRequest.addListener(async (req) => {
    console.log(`Before URL loaded: ${req.url}`);
}, {urls: ['*://*/*']});