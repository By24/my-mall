<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.name" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='info' icon='el-icon-search' @click="getUsers">查询</el-button>
            </el-form-item>
            <el-form-item style="margin-left:30px">
                <el-button type='info' @click="handleAdd">打印订单</el-button>
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
        <el-table-column prop="name" label="订单号" sortable>
        </el-table-column>
        <el-table-column prop="name" label="支付金额" sortable>
        </el-table-column>
        <el-table-column prop="name" label="用户账号" sortable>
        </el-table-column>
        <el-table-column prop="name" label="备注" sortable>
        </el-table-column>
        <el-table-column prop="name" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="物流号" sortable>
        </el-table-column>
        <el-table-column prop="phone" label="支付时间" sortable>
        </el-table-column>
        <el-table-column prop="address" label="关闭时间" sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="完成时间"  sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="订单状态"  sortable>
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">发货</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">备注</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">取消</el-button>
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

    <!--打印界面-->
    <el-dialog title="打印预览" v-model="addFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <h1 class="order_title">商城订单信息</h1>
        <template>
            <el-form label-position='left' inline class='demo-table-expand'>
                <el-form-item label='会员名称：'>
                    <span>}</span>
                </el-form-item>
                <el-form-item label='下单时间：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='订单编号：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='支付方式：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='付款时间：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='发货时间：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='发货单号：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='收货人：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='手机：'>
                    <span></span>
                </el-form-item>
                <el-form-item label='收货地址：'>
                    <span></span>
                </el-form-item>
            </el-form>
        </template>
        <el-table :data="users"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" border style="width: 100%;text-align: center;">
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="name" label="商品ID">
            </el-table-column>
            <el-table-column prop="name" label="价格">
            </el-table-column>
            <el-table-column prop="name" label="数量">
            </el-table-column>
            <el-table-column prop="name" label="小计">
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">打印</el-button>
        </div>
    </el-dialog>
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
      }
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
    // 显示弹框
    handleAdd () {
     this.editFormVisible = true
    },
    //  打印
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

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .order_title{
      font-size: 30px;
      text-align: center;
      padding: 0px 0 25px 0;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>

