class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/coin.png');
  }

  create() {
    this.player = this.add.sprite(350, 200, 'player').setScale(0.5);
    this.coin = this.add.sprite(500, 200, 'coin').setScale(0.18);

    this.score = 0;
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      font: '24px Arial',
      fill: '#fff'
    
    });
    this.cameras.main.setBackgroundColor('#FB9B8F');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    const speed = 220 * (delta / 1000);

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    this.player.x = Phaser.Math.Clamp(this.player.x, 0, 700);
    this.player.y = Phaser.Math.Clamp(this.player.y, 0, 400);

    if (
      Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.coin.x, this.coin.y
      ) < 40
    ) {
      this.collectCoin();
    }
  }

  collectCoin() {
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    this.coin.setPosition(
      Phaser.Math.Between(60, 640),
      Phaser.Math.Between(60, 340)
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 400,
  parent: 'game',
  scene: MainScene
};

new Phaser.Game(config);
