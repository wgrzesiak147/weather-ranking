import React, {Component} from 'react';
import Skycons from 'react-skycons'
import MediaQuery from 'react-responsive';

const WeatherRow = ({index, weatherRow}) => {
    const imageSource = `/img/${weatherRow.weather.icon}.png`
    return (
        <tr>
            <td>{(index + 1)}.</td>
            <td>{weatherRow.city}</td>
            <MediaQuery maxWidth={360}>
                <td className="weather-info__icon-small">
                    <Skycons color='black' icon={weatherRow.weather.icon} autoplay={true}/>
                </td>
            </MediaQuery>
            <MediaQuery minWidth={361}>
                    <div ><Skycons color='black' icon={weatherRow.weather.icon} autoplay={true}/></div>
            </MediaQuery>
            <td>{weatherRow.weather.temp}
            </td>
            <td>{weatherRow.weather.claudiness}</td>
            <td>{weatherRow.weather.rain}</td>
            <td>{weatherRow.weather.wind}</td>
            <td
                className={weatherRow.weather.conditions < 5
                ? "weather-info__conditions-low"
                : "weather-info__conditions-high"}>{weatherRow.weather.conditions}</td>
        </tr>
    )
}

export default WeatherRow;