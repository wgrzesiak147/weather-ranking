import axios from 'axios'

const DarkSkyApi = {
    loadForecast(latitude, longitude) {
        return axios
            .get(`http://127.0.0.1:8081/`)
            .then(response => response.data);
    }
}
export default DarkSkyApi