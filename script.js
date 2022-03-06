window.onload = function(e) {
    window.isRecording = false

    window.toolbarF = {
        record: function() {
            if (isRecording) {
                document.getElementById("rec").style.background = "gray"
            } else {
                document.getElementById("rec").style.background = "red"
            }

            isRecording = !isRecording
        }
    }

    dragableElement(document.getElementById("toolbar"))
    resizableToolbar()

    //Wait for all of the files to load before removing the loading screen
    //Because JavaScript takes so long to load an execute, this should make sure that everything has enough time to load
    requestAnimationFrame(() => {
        document.getElementById("loader").style.display = "none"
        window.allLoaded = true
    })
}

//If the window is resized, make sure that the toolbar is at the bottom of the screen, or where the user left it, and is a decent size
window.onresize = function(e) {
    var elmnt = document.getElementById("toolbar")

    if (elmnt.offsetTop > (window.innerHeight - (getComputedStyle(elmnt).height.split("px")[0]) - 9)) {
        elmnt.style.top = ""
        elmnt.style.bottom = 0
    }
    if (elmnt.offsetLeft + (getComputedStyle(elmnt).width.split("px")[0]) > window.innerWidth) {
        elmnt.style.left = ""
        elmnt.style.width = window.innerWidth + "px"
    }
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
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if ((elmnt.offsetTop - pos2) < (window.innerHeight - (getComputedStyle(elmnt).height.split("px")[0]) - 9)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
            elmnt.style.bottom = ""
        } else {
            elmnt.style.top = ""
            elmnt.style.bottom = 0
        }
        if ((elmnt.offsetLeft - pos1) > -1 && (elmnt.offsetLeft - pos1) < (window.innerWidth - (getComputedStyle(elmnt).width.split("px")[0]))) elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function resizableToolbar() {
    var elmnt = document.getElementById("toolbar_handle")
    var toolbare = document.getElementById("toolbar")
    var pos = 0

    elmnt.onmousedown = md;

    function md(e) {
        e.preventDefault()

        pos = e.clientX
        document.onmouseup = mu;
        document.onmousemove = mm;
    }

    function mm(e) {
        e.preventDefault()

        pos = e.clientX;
        if ((pos - toolbare.offsetLeft) > (window.innerWidth / 5) && pos < window.innerWidth) toolbare.style.width = (pos - toolbare.offsetLeft) + "px"
    }

    function mu(e) {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}