import { Components } from '../app/components.js';

export class Spinner {
    static showLoadingSpinner() {
        Components.loader.hidden = false;
        Components.quoteContainer.hidden = true;
        Components.modeInfoText.hidden = true;
    }

    static removeLoadingSpinner() {
        if (!Components.loader.hidden) {
            Components.quoteContainer.hidden = false;
            Components.modeInfoText.hidden = false;
            Components.loader.hidden = true;
        }
    }
}