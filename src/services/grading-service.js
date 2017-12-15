export function gradeWeatherConditions(weather) {
    var bestTemp = 18;
    var temperatureGrade = 0.5 * (gradeTemperature(weather.temperatureHigh, bestTemp));
    var rainGrade = 0.3 * (gradeRain(weather.precipIntensityMax));
    var claudinessGrade = 0.1 * (gradeClaudiness(weather.cloudCover));
    var windGrade = 0.1 * (gradeWind(weather.windSpeed));

    if (weather.temperatureHigh > bestTemp) 
        claudinessGrade *= -1;
    
    if (weather.temperatureHigh > bestTemp) 
        windGrade *= -1;
    
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
    var absoluteRatio = wind;
    var result = round2Decimals(10 - absoluteRatio / 6);

    if (result < 0) 
        return 0;
    return result;
}

function gradeClaudiness(claudiness) {

    if (claudiness < 0.1) 
        return 10;
    if (claudiness < 0.2) 
        return 8;
    if (claudiness < 0.4) 
        return 6;
    if (claudiness < 0.6) 
        return 4;
    if (claudiness < 0.8) 
        return 2;
    return 0;
}

function round2Decimals(number) {
    return Math.round(number * 100) / 100;
}