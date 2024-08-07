        document.addEventListener("DOMContentLoaded", function () {
        const videoGallery = document.getElementById("videoGallery");
        const mainVideo = document.getElementById("myVideo");
        const videoPlayer = document.getElementById("videoPlayer");

        let isMouseOverGallery = false;

        // Show video gallery and shrink main video on mouse move to bottom
        document.addEventListener("mousemove", function (event) {
          const y = event.clientY || event.pageY;
          const windowHeight = window.innerHeight;
          if (y > windowHeight - 100) {
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

        // Slider and main video functionality
        const slider = document.getElementById("slider");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const playButton = document.getElementById("playButton");

        let slideIndex = 0;
        const slides = slider.getElementsByTagName("img");
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
            mainVideo.src = newVideoSrc;
            mainVideo.load();
            mainVideo.play();
            // Worked here
            mainVideo.style.height = "92vh";  
            mainVideo.style.width = "1520px";  
            mainVideo.style.marginTop = "-90px";  
            mainVideo.style.marginLeft = "0px";  
            mainVideo.style.marginRight = "0px";  
            mainVideo.style.PaddingRight = "100px";  
            mainVideo.style.zIndex = "3333333";  
            mainVideo.style.backgroundColor = "black";
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
          playButton.style.display = "none";
          mainVideo.style.zIndex = "3333333";  
          mainVideo.style.width = "1560px";
          mainVideo.style.maxWidth= "1520px";
            
          mainVideo.style.height = "93vh";  
          mainVideo.style.marginTop = "-90px";  
          mainVideo.style.marginLeft = "-130px";  
          mainVideo.style.paddingRight = "0px";  
          mainVideo.style.background = "black";  
        });

        mainVideo.addEventListener("pause", function () {
          playButton.style.display = "block";
          mainVideo.style.zIndex = "3333333";  
        });
      });