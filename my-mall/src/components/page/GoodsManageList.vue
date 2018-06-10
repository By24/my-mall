<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.name" placeholder="商品名称、描述、价格"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="value" placeholder="请选择分类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                  v-model="value7"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>  
            </el-form-item>
            <el-form-item style="margin-right:30px">
                <el-button type='info' icon='el-icon-search' @click="getUsers">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type='info' icon='el-icon-search' @click="handleAdd">添加商品</el-button>
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <!-- 商品列表 -->
    <el-table :data='tableData' v-loading='listLoading' @selection-change="selsChange" style='width: 100%'>
        <el-table-column type='selection' width='55'>
        </el-table-column>
        <el-table-column type='expand'>
        <template slot-scope='props'>
            <el-form label-position='left' inline class='demo-table-expand'>
            <el-form-item label='商品名称'>
                <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label='所属店铺'>
                <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label='商品 ID'>
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label='店铺 ID'>
                <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label='商品分类'>
                <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label='店铺地址'>
                <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label='商品描述'>
                <img src="../../assets/logo.png" alt="" class="img">
                <img src="../../assets/logo.png" alt="" class="img">
                <img src="../../assets/logo.png" alt="" class="img">
                <img src="../../assets/logo.png" alt="" class="img">
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column label='商品 ID' prop='id'>
        </el-table-column>
        <el-table-column label='商品名称' prop='name'>
        </el-table-column>
        <el-table-column label='分类' prop='desc'>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-pagination
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
            :current-page='currentPage4'
            :page-sizes='[100, 200, 300, 400]'
            :page-size='1'
            layout='total, sizes, prev, pager, next, jumper'
            :total='tableData.length' style="float:right">
        </el-pagination>
    </el-col>
    <!-- 添加商品 -->
    <el-dialog title="商品编辑" :visible.sync="editForm" :before-close="handleClose" class="ed">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品展示价格">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input-number v-model="form.name" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="购买限制数量">
                <el-input-number v-model="form.name" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="展示图片上传">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否上架">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="商品详情">
                <quill-editor 
                  v-model="content" 
                  ref="myQuillEditor" 
                  :options="editorOption" 
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
                </quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</section>
</template>
<script>
import { requestSysList, batchRemoveGoods } from '../../api/api'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {},
  data () {
    return {
      filters: {
        name: ''
      },
      listLoading: true,
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      currentPage4: 4,
      // 列表选中列
      sels: [],
      editForm: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
      value7: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      // 富文本
      content:'',
      editorOption: {
        // modules: {
        //     toolbar: [
        //       ['bold', 'italic', 'underline', 'strike'],// toggled buttons
        //       ['blockquote', 'code-block', 'image', 'video', 'link']
        //     ]
        // }
      }
    }
  },
  mounted () {
    var currentPage = {}
    requestSysList(currentPage).then(res => {
      var { msg, code, data } = res
      if (code === 200) {
        this.listLoading = false
        console.log(msg, data)
      }
    })
  },
  methods: {
    getUsers () {},
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    editSubmit () {
      console.log(1)
    },
    handleEdit (index, rows) {
      this.editForm = true
      console.log(this.editForm)
    },
    handleClose () {
      this.editForm = false
    },
    onSubmit () {},
    selsChange (sels) {
      this.sels = sels
    },
    // 上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 富文本
    onEditorBlur () {
      // 失去焦点事件
    },
    onEditorFocus () {
      // 获得焦点事件
    },
    onEditorChange () {
      // 内容改变事件
    },
    // 添加商品
    handleAdd () {
      this.editForm = true
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        batchRemoveGoods(para).then((res) => {
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
      console.log(index, row)
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
.img{
    width: 100px;
    border: 1px solid #ededed;
}
</style>
