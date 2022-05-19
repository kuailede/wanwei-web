<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      
      
      <el-form-item label="战区" prop="parkRegional">
        <el-select v-model="queryParams.parkRegional">
          <el-option
            v-for="item in  dict.type.park_region"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="园区类型" prop="parkType">
        <el-select v-model="queryParams.parkType">
          <el-option
            v-for="item in  dict.type.park_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="园区状态" prop="parkStatus">
        <el-select v-model="queryParams.parkStatus">
          <el-option
            v-for="item in  dict.type.park_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['safety:park:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['safety:park:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['safety:park:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['safety:park:export']"
        >导入</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="parkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="" align="center" prop="pkPark" v-if="true"/> -->
      <el-table-column label="战区" align="center" prop="parkRegional" />
      <el-table-column label="城市" align="center" prop="parkCity" />
      <el-table-column label="园区" align="center" prop="parkName" />
      
      <el-table-column label="面积" align="center" prop="parkArea" />
      <el-table-column label="类型" align="center" prop="parkType" />
      <el-table-column label="园区状态" align="center" prop="parkStatus" />
      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['safety:park:edit']"
          >运行日志</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['safety:park:edit']"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['safety:park:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改园区对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="园区" prop="parkName">
          <el-input v-model="form.parkName" placeholder="请输入园区" />
        </el-form-item>
        <el-form-item label="城市" prop="parkCity">
          <el-input v-model="form.parkCity" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="战区" prop="parkRegional">
           <el-select v-model="form.parkRegional">
          <el-option
            v-for="item in  dict.type.park_region"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="面积" prop="parkArea">
          <el-input v-model="form.parkArea" placeholder="请输入面积" />
        </el-form-item>
        <el-form-item label="园区类型" prop="parkType">
          <el-select v-model="form.parkType">
            <el-option
              v-for="item in  dict.type.park_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="园区状态" prop="parkStatus">
        <el-select v-model="form.parkStatus">
          <el-option
            v-for="item in  dict.type.park_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPark, getPark, delPark, addPark, updatePark } from "@/api/system/park";

export default {
  name: "Park",
  dicts: ['park_region','park_type','park_status'],
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 园区表格数据
      parkList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parkName: undefined,
        parkCity: undefined,
        parkRegional: undefined,
        parkArea: undefined,
        parkType: undefined,
        parkStatus: undefined,
        ts: undefined,
        dr: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pkPark: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        parkName: [
          { required: true, message: "园区不能为空", trigger: "blur" }
        ],
        parkCity: [
          { required: true, message: "城市不能为空", trigger: "blur" }
        ],
        parkRegional: [
          { required: true, message: "战区不能为空", trigger: "blur" }
        ],
        parkArea: [
          { required: true, message: "面积不能为空", trigger: "blur" }
        ],
        parkType: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        parkStatus: [
          { required: true, message: "园区状态不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        ts: [
          { required: true, message: "时间戳不能为空", trigger: "blur" }
        ],
        dr: [
          { required: true, message: "是否删除,0正常,1删除不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询园区列表 */
    getList() {
      this.loading = true;
      listPark(this.queryParams).then(response => {
        this.parkList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        pkPark: undefined,
        parkName: undefined,
        parkCity: undefined,
        parkRegional: undefined,
        parkArea: undefined,
        parkType: undefined,
        parkStatus: "0",
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        ts: undefined,
        dr: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.pkPark)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加园区";
    },
    handleDetail(){
       this.$modal.msgError('敬请期待！');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const pkPark = row.pkPark || this.ids
      getPark(pkPark).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改园区";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.pkPark != null) {
            updatePark(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addPark(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const pkParks = row.pkPark || this.ids;
      this.$modal.confirm('是否确认删除园区编号为"' + pkParks + '"的数据项？').then(() => {
        this.loading = true;
        return delPark(pkParks);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('safety/park/export', {
        ...this.queryParams
      }, `park_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
