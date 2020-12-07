import { Components } from '../app/components.js';

export class Mode {
    static setMode(mode, time) {
        Components.updateModeWrapper(mode, time);
    }

    static toggleMode(event, sunriseSunsetInfo) {
        event.target.checked ? Mode.setMode('dark', sunriseSunsetInfo.sunrise) : Mode.setMode('light', sunriseSunsetInfo.sunset);
    }

}