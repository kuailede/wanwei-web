<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="睡岗离岗" name="first">
        <subReport></subReport>
      </el-tab-pane>
      <el-tab-pane label="消防占道" name="second">
        <headReport/>
      </el-tab-pane>
      <el-tab-pane label="周界布防" name="third">
        <report3/>
      </el-tab-pane>
      <el-tab-pane label="周界入侵" name="fourth">
        <report4/>
      </el-tab-pane>
      <el-tab-pane label="消防火警" name="fifth">
        <report5/>
      </el-tab-pane>
      <el-tab-pane label="执法记录在线" name="sixth">
        <report6/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import subReport from "@/views/safety/report/report1.vue";
import headReport from "@/views/safety/report/report2.vue";
import report3 from "@/views/safety/report/report3.vue";
import report4 from "@/views/safety/report/report4.vue";
import report5 from "@/views/safety/report/report5.vue";
import report6 from "@/views/safety/report/report6.vue";
export default {
  components: {
    subReport,headReport,report3,report4,report5,report6
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<!-- <style lang="scss" scoped>
/deep/ .el-tabs__header {
  margin: 0 0 0px !important
}
/deep/ .el-tabs__content{
  border: none !important;
} -->
<!-- </style> -->
