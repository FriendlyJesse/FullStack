<template>
  <div class="main">
    <div class="topbar d-flex ai-center bg-black py-2 px-3">
      <img src="@/assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <div class="text-white py-1">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <header>
      <nav class="nav nav-inverse jc-around bg-primary pt-3 pb-2">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="scss" scoped>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>