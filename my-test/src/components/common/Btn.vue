<template>
    <div class="btn_list">
        <button>顶部</button>
    </div>
</template>

<script>
export default {
  name: 'Btn',
  data () {
    return {}
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  handleScroll () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    console.log(scrollTop)
  }
}
</script>

<style scoped>
.btn_list{
    position: fixed;
    right: 50px;
    bottom: 50px;
    background: #000;
    opacity: .5;
}
button{
    background: #000;
    opacity: .5;
    color: #fff;
    outline:none;
    cursor:pointer;
    padding: 10px;
}
</style>
