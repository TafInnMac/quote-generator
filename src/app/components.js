import dayjs from 'dayjs';

export class Components {
    static quoteContainer = document.getElementById('quote-container');
    static quoteText = document.getElementById('quote');
    static authorText = document.getElementById('author');
    static newQuoteBtn = document.getElementById('new-quote');
    static loader = document.getElementById('loader');
    static toggleSwitch = document.querySelector('input[type="checkbox"]');
    static toggleIcon = document.getElementById('toggle-id');
    static playQuoteBtn = document.getElementById('play-quote');
    static modeInfoText = document.querySelector('.mode-info');

    static updateQuoteContainerText(randomQuote) {
        Components.authorText.innerText = randomQuote.author;
        if (randomQuote.quote.length > 120) {
            Components.quoteText.classList.add('long-quote');
        } else {
            Components.quoteText.classList.remove('long-quote');
        }
        Components.quoteText.innerText = randomQuote.quote;
    }

    static updateModeWrapper(mode, time) {
        Components.toggleIcon.children[0].textContent = `${mode.charAt(0).toUpperCase()}${mode.slice(1)} Mode`;
        document.documentElement.setAttribute('data-mode', mode);
        if (mode === 'dark') {
            Components.toggleSwitch.checked = true;
            Components.toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
            Components.modeInfoText.children[1].textContent = `Next sunrise is at ${dayjs(time).format('HH:mm:ss')}`;
        } else {
            Components.toggleSwitch.checked = false;
            Components.toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
            Components.modeInfoText.children[1].textContent = `Next sunset is at ${dayjs(time).format('HH:mm:ss')}`;
        }
    }
}