<template>
    <div class="home">
        <header-top></header-top>
        <aside-nav></aside-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderTop from '@/components/common/header'
import AsideNav from '@/components/common/aside_nav'
export default {
  data(){
      return{}
  },
  components:{
    HeaderTop,
    AsideNav
  }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
