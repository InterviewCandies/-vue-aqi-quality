import airQualityApi from "@/services/airQualityApi";
import otherApi from "@/services/otherApi";

class LocationService {
    getSupportedCountries() {
        return airQualityApi.get('/countries')
    }
    getSupportedStates(country) {
        return airQualityApi.get(`/states?country=${country}`)
    }
    getSupportedCities(state, country) {
        return airQualityApi.get(`/cities?state=${state}&country=${country}`);
    }
    getAllCountries() {
        return otherApi.get('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json')
    }
    getCurrentLocation() {
        return otherApi.get('https://geolocation-db.com/json/');
    }
}

export default new LocationService();