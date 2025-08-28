// ==UserScript==
// @name         Snapcraft+
// @namespace    http://tampermonkey.net/
// @version      25.08.5
// @description  Snapcraft.io, but better!
// @author       Lauren Brock
// @source       https://github.com/atomcult/snapcraft-plus
// @match        https://snapcraft.io/admin/*/snaps
// @match        https://dashboard.snapcraft.io/snaps/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=snapcraft.io
// @grant        none
// ==/UserScript==

(function() {
    if (location.hostname === "dashboard.snapcraft.io") {
        addDownloadsToDashboard();
    }
    else if (location.hostname === "snapcraft.io") {
        replaceSnapNamesWithLinks();
    }
})();

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

async function addDownloadsToDashboard() {
    'use strict';

    const dlSvg = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg height='800px' width='800px' version='1.1' id='图层_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 40 40' enable-background='new 0 0 40 40' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23231815' d='M20,22c-0.1,0-0.3,0-0.4-0.1l-3-3c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l2.6,2.6l2.6-2.6 c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-3,3C20.3,22,20.1,22,20,22z'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='%23231815' d='M20,21.5c-0.3,0-0.5-0.2-0.5-0.5v-8c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v8 C20.5,21.3,20.3,21.5,20,21.5z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cpath fill='%23231815' d='M25,27.5H15c-1.4,0-2.5-1.1-2.5-2.5v-2c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v2c0,0.8,0.7,1.5,1.5,1.5 h10c0.8,0,1.5-0.7,1.5-1.5v-2c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v2C27.5,26.4,26.4,27.5,25,27.5z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
    const assertSvg = "data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23101010;%7D%3C/style%3E%3C/defs%3E%3Ctitle/%3E%3Cg id='xxx-file'%3E%3Cpath class='cls-1' d='M325,105H250a5,5,0,0,1-5-5V25a5,5,0,0,1,10,0V95h70a5,5,0,0,1,0,10Z'/%3E%3Cpath class='cls-1' d='M300,380H100a30,30,0,0,1-30-30V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100V350A30,30,0,0,1,300,380ZM100,30A20,20,0,0,0,80,50V350a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V102.07L247.93,30Z'/%3E%3Cpath class='cls-1' d='M275,180H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z'/%3E%3Cpath class='cls-1' d='M275,230H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z'/%3E%3Cpath class='cls-1' d='M275,280H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z'/%3E%3Cpath class='cls-1' d='M200,330H125a5,5,0,0,1,0-10h75a5,5,0,0,1,0,10Z'/%3E%3C/g%3E%3C/svg%3E";

    const snapNameNodes = document.querySelectorAll("[data-test=spec-list-snap-name]")
    if (snapNameNodes === null || snapNameNodes.length === 0) return;

    const snapNameNode = snapNameNodes[0];

    var snapName = "";
    for (var i = 0; i < snapNameNode.childNodes.length; i++) {
        if (snapNameNode.childNodes[i].nodeType !== Node.TEXT_NODE) continue;

        snapName = snapNameNode.childNodes[i].textContent.trim();
        break;
    }

    var assertDecSvgNode = document.createElement("img");
    assertDecSvgNode.src = assertSvg;
    assertDecSvgNode.height = 20;
    assertDecSvgNode.width = 20;
    assertDecSvgNode.style.display = "block";

    var assertDecDlNode = document.createElement("a");
    assertDecDlNode.style.display = "inline-block";
    assertDecDlNode.href = "#"
    assertDecDlNode.addEventListener("click", function() {
        openDeclarationAssert(snapName)
    });
    assertDecDlNode.appendChild(assertDecSvgNode);
    snapNameNode.appendChild(assertDecDlNode);

    const uploads = document.getElementsByClassName("b-nav__upload");
    if (uploads === null || uploads.length == 0) return;

    const uploadNodes = Array.from(uploads);

    for (var i = 0; i < uploadNodes.length; i++) {
        const oldParentNode = uploadNodes[i].children[0];

        var newParentNode = document.createElement("span");
        newParentNode.classList.add("b-nav__anchor");
        newParentNode.style.alignItems = "center";

        const kids = Array.from(oldParentNode.children);
        for (var j = 0; j < kids.length; j++) {
            newParentNode.appendChild(kids[j]);
        }

        const revision = kids[0].textContent.split("#")[1].trim();

        var revisionLink = document.createElement("a");
        revisionLink.textContent = " #" + revision + " ";
        revisionLink.href = "/snaps/" + snapName + "/revisions/" + revision + "/";
        kids[0].textContent = "";
        kids[0].appendChild(revisionLink);

        var dlSvgNode = document.createElement("img");
        dlSvgNode.src = dlSvg;
        dlSvgNode.height = 30;
        dlSvgNode.width = 30;
        dlSvgNode.style.display = "block";

        var snapDlNode = document.createElement("a");
        snapDlNode.style.marginTop = "0px";
        snapDlNode.style.marginLeft = "10px";
        snapDlNode.href = "/snaps/" + snapName + "/revisions/" + revision + "/download";
        snapDlNode.appendChild(dlSvgNode);
        newParentNode.appendChild(snapDlNode);

        var assertSvgNode = document.createElement("img");
        assertSvgNode.src = assertSvg;
        assertSvgNode.height = 20;
        assertSvgNode.width = 20;
        assertSvgNode.style.display = "block";

        var assertDlNode = document.createElement("a");
        assertDlNode.style.marginTop = "0px";
        assertDlNode.style.display = "block";
        // assertDlNode.style.marginLeft = "10px";
        assertDlNode.href = "#";
        assertDlNode.addEventListener("click", function() {
            openRevisionAssert(snapName, revision)
        });
        assertDlNode.appendChild(assertSvgNode);
        newParentNode.appendChild(assertDlNode);

        uploadNodes[i].appendChild(newParentNode);
        oldParentNode.remove();
    }
}

async function openRevisionAssert(snapName, revision) {
    const hashSum = await fetch("/snaps/" + snapName + "/revisions/" + revision + "/")
    .then(response => {
        return response.text()
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const hashNode = doc.querySelectorAll("[data-test=snap_digest]")[0];
        return hashNode.textContent.trim();
    });

    window.open("https://api.snapcraft.io/v2/assertions/snap-revision/" + hashSum);
}

async function openDeclarationAssert(snapName) {
    var snapIDNodes = document.querySelectorAll("[data-test=spec-list-snap-id]")

    if (snapIDNodes !== null && snapIDNodes.length !== 0) {
        var snapID = snapIDNodes[0].textContent.trim();
        window.open("https://api.snapcraft.io/v2/assertions/snap-declaration/16/" + snapID);
        return;
    };

    snapID = await fetch("/snaps/" + snapName)
        .then(response => {
        return response.text()
    })
        .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const idNode = doc.querySelectorAll("[data-test=spec-list-snap-id]")[0];
        return idNode.textContent;
    });

    window.open("https://api.snapcraft.io/v2/assertions/snap-declaration/16/" + snapID);
}
