<template>
  <div class="article">
    <div class="d-flex py-3 px-2 border-bottom">
      <span class="text-blue px-2" @click="$router.back()">&lt;</span>
      <div class="flex-1 text-blue text-ellipsis">{{articles.title}}</div>
      <div class="text-grey fs-sm">{{articles.createdAt | date}}</div>
    </div>
    <div class="px-3 body" v-html="articles.body"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="sprite sprite-menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
        class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in articles.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    id: {required: true}
  },
  data () {
    return {
      articles: {}
    }
  },
  filters: {
    date (val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      let res = await this.$http.get(`articles/${this.id}`)
      this.articles = res.data
    }
  },
  watch: {
    id () {
      this.getArticles()
    }
  }
}
</script>

<style lang="scss">
.article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>