<template>
<div class="content-wrap">
  <div class="content-inner">
    <div class="content-title">
      <el-iconCoin class="icons"></el-iconCoin>
      <span>APEXCHARTS</span>
    </div>

    <div class="content-box">
      <!-- member zone1 -->
      <div class="member-zone">
        <div 
          v-for="(item, index) in NumData" :key="index"
          :class="['member-zone-item', item.color]"
        >
          <div class="member-title">{{ item.title }}</div>
          <div class="member-num">
            {{ item.title === '儲值率' ? item.num + '%' : item.num }}
          </div>
        </div>
      </div>

      <!-- info zone -->
      <div class="info-zone">

        <div
          v-for="(item, index) in infoData"
          :key="index"
          class="info-zone-item"
        >
          <div class="info-title">{{ item.title }}</div>
          <div class="info-num">
            <span class="num">{{ item.todayNum }}</span>
            <span class="percentage">-{{ item.todayPercent.toFixed(2) }}%</span>
          </div>
          <!-- -->
          <div class="daily-num">
            <div>
              <span class="num">昨日 {{ item.yesterdayNum }}</span>
              <span class="percentage">+{{ item.yesterdayPercent.toFixed(2) }}%</span>
            </div>
            <div>
              <span class="num">前日 {{ item.nextdayNum }}</span>
              <span class="percentage">+{{ item.nextdayPercent.toFixed(2) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- charts01 -->
      <div id="chart" class="charts">
        <apexchart 
          type="line" 
          height="350" 
          :options="chartOptions2" 
          :series="series2"
        ></apexchart>
      </div>

      <!-- charts02 -->
      <div id="chart" class="charts">
        <apexchart 
          type="line" 
          height="350" 
          :options="chartOptions" 
          :series="series"
        ></apexchart>
      </div>

      <!-- charts02 -->
      <div class="charts">
        <apexchart 
          type="bar" 
          height="350" 
          :options="chartOptions3" 
          :series="series3"
        ></apexchart>
      </div>
    </div>
  </div>
</div>
</template>

<script type="module" setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const NumData = ref([
  {
    title: '總會員數',
    num: 1000000,
    color: 'orange'
  },
  {
    title: '總儲值人數',
    num: 1000000,
    color: 'blue'
  },
  {
    title: '儲值率',
    num: 100,
    color: 'gray'
  },
  {
    title: 'ARPPU',
    num: 100,
    color: 'green'
  },
  {
    title: 'ARPU',
    num: 100,
    color: 'red'
  }
])

const infoData = ref([
  {
    title: '今日註冊人數',
    todayNum: 1000000,
    todayPercent: 20,
    yesterdayNum: 1250000,
    yesterdayPercent: 20,
    nextdayNum: 1000000,
    nextdayPercent: 20,
  },
  {
    title: '今日會員登入人數',
    todayNum: 1000000,
    todayPercent: 20,
    yesterdayNum: 1250000,
    yesterdayPercent: 20,
    nextdayNum: 1000000,
    nextdayPercent: 20,
  },
  {
    title: '今日首儲人數',
    todayNum: 1000000,
    todayPercent: 20,
    yesterdayNum: 1250000,
    yesterdayPercent: 20,
    nextdayNum: 1000000,
    nextdayPercent: 20,
  },
  {
    title: '今日儲值人數',
    todayNum: 1000000,
    todayPercent: 20,
    yesterdayNum: 1250000,
    yesterdayPercent: 20,
    nextdayNum: 1000000,
    nextdayPercent: 20,
  },
  {
    title: '今日註冊金額',
    todayNum: 1000000,
    todayPercent: 20,
    yesterdayNum: 1250000,
    yesterdayPercent: 20,
    nextdayNum: 1000000,
    nextdayPercent: 20,
  },
])

const series = reactive([
  {
    name: "ARPPU",
    data: [28, 29, 33, 36, 32, 32, 33]
  },
  {
    name: "ARPU",
    data: [12, 11, 14, 18, 17, 13, 13]
  }
])

const chartOptions = reactive({
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA', '#545454'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: '平均人均貢獻',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: ''
    }
  },
  yaxis: {
    title: {
      text: ''
    },
    min: 5,
    max: 40
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
})

const series2 = reactive([
  {
    name: "最高在線",
    data: [28, 29, 33, 36, 32, 32, 33]
  },
  {
    name: "最低在線",
    data: [18, 30, 22, 8, 6, 19, 30]
  },
  {
    name: "平均在線",
    data: [12, 11, 14, 18, 17, 13, 13]
  }
])

const chartOptions2 = reactive({
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA', '#545454', '#ff0000'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: '平均在線統計',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: ''
    }
  },
  yaxis: {
    title: {
      text: ''
    },
    min: 5,
    max: 40
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
})

const series3 = reactive([
  {
    // name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    // name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    // name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }
])

const chartOptions3 = reactive({
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  title: {
    text: '活耀會員統計',
    align: 'left'
  },
  xaxis: {
    categories: ['2023-01-01', '2023-01-03', '2023-01-05', '2023-01-07', '2023-01-09', '2023-01-11', '2023-01-13', '2023-01-15', '2023-01-17'],
  },
  yaxis: {
    title: {
      text: ''
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val: any) {
        return "$ " + val + " thousands"
      }
    }
  }
})
</script>

<style scoped>
</style>