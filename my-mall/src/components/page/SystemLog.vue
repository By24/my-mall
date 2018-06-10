<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='info' @click="getUsers">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            </el-form-item>
        </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="name" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="日志名称" :formatter="formatSex">
        </el-table-column>
        <el-table-column prop="phone" label="类型" >
        </el-table-column>
        <el-table-column prop="address" label="请求路径">
        </el-table-column>
        <el-table-column prop="logoDate" label="请求类型">
        </el-table-column>
        <el-table-column prop="logoDate" label="请求参数">
        </el-table-column>
        <el-table-column prop="logoDate" label="登录用户">
        </el-table-column>
        <el-table-column prop="logoDate" label="IP">
        </el-table-column>
        <el-table-column prop="logoDate" label="IP位置">
        </el-table-column>
                <el-table-column prop="logoDate" label="耗时">
        </el-table-column>
                        <el-table-column prop="logoDate" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
          :current-page='5'
          :page-sizes='[100, 200, 300, 400]'
          :page-size='1'
          layout='total, sizes, prev, pager, next, jumper'
          :total='users.length' style="float:right">
        </el-pagination>
        <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination> -->
    </el-col>
</section>
</template>

<script>
// import util from '../commons/util'
import { getUserListPage, batchRemoveUser, addUser} from '../../api/api'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      // 列表选中列
      sels: [],
      // 编辑界面是否显示
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },
      // 新增界面是否显示
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value7: ''
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getUserListPage(para).then((res) => {
        console.log(res)
        this.total = res.data.total
        this.users = res.data
        this.listLoading = false
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleAdd () {},
    //  新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            addUser(para).then((res) => {
              this.addLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    handleEdit: function (index, row) {
      console.log(index, row)
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {})
    },
    // 单一删除
    handleDel: function (index, row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: row.name }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {})
    },
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? '先生' : row.sex === 0 ? '女士' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    }
  }
}
</script>
