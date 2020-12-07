import { Spinner } from './utility/spinner.js';
import { Location } from './utility/location.js';
import { SunriseSunset } from './utility/sunrise-sunset.js';
import { Mode } from './utility/mode.js';
import { Quotes } from './utility/quotes.js';
import { Components } from './app/components.js';
import regeneratorRuntime from "regenerator-runtime";

class App {
    static async init() {
        Spinner.showLoadingSpinner();
        const userLocation = await Location.getUserLocation();
        const sunriseSunsetInfo = await SunriseSunset.getSunriseSunsetInfo(userLocation.coords.latitude, userLocation.coords.longitude);
        const isDayTime = SunriseSunset.isCurrentTimeDayTime(sunriseSunsetInfo.sunrise, sunriseSunsetInfo.sunset);
        isDayTime ? Mode.setMode('light', sunriseSunsetInfo.sunset) : Mode.setMode('dark', sunriseSunsetInfo.sunrise);
        const quotes = await Quotes.getAllQuotesFromDatabase();
        const quote = Quotes.getRandomQuote(quotes);
        Components.updateQuoteContainerText(quote);
        Spinner.removeLoadingSpinner();

        Components.toggleSwitch.addEventListener('change', () => {
            Mode.toggleMode(event, sunriseSunsetInfo);
        });
        Components.newQuoteBtn.addEventListener('click', () => {
            Components.updateQuoteContainerText(Quotes.getRandomQuote(quotes));
        });
        Components.playQuoteBtn.addEventListener('click', () => {
            Quotes.readOutQoute(Components.authorText.innerText, Components.quoteText.innerText);
        });
    }

}
App.init();


