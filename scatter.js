'use strict'

let wordlist = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Yo mama so fat she got an orbit"];
let scatCount = 5;
let before = Math.floor(Math.random() * scatCount);
let after = scatCount - before;
const spaces = /\+/g;

console.log(scatCount);
console.log(before);
console.log(after);

const spoof = async function (req, order) {
    if (wordlist.includes(decodeURIComponent(req.url.slice(32, req.url.length).split("&")[0].replace(spaces, " ")))) {
        console.log('ayup');
        return false;
    }
    for (let i = 1; i <= order; i++) {
        let randNum = Math.floor(Math.random() * wordlist.length-1)
        fetch("https://www.google.com/search?q=" + encodeURIComponent(wordlist[randNum]));
        console.log(`Valid Search Detected: URL: ${req.url}, ScatNum: ${i}, ScatWord: ${wordlist[randNum]}, after: false`);
    }
}

chrome.webRequest.onBeforeRequest.addListener(spoof(req, before), {urls: ['^https://www\.google\.com/search\?q=']});

chrome.webRequest.onCompleted.addListener(spoof(req, after), {urls: ['*://*/*']});