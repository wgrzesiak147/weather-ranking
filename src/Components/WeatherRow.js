import React, {Component} from 'react';

const WeatherRow = ({index, weatherRow}) => {
    const imageSource = `../img/${weatherRow.weather.icon}.png`
    return (
        <tr>
            <td>{(index + 1)}</td>
            <td>{weatherRow.city}</td>
            <td>
                yo
                <image src={imageSource}></image>
            </td>
            <td>{weatherRow.weather.temp}</td>
            <td>{weatherRow.weather.claudiness}</td>
            <td>{weatherRow.weather.claudiness}</td>
            {/* {weatherRow.weather.rain} */}
            <td>{weatherRow.weather.wind}</td>
            <td>{weatherRow.weather.conditions}</td>
        </tr>
    )
}

export default WeatherRow;