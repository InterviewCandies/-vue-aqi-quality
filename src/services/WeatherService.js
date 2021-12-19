import airQualityApi from "@/services/airQualityApi";

class WeatherService {
    getDataByCity(city, state, country) {
        return airQualityApi.get(`/city?city=${city}&state=${state}&country=${country}`)
    }
}

export default new WeatherService();