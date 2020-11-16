const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-id');
const playQuoteBtn = document.getElementById('play-quote');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function setMode(mode) {
    localStorage.setItem('mode', mode);
    toggleIcon.children[0].textContent = `${mode.charAt(0).toUpperCase()}${mode.slice(1)} Mode`;
    document.documentElement.setAttribute('data-mode', mode);
    if (mode === 'dark') {
        toggleSwitch.checked = true;
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    } else {
        toggleSwitch.checked = false;
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    }
}

function toggleMode(event) {
    event.target.checked ? setMode('dark') : setMode('light');
}

function getUserLocation() {
    let userCoordinatesPromise = new Promise((resolve, reject) => {
        try {
            navigator.geolocation.getCurrentPosition(locationData => {
                resolve(locationData)
            }, () => {
                let fallbackLocation = { coords: { latitude: '53.4808', longitude: '2.2426' } };
                resolve(fallbackLocation);
            });
        } catch (error) {
            reject("Could not get user location!", error);
        }
    })
    return userCoordinatesPromise;
}

function isCurrentTimeDayTime(startDateTime, endDateTime) {
    let currentTime = dayjs().format();
    const isDayTime = dayjs(currentTime).isBetween(startDateTime, endDateTime);
}

function getAllQuotesFromDatabase() {
    const quotePromise = new Promise((resolve, reject) => {
        try {
            ref.on("value", function (snapshot) {
                const array = [];
                let childData = snapshot.val();
                for (let key in childData) {
                    if (childData.hasOwnProperty(key)) {
                        let obj = childData[key];
                        array.push(obj);
                    }
                }
                resolve(array);
            })
        } catch (error) {
            reject("No quotes found", error);
        }
    })
    return quotePromise;
}

function getRandomQuote() {
    let randomQuotePromise = new Promise((resolve, reject) => {
        try {
            getAllQuotesFromDatabase()
                .then((quotes) => {
                    let randomIndex = Math.floor(Math.random() * quotes.length);
                    let randomQuote = quotes[randomIndex];
                    resolve(randomQuote);
                });
        } catch (error) {
            reject("Could not get random quote", error);
        }
    })
    return randomQuotePromise;
}

function updateQuoteContainerText(randomQuote) {
    authorText.innerText = randomQuote.author;
    if (randomQuote.quote.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = randomQuote.quote;
}

function readOutQoute(author, quote) {
    switch (author) {
        case 'Chris': {
            hl = 'bg-bg';
            v = 'Dimo';
            r = 0;
            break;
        }
        case 'Osama': {
            hl = 'en-in';
            v = 'Ajit';
            r = 0;
            break;
        }
        case 'Sean': {
            hl = 'en-ie';
            v = 'Oran';
            r = 5;
            break;
        }
        case 'Safa': {
            hl = 'en-us';
            v = 'Mike';
            r = 0;
            break;
        }
        case 'Mehdi': {
            hl = 'en-in';
            v = 'Ajit';
            r = 0;
            break;
        }
        case 'Hamdi': {
            hl = 'en-in';
            v = 'Ajit';
            r = 0;
            break;
        }
        case 'Sarfraz': {
            hl = 'ar-sa';
            v = 'Salim';
            r = 0;
            break;
        }
        case 'Sean Adams': {
            hl = 'en-au';
            v = 'Jack';
            r = 0;
            break;
        }
        default: {
            hl = 'en-gb';
            v = 'Harry'
            r = 0;
            break;
        }
    }

    VoiceRSS.speech({
        key: key,
        src: quote,
        hl: hl,
        v: v,
        r: r,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// function checkLocalStorageTheme() {
//     const currentTheme = localStorage.getItem('theme');
//     if (currentTheme) {
//         document.documentElement.setAttribute('data-theme', currentTheme);
//         if (currentTheme === 'dark') {
//             toggleSwitch.checked = true;
//             setTheme(currentTheme);
//         }
//     }
// }

toggleSwitch.addEventListener('change', toggleMode);
newQuoteBtn.addEventListener('click', () => {
    getRandomQuote()
        .then(quote => {
            updateQuoteContainerText(quote);
        })
});
playQuoteBtn.addEventListener('click', () => {
    readOutQoute(authorText.innerText, quoteText.innerText);
});

function getSunriseSunsetInfo(lat, long) {
    const sunriseSunsetInfoPromise = new Promise((resolve, reject) => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=today&formatted=0`);
            xhr.send();
            xhr.onload = () => {
                const data = JSON.parse(xhr.response);
                resolve(data);
            }
        } catch (error) {
            reject("Could not get sunrise/sunset info", error);
        }
    })
    return sunriseSunsetInfoPromise;
}

function init() {
    showLoadingSpinner();
    getUserLocation()
        .then(location => {
            getSunriseSunsetInfo(location.coords.latitude, location.coords.longitude)
                .then(info => {
                    const isDayTime = isCurrentTimeDayTime(info.results.sunrise, info.results.sunset);
                    if (isDayTime) {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                    getRandomQuote()
                        .then(quote => {
                            updateQuoteContainerText(quote);
                            removeLoadingSpinner();
                        });
                });
        });
}

init();


