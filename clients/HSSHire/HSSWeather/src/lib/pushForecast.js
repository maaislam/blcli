const pushForecast = (weather) => {
    window.dataLayer.push({
        'event' : 'forecast_weather',
        'forecast': weather
    });
}

export default pushForecast;
