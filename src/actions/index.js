//import {getWeatherInfos} from '../services/weather-ranking-service'
import {getWeatherInfos} from '../services/dark-sky-weather-service'

export const SET_WEATHER_INFOS = 'SET_WEATHER_INFOS'

export const loadWeatherInfo = () => {
    return async dispatch => {
        // var weatherInfos = await getWeatherInfos();
        var weatherInfos = await getWeatherInfos()
        dispatch(setWeatherInfos(weatherInfos))

    }
}

export const setWeatherInfos = weatherInfos => {
    return {type: SET_WEATHER_INFOS, weatherInfos: weatherInfos}
}