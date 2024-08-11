document.addEventListener('DOMContentLoaded', () => {
    const imagesContainer = document.getElementById('images-container');
    const verifyButton = document.getElementById('verify-button');
    const resultText = document.getElementById('captcha-result');

    const images = [
        { src: 'https://i.ibb.co/mqh8Kg6/t-1.png', isTrump: true },
        { src: 'https://i.ibb.co/J2XS78h/t-2.png', isTrump: false },
        { src: 'https://i.ibb.co/5Y2Z5k3/t-3.png', isTrump: false },
        { src: 'https://i.ibb.co/sCK4FZg/t-4.png', isTrump: true },
        { src: 'https://i.ibb.co/rsV8gNT/t-5.png', isTrump: false },
        { src: 'https://i.ibb.co/DCGmPq0/t-6.png', isTrump: false },
        { src: 'https://i.ibb.co/TB8CJfB/t-7.png', isTrump: true },
        { src: 'https://i.ibb.co/hdXrf7R/t-8.png', isTrump: false },
        { src: 'https://i.ibb.co/hFLCcX4/t-9.png', isTrump: false }
    ];



    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.dataset.isTrump = image.isTrump;
        // imgElement.style.margin = "10px";
        imgElement.style.width = "115px";
        imgElement.style.height = "90px";
        imgElement.addEventListener('click', () => {
            imgElement.classList.toggle('selected');
        });
        imagesContainer.appendChild(imgElement);
        
    });

    verifyButton.addEventListener('click', () => {
        const selectedImages = document.querySelectorAll('#images-container img.selected');
        let correctSelections = true;

        selectedImages.forEach(img => {
            if (img.dataset.isTrump === 'false') {
                correctSelections = false;
            }
        });

        const allTrumpImages = Array.from(document.querySelectorAll('#images-container img'))
            .filter(img => img.dataset.isTrump === 'true');

        if (correctSelections && selectedImages.length === allTrumpImages.length) {
            resultText.textContent = 'CAPTCHA passed!';
            resultText.style.color = 'green';
            alert("Congratulations! You are human!")
            window.location.href = 'successful.html';
        } else {
            resultText.textContent = 'CAPTCHA failed. Try again.';
            resultText.style.color = 'red';
            window.location.reload();
        }
    });
});
