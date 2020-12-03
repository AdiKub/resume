<template>
  <div id="app">
    <ModalHer />
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  @import 'assets/styles/index.scss';
</style>

<script>
import ModalHer from '@/components/modals/ModalHer.vue'

export default {
  components: {
    ModalHer
  }
}
</script>
