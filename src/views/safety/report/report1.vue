<template>
  <div class="app-container" style="padding: 5px !important">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="告警类型" prop="equipmentName">
        <el-input
          v-model="queryParams.equipmentName"
          placeholder="请输入事件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="告警状态" prop="workStatus">
        <el-select v-model="queryParams.workStatus">
          <el-option
            v-for="item in  dict.type.work_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="warnTime">
        <el-date-picker clearable
          v-model="queryParams.warnTime1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="12">
        <el-card style="margin:5px" shadow="always">
          <div>
            <div slot="header" class="clearfix">
              <span>告警情况统计</span>
            </div>
            <div id="lineBar" style="width: 550px; height: 300px">

            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" >
        <el-card style="margin:5px" shadow="always">
          <div>
            <div slot="header" class="clearfix">
              <span>工单状态(记数)</span>
            </div>
            <div id="pie" style="width: 550px; height: 300px">

            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="warnList">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWarn" v-if="true"/> -->
      <el-table-column label="事件名称" align="center" prop="equipmentName" />
      <el-table-column label="告警类型" align="center" prop="warnType" />
      <el-table-column label="所属园区" align="center" prop="pkPark"/>
      <!-- <el-table-column label="设备pk" align="center" prop="pkEquipment" /> -->
      <el-table-column label="关联设备" align="center" prop="warnEquipment" />
      <el-table-column label="告警时间" align="center" prop="warnTime" width="180">
      </el-table-column> 
      <el-table-column label="告警位置" align="center" prop="warnPlace" />
      <el-table-column label="告警状态" align="center" prop="workStatus" />
      <el-table-column label="告警照片" align="center" prop="" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
  </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

export default {
  name: "report1",
  dicts: ['work_status','warn_type'],
  data() {
    return {
      myChart: null,
      chartData: {},
      warnList: [],
      loading: false,
      // 总条数
      total: 0,
      showSearch: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        equipmentName: undefined,
        warnType: undefined,
        pkPark: undefined,
        pkEquipment: undefined,
        warnEquipment: undefined,
        warnPlace: undefined,
        warnTime: undefined,
        ts: undefined,
        dr: undefined
      },
    };
  },
  created(){
     this.handleQuery();
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.initPieChart();
    })
  },
  methods: {
    initPieChart() {
      let myChart = echarts.init(document.getElementById('pie'))
      let option = {
        // title: {
        //   text: '',
        //   subtext: '',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '20%',
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '已处理' },
              { value: 735, name: '已派单' },
              { value: 580, name: '已接单' }
            ],
            itemStyle: {
              normal: {
                color: function (colors) {
                  var colorList = [
                    '#F9D55B',
                    '#096FFF',
                    '#F555F9',
                  ];
                  return colorList[colors.dataIndex];
                }
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    initChart() {
      this.myChart = echarts.init(document.getElementById('lineBar'))
      let option = {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      legend: {
        data: ['睡岗', '离岗', '告警数']
      },
      xAxis: [
        {
          type: 'category',
          data: ['2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17', '2022-05-18'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0,//使x轴文字显示全
           }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位：次',
          min: 0,
          max: 20,
          interval: 5,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '睡岗',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [9,1,6,11,19],
          itemStyle: {
            color: '#096FFF'
          },
          barWidth: 20
        },
        {
          name: '离岗',
          type: 'bar',
          data: [1,2,6,1,8],
          itemStyle: {
            color: '#DBEBF5'
          }
        },
        {
          name: '告警数',
          type: 'line',
          yAxisIndex: 1,
          data: [12,7,1,18,20],
          itemStyle: {
            color: '#FFDF71'
          }
        }
      ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      // this.setOptions(this.chartData)
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      
      this.warnList = [
        {
          "pkWarn": 1,
          "equipmentName": "睡岗",
          "warnType": "睡岗离岗",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-001",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 15:44:41",
          "workStatus": "已处理",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        },
        {
          "pkWarn": 1,
          "equipmentName": "睡岗",
          "warnType": "睡岗离岗",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-002",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 16:44:41",
          "workStatus": "已处理",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        },
        {
          "pkWarn": 1,
          "equipmentName": "离岗",
          "warnType": "睡岗离岗",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-003",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 17:44:41",
          "workStatus": "已处理",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        }    
      ];
      this.total = 3;
      this.loading = false;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>
<style scoped>
::v-deep .el-tabs__content{
  border: none !important;
}
::v-deep .app_container{
  padding: 5px !important;
}
::v-deep .el-card__body {
    padding: 5px 5px 5px 5px !important;
}
</style>

