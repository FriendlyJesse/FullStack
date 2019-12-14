<template>
  <div class="card bg-white mt-3 p-3">
      <div class="card-header pb-3 d-flex ai-center">
        <i class="sprite" :class="`sprite-${icon}`"></i>
        <h2 class="fs-xl flex-1 px-2">{{title}}</h2>
        <i class="sprite sprite-more"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
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
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
  }
}
</script>