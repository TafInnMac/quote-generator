import { Components } from './components.js';

export class Quotes {
    static getAllQuotesFromDatabase() {
        const quotePromise = new Promise((resolve, reject) => {
            try {
                ref.on("value", function (snapshot) {
                    const array = [];
                    const childData = snapshot.val();
                    for (const key in childData) {
                        if (childData.hasOwnProperty(key)) {
                            const obj = childData[key];
                            array.push(obj);
                        }
                    }
                    resolve(array);
                })
            } catch (error) {
                reject(new Error("No quotes found"));
            }
        })
        return quotePromise;
    }

    static getRandomQuote(quotes) {
        // let randomQuotePromise = new Promise((resolve, reject) => {
            // try {
                // getAllQuotesFromDatabase()
                //     .then((quotes) => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                // resolve(randomQuote);
                // });
            // } catch (error) {
                // reject(new Error("Could not get random quote"));
            // }
        // })
        return randomQuote;
    }

    static updateQuoteContainerText(randomQuote) {
        Components.authorText.innerText = randomQuote.author;
        if (randomQuote.quote.length > 120) {
            Components.quoteText.classList.add('long-quote');
        } else {
            Components.quoteText.classList.remove('long-quote');
        }
        Components.quoteText.innerText = randomQuote.quote;
    }

    static readOutQoute(author, quote) {
        let hl, v, r;
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
}