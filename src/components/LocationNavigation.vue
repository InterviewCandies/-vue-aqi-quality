<template>
  <section>
    <div class="menu">
      <el-input
          @input="onSearchCountry"
          class="search-box"
          v-model="inputtedCountry"
          placeholder="Country name">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-menu :default-active="currentCountry">
        <el-menu-item v-for="country in filteredCountries" :key="country.code" @click="onCountryClicked" :index="country.name">
          <img :src="`https://flagcdn.com/16x12/${country.code}.png`" class="flag-icon">
          <span>{{ country.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="menu">
      <el-input
          @input="onSearchState"
          class="search-box"
          v-model="inputtedState"
          placeholder="State name">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-menu @open="onOpen" ref="stateMenu" :default-active="currentState">
        <el-submenu v-for="state in filteredStates" :key="state.name" :index="state.name">
          <template slot="title">
            <span>{{ state.name }}</span>
          </template>
          <el-menu-item v-for="city in state.cities" :key="city" @click="onStateClicked">
            <span>{{ city }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </section>
</template>

<script>
import LocationService from "@/services/LocationService";
import { Message } from "element-ui"

export default {
  data() {
    return {
      countries: [],
      filteredCountries: [],
      states: [],
      filteredStates: [],
      currentCountry: '',
      currentState: '',
      currentCity: '',
      inputtedCountry: '',
      inputtedState: '',
      timeout: null,
      isLoadingState: false
    }
  },
  created() {
    this.fetchCurrentLocation()
    this.fetchCountries();
  },
  methods: {
    fetchCurrentLocation() {
      LocationService.getCurrentLocation().then(response => {
        const location = response.data;
        this.currentState = location.state;
        this.currentCity = location.city;
        this.currentCountry = location['country_name'];
        this.$emit('city-clicked', this.currentCity, this.currentState, this.currentCountry);
        if (this.currentCountry) this.fetchStates(this.currentCountry);
        if (this.currentState) this.fetchCities(this.currentState, this.currentCountry);
      }).catch(() => {
        Message.error('Failed to get your current location')
      })
    },
    fetchCountries() {
      let allCountries = [];
      LocationService.getAllCountries().then(response => {
        allCountries = response.data;
        return LocationService.getSupportedCountries()
      }).then( response => {
        const supportedCountries = response.data.data.map(item => item.country);
        this.countries = supportedCountries.map(country => ({ name: country, code: allCountries.find(item => item.Name === country)?.Code?.toLowerCase()}));
        this.filteredCountries = this.countries;
      }).catch(() => {
        Message.error('Failed to load countries');
      })
    },
     fetchStates(country) {
      this.isLoadingState = true;

      LocationService.getSupportedStates(country).then( async(response) => {
        const states = response.data.data.map(item => item.state);
        this.states = states.map(state => ({ name: state }))
        this.filteredStates = this.states
        this.isLoadingState = false;
      }).catch(() => {
        Message.error('Failed to load states of ' + country);
      })
    },
    fetchCities(state, country) {
      LocationService.getSupportedCities(state, country).then(response => {
        const currentStateIndex = this.states.findIndex(item => item.name === state);
        const newState = { ...this.states[currentStateIndex], cities: response.data.data.map(item => item.city) };
        // https://vuejs.org/2016/02/06/common-gotchas/#Why-isn%E2%80%99t-the-DOM-updating
        this.$set(this.states, currentStateIndex, newState);
        this.$set(this.filteredStates, currentStateIndex, newState);
      }).catch(() => {
        Message.error('Failed to load cities of '+ state + ' state');
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
      if (!this.currentState.cities) {
        this.fetchCities(state.name, this.currentCountry);
      }
    },
    onStateClicked(item) {
      this.currentCity = item.$el.innerText;
      this.$emit('city-clicked', this.currentCity, this.currentState, this.currentCountry)
    },
    onSearchCountry(value) {
       if (this.timeout) clearTimeout(this.timeout);
       this.timeout = setTimeout(() => {
         this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().startsWith(value.toLowerCase()))
       }, 500)
    },
    onSearchState(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.filteredStates = this.states.filter(state => state.name.toLowerCase().startsWith(value.toLowerCase()));
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
section {
  display: flex;
}
.menu {
  height: 100vh;
  overflow: auto;
  border-right: solid 1px #e6e6e6;
  max-width: 300px;
  min-width: 150px;
}

.search-box {
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 10;
}

.flag-icon {
  margin-right: 8px;
}
</style>