import * as lodash from 'lodash'

import ConnectionController from '../src/controllers/ConnectionController'

declare global {
  interface Window {
    INITIALIZED: boolean,
    CONNECTION: ConnectionController
    _: lodash.LoDashStatic
    $: JQueryStatic
    Hammer: HammerStatic
    IS_MOBILE: boolean,
    // ------------------------------------------
    opera?: any
   }
}

declare type Nullable<T> = T | null;

declare type coord = [
  number, number
]

declare enum AllowedDirections {
  up = 0,
  right = 1,
  down = 2,
  left = 3,
}

declare interface OnlineInstance {
  id: Nullable<number>,
  flags: {
    started: boolean,
    ended: boolean,  
  },
  fruit: Nullable<coord>,
  gridSize: Nullable<number>,
  players: PlayerData[]
}

declare interface PlayerData {
  id: Nullable<number>,
  name: Nullable<string>,
  game_id: Nullable<number>,
  flags: {
    connected: Boolean,
    prepared: Boolean,
  },
  snake: Nullable<Snake>,
  secret: Nullable<string>
}

declare interface Snake {
  head: coord,
  id: string,
  body: [{
    direction: number,
    _length: number
  }],
  nextDirection: number,
  prevDirection: number,
  counter: number,
  flags: {
    dead: boolean
  }
}

