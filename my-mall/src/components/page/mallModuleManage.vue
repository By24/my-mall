<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-button type='info' @click="handleAdd">添加模块</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>

    <!--列表-->
    <el-table :data="dataTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="title" label="板块名称">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="sort" label="排序优先值" sortable>
        </el-table-column>
        <el-table-column prop="dataNum" label="最大容纳内容(商品)数" sortable>
        </el-table-column>
        <el-table-column prop="addr" label="备注">
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="success" size="small" @click="handleDel(scope.$index, scope.row)" v-if="scope.row.disabled">已开启</el-button>
                <el-button type="info" size="small" @click="handleDel(scope.$index, scope.row)" v-else>已关闭</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
          :current-page='limit'
          :page-sizes='[10, 20, 30, 40]'
          :page-size='page'
          layout='total, sizes, prev, pager, next, jumper'
          :total='total' style="float:right">
        </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑模块" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
            <el-form-item label="板块名称" prop="title">
                <el-input v-model="editForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="editForm.type" placeholder="请选择版块类型">
                  <el-option label="轮播图" value="轮播图"></el-option>
                  <el-option label="热销类（2）" value="热销类（2）"></el-option>
                  <el-option label="展示类（7）" value="展示类（7）"></el-option>
                  <el-option label="活动类（4）" value="活动类（4）"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="editForm.sort" :min="0" :max="200"></el-input-number>
            </el-form-item>
                <el-form-item label="最大容纳(商品)数">
                <el-input-number v-model="editForm.dataNum" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="editForm.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="editForm.addr"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加模块" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm">
            <el-form-item label="板块名称" prop="name">
                <el-input v-model="addForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="addForm.type" placeholder="请选择版块类型">
                  <el-option label="轮播图" value="轮播图"></el-option>
                  <el-option label="热销类（2）" value="热销类（2）"></el-option>
                  <el-option label="展示类（7）" value="展示类（7）"></el-option>
                  <el-option label="活动类（4）" value="活动类（4）"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="addForm.sort" :min="0" :max="200"></el-input-number>
            </el-form-item>
                <el-form-item label="最大容纳(商品)数">
                <el-input-number v-model="addForm.dataNum" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="addForm.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="addForm.addr"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</section>
</template>

<script>
import util from '../commons/util'
import { getFindModule, getRemoveModule, getAddModule, getEditModule, getiFModule} from '../../api/api'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      dataTable: [],
      total: 0,
      page: 1,
      limit: 10,
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
        title: '',
        type: '',
        sort: 0,
        dataNum: 0,
        disabled: true,
        addr: ''
      },
      // 新增界面是否显示
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        moduleName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        title: '',
        type: '',
        sort: 0,
        dataNum: 0,
        disabled: true,
        addr: ''
      },
    }
  },
  mounted () {
    this.getModuleList()
  },
  methods: {
    // 获取用户列表
    getModuleList () {
      let para = {
        page: this.page,
        limit: this.limit
      }
      this.listLoading = true
      getFindModule(para).then((res) => {
        console.log(res)
        this.total = res.total
        // this.page = res.pages
        this.dataTable = res.data
        this.listLoading = false
      })
    },
    // 每页显示条数
    handleSizeChange (val) {
      this.page = val
      this.getModuleList()
    },
    // 上\下翻页
    handleCurrentChange (val) {
      this.page = val
      this.getModuleList()
    },
    // 显示添加弹框
    handleAdd () {
      this.addFormVisible = true
    },
    //  提交添加板块
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addForm)
          getAddModule(para).then((res) => {
            this.addLoading = false
            if(res.code === 200){
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getModuleList()
            }else{
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    // 选中
    selsChange: function (sels) {
      this.sels = sels
    },
    // 显示编辑
    handleEdit (index, rows) {
      console.log(rows)
      this.editForm = {
        title: rows.title,
        type: rows.type,
        sort: rows.sort,
        dataNum: rows.dataNum,
        disabled:rows.disabled,
        addr: rows.addr,
        id: rows._id
      }
      this.editFormVisible = true
    },
    // 提交修改
    editSubmit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.editForm)
            getEditModule(para).then((res) => {
              this.addLoading = false
              if(res.code === 200){
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.getModuleList()
              }else{
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    handleDel (index, rows) {
      var para = {
        id: rows._id,
        disabled:!rows.disabled
      }
      getiFModule(para).then((res) => {
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getModuleList()
        }else{
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item._id).toString()
      this.listLoading = true
      let para = { id: ids }
      getRemoveModule(para).then((res) => {
        if(res.code === 200){
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getModuleList()
        }
      })
    }
  }
}
</script>
