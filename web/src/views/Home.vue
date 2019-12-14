<template>
  <section class="home">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="@/assets/images/1.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"  src="@/assets/images/2.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"  src="@/assets/images/3.jpeg">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination text-right" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3 mt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-xs">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <v-list-card title="新闻资讯" icon="menu" :categories="newCates">
      <template #items="{category}">
        <router-link :to="`/articles/${el._id}`" tag="div" class="py-2 d-flex" v-for="(el, n) in category.newsList" :key="n">
          <span class="text-info">[{{el.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark text-ellipsis">{{el.title}}</span>
          <span class="pl-1 text-grey-1">{{el.createdAt | date}}</span>
        </router-link>
      </template>
    </v-list-card>

    <v-list-card title="英雄列表" icon="hero" :categories="heroCates">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -.5rem">
          <router-link :to="`/heroes/${el._id}`" tag="div" class="py-2 text-center p-2" style="width: 20%" v-for="(el, n) in category.heroList" :key="n">
            <img class="w-100" :src="el.avatar">
            <span>{{el.name}}</span>
          </router-link>
        </div>
      </template>
    </v-list-card>

  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import vListCard from '@/components/ListCard'
import dayjs from 'dayjs'
 
export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    vListCard
  },
  data () {
    return {
      swiperOption: {
        loop : true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newCates: [],
      heroCates: [],
    }
  },
  filters: {
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created () {
    this.getNewsCats()
    this.getHeroCats()
  },
  methods: {
    async getNewsCats () {
      let res = await this.$http.get('news/list')
      this.newCates = res.data
    },
    async getHeroCats () {
      let res = await this.$http.get('heroes/list')
      this.heroCates = res.data
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/variables';
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n+1) {
      border-left: none;
    }
  }
}
</style>