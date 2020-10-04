import ConnectionController from '../controllers/ConnectionController'

declare global {
  interface Window {
    INITIALIZED: boolean;
    CONNECTION: ConnectionController;
    _: _.LoDashStatic;
    $: JQueryStatic;
    Hammer: HammerStatic;
    IS_MOBILE: boolean;
    // ------------------------------------------
    /* eslint-disable-next-line */
    opera?: any;
   }
}

export type Nullable<T> = T | null;

export type coord = [
  number, number
]

export enum AllowedDirections {
  up = 0,
  right = 1,
  down = 2,
  left = 3,
}

export enum AllowedDirectives {
  CONNECT = 'connect',
  IM_READY = 'imready',
  DIRECTION = 'direction',
}

export interface OnlineInstance {
  id: Nullable<number>;
  flags: {
    started: boolean;
    ended: boolean;  
  };
  fruit: Nullable<coord>;
  gridSize: Nullable<number>;
  players: PlayerData[];
}

export interface PlayerData {
  id: Nullable<number>;
  name: Nullable<string>;
  game_id: Nullable<number>;
  flags: {
    connected: boolean;
    prepared: boolean;
  };
  snake: Nullable<Snake>;
  secret: Nullable<string>;
}

export type snakeBodyElement = {
  direction: number;
  _length: number;
}
export interface Snake {
  head: coord;
  id: string;
  body: snakeBodyElement[];
  nextDirection: number;
  prevDirection: number;
  counter: number;
  flags: {
    dead: boolean;
  };
}

export type VueRef = Element | Vue | Vue[] | Element[]
export type JQueryVueRef = JQuery<VueRef>
