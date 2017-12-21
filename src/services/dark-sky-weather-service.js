import axios from 'axios'
import DarkSkyApi from 'dark-sky-api'
// import DarkSkyApi from './dark-sky-api-mock'
import {gradeWeatherConditions} from './grading-service'
import {locations} from './locations'

const weatherApiKey = '14fc255a14e9937aacbb37702bebd03f'

function getWeatherInfo(location) {
    DarkSkyApi.apiKey = weatherApiKey
    DarkSkyApi.proxy = false
    DarkSkyApi.units = 'si'
    DarkSkyApi.language = 'pl'

    return DarkSkyApi
        .loadForecast({latitude: location.latitude, longitude: location.longitude})
        .then(result => {
            return result
        });
}

export async function getWeatherInfos() {
    var weatherByDate = {}
    for (var i = 0; i < locations.length; i++) {

        var weatherInfo = await getWeatherInfo(locations[i])

        for (var w = 0; w < weatherInfo.daily.data.length; w++) {
            var currentWeatherInLocation = weatherInfo.daily.data[w];

            if (weatherByDate[currentWeatherInLocation.dateTime._d] === undefined) {
                weatherByDate[currentWeatherInLocation.dateTime._d] = []
            }
            weatherByDate[currentWeatherInLocation.dateTime._d].push({city: locations[i].name, weather: CreateWeatherViewModel(currentWeatherInLocation)});
        }
    }
    SortWeathersByConditions(weatherByDate)
    return weatherByDate;
}

function SortWeathersByConditions(weatherByDate) {
    for (var key in weatherByDate) {
        weatherByDate[key].sort((a, b) => {
            return b.weather.conditions - a.weather.conditions
        })
    }
}

function CreateWeatherViewModel(weather) {
    var icon = weather
        .icon
        .replaceAll("-", "_");
    var results = {
        conditions: gradeWeatherConditions(weather),
        temp: round2Decimals(weather.temperatureHigh),
        claudiness: round2Decimals(weather.cloudCover * 100),
        rain: round2Decimals(weather.precipIntensityMax),
        wind: round2Decimals(weather.windSpeed),
        icon: icon.toUpperCase()
    }
    return results
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};