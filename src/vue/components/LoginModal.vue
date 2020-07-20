<template>
  <div v-if="!kill" :class="{hide: hideLocal}" class="modal-wrapper fix-full">
    <form class="modal-container" @submit="submit">
      <span class="name mb-4">
        My snek is called
        <input autofocus required type="text" v-model.trim="snakeName" class="bold" />
      </span>
      <button class="mt-2" type="submit">Connect</button>
    </form>
  </div>
</template>

<script>
const names = require('../../static/SnakeNames')
export default {
  props: {
    hide: Boolean,
  },
  data() {
    return {
      snakeName: names.getOne(),
      hideLocal: this.$props.hide,
      kill: this.$props.hide
    }
  },
  watch: {
    async hide (val) {
      if (val) {
        this.kill = false
        this.hideLocal = true
        await this.$sleep(500)
        this.kill = true
      } else {
        this.kill = false
        this.hideLocal = true
        await this.$sleep()
        this.kill = true
        await this.$sleep(500)
      }
    }
  },
  methods: {
    async submit(e) {
      e && e.preventDefault()
      this.$emit('submit', this.snakeName)
    }
  }
};
</script>


<style lang="scss" scoped>
.modal-wrapper {
  font-size: 3em;
  padding: .5em 1em;
  position: absolute;
  background: var(--background-color);
  box-shadow: .2em .2em .5em #0001;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  $transition: .5s ease;
  transition: transform $transition;
  box-sizing: border-box;

  input {
    outline: none;
    border: none;
    border-bottom: 2px solid var(--background-color);
    width: 100%;
    color: var(--text-color);
    font-size: 2em;
    background-color: transparent;
  }

  .modal-container {

  }

  &.hide {
    pointer-events: none;
    transform: translateY(100vh);
    user-select: none;
  }
}

</style>