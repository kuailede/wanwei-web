<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="设备名称" prop="equipmentName">
        <el-input
          v-model="queryParams.equipmentName"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="设备类型" prop="machineType">
        <el-select v-model="queryParams.machineType">
          <el-option
            v-for="item in  dict.type.machine_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备状态" prop="machineStatus">
        <el-select v-model="queryParams.machineStatus">
          <el-option
            v-for="item in  dict.type.machine_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属园区" prop="pkPark">
        <el-input
          v-model="queryParams.pkPark"
          placeholder="请输入所属园区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="设备编号" prop="equipmentSerial">
        <el-input
          v-model="queryParams.equipmentSerial"
          placeholder="请输入设备编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备位置" prop="equipmentPlace">
        <el-input
          v-model="queryParams.equipmentPlace"
          placeholder="请输入设备位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备型号" prop="equipmentModel">
        <el-input
          v-model="queryParams.equipmentModel"
          placeholder="请输入设备型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备品牌" prop="equipmentBrand">
        <el-input
          v-model="queryParams.equipmentBrand"
          placeholder="请输入设备品牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商" prop="equipmentSupplier">
        <el-input
          v-model="queryParams.equipmentSupplier"
          placeholder="请输入供应商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维护人" prop="maintenancePerson">
        <el-input
          v-model="queryParams.maintenancePerson"
          placeholder="请输入维护人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="maintenancePhone">
        <el-input
          v-model="queryParams.maintenancePhone"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维保单位" prop="maintenanceUnit">
        <el-input
          v-model="queryParams.maintenanceUnit"
          placeholder="请输入维保单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间戳" prop="ts">
        <el-date-picker clearable
          v-model="queryParams.ts"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择时间戳">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否删除,0正常,1删除" prop="dr">
        <el-input
          v-model="queryParams.dr"
          placeholder="请输入是否删除,0正常,1删除"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['safety:equipment:add']"
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
          v-hasPermi="['safety:equipment:edit']"
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
          v-hasPermi="['safety:equipment:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['safety:equipment:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="equipmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWorkOrderRule" v-if="true"/> -->
      <el-table-column label="设备名称" align="center" prop="equipmentName" />
      <el-table-column label="设备类型" align="center" prop="machineType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.machine_type" :value="scope.row.machineType"/>
        </template>
      </el-table-column>
      <el-table-column label="所属园区" align="center" prop="pkPark" :formatter="parkFormat"/>
      <el-table-column label="设备编号" align="center" prop="equipmentSerial" />
      <el-table-column label="设备位置" align="center" prop="equipmentPlace" />
      <el-table-column label="设备状态" align="center" prop="machineStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.machine_status" :value="scope.row.machineStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="设备型号" align="center" prop="equipmentModel" />
      <!-- <el-table-column label="设备品牌" align="center" prop="equipmentBrand" />
      <el-table-column label="供应商" align="center" prop="equipmentSupplier" />
      <el-table-column label="维护人" align="center" prop="maintenancePerson" />
      <el-table-column label="联系方式" align="center" prop="maintenancePhone" />
      <el-table-column label="维保单位" align="center" prop="maintenanceUnit" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="时间戳" align="center" prop="ts" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ts, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否删除,0正常,1删除" align="center" prop="dr" /> -->
      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['safety:equipment:edit']"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['safety:equipment:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['safety:equipment:remove']"
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

    <!-- 添加或修改设备管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="form.equipmentName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备类型" prop="machineType">
          <el-select v-model="form.machineType">
            <el-option
              v-for="item in  dict.type.machine_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属园区" prop="pkPark">
          <el-select v-model="form.pkPark">
            <el-option
              v-for="item in parkOptions"
              :key="item.pkPark"
              :label="item.parkName"
              :value="item.pkPark"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号" prop="equipmentSerial">
          <el-input v-model="form.equipmentSerial" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="设备位置" prop="equipmentPlace">
          <el-input v-model="form.equipmentPlace" placeholder="请输入设备位置" />
        </el-form-item>
        <el-form-item label="设备状态" prop="machineStatus">
          <el-select v-model="form.machineStatus">
            <el-option
              v-for="item in  dict.type.machine_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="equipmentModel">
          <el-input v-model="form.equipmentModel" placeholder="请输入设备型号" />
        </el-form-item>
        <!--<el-form-item label="设备品牌" prop="equipmentBrand">
          <el-input v-model="form.equipmentBrand" placeholder="请输入设备品牌" />
        </el-form-item> -->
        <!-- <el-form-item label="供应商" prop="equipmentSupplier">
          <el-input v-model="form.equipmentSupplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="维护人" prop="maintenancePerson">
          <el-input v-model="form.maintenancePerson" placeholder="请输入维护人" />
        </el-form-item>
        <el-form-item label="联系方式" prop="maintenancePhone">
          <el-input v-model="form.maintenancePhone" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="维保单位" prop="maintenanceUnit">
          <el-input v-model="form.maintenanceUnit" placeholder="请输入维保单位" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="时间戳" prop="ts">
          <el-date-picker clearable
            v-model="form.ts"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择时间戳">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否删除,0正常,1删除" prop="dr">
          <el-input v-model="form.dr" placeholder="请输入是否删除,0正常,1删除" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment } from "@/api/safety/equipment";
