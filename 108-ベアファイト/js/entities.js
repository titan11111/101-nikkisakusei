// ===========================
// entities.js - キャラクタークラス
// ===========================

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = PLAYER_SIZE;
    this.h = PLAYER_SIZE;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.lives = PLAYER_LIVES;
    this.score = 0;
    this.invincible = 0; // 無敵フレーム数
  }

  update(input) {
    // 左右移動
    if (input.left)  this.vx = -PLAYER_SPEED;
    else if (input.right) this.vx = PLAYER_SPEED;
    else this.vx = 0;

    // ジャンプ
    if (input.up && this.onGround) {
      this.vy = JUMP_POWER;
      this.onGround = false;
      playSound(440, 0.1);
    }

    // 重力
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;

    // 無敵時間カウントダウン
    if (this.invincible > 0) this.invincible--;

    // 画面端処理
    if (this.x < 0) this.x = 0;
    if (this.x + this.w > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.w;

    // 床（仮）
    if (this.y + this.h >= CANVAS_HEIGHT - 40) {
      this.y = CANVAS_HEIGHT - 40 - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  draw(ctx) {
    // 無敵中は点滅
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) return;

    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  // 当たり判定（矩形）
  hits(other) {
    return (
      this.x < other.x + other.w &&
      this.x + this.w > other.x &&
      this.y < other.y + other.h &&
      this.y + this.h > other.y
    );
  }

  damage() {
    if (this.invincible > 0) return;
    this.lives--;
    this.invincible = 90; // 1.5秒
    playSound(200, 0.3, 'sawtooth');
  }
}


class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = ENEMY_SIZE;
    this.h = ENEMY_SIZE;
    this.vx = ENEMY_SPEED * (Math.random() < 0.5 ? 1 : -1);
    this.vy = 0;
    this.alive = true;
  }

  update() {
    this.x += this.vx;
    this.vy += GRAVITY;
    this.y += this.vy;

    // 床
    if (this.y + this.h >= CANVAS_HEIGHT - 40) {
      this.y = CANVAS_HEIGHT - 40 - this.h;
      this.vy = 0;
    }

    // 画面端で折り返し
    if (this.x < 0 || this.x + this.w > CANVAS_WIDTH) {
      this.vx *= -1;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.fillStyle = ENEMY_COLOR;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}


// ===========================
// パーティクル（汎用）
// ===========================

class Particle {
  constructor(x, y, color = COLORS.accent) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6 - 2;
    this.life = 40;
    this.maxLife = 40;
    this.size = Math.random() * 6 + 2;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2;
    this.life--;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.globalAlpha = 1;
  }

  get dead() { return this.life <= 0; }
}
