import { Spinner } from './spinner.js';
import { Location } from './location.js';
import { SunriseSunset } from './sunrise-sunset.js';
import { Mode } from './mode.js';
import { Quotes } from './quotes.js';
import { Components } from './components.js';

class App {
    static async init() {
        Spinner.showLoadingSpinner();
        const userLocation = await Location.getUserLocation();
        const sunriseSunsetInfo = await SunriseSunset.getSunriseSunsetInfo(userLocation.coords.latitude, userLocation.coords.longitude);
        const isDayTime = SunriseSunset.isCurrentTimeDayTime(sunriseSunsetInfo.sunrise, sunriseSunsetInfo.sunset);
        isDayTime ? Mode.setMode('light', sunriseSunsetInfo.sunset) : setMode('dark', sunriseSunsetInfo.sunrise);
        const quotes = await Quotes.getAllQuotesFromDatabase();
        const quote = Quotes.getRandomQuote(quotes);
        Quotes.updateQuoteContainerText(quote);
        Spinner.removeLoadingSpinner();

        Components.toggleSwitch.addEventListener('change', () => {
            Mode.toggleMode(event, sunriseSunsetInfo)
        });
        Components.newQuoteBtn.addEventListener('click', () => {
            Quotes.updateQuoteContainerText(Quotes.getRandomQuote(quotes));
        });
        Components.playQuoteBtn.addEventListener('click', () => {
            Quotes.readOutQoute(Components.authorText.innerText, Components.quoteText.innerText);
        });
    }

}
App.init();


