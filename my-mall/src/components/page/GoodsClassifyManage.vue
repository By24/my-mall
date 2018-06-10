<template>
<section>
  <!--工具条-->
  <div class="toolbar">
    <el-button type='info'>添加分类</el-button>
    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
  </div>
</section>
</template>

<script>
export default {
  data () {
    return {
      sels: []
    }
  }
}
</script>
<style scoped>

</style>
