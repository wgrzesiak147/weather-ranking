import React, {Component} from 'react';
import WeatheRow from './WeatherRow'

var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const WeatherRankingPerDay = ({date, weatherInfo}) => {
    const renderRows = weatherInfo.map((weatherRow, index) => {
        return <WeatheRow index={index} key={index} weatherRow={weatherRow}/>
    })

    const dateTime = new Date(date)
    return (
        <div className="weather-info-block">
            <div className="weather-info-date">{days[dateTime.getDay()]} {dateTime.getDate()}.{dateTime.getMonth()}.{dateTime.getFullYear()}</div>
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