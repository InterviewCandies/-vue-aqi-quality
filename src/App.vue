<template>
  <div id="app">
    <el-row>
      <el-col :span="8">
        <LocationNavigation @city-clicked="handleCityClicked"></LocationNavigation>
      </el-col>
      <el-col :span="16">
        <WeatherDisplay :data="weatherData"></WeatherDisplay>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LocationNavigation from "@/components/LocationNavigation"
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherService from "@/services/WeatherService";
import { data } from "@/constants/mocks"

export default {
  name: 'App',
  components: {
    LocationNavigation,
    WeatherDisplay
  },
  data() {
    return {
      weatherData: null
    }
  },
  methods: {
    handleCityClicked(city, state, country) {
      WeatherService.getDataByCity(city,state, country).then(response => {
        this.weatherData = response.data.data;
      })
    }
  },
  created() {
    this.weatherData = data;
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

body {
  margin: 0;
}
</style>
