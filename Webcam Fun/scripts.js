// get elements
const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  //get access to the video stream
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      //set the video src to video stream
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      //err
      console.error("NO!!!!", err);
    });
}

function takePhoto() {
  //play the audio
  snap.currentTime = 0;
  snap.play();

  //take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");

  //create a link and the href to the video data
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

//fn add the stream video to the canvas
function paintToCanvas() {
  //set the height and width of the canvas to the video height and width
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  //show the video on the canvas
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    //red effect
    // pixels = redEffect(pixels);

    // green screen effect
    // pixels = greenScreen(pixels);

    //rgb effect
    pixels = rgbSplit(pixels);

    //put the pixels back in
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; //red
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      //take the pixels out
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // red
    pixels.data[i + 500] = pixels.data[i + 1]; // green
    pixels.data[i - 550] = pixels.data[i + 2]; // blue
  }

  return pixels;
}

getVideo();
video.addEventListener("canplay", paintToCanvas);
