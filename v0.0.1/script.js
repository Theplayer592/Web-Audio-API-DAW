const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.mediaDevices.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      })

      // Success callback
      .then(function(stream) {
  var lsl = JSON.parse(localStorage.getItem("clips"))
        
  const mediaRecorder = new MediaRecorder(stream);

record.onclick = function() {
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  console.log("recorder started");
  record.style.background = "red";
  record.style.color = "black";
}

let chunks = [];

mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
}

stop.onclick = function() {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
  record.style.background = "";
  record.style.color = "";
}
        for(var x in lsl) {
    var clipName = lsl[x]
    const clipContainer = document.createElement('article');
  const clipLabel = document.createElement('p');
  clipLabel.classList += "clipLabel"
  const audio = document.createElement('audio');
  const deleteButton = document.createElement('button');

  clipContainer.classList.add('clip');
  audio.setAttribute('controls', '');
  deleteButton.innerHTML = "Delete";
  clipLabel.innerHTML = clipName;

  clipContainer.appendChild(audio);
  clipContainer.appendChild(clipLabel);
  clipContainer.appendChild(deleteButton);
  soundClips.appendChild(clipContainer);
  fetch(localStorage[clipName])
  .then(res => res.blob())
  .then(blob => {
    const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;
          //document.body.innerHTML = localStorage.getItem(clipName)

  deleteButton.onclick = function(e) {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
   localStorage.removeItem(evtTgt.parentElement.querySelector(".clipLabel").innerText)
    var toadd = JSON.parse(localStorage.getItem("clips"))
    toadd.splice(toadd.indexOf(evtTgt.parentElement.querySelector(".clipLabel").innerText), 1)
    localStorage["clips"] = JSON.stringify(toadd)
  }
  })
  }

mediaRecorder.onstop = function(e) {
  console.log("recorder stopped");

  const clipName = prompt('Enter a name for your sound clip');

  const clipContainer = document.createElement('article');
  const clipLabel = document.createElement('p');
  clipLabel.classList += "clipLabel"
  const audio = document.createElement('audio');
  const deleteButton = document.createElement('button');

  clipContainer.classList.add('clip');
  audio.setAttribute('controls', '');
  deleteButton.innerHTML = "Delete";
  clipLabel.innerHTML = clipName;

  clipContainer.appendChild(audio);
  clipContainer.appendChild(clipLabel);
  clipContainer.appendChild(deleteButton);
  soundClips.appendChild(clipContainer);
  const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  var fr = new FileReader();
    fr.onload = 
        function(e) {
            localStorage[clipName] = e.target.result;
        }
    fr.readAsDataURL(blob);
  try {
    var toadd = JSON.parse(localStorage.getItem("clips"))
    toadd.push(clipName)
  localStorage.setItem("clips", JSON.stringify(toadd))
  } catch(e) {
    localStorage.setItem("clips", JSON.stringify([clipName]))
  }
  chunks = [];
  const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;

  deleteButton.onclick = function(e) {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    localStorage.removeItem(evtTgt.parentElement.querySelector(".clipLabel").innerText)
    var toadd = JSON.parse(localStorage.getItem("clips"))
    toadd.splice(toadd.indexOf(evtTgt.parentElement.querySelector(".clipLabel").innerText), 1)
    localStorage["clips"] = JSON.stringify(toadd)
  }
}

      })

      // Error callback
      .catch(function(err) {
         console.log('The following getUserMedia error occurred: ' + err);
          alert(err)
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
  alert(err)
}
