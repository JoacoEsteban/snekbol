<template>
  <div>
    <swipe-receiver></swipe-receiver>
    <div class="app-container">
      <div class="game-container">
        <div id="counter"></div>
        <div ref="main-grid" id="main-grid" v-if="onlineInstance && onlineInstance.gridSize">
          <div class="row" v-for="row in onlineInstance.gridSize" :key="row">
            <div cell v-for="cell in onlineInstance.gridSize" :key="cell">
            </div>
          </div>
        </div>
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
      refs: this.$refs,
      get mainGrid () {
        return $(this.refs['main-grid'])
      }
    }
  },
  computed: {
    onlineInstance () {
      return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
    },
  },
  watch: {
    onlineInstance (val) {
      this.paintCanvas()
    }
  },
  methods: {
    paintCanvas() {
      this.clearBoard()
      this.onlineInstance.flags.started && this.onlineInstance.players.forEach((player) => {
        // if (player.id === playerData.id) mySnake = player.snake
        this.paintSnake(player.snake)
      })
      this.paintFruit()
    },
    paintFruit (fruit = this.onlineInstance.fruit) {
      this.paint(fruit, 'fruit')
    },
    clearBoard () {
      this.mainGrid.find('div[cell]').removeClass()
    },
    paintSnake(snake) {
      
      const classNames = 'snake' + (snake.flags.dead ? ' dead' : '')

      // this.paint(snakeHead, classNames)
      const start = snake.head
      const snakeBody = snake.body
      snakeBody.forEach(segment => {
        this.paint(start, classNames)
        // FIXME 1 cell less
        for (let i = 0; i < segment._length; i++) {
          switch (segment.direction) {
            case 0:
              start[0] += 1
              break
            case 1:
              start[1] -= 1
              break
            case 2:
              start[0] -= 1
              break
            case 3:
              start[1] += 1
              break
          }
          this.paint(start, classNames)
        }
      })
    },
    paint (coords, className) {
      if (!coords) return
      const cell = $(this.mainGrid.children()[coords[0]]).children()[coords[1]]
      cell && $(cell).addClass(className)
    }
  }
};
</script>


<style lang="scss" scoped>
</style>  