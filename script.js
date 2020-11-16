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

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    toggleIcon.children[0].textContent = `${theme.charAt(0).toUpperCase()}${theme.slice(1)} Mode`;
    if (theme === 'dark') {
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    } else {
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    }
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setTheme('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        setTheme('light');
    }
}

function getUserLocation() {
    let userCorodinates = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(locationData => {
            resolve(locationData)
        }, () => {
            let fallbackLocation = { coords: {latitude: '53.4808', longitude: '2.2426' }};
            resolve(fallbackLocation);
        });
    })
    return userCorodinates;
}

function checkCurrentTime(startDateTime, endDateTime) {
    let currentTime = dayjs().format();
    const between = dayjs(currentTime).isBetween(startDateTime, endDateTime);
    return between;
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
            reject("No quote found", error);
        }
    })
    return quotePromise;
}

function getRandomQuote() {
    // showLoadingSpinner();
    let randomQuotePromise = new Promise((resolve, reject) => {
        getAllQuotesFromDatabase().then((quotes) => {
            let randomIndex = Math.floor(Math.random() * quotes.length);
            randomQuote = quotes[randomIndex];

            resolve(randomQuote);
        });
    })
    return randomQuotePromise;
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

toggleSwitch.addEventListener('change', switchTheme);
newQuoteBtn.addEventListener('click', getRandomQuote);
playQuoteBtn.addEventListener('click', () => {
    readOutQoute(authorText.innerText, quoteText.innerText);
});

function getSunriseSunsetInfo(lat, long) {
    const deets = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=today&formatted=0`);
        xhr.send();
        xhr.onload = () => {
            const data = JSON.parse(xhr.response);
            resolve(data);
        }
    })
    return deets;
}

showLoadingSpinner();
getUserLocation().then(location => {
    getSunriseSunsetInfo(location.coords.latitude, location.coords.longitude).then(info => {
        const isDayTime = checkCurrentTime(info.results.sunrise, info.results.sunset);
        if (isDayTime) {
            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light');
            toggleSwitch.checked = false;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark');
            toggleSwitch.checked = true;
        }
        getRandomQuote().then(quote => {
            authorText.innerText = quote.author;
            if (randomQuote.quote.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
            quoteText.innerText = quote.quote;
            removeLoadingSpinner();
        });
    });
});

