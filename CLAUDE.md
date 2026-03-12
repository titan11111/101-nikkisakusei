# ゲーム開発 AI ガイドライン

## このリポジトリについて

HTML5 Canvas + Vanilla JavaScript によるブラウザゲームの開発リポジトリ。
フレームワーク・npm・ビルドツールは使わない。GitHub Pages でそのまま動く構成を維持する。

---

## 新規ゲーム作成のルール

### 必ず `_template/` からコピーして始める

```bash
cp -r _template/ 新しいゲームフォルダ名/
```

テンプレートにはCanvas初期化・ゲームループ・モバイル対応・入力管理が含まれている。
ゼロから書き直さないこと。

### フォルダ番号のルール

```
000-ゲーム午睡/     ← 特殊（サブフォルダあり）
100〜             ← 通常ゲーム（3桁番号-ゲーム名）
```

---

## ファイル構成の基準

### 小規模ゲーム（300行以下）

```
ゲームフォルダ/
├── index.html    ← HTML構造のみ（インラインスクリプト可）
├── style.css
└── script.js
```

### 中規模ゲーム（300〜800行）

```
ゲームフォルダ/
├── index.html    ← マークアップのみ（50〜150行）
├── style.css
└── script.js
```

### 大規模ゲーム（800行超）

```
ゲームフォルダ/
├── index.html
├── style.css
└── js/
    ├── config.js          ← 定数・設定値のみ（letやvarは書かない）
    ├── main.js            ← ゲームループ・初期化のみ
    ├── entities.js        ← キャラクタークラス
    ├── collision.js       ← 当たり判定
    ├── input.js           ← キー・タッチ入力
    ├── audio.js           ← Web Audio API
    └── game-flow.js       ← 状態管理（START/PLAYING/GAMEOVER等）
```

### 分割のタイミング

- **1ファイルが500行を超えたら分割する**（既存ルール：`docs/refactoring-guide.md` 参照）
- index.html にロジックを書かない。HTMLの構造定義のみ
- インラインの `<style>` `<script>` は300行以下のゲームのみ許容

---

## 必須：毎回守るコーディングルール

### Canvas 初期化（標準パターン）

```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  // リサイズはゲームループ内で毎フレーム呼ばない
  // window.resize イベント時のみ実行する
  const container = document.getElementById('gameContainer');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初回のみ
```

### ゲームループ（標準パターン）

```javascript
let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

### モバイル対応（必須）

すべてのゲームに以下を含める：

```javascript
// モバイル判定
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

// タッチ対応（マウスと共存）
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd);
```

HTML の meta タグ（必須）：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
```

### Web Audio API（標準パターン）

```javascript
let audioCtx = null;

function getAudioContext() {
  // ユーザー操作後に初期化（iOS Safari 対応）
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playSound(frequency, duration, type = 'square') {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}
```

### 状態管理（標準パターン）

```javascript
const GameState = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
  CLEAR: 'clear'
};

let currentState = GameState.START;

function setState(newState) {
  currentState = newState;
  // 必要なら状態遷移ログ
}
```

---

## やってはいけないこと

- `resizeCanvas()` をゲームループ内（毎フレーム）で呼ぶ → パフォーマンス低下
- `drawBackground()` 内でランダム値を毎フレーム計算する → 事前に配列に保存する
- DOM ノードを毎フレーム `createElement` で追加し続ける → プール方式にする
- npm install・webpack・Vite など外部ビルドツールを使う → 使わない
- `console.log` をデバッグ後に残す → 本番前に必ず削除
- `alert()` でゲームオーバーを表示する → Canvas 内に描画する

---

## 共通ライブラリ（`_shared/`）

以下のファイルは各ゲームで `<script src="../_shared/xxx.js">` として使える：

| ファイル | 内容 |
|---------|------|
| `_shared/game-core.js` | Canvas初期化・ゲームループ・リサイズ |
| `_shared/input.js` | キー・タッチ入力の統一管理 |
| `_shared/audio.js` | Web Audio API の初期化・効果音 |
| `_shared/mobile.js` | モバイル判定・バーチャルボタン生成 |
| `_shared/utils.js` | 衝突判定・乱数・クランプなど汎用関数 |

新規ゲームを作るとき、これらを積極的に活用する。
`_shared/` のファイルを修正すると全ゲームに影響するため、慎重に変更する。

---

## ゲーム作成の手順（AIへの指示）

1. `_template/` をコピーして新しいフォルダを作成する
2. `config.js` にゲーム固有の定数を定義する
3. `entities.js` にキャラクタークラスを定義する
4. `main.js` にゲームループを実装する
5. `index.html` の `<title>` とモバイルボタンを調整する
6. 500行を超えたらファイルを分割する

---

## ドキュメントルール

各ゲームフォルダに `README.md` を作成する：

```markdown
# ゲーム名

## 遊び方
- 操作説明

## 技術メモ
- 特殊な実装があれば記載

## 状態
- [ ] 開発中 / [x] 完成 / [ ] 要リファクタリング
```

大規模ゲームには追加で：
- `FILE-STRUCTURE.md` → ファイル依存関係
- `REFACTORING_PLAN.md` → 改善予定

---

## 全体リポジトリ構成

```
GitHub-game/
├── CLAUDE.md              ← このファイル（AIへのルール）
├── _template/             ← 新規ゲームのスターター（変更しない）
├── _shared/               ← 共通ライブラリ（慎重に変更）
├── docs/                  ← 開発全体のドキュメント
│   ├── refactoring-guide.md
│   └── author-style-and-genres.md
├── index.html             ← ゲーム一覧ページ
├── 000-ゲーム午睡/
├── 100-HTML素材/
├── 102-RPG VER1/
│   ...（以下各ゲーム）
└── 2025年制作生成AIゲーム作品集/
```
