class BeatMaker {
  constructor() {
    this.play = document.getElementById("play");
    this.pads = document.querySelectorAll(".pad");
    this.selects = document.querySelectorAll(".select");
    this.mutekick = document.querySelector(".mute-kick");
    this.muteSnare = document.querySelector(".mute-snare");
    this.muteHihat = document.querySelector(".mute-hihat");
    this.index = 0;
    this.isPlaying = null;
    this.bpm = 150;
    this.sliderInfo = document.querySelector(".slider-info");
    this.sliderInput = document.querySelector(".slider-input");
    this.kickAudio = new Audio();
    this.snareAudio = new Audio();
    this.hihatAudio = new Audio();
  }

  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const pad = document.querySelectorAll(`.p${step}`);
    pad.forEach((pad) => {
      //Scale It
      pad.style.animation = "scale 0.5s ease alternate 2";

      //Check if its clicked and play sound
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.src = this.selects[0].value;
          this.kickAudio.play();
        } else if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.src = this.selects[1].value;
          this.snareAudio.play();
        } else if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.src = this.selects[2].value;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
    console.log(step);
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      //Clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn() {
    if (this.isPlaying) this.play.innerText = "Stop";
    else this.play.innerText = "Play";
  }

  changeTempo() {
    beatMaker.bpm = this.value;
    beatMaker.sliderInfo.innerText = this.value;
    clearInterval(beatMaker.isPlaying);
    beatMaker.updateBtn();
    beatMaker.isPlaying = beatMaker.isPlaying ? false : true;
    beatMaker.start();
  }
}

const beatMaker = new BeatMaker();

beatMaker.pads.forEach((element) => {
  element.addEventListener("click", beatMaker.activePad);
  element.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

beatMaker.play.addEventListener("click", () => {
  beatMaker.start();
  beatMaker.updateBtn();
});

beatMaker.mutekick.addEventListener("click", () => {
  beatMaker.kickAudio.muted = beatMaker.kickAudio.muted ? false : true;
});

beatMaker.muteSnare.addEventListener("click", () => {
  beatMaker.snareAudio.muted = beatMaker.snareAudio.muted ? false : true;
});

beatMaker.muteHihat.addEventListener("click", () => {
  beatMaker.hihatAudio.muted = beatMaker.hihatAudio.muted ? false : true;
});

beatMaker.sliderInput.addEventListener("change", beatMaker.changeTempo);
