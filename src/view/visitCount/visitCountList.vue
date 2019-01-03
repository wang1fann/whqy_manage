<template>
  <section
    class="chart-container"
    style="position:relative;"
  >
    <el-row>
      <el-col :span="13">
        <div class="rel">
          <div
            id="chartColumn"
            style="width:100%; height:430px;"
          >
          </div>
          <div class="date-box">

            <el-radio-group
              v-model="dateType"
              size="small"
            >
              <el-radio-button label="日访问量"></el-radio-button>
              <el-radio-button label="月访问量"></el-radio-button>
              <el-radio-button label="最近访问"></el-radio-button>
            </el-radio-group>
            <div class="rate-select">
              <span>
                <el-date-picker
                  v-model="dataRangeValue"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
              </span>
              <span>
                <el-button
                  type="warning"
                  plain
                  @click="searchVisitData"
                >查询</el-button>
              </span>
            </div>
            <div class="allvistdata">
              总访问量:{{allvistdata}}
            </div>
          </div>
          <div class="left-line"></div>
        </div>
        <div class="rel">
          <div
            id="chartPie"
            style="width:100%; height:270px;margin-top:15px;"
          >
          </div>
          <div class="left-line"></div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="rel">
          <div
            id="chartBar"
            style="width:100%; height:710px;"
          >
          </div>
          <div class="left-line"></div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";
