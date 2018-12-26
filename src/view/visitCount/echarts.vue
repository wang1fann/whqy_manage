<template>
    <section class="chart-container" style="position:relative;">
        <el-row>
            <el-col :span="13">
                <div class="rel">
                    <div id="chartColumn" style="width:100%; height:400px;">
                    </div>
                    <div class="left-line"></div>
                </div>
                <div class="rel">
                    <div id="chartPie" style="width:100%; height:400px;margin-top:15px;">
                    </div>
                    <div class="left-line"></div>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="rel">
                    <div id="chartBar" style="width:100%; height:700px;">
                    </div>
                    <div class="left-line"></div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            chartColumn: null,
            chartBar: null,
            chartPie: null
        }
    },
    methods: {
        drawColumnChart() {
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            this.chartColumn.setOption({
                backgroundColor: '#F8F9FA',
                title: {
                    text: '访问量统计',
                    subtext: '总计 ' + 33,
                    x: '8%',
                    textAlign: 'center'
                },
                tooltip: {},
                xAxis: {
                    data: ["1", "2", "3", "4", "5", "6", 7, 8, 9, 10, 11, 12]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    barGap: "7",
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#EF8F64' },
                                    { offset: 1, color: '#F46F70' }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#EF8F64' },
                                    { offset: 1, color: '#F46F70' }
                                ]
                            )
                        }
                    },
                    data: [5, 20, 36, 10, 10, 20, 100, 239, 393, 299, 99, 3332]
                }]
            });
        },
        drawBarChart() {
            this.chartBar = echarts.init(document.getElementById('chartBar'));
            this.chartBar.setOption({
                backgroundColor: '#F8F9FA',
                title: {
                    text: '访问资源排名统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['访问次数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['景区概况', '景区新闻', '藏品欣赏', '习老精神', '先烈事迹', '红色中国', '数字展览馆', '历史文化教育', '红色旅游']
                },
                series: [
                    {
                        name: '访问次数',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1, 0, 0, 0,
                                    [
                                        { offset: 0, color: '#EF8F64' },
                                        { offset: 1, color: '#F46F70' }
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#EF8F64' },
                                        { offset: 1, color: '#F46F70' }
                                    ]
                                )
                            }
                        },
                        data: [1820, 2489, 2934, 14970, 1344, 6302, 8833, 999, 445]
                    }
                ]
            });
        },
        drawPieChart() {
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({
                backgroundColor: '#F8F9FA',
                title: {
                    text: '访问路径统计',
                    x: 'left',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['PC门户网站', 'App端', '搜索引擎']
                },
                color: ['#00AEE3', '#FFB728', '#F9717B', 'pink'],
                series: [
                    {
                        radius: ['20%', '70%'],
                        name: '访问来源',
                        type: 'pie',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: 'PC门户网站' },
                            { value: 310, name: 'App端' },
                            { value: 1548, name: '搜索引擎' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
        drawCharts() {
            this.drawColumnChart()
            this.drawBarChart()
            this.drawPieChart()
        },
    },
    mounted: function() {
        this.drawCharts()
    },
    updated: function() {
        this.drawCharts()
    }
}
</script>

<style scoped>
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

.left-line {
    position: absolute;
    top: 5px;
    left: 1px;
    width: 1px;
    height: 18px;
    border-left: 2px solid #E24142;
    z-index: 100;
}
</style>