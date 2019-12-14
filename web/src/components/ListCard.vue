<template>
  <v-card :title="title" :icon="icon">
    <nav class="nav jc-between">
      <div v-for="(item, i) in categories" :key="i" class="nav-item" :class="{active: active === i}" @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{item.name}}</div>
      </div>
    </nav>
    <div class="pt-2">
      <swiper :options="swiperOption" ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.card {
  &-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import vCard from '@/components/Card'

export default {
  name: 'listCard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide,
    vCard
  },
  data () {
    return {
      swiperOption: {
        loop : true,
        autoHeight: true
      },
      active: 0
    }
  }
}
</script>