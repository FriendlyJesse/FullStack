<template>
  <div class="hero">
    <div class="topbar d-flex ai-center bg-black py-2 px-3 text-white">
      <img src="@/assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span class="text-white py-1">王者荣耀</span>
        <span class="ml-4">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required: true}
  },
  data () {
    return {
      model: {}
    }
  },
  created () {
    this.getHero()
  },
  methods: {
    async getHero () {
      let res = await this.$http.get(`heroes/${this.id}`)
    }
  }
}
</script>