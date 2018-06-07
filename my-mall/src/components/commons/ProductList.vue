<template>
    <div>
        <el-row :gutter='24'>
            <el-col :span='6'><div class='grid-content bg-purple'><el-input v-model='sysName' placeholder='请输用户名'></el-input></div></el-col>
            <el-col :span='6'><div class='grid-content bg-purple'><el-button type='info' icon='el-icon-search'>搜索</el-button></div></el-col>
        </el-row>
        <el-row :gutter='24'  style='margin-top:20px'>
            <el-col :span='24'>
                <div class='grid-content bg-purple'>
                    <el-table :data='tableData' v-loading='loading' style='width: 100%'>
                        <el-table-column
                            type='selection'
                            width='55'>
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
                        <el-table-column
                        label='商品 ID'
                        prop='id'>
                        </el-table-column>
                        <el-table-column
                        label='商品名称'
                        prop='name'>
                        </el-table-column>
                        <el-table-column
                        label='分类'
                        prop='desc'>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            上架
                            </el-button>
                            <el-button type="text" @click.native.prevent="deleteRow(scope.$index, tableData)">编辑</el-button>
                            <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            删除
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter='24' style='margin-top:20px'>
            <el-col :span='12'>
                <div> <el-button type='danger' disabled>批量删除</el-button></div>
            </el-col>
            <el-col :span='12'>
                <div class='grid-content bg-purple' style='float: right;'>
                    <el-pagination
                        @size-change='handleSizeChange'
                        @current-change='handleCurrentChange'
                        :current-page='currentPage4'
                        :page-sizes='[100, 200, 300, 400]'
                        :page-size='1'
                        layout='total, sizes, prev, pager, next, jumper'
                        :total='tableData.length'>
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="商品编辑" :visible.sync="editForm" :before-close="handleClose" class="ed">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            <!-- <div  class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit">提交</el-button>
            </div> -->
        </el-dialog>

    </div>
</template>
<script>
import { requestSysList } from '../../api/api'
export default {
  data () {
    return {
      sysName: '',
      loading: true,
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
      }
    }
  },
  mounted () {
    var currentPage = {}
    requestSysList(currentPage).then(res => {
      var { msg, code, data } = res
      if (code === 200) {
        this.loading = false
        console.log(msg, data)
      }
    })
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    editSubmit () {
      console.log(1)
    },
    deleteRow (index, rows) {
      this.editForm = true
      console.log(this.editForm)
    },
    handleClose () {
      this.editForm = false
    },
    onSubmit () {}
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
    border: 1px solid #ededed
}
</style>
