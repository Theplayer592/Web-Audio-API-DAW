window.onload = function(e) {
    window.toolbarF = {
        record: function() {
            console.log("rec")
        }
    }

    dragableElement(document.getElementById("toolbar"))

    //Wait for all of the files to load before removing the loading screen
    //Because JavaScript takes so long to load an execute, this should make sure that everything has enough time to load
    requestAnimationFrame(() => {
        document.getElementById("loader").style.display = "none"
        window.allLoaded = true
    })
}

//Draggable functionality from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
function dragableElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.bottom = ""
        if ((elmnt.offsetLeft - pos1) > -3) elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}