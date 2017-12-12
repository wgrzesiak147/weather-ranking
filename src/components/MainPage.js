import React from 'react';
import {connect} from 'react-redux'
import {loadWeatherInfo} from '../actions/index'
import WeatherRanking from './WeatherRanking'

const MainPage = ({loadWeatherInfo}) => {
    loadWeatherInfo()
    return (
        <WeatherRanking></WeatherRanking>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadWeatherInfo: () => {
            dispatch(loadWeatherInfo())
        }
    }
}

export default connect(null, mapDispatchToProps)(MainPage);