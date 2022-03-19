'use strict'

function numZeroPad(num, digits) {
    let snum = `${num}`;
    for (let i = 0; i < digits - snum.length; i++) {
        snum = '0' + snum;
    }
    return snum;
}

async function getAnnualTrends(country, year) {
    let terms = [];
    for (let i = 0; i < 10; i++) {
        let resp = await fetch(`https://trends.google.com/trends/api/topcharts?hl=en-US&tz=240&date=${year-i}&geo=${country}&isMobile=false`);
        let data = JSON.parse((await resp.text()).substring(5));
        data.topCharts.forEach((tc)=>tc.listItems.forEach((li)=>terms.push(li.title)));
    }
    return terms;
}

async function getDailyTrends() {
    const dayMilli = 24 * 60 * 60 * 1000;
    let milli = new Date().getTime();
    let terms = [];

    for (let i = 0; i < 15; i++) {
        let date = new Date(milli);
        let url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=240&ed=${date.getFullYear()}${numZeroPad(date.getMonth()+1, 2)}${numZeroPad(date.getDate(), 2)}&geo=US&ns=15`;
        milli -= dayMilli;
        let resp = await fetch(url);
        let data = JSON.parse((await resp.text()).substring(5));
        data.default.trendingSearchesDays.forEach((tsd)=>tsd.trendingSearches.forEach((ts)=>terms.push(ts.title.query)));
    }

    return terms;
}

async function loadSearchTerms() {
    let settings = chrome.storage.local.get();
    if (settings.wordlist) return;
    settings = {
        "enabled": true,
        "scatCount": 5,
        wordlist: []
    };

    settings.wordlist = settings.wordlist.concat(await getDailyTrends());
    settings.wordlist = settings.wordlist.concat(await getAnnualTrends('US', new Date().getFullYear()));
    settings.before = Math.floor(Math.random() * settings.scatCount);
    settings.after = settings.scatCount - settings.before;

    // searchTerms.forEach((st)=>console.log(st));
    // console.log(searchTerms.length);

    await chrome.storage.local.set(settings);
}

loadSearchTerms();

// let wordlist = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Yo mama so fat she got an orbit"];
// let scatCount = 5;
// let before = Math.floor(Math.random() * scatCount);
// let after = scatCount - before;
const spaces = /\+/g;
// console.log(scatCount);
// console.log(before);
// console.log(after);

chrome.webRequest.onBeforeRequest.addListener(async (req) => {
    let settings = await chrome.storage.local.get();
    if (!settings.wordlist) return;
    let wordlist = settings.wordlist;
    let before = settings.before;
    let after = settings.after;

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
    let settings = await chrome.storage.local.get();
    if (!settings.wordlist) return;
    let wordlist = settings.wordlist;
    let before = settings.before;
    let after = settings.after;

    if (req.url.slice(0, 32) === "https://www.google.com/search?q=") {
        if (wordlist.includes(decodeURIComponent(req.url.slice(32, req.url.length).split("&")[0].replace(spaces, " ")))) {
            console.log('ayup');
            return false;
        }
        for (let i = 1; i <= after; i++) {
            let randNum = Math.floor(Math.random() * wordlist.length-1)
            fetch("https://www.google.com/search?q=" + encodeURIComponent(wordlist[randNum]));
            console.log(`Valid Search Detected: URL: ${req.url}, ScatNum: ${i+(settings.scatCount - after)}, ScatWord: ${wordlist[randNum]}, after: true`);
        }
    }
}, {urls: ['*://*/*']});
