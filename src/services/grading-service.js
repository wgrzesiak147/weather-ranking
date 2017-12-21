export function gradeWeatherConditions(weather) {
    var bestTemp = 18;
    var isCold = weather.temperatureHigh < bestTemp;
    var temperatureGrade = 0.6 * (gradeTemperature(weather.temperatureHigh, bestTemp));
    var rainGrade = 0.3 * (gradeRain(weather.precipIntensityMax));
    var claudinessGrade = 0.05 * (gradeClaudiness(weather.cloudCover, isCold));
    var windGrade = 0.05 * (gradeWind(weather.windSpeed));

    var result = temperatureGrade + rainGrade + claudinessGrade + windGrade
    return round2Decimals(temperatureGrade + rainGrade + claudinessGrade + windGrade);
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
    if (rain === 0) 
        return 10;
    if (rain < 0.1) 
        return 8;
    if (rain < 0.25) 
        return 6;
    if (rain < 0.5) 
        return 4;
    if (rain < 2) 
        return 2;
    return 0;
}

function gradeWind(wind) {
    var result = 10 - wind;
    if (result < 0) 
        return 0;
    return result;
}

function gradeClaudiness(claudiness, isCold) {
    if (isCold) {
        return 10 * (1 - claudiness);
    }

    return 10 * (claudiness);
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
}