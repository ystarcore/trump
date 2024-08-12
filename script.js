document.addEventListener("DOMContentLoaded", function () {
  const videoGallery = document.getElementById("videoGallery");
  const mainVideo = document.getElementById("myVideo");
  const videoPlayer = document.getElementById("videoPlayer");
  const expandDock = document.querySelector('.expand-dock');

  let isMouseOverGallery = false;

  // Show video gallery and shrink main video on mouse move to bottom
  document.addEventListener("mousemove", function (event) {
    const y = event.clientY || event.pageY;
    const windowHeight = window.innerHeight;
    if (y > windowHeight - 200) {
      videoGallery.classList.add("visible");
      videoPlayer.classList.add("shrink");

    } else if (!isMouseOverGallery) {
      videoGallery.classList.remove("visible");
      videoPlayer.classList.remove("shrink");
    }
  });

  // Keep video gallery visible while mouse is over it
  videoGallery.addEventListener("mouseenter", function () {
    isMouseOverGallery = true;
    videoGallery.classList.add("visible");
    videoPlayer.classList.add("shrink");
  });

  videoGallery.addEventListener("mouseleave", function () {
    isMouseOverGallery = false;
    videoGallery.classList.remove("visible");
    videoPlayer.classList.remove("shrink");
  });

  expandDock.addEventListener("mouseenter", function () {
    expandDock.style.display = '';
    expandDock.style.opacity = 1;
    document.querySelector('.gallery-container').style.display = 'none';
  });

  expandDock.addEventListener("mouseleave", function () {
    expandDock.style.display = 'none';
    expandDock.style.opacity = 0;
    setTimeout(function () {
      document.querySelector('.gallery-container').style.display = '';
    }, 350);
  });

  // Slider and main video functionality
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const playButton = document.getElementById("playButton");

  let slideIndex = 0;
  const slides = slider.getElementsByTagName("img");
  const dockSlides = expandDock.getElementsByTagName("img");
  const slideCount = slides.length;
  const slideWidth =
    slides[0].offsetWidth +
    parseInt(getComputedStyle(slides[0]).marginRight);

  function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Event listeners for manual navigation
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Event listener for keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Event listener for thumbnails
  Array.from(slides).forEach((slide) => {
    slide.addEventListener("click", function () {
      const newVideoSrc = this.getAttribute("data-video");
      const newImgSrc = this.getAttribute("src");

      mainVideo.src = newVideoSrc;
      mainVideo.poster = newImgSrc;

      mainVideo.load();
      if (mainVideo.requestFullscreen) {
        mainVideo.requestFullscreen();
      }
      else if (mainVideo.msRequestFullscreen) {
        mainVideo.msRequestFullscreen();
      }
      else if (mainVideo.mozRequestFullScreen) {
        mainVideo.mozRequestFullScreen();
      }
      else if (mainVideo.webkitRequestFullScreen) {
        mainVideo.webkitRequestFullScreen();
      }
      mainVideo.play();
    });
  });


  // dockSlides
  // Event listener for thumbnails
  Array.from(dockSlides).forEach((slide) => {
    slide.addEventListener("click", function () {
      const newVideoSrc = this.getAttribute("data-video");
      const newImgSrc = this.getAttribute("src");

      mainVideo.src = newVideoSrc;
      mainVideo.poster = newImgSrc;

      mainVideo.load();
      if (mainVideo.requestFullscreen) {
        mainVideo.requestFullscreen();
      }
      else if (mainVideo.msRequestFullscreen) {
        mainVideo.msRequestFullscreen();
      }
      else if (mainVideo.mozRequestFullScreen) {
        mainVideo.mozRequestFullScreen();
      }
      else if (mainVideo.webkitRequestFullScreen) {
        mainVideo.webkitRequestFullScreen();
      }
      mainVideo.play();
      expandDock.style.display = 'none';
      document.querySelector('.gallery-container').style.display = '';
    });
  });

  // Video play/pause functionality
  function togglePlay() {
    if (mainVideo.paused) {
      mainVideo.play();
      playButton.style.display = "none";
      mainVideo.style.zIndex = "3333333";
    } else {
      mainVideo.pause();
      playButton.style.display = "block";
      mainVideo.style.zIndex = "3333333";
    }
  }

  playButton.addEventListener("click", togglePlay);
  mainVideo.addEventListener("click", togglePlay);

  mainVideo.addEventListener("play", function () {
    if (mainVideo.requestFullscreen) {
      mainVideo.requestFullscreen();
    }
    else if (mainVideo.msRequestFullscreen) {
      mainVideo.msRequestFullscreen();
    }
    else if (mainVideo.mozRequestFullScreen) {
      mainVideo.mozRequestFullScreen();
    }
    else if (mainVideo.webkitRequestFullScreen) {
      mainVideo.webkitRequestFullScreen();
    }
    mainVideo.play();
    playButton.style.display = "none";
  });

  mainVideo.addEventListener("pause", function () {
    playButton.style.display = "block";
    mainVideo.style.zIndex = "3333333";
  });


  document.getElementById('moreBtn').addEventListener('click', function () {
    document.querySelector('.gallery-container').style.display = 'none';
    expandDock.style.display = 'block';
  });
});