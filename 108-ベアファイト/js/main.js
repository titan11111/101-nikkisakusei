// ===========================
// main.js - ゲームループ・初期化
// ===========================

// --- Canvas セットアップ ---
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  // リサイズはこの関数のみで行う（ゲームループ内で呼ばない）
  const container = document.getElementById('gameContainer');
  canvas.width  = container.clientWidth;
  canvas.height = container.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- モバイル判定 ---
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
if (isMobile) {
  document.getElementById('mobileControls').classList.remove('hidden');
}

// --- 入力管理 ---
const input = { left: false, right: false, up: false, down: false, action: false };
const keysDown = new Set();

document.addEventListener('keydown', e => {
  keysDown.add(e.key);
  if (KEYS.LEFT.includes(e.key))   input.left   = true;
  if (KEYS.RIGHT.includes(e.key))  input.right  = true;
  if (KEYS.UP.includes(e.key))     { input.up   = true; e.preventDefault(); }
  if (KEYS.DOWN.includes(e.key))   input.down   = true;
  if (KEYS.ACTION.includes(e.key)) input.action = true;
  if (KEYS.PAUSE.includes(e.key))  togglePause();
});

document.addEventListener('keyup', e => {
  keysDown.delete(e.key);
  if (KEYS.LEFT.includes(e.key))   input.left   = false;
  if (KEYS.RIGHT.includes(e.key))  input.right  = false;
  if (KEYS.UP.includes(e.key))     input.up     = false;
  if (KEYS.DOWN.includes(e.key))   input.down   = false;
  if (KEYS.ACTION.includes(e.key)) input.action = false;
});

// モバイルボタン
function bindMobileBtn(id, key) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('touchstart', e => { input[key] = true;  e.preventDefault(); }, { passive: false });
  btn.addEventListener('touchend',   e => { input[key] = false; e.preventDefault(); }, { passive: false });
}
bindMobileBtn('btnLeft',   'left');
bindMobileBtn('btnRight',  'right');
bindMobileBtn('btnUp',     'up');
bindMobileBtn('btnAction', 'action');

// --- Web Audio ---
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playSound(frequency, duration = 0.1, type = 'square') {
  try {
    const ac = getAudioContext();
    const osc  = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ac.currentTime);
    gain.gain.setValueAtTime(0.25, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (e) { /* 音声なしで続行 */ }
}

// --- ゲーム状態 ---
let state     = GameState.START;
let player    = null;
let enemies   = [];
let particles = [];
let frameCount = 0;

function setState(newState) {
  state = newState;
  document.getElementById('startScreen').classList.toggle('hidden',    state !== GameState.START);
  document.getElementById('gameoverScreen').classList.toggle('hidden', state !== GameState.GAMEOVER);
  document.getElementById('clearScreen').classList.toggle('hidden',    state !== GameState.CLEAR);
}

function togglePause() {
  if (state === GameState.PLAYING) state = GameState.PAUSED;
  else if (state === GameState.PAUSED) state = GameState.PLAYING;
}

// --- 初期化 ---
function initGame() {
  player    = new Player(CANVAS_WIDTH / 2 - PLAYER_SIZE / 2, CANVAS_HEIGHT - 200);
  enemies   = [];
  particles = [];
  frameCount = 0;
  setState(GameState.PLAYING);
  getAudioContext(); // AudioContext を起動（ユーザー操作後）
}

// --- 更新 ---
function update() {
  if (state !== GameState.PLAYING) return;
  frameCount++;

  player.update(input);

  // 敵スポーン（60フレームごと）
  if (frameCount % 60 === 0) {
    enemies.push(new Enemy(Math.random() * (CANVAS_WIDTH - ENEMY_SIZE), -ENEMY_SIZE));
  }

  enemies.forEach(e => e.update());

  // 当たり判定
  enemies.forEach(e => {
    if (e.alive && player.hits(e)) {
      player.damage();
      e.alive = false;
      for (let i = 0; i < 8; i++) particles.push(new Particle(e.x, e.y, COLORS.danger));
    }
  });
  enemies = enemies.filter(e => e.alive && e.y < CANVAS_HEIGHT + 100);

  particles.forEach(p => p.update());
  particles = particles.filter(p => !p.dead);

  // ゲームオーバー
  if (player.lives <= 0) {
    document.getElementById('finalScore').textContent = player.score;
    setState(GameState.GAMEOVER);
  }
}

// --- 描画 ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 床
  ctx.fillStyle = COLORS.ground;
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

  if (state === GameState.PLAYING || state === GameState.PAUSED) {
    enemies.forEach(e => e.draw(ctx));
    particles.forEach(p => p.draw(ctx));
    player.draw(ctx);

    // HUD
    ctx.fillStyle = COLORS.text;
    ctx.font = `bold ${Math.round(canvas.width * 0.05)}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillText(`❤️ ${player.lives}`, 12, 32);
    ctx.textAlign = 'right';
    ctx.fillText(`${player.score}`, canvas.width - 12, 32);
    ctx.textAlign = 'left';

    // ポーズ表示
    if (state === GameState.PAUSED) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COLORS.text;
      ctx.font = `bold ${Math.round(canvas.width * 0.1)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left';
    }
  }
}

// --- ゲームループ ---
let lastTime = 0;
function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  if (delta >= FRAME_TIME) {
    lastTime = timestamp - (delta % FRAME_TIME);
    update();
    draw();
  }
  requestAnimationFrame(gameLoop);
}

// --- ボタンイベント ---
document.getElementById('startBtn').addEventListener('click', initGame);
document.getElementById('retryBtn').addEventListener('click', initGame);
document.getElementById('clearRetryBtn').addEventListener('click', initGame);

// --- 起動 ---
setState(GameState.START);
requestAnimationFrame(gameLoop);
