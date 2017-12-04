import React, {Component} from 'react';
import {connect} from 'react-redux'
import {changeText} from '../actions/index'

const WeatherRanking = ({text, changeText}) => {
    return (
        <div>
            <div>Weather ranking {text}</div>
            <button onClick={changeText.bind(this, "123")}>Change text</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeText: text => {
            dispatch(changeText(text))
        }
    }
}

const mapStateToProps = state => {
    return {text: state.text}
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherRanking);