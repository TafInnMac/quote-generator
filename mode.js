/* eslint-disable no-undef */
import { Components } from './components.js';

export class Mode {
    static setMode(mode, time) {
        Components.toggleIcon.children[0].textContent = `${mode.charAt(0).toUpperCase()}${mode.slice(1)} Mode`;
        document.documentElement.setAttribute('data-mode', mode);
        if (mode === 'dark') {
            Components.toggleSwitch.checked = true;
            Components.toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
            Components.modeInfoText.children[1].textContent = `Next sunrise is at ${dayjs(time).format('HH:mm:ss')}`;
        } else {
            Components.toggleSwitch.checked = false;
            Components.toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
            Components.modeInfoText.children[1].textContent = `Next sunset is at ${dayjs(time).format('HH:mm:ss')}`;
        }
    }

    static toggleMode(event, sunriseSunsetInfo) {
        event.target.checked ? Mode.setMode('dark', sunriseSunsetInfo.sunrise) : Mode.setMode('light', sunriseSunsetInfo.sunset);
    }

}