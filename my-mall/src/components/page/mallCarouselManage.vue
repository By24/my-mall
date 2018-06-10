<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-button type='info' @click="handleAdd">添加轮播图</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="图片" >
        </el-table-column>
        <el-table-column prop="phone" label="跳转链接" sortable>
        </el-table-column>
        <el-table-column prop="address" label="展示商品ID" sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="商品名称"  sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="排序值"  sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="创建日期"  sortable :formatter="formatSex">
        </el-table-column>
            <el-table-column prop="logoDate" label="创建日期"  sortable :formatter="formatSex">
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
          :current-page='5'
          :page-sizes='[100, 200, 300, 400]'
          :page-size='1'
          layout='total, sizes, prev, pager, next, jumper'
          :total='users.length' style="float:right">
        </el-pagination>
        <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination> -->
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑模块" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm">
            <el-form-item label="板块名称" prop="name">
                <!-- <el-input v-model="addForm.name" auto-complete="off"></el-input> -->
                <label>轮播图</label>
            </el-form-item>
            <el-form-item label="关联类型">
                <el-select v-model="addForm.region" @change="handleChange" style="width:320px">
                  <el-option label="关联商品" value="goods"></el-option>
                  <el-option label="其他链接" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品ID" prop="name" v-if="assType">
                <el-cascader :options="options" :show-all-levels="false" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <el-form-item label="其他链接" prop="name" v-else>
                <el-input placeholder="请输入链接" v-model="addForm.name" style="width:300px">
                  <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="addForm.delivery"></el-switch>
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
            <el-form-item label="板块名称" prop="name">
                <!-- <el-input v-model="addForm.name" auto-complete="off"></el-input> -->
                <label>轮播图</label>
            </el-form-item>
            <el-form-item label="关联类型">
                <el-select v-model="addForm.region" @change="handleChange" style="width:320px">
                  <el-option label="关联商品" value="goods"></el-option>
                  <el-option label="其他链接" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品ID" prop="name" v-if="assType">
                <el-cascader :options="options" :show-all-levels="false" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <el-form-item label="其他链接" prop="name" v-else>
                <el-input placeholder="请输入链接" v-model="addForm.name" style="width:300px">
                  <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="排序优先值">
                <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="addForm.delivery"></el-switch>
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
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</section>
</template>

<script>
import util from '../commons/util'
import { getUserListPage, batchRemoveUser, addUser} from '../../api/api'
export default {
  data () {
    return {
       options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
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
        addr: '',
        delivery: false,
        region: {
          user: '',
          region: ''
        }
      },
      assType: false
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
    handleChange (value) {
      if(value === 'goods'){
        this.assType = true
      } else {
        this.assType = false
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleAdd () {
      console.log(11)
      this.addFormVisible = true
    },
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
    // 选中
    selsChange: function (sels) {
      this.sels = sels
    },
    // 编辑
    handleEdit (index, rows) {
      this.editFormVisible = true
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
