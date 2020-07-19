<template>
  <div>
    <swipe-receiver></swipe-receiver>
    <div class="app-container">
      <div class="game-container">
        <div id="counter"></div>
        <div id="main-grid"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SwipeReceiver from './SwipeReceiver.vue'
export default {
  components: {
    SwipeReceiver
  },
  data() {
    return {
    } 
  }
};
</script>


<style lang="scss" scoped>
</style>