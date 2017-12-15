import axios from 'axios'
import DarkSkyApi from 'dark-sky-api'
// import DarkSkyApi from './dark-sky-api-mock'
import {gradeWeatherConditions} from './grading-service'

const weatherApiKey = '14fc255a14e9937aacbb37702bebd03f'

function getWeatherInfo(location) {
    DarkSkyApi.apiKey = weatherApiKey
    DarkSkyApi.proxy = false
    DarkSkyApi.units = 'si'
    DarkSkyApi.language = 'pl'

    return DarkSkyApi
        .loadForecast({latitude: location.latitude, longitude: location.longitude})
        .then(result => {
            console.log("results: ", result);
            return result
        });
}

const locations = [
    {
        name: "Wroclaw",
        latitude: 51.166672,
        longitude: 16.91667
    }, {
        name: "Sokoliki (Janowice wlk)",
        latitude: 50.87569,
        longitude: 15.92322
    }, {
        name: "Jura pln (Zarki)",
        latitude: 50.082588,
        longitude: 19.35199
    }, {
        name: "Jura pld (Jerzmanowice)",
        latitude: 50.212669,
        longitude: 19.746719
    }, {
        name: "Frankenjura (Bayreuth)",
        latitude: 49.948059,
        longitude: 11.57833
    }
    , {
        name: "Chuilia",
        latitude: 39.656578,
        longitude: -0.890039
    }
]

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
    var results = {
        conditions: gradeWeatherConditions(weather),
        temp: round2Decimals(weather.temperatureHigh),
        claudiness: round2Decimals(weather.cloudCover),
        rain: round2Decimals(weather.precipIntensityMax),
        wind: round2Decimals(weather.windSpeed),
        icon: weather.icon
    }
    return results
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
}