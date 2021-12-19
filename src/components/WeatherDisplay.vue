<template>
  <div class="container">
    <el-row class="main">
      <img :src="`http://openweathermap.org/img/wn/${ data.current.weather.ic }@2x.png`"/>
      <p>{{ data.city }}, {{ data.state }}, {{ data.country }}</p>
      <h1>{{ data.current.weather.tp }} <span><sup>o</sup>C</span></h1>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="metric-card">
          <p>Atmospheric pressure</p>
          <span>{{ data.current.weather.pr }} <small>hPa</small></span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <p>Humidity</p>
          <span>{{ data.current.weather.hu }} <small>%</small></span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <p>Wind speed</p>
          <span>{{ data.current.weather.ws }} <small>m/s</small></span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <p>Wind direction</p>
          <span>{{ data.current.weather.wd }} <small><sup>o</sup></small></span>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="pollution" :gutter="20">
      <el-col :span="12">
        <el-card :style="{ backgroundColor: aqiLevel.secondaryColor }">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="box" :style="{ backgroundColor: aqiLevel.primaryColor }">
                <p>US AQI</p>
                <strong>{{ data.current.pollution.aqius }}</strong>
              </div>
            </el-col>
            <el-col :span="16" :style="{ color: aqiLevel.textColor }" class="aqi-des">
              <strong>{{ aqiLevel.level }}</strong>
              <small>{{ aqiLevel.description }}</small>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="metric-card">
          <p>Main pollutant</p>
          <span>{{ data.current.pollution.mainus }}</span>
          <strong class="unit">{{ data.current.pollution[data.current.pollution.mainus].aqius  }} <small>{{ data.units[data.current.pollution.mainus] }}</small></strong>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {AQI_LEVEL} from "@/constants/aqiLevel";

export default {
  name: 'WeatherDisplay',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    aqiLevel() {
      const aqi = this.data.current.pollution.aqius;
      if (aqi >= 0 && aqi <= 50) {
        return AQI_LEVEL.green;
      } else if (aqi <= 100) {
        return AQI_LEVEL.yellow;
      } else if (aqi <= 150) {
        return AQI_LEVEL.orange;
      } else if (aqi <= 200) {
        return AQI_LEVEL.red;
      } else if (aqi <= 300) {
        return AQI_LEVEL.purple;
      } else {
        return AQI_LEVEL.maroon;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/color';

.container {
  padding: 16px;
}
.main {
  text-align: center;
  img {
    width: 100px;
    object-fit: contain;
  }
  p {
    font-size: 1.5rem;
  }
  h1 {
    font-size: 5rem;
    padding: 2rem 0;
  }
}
.metric-card {
  height: 100%;
  position: relative;

  p {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: $color-silver;
  }
  span {
   font-size: 2rem;
  }
  small {
   font-size: 1.2rem;
  }

  .unit {
    font-size: 1.5rem;
    position: absolute;
    bottom: 16px;
    right: 16px;

    small {
      font-size: 1rem;
    }
  }
}
.pollution {
  margin-top: 24px;
  display: flex;
}
.box {
  width: 100%;
  height: 120px;
  padding: 16px;
  border-radius: 5px;
  color: #fff;
  position: relative;
  box-sizing: border-box;
  p {
    margin-top: 0;
    font-size: 1rem;
  }
  strong {
    position: absolute;
    font-size: 2.5rem;
    bottom: 16px;
  }
}
.aqi-des {
  margin: 16px 0;

  strong {
    font-size: 2rem;
    text-transform: capitalize;
  }
  small {
    display: block;
    margin-top: 1rem;
  }
}
</style>