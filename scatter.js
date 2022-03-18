'use strict'

let wordlist = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
let scatCount = 5;
let before = Math.floor(Math.random() * scatCount);
let after = scatCount - before;

console.log(scatCount);
console.log(before);
console.log(after);

const httpGet = function (theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

chrome.webRequest.onBeforeRequest.addListener(async (req) => {
    let url;
    if (req.url.slice(0, 32) === "https://www.google.com/search?q=") {
        // if (req.url === "https://www.google.com/search?q=gaming123") {
        //     console.log("there is only suffering");
        //     return "sadness."
        // }
        // for (let i = 0; i <= before; i++) {
        //     console.log('hello!')
        //     httpGet("https://www.google.com/search?q=gaming123");
        // }
        httpGet("https://www.google.com/search?q=gaming123");
    }
}, {urls: ['*://*/*']});

// chrome.webRequest.onCompleted.addListener(async (req) => {
//     if (req.url.slice(0, 32) === "https://www.google.com/search?q=") {
//         for (let i = 0; i <= before; i++) {
//             console.log(`what's up?`);
//             httpGet(encodeURIComponent("https://www.google.com/search?q=" + wordlist[Math.floor(Math.random() * wordlist.length-1)]));
//         }
//     }
// }, {urls: ['*://*/*']});