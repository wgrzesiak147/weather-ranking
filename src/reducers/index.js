function weatherRanking(state = [], action) {
    switch (action.type) {
        case 'SET_WEATHER_INFOS':
            return ({
                ...state,
                weatherInfos: action.weatherInfos
            })
        default:
            return state
    }
}

export default weatherRanking