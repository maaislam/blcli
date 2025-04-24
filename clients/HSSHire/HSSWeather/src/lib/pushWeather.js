const pushWeather = (weather) => {
    window.dataLayer.push({
        'event' : 'weather',
        'weather': weather
    });
}

export default pushWeather;