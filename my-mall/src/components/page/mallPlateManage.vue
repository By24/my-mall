<template>
<section>
  <!--工具条-->
  <div class="toolbar">
    <el-button type='info'>添加模块</el-button>
    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
  </div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="活动版块" name="first">
     <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="name" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="类别" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column label="缩略图" sortable width="100px">
          <template slot-scope='props'>
            <img src="../../assets/logo.png" alt="" class="img">
          </template>
        </el-table-column>
        <el-table-column prop="address" label="跳转链接" sortable>
        </el-table-column>
        <el-table-column prop="address" label="商品ID" sortable>
        </el-table-column>
        <el-table-column prop="address" label="商品名称" sortable>
        </el-table-column>
        <el-table-column prop="address" label="商品价格" sortable>
        </el-table-column>
        <el-table-column prop="address" label="排序值" sortable>
        </el-table-column>
        <el-table-column prop="address" label="创建日期" sortable>
        </el-table-column>
        <el-table-column prop="logoDate" label="更新日期"  sortable>
        </el-table-column>
        <el-table-column label="操作" width="200">
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
          :current-page='5'
          :page-sizes='[100, 200, 300, 400]'
          :page-size='1'
          layout='total, sizes, prev, pager, next, jumper'
          :total='users.length' style="float:right">
        </el-pagination>
    </el-col>
    </el-tab-pane>
    <el-tab-pane label="热门商品" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="官方精选" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="品牌周边" name="fourth142">定时任务补偿</el-tab-pane>
    <el-tab-pane label="品牌精选" name="fourth1422">定时任务补偿</el-tab-pane>
    <el-tab-pane label="活动版块2" name="fourth1421">定时任务补偿</el-tab-pane>
  </el-tabs>
</section>
</template>

<script>
import { getUserListPage, batchRemoveUser, addUser} from '../../api/api'
export default {
  data() {
    return {
      activeName: 'first',
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      // 列表选中列
      sels: []
    };
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    handleEdit: function (index, row) {
      console.log(index, row)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? '先生' : row.sex === 0 ? '女士' : '未知'
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
  }
};
</script>

<style scoped>
.img{
    width: 80px;
    height: 80px;
    border: 1px solid #ededed;
    box-sizing: content-box
}
</style>
