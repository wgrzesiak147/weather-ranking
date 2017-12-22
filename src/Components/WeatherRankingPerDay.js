import React, {Component} from 'react';
import WeatheRow from './WeatherRow'
import {Table} from 'react-bootstrap'

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
            <Table striped bordered condensed hover>
                <thead>
                    <th></th>
                    <th>City</th>
                    <th className="weather-info__icon"></th>
                    <th>Temp [C]</th>
                    <th>Claudiness [%]</th>
                    <th>Rain [mm]</th>
                    <th>Wind [m/s]</th>
                    <th>Conditions</th>
                </thead>
                <tbody>
                    {renderRows}
                </tbody>
            </Table>
        </div>
    )
}

export default WeatherRankingPerDay;