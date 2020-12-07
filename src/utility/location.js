export class Location {
    static getUserLocation() {
        let userCoordinatesPromise = new Promise((resolve, reject) => {
            try {
                navigator.geolocation.getCurrentPosition(locationData => {
                    resolve(locationData)
                }, () => {
                    let fallbackLocation = { coords: { latitude: '53.4808', longitude: '2.2426' } };
                    resolve(fallbackLocation);
                });
            } catch (error) {
                reject(new Error("Could not get user location!"));
            }
        })
        return userCoordinatesPromise;
    }
}