<template>
  <el-row>
    <el-col :span="12">
      <el-menu class="menu">
        <el-menu-item v-for="country in countries" :key="country.code" @click="onCountryClicked">
          <img :src="`https://flagcdn.com/16x12/${country.code}.png`" class="flag-icon">
          <span>{{ country.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <el-menu class="menu" @open="onOpen">
        <el-submenu v-for="state in states" :key="state.name" :index="state.name">
          <template slot="title">
            <span>{{ state.name }}</span>
          </template>
          <el-menu-item v-for="city in state.cities" :key="city" @click="onCityClicked">
            <span>{{ city }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import LocationService from "@/services/LocationService";

export default {
  data() {
    return {
      countries: [],
      states: [],
      currentCountry: '',
      currentState: '',
      currentCity: ''
    }
  },
  created() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      let allCountries = [];
      LocationService.getAllCountries().then(response => {
        allCountries = response.data;
        return LocationService.getSupportedCountries()
      }).then( response => {
        const supportedCountries = response.data.data.map(item => item.country);
        this.countries = supportedCountries.map(country => ({ name: country, code: allCountries.find(item => item.Name === country)?.Code?.toLowerCase()}));
      })
    },
     fetchStates(country) {
      LocationService.getSupportedStates(country).then( async(response) => {
        const states = response.data.data.map(item => item.state);
        this.states = states.map(state => ({ name: state }))
      })
    },
    fetchCities(state, country) {
      LocationService.getSupportedCities(state, country).then(response => {
        const currentStateIndex = this.states.findIndex(item => item.name === state);
        const newState = { ...this.states[currentStateIndex], cities: response.data.data.map(item => item.city) };
        // https://vuejs.org/2016/02/06/common-gotchas/#Why-isn%E2%80%99t-the-DOM-updating
        this.$set(this.states, currentStateIndex, newState);
      })
    },
    onCountryClicked(item) {
      this.states = [];
      this.currentCountry = item.$el.innerText;
      this.fetchStates(this.currentCountry);
    },
    onOpen(key) {
      const state = this.states.find(state => state.name === key);
      this.currentState = state.name;
      this.fetchCities(state.name, this.currentCountry);
    },
    onCityClicked(item) {
      this.currentCity = item.$el.innerText;
      this.$emit('city-clicked', this.currentCity, this.currentState, this.currentCountry)
    }
  }
}
</script>

<style scoped>
.menu {
  height: 100vh;
  overflow: auto;
  border-right: solid 1px #e6e6e6;
}

.flag-icon {
  margin-right: 8px;
}
</style>