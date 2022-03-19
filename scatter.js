'use strict'

let wordlist = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Yo mama so fat she got an orbit"];
let scatCount = 5;
let before = Math.floor(Math.random() * scatCount);
let after = scatCount - before;
const spaces = /\+/g;

console.log(scatCount);
console.log(before);
console.log(after);

chrome.webRequest.onBeforeRequest.addListener(async (req) => {
    if (req.url.slice(0, 32) === "https://www.google.com/search?q=") {
        if (wordlist.includes(decodeURIComponent(req.url.slice(32, req.url.length).split("&")[0].replace(spaces, " ")))) {
            console.log('ayup');
            return false;
        }
        for (let i = 1; i <= before; i++) {
            let randNum = Math.floor(Math.random() * wordlist.length-1)
            fetch("https://www.google.com/search?q=" + encodeURIComponent(wordlist[randNum]));
            console.log(`Valid Search Detected: URL: ${req.url}, ScatNum: ${i}, ScatWord: ${wordlist[randNum]}, after: false`);
        }
    }
}, {urls: ['*://*/*']});

chrome.webRequest.onCompleted.addListener(async (req) => {
    if (req.url.slice(0, 32) === "https://www.google.com/search?q=") {
        if (wordlist.includes(decodeURIComponent(req.url.slice(32, req.url.length).split("&")[0].replace(spaces, " ")))) {
            console.log('ayup');
            return false;
        }
        for (let i = 1; i <= after; i++) {
            let randNum = Math.floor(Math.random() * wordlist.length-1)
            fetch("https://www.google.com/search?q=" + encodeURIComponent(wordlist[randNum]));
            console.log(`Valid Search Detected: URL: ${req.url}, ScatNum: ${i+before}, ScatWord: ${wordlist[randNum]}, after: true`);
        }
    }
}, {urls: ['*://*/*']});