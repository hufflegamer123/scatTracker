'use strict'

async function init() {
    let settings = await chrome.storage.local.get();
    document.getElementById('enabled').checked = settings.enabled === undefined ? true : settings.enabled;
    document.getElementById('scatCount').value = settings.scatCount === undefined ? 5 : settings.scatCount;
}

init();

document.getElementById('enabled').addEventListener('change', async (e) => {
    await chrome.storage.local.set({enabled: document.getElementById('enabled').checked});
});

document.getElementById('scatCount').addEventListener('change', async (e) => {
    await chrome.storage.local.set({scatCount: Number(document.getElementById('scatCount').value)});
});
