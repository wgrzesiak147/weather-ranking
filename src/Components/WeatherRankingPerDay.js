import React, {Component} from 'react';
import WeatheRow from './WeatherRow'

const WeatherRankingPerDay = ({date, weatherInfo}) => {
    console.log("weather info: ", weatherInfo)
    const renderRows = weatherInfo.map((weatherRow, index) => {
        return <WeatheRow index={index} key={index} weatherRow={weatherRow}/>
    })

    return (
        <div>
            <div className="weather-info-date">{date}</div>
            <table className="weather-info-table">
                <thead>
                    <th></th>
                    <th>City</th>
                    <th></th>
                    <th>Temp</th>
                    <th>Claudiness</th>
                    <th>Rain</th>
                    <th>Wind</th>
                    <th>Conditions</th>
                </thead>
                <tbody>
                    {renderRows}
                </tbody>
            </table>
        </div>
    )
}

export default WeatherRankingPerDay;