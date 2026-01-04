var typed = new Typed('#element', {
  strings: [' Computer Engineering Student', 'Aspiring Full Stack Developer'],
  typeSpeed: 50,
});



function openDemo(videoSrc) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("projectVideo");
  video.src = videoSrc;
  video.load();
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeDemo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("projectVideo");

  modal.style.display = "none";
  video.pause();
  document.body.style.overflow = "auto";
}

window.onclick = function (event) {
  const modal = document.getElementById("videoModal");
  if (event.target == modal) {
    closeDemo();
  }
}