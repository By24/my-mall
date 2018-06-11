<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-button type='info' @click="handleAdd">添加轮播图</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>

    <!--列表-->
    <el-table :data="dataTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="_id" label="ID">
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
             <img src="../../assets/logo.png" alt="" class="img">
          </template>
        </el-table-column>
        <el-table-column prop="url" label="跳转链接">
        </el-table-column>
        <el-table-column prop="showId" label="展示商品ID">
        </el-table-column>
        <el-table-column prop="showId" label="商品名称">
        </el-table-column>
        <el-table-column prop="sort" label="排序值" sortable>
        </el-table-column>
        <el-table-column prop="time" label="创建日期"  sortable>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="info" size="small" @click="handleDel(scope.$index, scope.row)" v-if="scope.row.sex">启用</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-else>禁用</el-button>
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
          :page-size='1'
          layout='total, sizes, prev, pager, next, jumper'
          :total='total' style="float:right">
        </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑模块" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="150px" :rules="addFormRules" ref="editForm">
            <el-form-item label="板块名称" prop="name">
                <label>轮播图</label>
            </el-form-item>
            <el-form-item label="关联类型">
                <el-select v-model="editForm.type" @change="handleChange" style="width:320px">
                  <el-option label="关联商品" value="goods"></el-option>
                  <el-option label="其他链接" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品ID" prop="name" v-if="editForm.showId == '关联商品 '">
                <el-cascader v-model="editForm.showId" :options="options" :show-all-levels="false" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <el-form-item label="其他链接" prop="name" v-else>
                <el-input placeholder="请输入链接" v-model="editForm.showId" style="width:300px">
                  <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="editForm.sort" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="editForm.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="图片上传">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <!-- <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加轮播图" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm">
            <el-form-item label="板块名称">
                <label>轮播图</label>
            </el-form-item>
            <el-form-item label="关联类型">
                <el-select v-model="addForm.type" @change="handleChange">
                  <el-option label="关联商品" value="关联商品"></el-option>
                  <el-option label="其他链接" value="其他链接"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品ID" v-if="assType">
                <el-cascader :props="props" :options="options2" @active-item-change="handleItemChange" :show-all-levels="false"  expand-trigger="hover" @change="addOnChange"></el-cascader>
            </el-form-item>
            <el-form-item label="其他链接" v-else>
                <el-input v-model="addForm.showId" placeholder="请输入链接">
                  <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="addForm.sort" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="addForm.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="图片上传">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = addLoading = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</section>
</template>

<script>
import util from '../commons/util'
import { getFindCarousel, getAddCarousel, getEditCarousel, getRemoveCarousel, getiFCarousel} from '../../api/api'
export default {
  data () {
    return {
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
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
        title: '轮播图',
        type: '',
        showId: '',
        sort: '',
        disabled: false,
        imgUrl:''
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
        title: '轮播图',
        type: '',
        showId: '',
        sort: '',
        disabled: false,
        imgUrl:''
      },
      assType: false
    }
  },
  mounted () {
    this.getInitialize()
  },
  methods: {
    // 获取用户列表
    getInitialize () {
      let para = {
        page: this.page,
        limit: this.limit
      }
      this.listLoading = true
      getFindCarousel(para).then((res) => {
        console.log(res)
        this.total = res.total
        this.dataTable = res.data
        this.listLoading = false
      })
    },
    handleChange (value) {
      if(value === '关联商品'){
        this.assType = true
      } else {
        this.assType = false
        this.addForm.showId = ''
      }
    },
    // 上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 每页显示条数
    handleSizeChange (val) {
      this.page = val
      this.getInitialize()
    },
    // 上\下翻页
    handleCurrentChange (val) {
      this.page = val
      this.getInitialize()
    },
    // 显示添加弹框
    handleAdd () {
      console.log(11)
      this.addFormVisible = true
    },
    //  提交新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addForm)
          // para.birth = util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
          getAddCarousel(para).then((res) => {
            console.log(res)
            this.addLoading = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$refs['addForm'].resetFields()
            this.addFormVisible = false
            this.getInitialize()
          })
        }
      })
    },
    // 显示编辑弹框
    handleEdit (index, rows) {
      this.editForm = {
        title: rows.title,
        type: rows.type,
        showId: '',
        sort: rows.sort,
        imgUrl:'',
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
            getEditCarousel(para).then((res) => {
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
    // 商品id级联
    handleItemChange(val) {
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: '南京'
          }];
        } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: '杭州'
          }];
        }
      }, 300)
    },
    addOnChange (e) {
      this.addForm.showId = e[e.length-1]
    },
    // 选中
    selsChange: function (sels) {
      this.sels = sels
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
          this.getInitialize()
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
          this.getInitialize()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.img{
  width: 100px;
  border: 1px solid #ededed;
}
</style>

