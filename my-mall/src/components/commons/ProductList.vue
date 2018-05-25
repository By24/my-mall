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
                                <span>{{ props.row.desc }}</span>
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
                        label='描述'
                        prop='desc'>
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
      currentPage4: 4
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
</style>
