window.onload = function(e) {
  //Wait for all of the files to load before removing the loading screen
  //Because JavaScript takes so long to load an execute, this should make sure that everything has enough time to load
  requestAnimationFrame(() => {
    document.getElementById("loader").style.display = "none"
    window.allLoaded = true
  })
}