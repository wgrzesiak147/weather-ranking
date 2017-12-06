import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadWeatherInfo} from '../actions/index'
import WeatherRankingPerDay from './WeatherRankingPerDay'

const WeatherRanking = ({weatherInfos, loadWeatherInfo}) => {

    const weatherInfosRender = () => {
        let result = []
        for (var key in weatherInfos) {
            result.push(<WeatherRankingPerDay date={key} weatherInfo={weatherInfos[key]}/>)
        }
        return result
    }

    return (
        <div>
            <div>Weather ranking</div>
            <button onClick={loadWeatherInfo}>Load data</button>
            <div>
                {weatherInfosRender()}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadWeatherInfo: () => {
            dispatch(loadWeatherInfo())
        }
    }
}

const mapStateToProps = state => {
    return {weatherInfos: state.weatherInfos}
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherRanking);