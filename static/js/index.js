window.HELP_IMPROVE_VIDEOJS = false;


// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// Music comparison table functionality
function setupMusicComparisonTable() {
    const musicData = [
        {id: 158, prompt: "V: 2.10, A: 3.60 - anxious"},
        {id: 253, prompt: "V: 6.60, A: 2.50 - affectionate"},
        {id: 360, prompt: "V: 2.50, A: 5.50 - rage"},
        {id: 379, prompt: "V: 1.90, A: 2.90 - frustrated"},
        {id: 456, prompt: "V: 6.10, A: 2.30 - affectionate"},
        {id: 685, prompt: "V: 4.50, A: 3.60 - joyful"},
        {id: 739, prompt: "V: 6.20, A: 6.90 - thrilled"},
        {id: 831, prompt: "V: 5.20, A: 6.20 - thrilled"},
        {id: 833, prompt: "V: 5.00, A: 5.80 - thrilled"},
        {id: 1021, prompt: "V: 6.20, A: 4.80 - thrilled"},
        {id: 1034, prompt: "V: 3.30, A: 2.80 - moved"},
        {id: 1107, prompt: "V: 3.00, A: 3.20 - stirred"},
        {id: 1133, prompt: "V: 5.00, A: 2.40 - affectionate"},
        {id: 1182, prompt: "V: 2.70, A: 2.20 - melancholy"},
        {id: 1373, prompt: "V: 6.60, A: 5.70 - thrilled"},
        {id: 1539, prompt: "V: 4.40, A: 4.70 - triumphant"},
        {id: 1633, prompt: "V: 6.50, A: 6.30 - thrilled"},
        {id: 1639, prompt: "V: 5.30, A: 5.30 - thrilled"},
        {id: 1932, prompt: "V: 4.80, A: 6.00 - thrilled"},
        {id: 1994, prompt: "V: 3.80, A: 3.50 - elated"}
    ];

    const tableBody = document.getElementById('music-table-body');
    if (!tableBody) return;

    musicData.forEach(item => {
        const row = document.createElement('tr');

        // Prompt column
        const promptCell = document.createElement('td');
        promptCell.textContent = item.prompt;
        promptCell.className = 'prompt-cell';
        row.appendChild(promptCell);

        // Audio player columns for each system
        const systems = ['gt', 'emotion_text_prompting', 'ce_finetuning', 'laragen'];
        systems.forEach(system => {
            const audioCell = document.createElement('td');

            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.preload = 'metadata';
            audioPlayer.style.width = '100%';
            audioPlayer.style.minWidth = '200px';
            audioPlayer.style.maxWidth = '250px';

            const source = document.createElement('source');
            source.src = `./static/wavs/${system}/${item.id}.wav`;
            source.type = 'audio/wav';

            audioPlayer.appendChild(source);
            audioCell.appendChild(audioPlayer);
            row.appendChild(audioCell);
        });

        tableBody.appendChild(row);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Setup music comparison table
    setupMusicComparisonTable();

})