import { listParkAll} from "@/api/system/park";
export default {
  name: "Equipment",
  dicts: ['machine_type','machine_status'],
  data() {
    return {
      parkOptions: [],
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
      // 设备管理表格数据
      equipmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        equipmentName: undefined,
        machineType: undefined,
        machineStatus: undefined,
        pkPark: undefined,
        equipmentSerial: undefined,
        equipmentPlace: undefined,
        equipmentModel: undefined,
        equipmentBrand: undefined,
        equipmentSupplier: undefined,
        maintenancePerson: undefined,
        maintenancePhone: undefined,
        maintenanceUnit: undefined,
        ts: undefined,
        dr: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pkWorkOrderRule: [
          { required: true, message: "pk不能为空", trigger: "blur" }
        ],
        equipmentName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        machineType: [
          { required: true, message: "设备类型不能为空", trigger: "change" }
        ],
        machineStatus: [
          { required: true, message: "设备状态不能为空", trigger: "blur" }
        ],
        pkPark: [
          { required: true, message: "所属园区不能为空", trigger: "blur" }
        ],
        equipmentSerial: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        equipmentPlace: [
          { required: true, message: "设备位置不能为空", trigger: "blur" }
        ],
        equipmentModel: [
          { required: true, message: "设备型号不能为空", trigger: "blur" }
        ],
        equipmentBrand: [
          { required: true, message: "设备品牌不能为空", trigger: "blur" }
        ],
        equipmentSupplier: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        maintenancePerson: [
          { required: true, message: "维护人不能为空", trigger: "blur" }
        ],
        maintenancePhone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        maintenanceUnit: [
          { required: true, message: "维保单位不能为空", trigger: "blur" }
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
    listParkAll().then(response => {
      this.parkOptions = response.data;
    });
    this.getList();
  },
  methods: {
    parkFormat(row,column){
       let labelData = this.parkOptions.find(item => row.pkPark === item.pkPark);
       return labelData !== undefined ? labelData.parkName : '';
    },
    /** 查询设备管理列表 */
    getList() {
      this.loading = true;
      listEquipment(this.queryParams).then(response => {
        this.equipmentList = response.rows;
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
        pkWorkOrderRule: undefined,
        equipmentName: undefined,
        machineType: undefined,
        machineStatus: "0",
        pkPark: undefined,
        equipmentSerial: undefined,
        equipmentPlace: undefined,
        equipmentModel: undefined,
        equipmentBrand: undefined,
        equipmentSupplier: undefined,
        maintenancePerson: undefined,
        maintenancePhone: undefined,
        maintenanceUnit: undefined,
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
      this.ids = selection.map(item => item.pkWorkOrderRule)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设备管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const pkWorkOrderRule = row.pkWorkOrderRule || this.ids
      getEquipment(pkWorkOrderRule).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改设备管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.pkWorkOrderRule != null) {
            updateEquipment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addEquipment(this.form).then(response => {
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
      const pkWorkOrderRules = row.pkWorkOrderRule || this.ids;
      this.$modal.confirm('是否确认删除设备管理编号为"' + pkWorkOrderRules + '"的数据项？').then(() => {
        this.loading = true;
        return delEquipment(pkWorkOrderRules);
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
      this.download('safety/equipment/export', {
        ...this.queryParams
      }, `equipment_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
