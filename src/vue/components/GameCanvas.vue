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

<script lang="ts">
let $ = window.$
let $mainGrid: JQueryVueRef

import SwipeReceiver from './SwipeReceiver.vue'
import { coord, OnlineInstance, Nullable, Snake, JQueryVueRef, snakeBodyElement } from '@@types';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    SwipeReceiver
  }
})

export default class GameCanvas extends Vue {
  // @State('ONLINE_INSTANCE') onlineInstance: OnlineInstance
  get onlineInstance (): OnlineInstance {
    return this.$store.state.ONLINE_INSTANCE && this.$store.state.ONLINE_INSTANCE.game
  }
  mainGrid (): JQueryVueRef {
    return ($mainGrid && $mainGrid[0] && $mainGrid) || ($mainGrid = $(this.$refs['main-grid']))
  }

  mounted() {
    $ = window.$
  }

  @Watch('onlineInstance')
  onChange() {
    this.paintCanvas()
  }

  paintCanvas(): void {
    this.clearBoard()
    this.onlineInstance.flags.started && this.onlineInstance.players.forEach((player) => {
      // if (player.id === playerData.id) mySnake = player.snake
      player.snake && this.paintSnake(player.snake)
    })
    this.paintFruit()
  }

  paintFruit (fruit?: Nullable<coord>): void {
    !fruit && (fruit = this.onlineInstance.fruit)
    fruit && this.paint(fruit, 'fruit')
  }

  clearBoard () {
    this.mainGrid().find('div[cell]').removeClass()
  }

  paintSnake(snake: Snake) {
    const classNames = 'snake' + (snake.flags.dead ? ' dead' : '')

    const start = snake.head
    const snakeBody = snake.body

    snakeBody.forEach((segment: snakeBodyElement) => {
      for (let i = 0; i < segment._length; i++) {
        this.paint(start, classNames)
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
      }
    })
  }
  paint (coords: coord, className: string): void {
    if (!coords) return
    const cell = $(this.mainGrid().children()[coords[0]]).children()[coords[1]]
    cell && $(cell).addClass(className)
  }
}

</script>


<style lang="scss" scoped>
</style>  