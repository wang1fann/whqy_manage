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
                  @click="searchVisitData()"
                >查询</el-button>
              </span>
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
export default {
  data() {
    return {
      dataRangeValue: "",
      dateType: "最近访问",
      chartColumn: null,
      chartBar: null,
      chartPie: null,
      drawPieChartData: {
        data: [
          { value: 335, name: "PC门户网站" },
          { value: 310, name: "App端" },
          { value: 1548, name: "搜索引擎" }
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
      console.log(this.dateType);
      console.log(this.dataRangeValue);
    //   
    },
    drawColumnChart() {
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
          data: ["1", "2", "3", "4", "5", "6", 7, 8, 9, 10, 11, 12],
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
            data: [5, 20, 36, 10, 10, 20, 100, 239, 393, 299, 99, 3332]
          }
        ]
      });
    },
    drawBarChart() {
      this.chartBar = echarts.init(document.getElementById("chartBar"));
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
        legend: {
          //   data: ["访问次数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
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
          data: [
            "景区概况",
            "景区新闻",
            "藏品欣赏",
            "习老精神",
            "先烈事迹",
            "红色中国",
            "数字展览馆",
            "历史文化教育",
            "红色旅游"
          ],
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
            data: [1820, 2489, 2934, 14970, 1344, 6302, 8833, 999, 445]
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
            for (var i = 0; i < thatData.length; i++) {
              if (thatData[i].name == params) {
                var arr = [
                  "{a|" +
                    params +
                    "}{b|" +
                    that.drawPieChartData.legendData[i].valueRate +
                    "%}{c|" +
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
                width: 40
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
    }
  },
  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  float: left;
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

  .rate-select {
    .el-radio-button__orig-radio:checked + span {
      background-color: #e24142 !important;
      border-color: #e24142 !important;
      -webkit-box-shadow: -1px 0 0 0 #e24142 !important;
      box-shadow: -1px 0 0 0 #e24142 !important;
      border-radius: 5px !important;
    }
    .el-date-editor {
      width: 228px;
      top: 44%;
      position: absolute;
      margin: 0 auto;
      left: 32%;
      .el-range__icon {
        margin-top: -9px !important;
      }
      span {
        border: 1px solid green !important;
      }
      .el-range-separator {
        border: 1px solid green;
        line-height: 22px !important;
      }
      span.el-radio-button__inner {
        background: #e24142;
        color: #fff;
      }
      input {
        background: #e24142;
        color: #fff;
      }
    }
    button {
      left: 65%;
      top: 44.5%;
      position: absolute;
      background: #e24142;
      color: #fff;
    }
  }

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