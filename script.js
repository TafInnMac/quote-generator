const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-id');
const playQuoteBtn = document.getElementById('play-quote');
const modeInfoText = document.querySelector('.mode-info');
const sunriseSunset = {};

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    modeInfoText.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        modeInfoText.hidden = false;
        loader.hidden = true;
    }
}

function setMode(mode, time) {
    // localStorage.setItem('mode', mode);
    toggleIcon.children[0].textContent = `${mode.charAt(0).toUpperCase()}${mode.slice(1)} Mode`;
    document.documentElement.setAttribute('data-mode', mode);
    if (mode === 'dark') {
        toggleSwitch.checked = true;
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
        modeInfoText.children[1].textContent = `Next sunrise is at ${dayjs(time).format('HH:mm:ss')}`;
    } else {
        toggleSwitch.checked = false;
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
        modeInfoText.children[1].textContent = `Next sunset is at ${dayjs(time).format('HH:mm:ss')}`;
    }
}

function toggleMode(event) {
    event.target.checked ? setMode('dark', sunriseSunset.sunrise) : setMode('light', sunriseSunset.sunset);
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

function getSunriseSunsetInfo(lat, long) {
    return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=today&formatted=0`)
        .then(response => {
            if (response.status === 200 && response.status < 300) {
                return response.json();
            } else {
                return response.json()
                    .then(errorData => {
                        throw new Error('Could not get sunrise/sunset info.');
                    });
            }
        }).catch(error => {
            alert(error);
            throw new Error('Something went wrong');
        });
}

function isCurrentTimeDayTime(startDateTime, endDateTime) {
    let currentTime = dayjs().format();
    const isDayTime = dayjs(currentTime).isBetween(startDateTime, endDateTime);
    return isDayTime;
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

async function init() {
    showLoadingSpinner();
    const userLocation = await getUserLocation();
    const sunriseSunsetInfo = await getSunriseSunsetInfo(userLocation.coords.latitude, userLocation.coords.longitude);
    sunriseSunset.sunrise = sunriseSunsetInfo.results.sunrise;
    sunriseSunset.sunset = sunriseSunsetInfo.results.sunset;
    const isDayTime = isCurrentTimeDayTime(sunriseSunset.sunrise, sunriseSunset.sunset);
    if (isDayTime) {
        setMode('light', sunriseSunset.sunset);
    } else {
        setMode('dark', sunriseSunset.sunrise);
    }
    const quote = await getRandomQuote();
    updateQuoteContainerText(quote);
    removeLoadingSpinner();

    // getUserLocation()
    //     .then(location => {
    //         getSunriseSunsetInfo(location.coords.latitude, location.coords.longitude)
    //             .then(info => {
    //                 sunriseSunset.sunrise = info.results.sunrise;
    //                 sunriseSunset.sunset = info.results.sunset;
    //                 const isDayTime = isCurrentTimeDayTime(info.results.sunrise, info.results.sunset);
    //                 if (isDayTime) {
    //                     setMode('light', info.results.sunset);
    //                 } else {
    //                     setMode('dark', info.results.sunrise);
    //                 }
    //                 getRandomQuote()
    //                     .then(quote => {
    //                         updateQuoteContainerText(quote);
    //                         removeLoadingSpinner();
    //                     });
    //             });
    //     });
}

init();


