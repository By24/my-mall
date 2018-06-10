<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

    </el-col>
    <el-col :span="24" style="padding-bottom: 0px; height:1000px;">
        <div id="myChart" :style="{width: '100%', height: '800px'}"></div>
    </el-col>
    
</section>
</template>

<script>
import { data, convertData, mapStyle } from '../commons/a'
export default {
  data () {
      return {}
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
            text: '全国主要城市空气质量 - 百度地图',
            // subtext: 'data from PM25.in',
            // sublink: 'http://www.pm25.in',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
        mapStyle: mapStyle,
        },
        series : [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'purple'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'purple',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
