// ==UserScript==
// @name         Snapcraft+
// @namespace    http://tampermonkey.net/
// @version      2025-08-22
// @description  Snapcraft.io, but better!
// @author       Lauren Brock
// @match        https://snapcraft.io/admin/*/snaps
// @icon         https://www.google.com/s2/favicons?sz=64&domain=snapcraft.io
// @grant        none
// ==/UserScript==

function replaceSnapNamesWithLinks() {
    'use strict';

    // get all table bodies
    const tables = document.getElementsByTagName("tbody");

    // wait for the tables to load
    if (tables === null || tables.length == 0) {
        window.setTimeout(replaceSnapNamesWithLinks,100);
        return;
    };

    // perform the replacement
    const rows = tables[0].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        const snap = rows[i].children[0];
        const snapName = snap.innerHTML;

        // skip if it already contains HTML
        if (snapName.includes("<")) continue;

        snap.innerHTML = `<a href="https://dashboard.snapcraft.io/snaps/${snapName}/">${snapName}</a>`;
    }
};

replaceSnapNamesWithLinks();
