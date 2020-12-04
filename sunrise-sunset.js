export class SunriseSunset {
     static async getSunriseSunsetInfo(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today&formatted=0`);
            return response.data.results;
        } catch (error) {
            alert(error.message);
        }
    }

    static isCurrentTimeDayTime(startDateTime, endDateTime) {
        let currentTime = dayjs().format();
        const isDayTime = dayjs(currentTime).isBetween(startDateTime, endDateTime);
        return isDayTime;
    }
}