const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-id');

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
    showLoadingSpinner();
    getAllQuotesFromDatabase().then((quotes) => {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        randomQuote = quotes[randomIndex];
        removeLoadingSpinner();

        authorText.innerText = randomQuote.author;
        if (randomQuote.quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = randomQuote.quote;
    });
}

function checkLocalStorageTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            setTheme(currentTheme);
        }
    }
}

toggleSwitch.addEventListener('change', switchTheme);
newQuoteBtn.addEventListener('click', getRandomQuote);

checkLocalStorageTheme();
getRandomQuote();