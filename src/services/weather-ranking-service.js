import axios from 'axios'
import {locations} from './locations'

export async function getWeatherInfos() {
    var weatherByDate = {}
    for (var i in locations) {
        var weatherInfo = await getWeatherInfo(locations[i].id)
        for (var w = 0; w < weatherInfo.weather.length; w++) {
            var currentWeatherInLocation = weatherInfo.weather[w];

            if (weatherByDate[currentWeatherInLocation.date] === undefined) {
                weatherByDate[currentWeatherInLocation.date] = []
            }
            weatherByDate[currentWeatherInLocation.date].push({city: weatherInfo.city, weather: currentWeatherInLocation});
        }
    }
    SortWeathersByConditions(weatherByDate);
    return weatherByDate;
}

function getWeatherInfo(cityId) {
    return axios
        .get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=129b9ad79655badd65547452fc6322a3`)
        .then(response => {
            return groupWeatherByDay(response.data)
        })
}

function SortWeathersByConditions(weatherByDate) {
    for (var key in weatherByDate) {
        weatherByDate[key].sort((a, b) => {
            return b.weather.conditions - a.weather.conditions
        })
    }
}

function groupWeatherByDay(data) {
    var results = {
        city: data.city.name,
        weather: []
    };
    var date = "";
    var bestConditions;

    for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].sys.pod !== 'd') 
            continue;
        var currentWeather = data.list[i];
        var currentDate = currentWeather
            .dt_txt
            .substring(0, 10);
        var currentConditions = gradeWeatherConditions(currentWeather);
        if (date !== currentDate) {
            date = currentDate;
            bestConditions = currentConditions;
            results
                .weather
                .push({
                    date: date,
                    conditions: bestConditions,
                    temp: kelvinToCelcius(currentWeather.main.temp),
                    claudiness: currentWeather.clouds["all"],
                    rain: getRainValue(currentWeather.rain),
                    wind: currentWeather.wind.speed,
                    icon: currentWeather.weather[0].icon
                })

        } else {
            if (currentConditions > bestConditions) {
                bestConditions = currentConditions;
                results.weather[results.weather.length - 1] = {
                    date: currentDate,
                    conditions: bestConditions,
                    temp: kelvinToCelcius(currentWeather.main.temp),
                    claudiness: currentWeather.clouds["all"],
                    rain: getRainValue(currentWeather.rain),
                    wind: currentWeather.wind.speed,
                    icon: currentWeather.weather[0].icon
                }
            }
        }
    }
    return results;
}

function getRainValue(rain) {
    if (rain === undefined) 
        return 0;
    if (Object.keys(rain).length === 0 && rain.constructor === Object) {
        return 0;
    }
    return round2Decimals(rain['3h'])
}

function gradeWeatherConditions(weather) {
    var bestTemp = 18;

    var temperature = kelvinToCelcius(weather.temperatureHigh);
    var temparaureGrade = 0.5 * (gradeTemperature(temperature, bestTemp));
    var rainGrade = 0.3 * (gradeRain(weather.precipIntensityMax));
    var claudinessGrade = 0.1 * (gradeClaudiness(weather.cloudCover));
    var windGrade = 0.1 * (gradeWind(weather.windSpeed));

    if (temperature < bestTemp) 
        claudinessGrade *= -1;
    
    if (temperature < bestTemp) 
        windGrade *= -1;
    
    return round2Decimals(temparaureGrade + rainGrade + claudinessGrade + windGrade);
}

function gradeTemperature(temparaure, bestTemp) {

    var tempRatio = bestTemp - temparaure;
    var absoluteRatio = Math.abs(tempRatio);
    var result = round2Decimals(10 - absoluteRatio / 1.8);

    if (result < 0) 
        return 0;
    return result;
}

function gradeRain(rain) {
    if (rain === undefined) 
        return 10;
    if (rain["3h"] === undefined) 
        return 10;
    if (rain["3h"] === 0) 
        return 10;
    if (rain["3h"] < 0.1) 
        return 8;
    if (rain["3h"] < 0.25) 
        return 6;
    if (rain["3h"] < 0.5) 
        return 4;
    if (rain["3h"] < 2) 
        return 2;
    return 0;
}

function gradeWind(wind) {
    var absoluteRatio = wind.speed;
    var result = round2Decimals(10 - absoluteRatio / 6);

    if (result < 0) 
        return 0;
    return result;
}

function gradeClaudiness(claudiness) {

    if (claudiness["all"] < 0.1) 
        return 10;
    if (claudiness["all"] < 0.2) 
        return 8;
    if (claudiness["all"] < 0.4) 
        return 6;
    if (claudiness["all"] < 0.6) 
        return 4;
    if (claudiness["all"] < 0.8) 
        return 2;
    return 0;
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
}