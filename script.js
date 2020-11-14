const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

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

function getAllQuotesFromDatabase() {
    return new Promise(function (resolve, reject) {
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

newQuoteBtn.addEventListener('click', getRandomQuote);

getRandomQuote();