import { getNowFormatDate, Object2Array } from "@/plugins/util.js";
import API from "@/api/api_visit.js";
export default {
  data() {
    return {
      dataRangeValue: "",
      dateType: "最近访问",
      visitData: {
        name: [0],
        value: [0]
      },
      moduleData: {
        name: [0],
        value: [0]
      },
      chartColumn: null,
      chartBar: null,
      chartPie: null,
      allvistdata: 0,
      drawPieChartData: {
        data: [
          { value:0, name: "PC门户网站" },
          { value: 0, name: "App端" },
          { value: 0, name: "搜索引擎" }
        ],
        legendData: [
          {
            textStyle: {
              color: "#00AEE3" // 图例文字颜色
            },
            name: "PC门户网站",
            valueRate: ""
          },
          {
            textStyle: {
              color: "#FFB728" // 图例文字颜色
            },
            name: "App端",
            valueRate: ""
          },
          {
            textStyle: {
              color: "#F9717B" // 图例文字颜色
            },
            name: "搜索引擎",
            valueRate: ""
          }
        ]
      }
    };
  },
  methods: {
    searchVisitData() {
      // var searchParams = {
      //   type: this.dateType,
      //   startDay: this.dataRangeValue[0],
      //   endDay: this.dataRangeValue[1]
      // };
      var searchParams = {
        startDay: "2018-12-01 00:00:00",
        endDay: getNowFormatDate()
      };
      var that = this;
      API.getDeviceZzt(searchParams)
        .then(res => {
          console.log(res);
          that.visitData.name = Object2Array(res.data, "name");
          that.visitData.value = Object2Array(res.data, "value");
          console.log(that.visitData);
          that.drawColumnChart();
        })
        .catch(res => {});
    },
    drawColumnChart() {
      var that = this;
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        backgroundColor: "#F8F9FA",
        title: {
          text: "访问量统计",
          subtext: "",
          x: "8%",
          textAlign: "center",
          padding: 5 // 标题内边距，单位px，默认各方向内边距为5，
        },
        tooltip: {},
        grid: {
          left: "4%",
          right: "4%",
          top: "30%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: that.visitData.name,
          axisLabel: {
            textStyle: {
              color: "#EF8F64"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#CCCCCC", //左边线的颜色
              width: "1" //坐标线的宽度
            }
          }
        },
        yAxis: {
          name: "访问次数", // 轴名称
          nameLocation: "end", // 轴名称相对位置
          axisLabel: {
            textStyle: {
              color: "#949DA6"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#CCCCCC", //左边线的颜色
              width: "1" //坐标线的宽度
            }
          }
        },
        series: [
          {
            barWidth: 10,
            name: "访问次数",
            barGap: "7",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#EF8F64" },
                  { offset: 1, color: "#F46F70" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#EF8F64" },
                  { offset: 1, color: "#F46F70" }
                ])
              }
            },
            data: that.visitData.value
          }
        ]
      });
    },
    getBarChartData() {
      var searchParams = {
        startDay: "2018-12-01 00:00:00",
        endDay: getNowFormatDate()
      };
      var that = this;
      API.getModuleZzt(searchParams)
        .then(res => {
          console.log(res);
          that.moduleData.name = Object2Array(res.data, "name");
          that.moduleData.value = Object2Array(res.data, "value");
          console.log(that.moduleData);
          that.drawBarChart();
        })
        .catch(res => {});
    },
    drawBarChart() { 
      this.chartBar = echarts.init(document.getElementById("chartBar"));
      var that = this;
      this.chartBar.setOption({
        backgroundColor: "#F8F9FA",
        title: {
          text: "访问资源排名统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {},
        grid: {
          left: "18%",
          right: "4%",
          bottom: "3%",
          containLabel: false
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              color: "#949DA6"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#CCCCCC", //左边线的颜色
              width: "1" //坐标线的宽度
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.moduleData.name,
          axisLabel: {
            textStyle: {
              color: "#949DA6"
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#CCCCCC", //左边线的颜色
              width: "1" //坐标线的宽度
            }
          }
        },
        series: [
          {
            barWidth: 10,
            name: "访问次数",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: "#EF8F64" },
                  { offset: 1, color: "#F46F70" }
                ]),
                label: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#949DA6",
                    fontSize: 13
                  },
                  formatter: "{c}次"
                }
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#EF8F64" },
                  { offset: 1, color: "#F46F70" }
                ])
              }
            },
            data: that.moduleData.value,
          }
        ]
      });
    },
    drawPieChart() {
      var that = this;
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        backgroundColor: "#F8F9FA",
        title: {
          text: "访问路径统计",
          x: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "7%",
          bottom: "35%",
          data: that.drawPieChartData.legendData,
          formatter: function(params) {
            var thatData = that.drawPieChartData.data;
            // console.log(thatData);
            for (var i = 0; i < thatData.length; i++) {
              if (thatData[i].name == params) {
                var arr = [
                  "{a|" +
                    params +
                    "}{b|" +
                    that.drawPieChartData.legendData[i].valueRate +
                    "}{c|" +
                    thatData[i].value +
                    "次}"
                ];
                return arr.join("\n");
              }
            }
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 13,
                align: "left",
                width: 90,
                padding: [0, 0, 0, 0]
              },
              b: {
                fontSize: 13,
                align: "left",
                padding: [0, 10, 0, 0],
                lineHeight: 20,
                width: 50
              },
              c: {
                fontSize: 13
              }
            }
          }
        },
        color: ["#00AEE3", "#FFB728", "#F9717B", "pink"],
        series: [
          {
            radius: ["18%", "60%"],
            name: "访问来源",
            type: "pie",
            center: ["30%", "50%"],
            data: that.drawPieChartData.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
      this.drawBarChart();
      this.drawPieChart();
    },
    getAllVisit() {
      //获取总访问量
      var that = this;
      API.getAllVisit().then(res => {
        that.allvistdata = !!res && res.code === 20000 ? res.data : "暂无数据";
      });
    },
    getDrawPieChartData() {
      //获取饼状图数据
      var myDate = {
        startDay: "2018-01-01 00:00:00",
        endDay: getNowFormatDate()
      };
      var that = this;
      API.getDeviceBzt(myDate).then(res => {
        if (!!res && res.code === 20000) {
          that.drawPieChartData.data = res.data;
        }
        that.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "warning"
        });
        for (var i = 0; i < that.drawPieChartData.legendData.length; i++) {
          that.drawPieChartData.legendData[i].name =
            that.drawPieChartData.data[i].name;
          that.drawPieChartData.legendData[i].name =
            that.drawPieChartData.data[i].name;
          that.drawPieChartData.legendData[i].valueRate =
            that.drawPieChartData.data[i].rate;
        }
        this.drawPieChart();
      });
    },
    getDeviceZzt() {
      //获取访问量柱状图
      var myDate = {
        startDay: "2018-01-01 00:00:00",
        endDay: getNowFormatDate()
      };
      var that = this;
    }
  },
  mounted: function() {
    this.getAllVisit();
    this.drawCharts();
    this.getDrawPieChartData();

    this.searchVisitData();
    this.getBarChartData();
  },
  updated: function() {
    // this.drawCharts();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  float: left;
}
.allvistdata {
  width: 118px;
  position: absolute;
  top: 89px;
  right: 0px;
}
.el-col {
  padding: 30px 20px;
}

.rel {
  position: relative;
}
.date-box {
  position: absolute;
  top: 0px;
  right: 5px;
  width: 100%;
  height: 110px;
  z-index: 110;

  .el-radio-group {
    float: right;
  }
}
.left-line {
  position: absolute;
  top: 5px;
  left: 1px;
  width: 1px;
  height: 18px;
  border-left: 2px solid #e24142;
  z-index: 100;
}
</style>