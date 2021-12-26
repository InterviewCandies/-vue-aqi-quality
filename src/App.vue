<template>
  <div id="app">
    <section class="container">
      <section class="container-left">
        <LocationNavigation @city-clicked="handleCityClicked"></LocationNavigation>
      </section>
      <section class="container-right">
        <WeatherDisplay :data="weatherData" :is-loading-data="isLoadingData"></WeatherDisplay>
      </section>
    </section>
  </div>
</template>

<script>
import LocationNavigation from "@/components/LocationNavigation"
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherService from "@/services/WeatherService";

export default {
  name: 'App',
  components: {
    LocationNavigation,
    WeatherDisplay
  },
  data() {
    return {
      weatherData: null,
      isLoadingData: false
    }
  },
  methods: {
    handleCityClicked(city, state, country) {
      this.weatherData = null;
      this.isLoadingData = true;
      WeatherService.getDataByCity(city,state, country)
                    .then(response => {
                      this.weatherData = response.data.data;
                      this.isLoadingData = false;
                     })
                    .catch(() => {
                      this.isLoadingData = false;
                    })
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

body {
  margin: 0;
}

.el-input__inner {
  border-radius: 0;
}

.container {
  display: flex;

  &-left {
    max-width: 60%;
  }

  &-right {
    flex-grow: 1;
    display: block;
  }
}
</style>
