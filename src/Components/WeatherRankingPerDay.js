import React, {Component} from 'react';
import WeatheRow from './WeatherRow'
import {Table} from 'react-bootstrap'
import MediaQuery from 'react-responsive';

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
        <div>
            <MediaQuery minWidth={361} className="weather-info-block">
                        <div className="weather-info-block">
                            <div className="weather-info-date">{parseDate(dateTime)}</div>
                            <Table striped bordered condensed hover>
                                <thead>
                                    <th></th>
                                    <th>City</th>
                                    <th className="weather-info__icon"></th>
                                    <th>Temp [C]</th>
                                    <th>Claudiness
                                        [%]</th> 
                                    <th>Rain [mm]</th> 
                                    <th>Wind [m/s]</th> 
                                    <th>Conditions</th> 
                                </thead>
                                <tbody> 
                                {renderRows} 
                                </tbody> 
                            </Table> 
                        </div> 
                </MediaQuery>
                <MediaQuery maxWidth={360} className="weather-info-block-small">
                        <div className="weather-info-block">
                            <div className="weather-info-date">{parseDate(dateTime)}</div>
                            <Table bordered hover>
                                <thead>
                                    <th></th>
                                    <th>City</th>
                                    <th className="weather-info__icon"></th>
                                    <th>Temp [C]</th>
                                    <th>Claudiness
                                        [%]</th> 
                                    <th>Rain [mm]</th> 
                                    <th>Wind [m/s]</th> 
                                    <th>Conditions</th> 
                                </thead>
                                <tbody> 
                                {renderRows} 
                                </tbody> 
                            </Table> 
                        </div> 
                </MediaQuery>
        </div> 
    )
}

function parseDate(datetime) {
    let day = datetime.getDate();
    
    if(day < 10) {
        day ='0' + day;
    }

    let month = datetime.getMonth() +1;
    
    if(month < 10) {
        month = '0' + month;
    }

    return days[datetime.getDay()] + ' ' + day +'.'+ month+'.'+ datetime.getFullYear();
}

export default WeatherRankingPerDay;