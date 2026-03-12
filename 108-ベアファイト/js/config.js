// ===========================
// config.js - 定数・設定値のみ
// letやvar、関数は書かない
// ===========================

// --- ゲーム基本設定 ---
const GAME_TITLE = 'ゲームタイトル';
const CANVAS_WIDTH  = 480;
const CANVAS_HEIGHT = 720;

// --- 物理 ---
const GRAVITY    = 0.4;
const JUMP_POWER = -12;

// --- プレイヤー ---
const PLAYER_SPEED  = 4;
const PLAYER_SIZE   = 32;
const PLAYER_COLOR  = '#4fc3f7';
const PLAYER_LIVES  = 3;

// --- 敵 ---
const ENEMY_SPEED = 2;
const ENEMY_SIZE  = 28;
const ENEMY_COLOR = '#ef5350';

// --- スコア ---
const SCORE_PER_ENEMY  = 100;
const SCORE_PER_ITEM   = 50;

// --- ゲームループ ---
const TARGET_FPS   = 60;
const FRAME_TIME   = 1000 / TARGET_FPS;

// --- 色パレット ---
const COLORS = {
  bg:       '#0f0f1a',
  ground:   '#4a4a6a',
  accent:   '#f0c040',
  danger:   '#ff6b6b',
  safe:     '#69f0ae',
  text:     '#ffffff',
  textDim:  '#aaaaaa',
};

// --- ゲーム状態 ---
const GameState = {
  START:    'start',
  PLAYING:  'playing',
  PAUSED:   'paused',
  GAMEOVER: 'gameover',
  CLEAR:    'clear',
};

// --- 入力キー ---
const KEYS = {
  LEFT:   ['ArrowLeft',  'a', 'A'],
  RIGHT:  ['ArrowRight', 'd', 'D'],
  UP:     ['ArrowUp',    'w', 'W', ' '],
  DOWN:   ['ArrowDown',  's', 'S'],
  ACTION: ['z', 'Z', 'j', 'J', 'Enter'],
  PAUSE:  ['Escape', 'p', 'P'],
};
