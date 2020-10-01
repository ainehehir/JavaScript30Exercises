//javscript30

//get all the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//fn to play video
//if the video method is paused then call video.play method
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

//fn to change the play button to pause when playing
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

//fn to jump the video back or forwards depending on the [data-skip] value
//currentTime is a video method
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//vol and speed ranges
//this.name will be volume or speed based on the event that is passed
//this.value will also be assigned by the event
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//fn to handle the progress bar based on the flexBasis
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//move the video forward or back
//currentTime is a video method
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//add eventlistener and call the fn
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
