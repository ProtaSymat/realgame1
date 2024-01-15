const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 880;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const SCALE_MODE = 'SMOOTH';
const blockDeathProbability = 0.1;


class BaseScene extends Phaser.Scene {
    createButton(x, y, text, onClick) {
        let button = this.add.rectangle(x, y, 200, 100, 0xFFFFFF);
        button.setStrokeStyle(4, 0x000000);

        const buttonText = this.add.text(0, 0, text, {
            fontSize: '32px',
            fill: '#000'
        });
        Phaser.Display.Align.In.Center(buttonText, button);

        let clickSound = this.sound.add('clickSound');

        button.setInteractive();
        button.on('pointerover', () => {
            buttonText.setFill('#FFFFFF');
            this.sys.canvas.style.cursor = 'pointer';
            button.fillColor = 0x000000;
        });
        button.on('pointerout', () => {
            buttonText.setFill('#000000');
            this.sys.canvas.style.cursor = 'default';
            button.fillColor = 0xFFFFFF;
        });
        button.on('pointerdown', () => {
            onClick();
            clickSound.play();
        });
        return button;
    }
}

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreloadScene'
        })
    }
    preload() {
        this.load.image('player', 'assets/images/stand.png');
        this.load.image('player-left', 'assets/images/stand-left.png');
        this.load.image('player-right', 'assets/images/stand-right.png');
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('backgroundMenu', 'assets/images/backgroundMenu.png');
        this.load.image('backgroundOptions', 'assets/images/backgroundOptions.jpg');
        this.load.image('run1-right', 'assets/images/walking1-right.png');
        this.load.image('run2-right', 'assets/images/walking2-right.png');
        this.load.image('run1-left', 'assets/images/walking1-left.png');
        this.load.image('run2-left', 'assets/images/walking2-left.png');
        this.load.image('keyboard', 'assets/images/keyboard.png');
        this.load.image('jump', 'assets/images/jump.png');
        this.load.image('backButton', 'assets/images/backMenu.png');
        this.load.audio('clickSound', 'assets/audio/buttonSoundEffect.mp3');
        this.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.mp3');
        this.load.audio('coinCollect', 'assets/audio/coin-collect.mp3');
        this.load.audio('enemyDeath', 'assets/audio/enemydeath.mp3');
        this.load.audio('cap', 'assets/audio/cap.mp3');
        this.load.audio('crazyMagic', 'assets/audio/crazyMagic.mp3');
        this.load.audio('scream', 'assets/audio/scream.mp3');
        this.load.audio('rickSong', 'assets/audio/rick-song.mp3');
        this.load.audio('failure', 'assets/audio/failure.mp3');
        this.load.audio('victory', 'assets/audio/victory.mp3');
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        this.load.image('star', 'assets/images/coin-1.png');
        this.load.image('coin-2', 'assets/images/coin-2.png');
        this.load.image('coin-3', 'assets/images/coin-3.png');
        this.load.image('coin-4', 'assets/images/coin-4.png');
        this.load.image('coin-5', 'assets/images/coin-5.png');
        this.load.image('magic-cap', 'assets/images/magic-cap.png');
        this.load.image('rick-1', 'assets/images/rick-1.png');
        this.load.image('rick-2', 'assets/images/rick-2.png');
        this.load.image('rick-3', 'assets/images/rick-3.png');
        this.load.image('rick-4', 'assets/images/rick-4.png');
        this.load.image('rick-5', 'assets/images/rick-5.png');
        this.load.image('rick-6', 'assets/images/rick-6.png');
        this.load.image('rick-7', 'assets/images/rick-7.png');
        this.load.image('rick-8', 'assets/images/rick-8.png');
        this.load.image('enemy', 'assets/images/bee-enemy.png');
        this.load.image('enemy2', 'assets/images/bee-enemy2.png');
        this.load.image('enemy3', 'assets/images/bee-enemy3.png');
        this.load.image('enemy-reversed', 'assets/images/bee-enemy-reversed.png');
        this.load.image('enemy2-reversed', 'assets/images/bee-enemy2-reversed.png');
        this.load.image('enemy3-reversed', 'assets/images/bee-enemy3-reversed.png');
        this.load.image('block', 'assets/images/block.png');
        this.load.image('block-death', 'assets/images/block-death.png');
    }
    create() {
        this.scene.start('MenuScene')

    }
}

class Inventory {
    constructor() {
        this.contents = {};
        this.superModeCountDown = 0;
    }

    update() {
        this.superModeCountDown = Math.max(0, this.superModeCountDown - 1);
    }

    addItem(item, quantity = 1) {
        if (this.contents[item]) this.contents[item] += quantity;
        else this.contents[item] = quantity;
    }

    removeItem(item, quantity = 1) {
        if (this.contents[item]) {
            this.contents[item] -= quantity;
            if (this.contents[item] <= 0) delete this.contents[item];
        }
    }

    getContents() {
        return this.contents;
    }
}

class MenuScene extends BaseScene {
    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    create() {

        if (!this.sound.get('backgroundMusic')) {
            this.backgroundMusic = this.sound.add('backgroundMusic', {
                loop: true
            });
            this.backgroundMusic.play();
            this.backgroundMusic.setVolume(0.5);
        }
        this.musicOn = true;
        let bg = this.add.image(0, 0, 'backgroundMenu').setOrigin(0, 0);
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);
        const playButton = this.createButton(960, 600, 'Play', () => this.startGame());
        const optionsButton = this.createButton(960, 750, 'Options', () => this.openOptions());
        const tutoButton = this.createButton(960, 900, 'Tutoriel', () => this.openTuto());
    }

    startGame() {
        this.scene.start('MainScene');
    }

    openOptions() {
        this.scene.start('OptionsScene', {
            musicOn: this.musicOn,
            returnScene: 'MenuScene'
        });
    }
    openTuto() {
        this.scene.start('TutoScene', {
            musicOn: this.musicOn,
            returnScene: 'MainScene'
        });
    }
}
class OptionsScene extends BaseScene {
  constructor() {
      super({
          key: 'OptionsScene'
      });
  }

  init(data) {
      this.musicOn = data.musicOn;
      this.returnScene = data.returnScene;
  }

  create() {
    let bg = this.add.image(0, 0, 'backgroundOptions').setOrigin(0, 0);
    let scaleX = this.cameras.main.width / bg.width;
    let scaleY = this.cameras.main.height / bg.height;
    let scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    let title = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 200, 'OPTIONS', { font: '200px', fill: '#000000' }).setOrigin(0.5);

    const backButton = this.add.image(100, 100, 'backButton').setInteractive().setScale(1.5);
    backButton.on('pointerdown', () => this.scene.start(this.returnScene));
    const muteButton = this.createButton(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Mute Music', () => this.toggleMusic());
    const volumeDownButton = this.createButton(this.cameras.main.width / 2 - 200, this.cameras.main.height / 2 + 200, 'Volume -', () => this.adjustVolume(-0.1));
    const volumeUpButton = this.createButton(this.cameras.main.width / 2 + 200, this.cameras.main.height / 2 + 200, 'Volume +', () => this.adjustVolume(0.1));

  }

  toggleMusic() {
      if (this.sound.get('backgroundMusic')) {
          if (this.sound.get('backgroundMusic').isPlaying) {
              this.sound.pauseAll();
          } else {
              this.sound.resumeAll();
          }
      }
  }

  adjustVolume(amount) {
      let bgMusic = this.sound.get('backgroundMusic');
      if (bgMusic) {
          let newVolume = Phaser.Math.Clamp(bgMusic.volume + amount, 0, 1);
          bgMusic.setVolume(newVolume);
      }
  }
}
class PausedScene extends BaseScene {
    constructor() {
        super({
            key: 'PausedScene'
        });
    }

    create(data) {
        let rect = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        rect.setOrigin(0, 0);
        rect.alpha = 0.7;
        const pauseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 200, 'Pause', {
            fontSize: '64px',
            fill: '#ffffff'
        });
        pauseText.setOrigin(0.5, 0.5);
        this.createButton(this.cameras.main.centerX, this.cameras.main.centerY, 'Resume', () => this.resumeGame(data.prevScene));
        this.createButton(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'Restart', () => this.restartGame(data.prevScene));
        this.createButton(this.cameras.main.centerX, this.cameras.main.centerY + 300, 'Tuto', () => this.gotoTuto());
        this.createButton(this.cameras.main.centerX, this.cameras.main.centerY + 450, 'Leave', () => this.quitGame());
    }

    resumeGame(prevScene) {
        this.scene.resume(prevScene);
        this.scene.stop('PausedScene');
    }

    restartGame(prevScene) {
      this.scene.stop(prevScene);
      this.scene.start(prevScene);
      this.timer = 0;
  }
  gotoTuto() {
    this.scene.start('TutoScene', {
        musicOn: this.musicOn,
        returnScene: 'PausedScene'
    });
    console.log('fleche touché');
}

    quitGame() {
        this.scene.stop('MainScene');
        this.scene.start('MenuScene');
    }
}

class TutoScene extends BaseScene {
    constructor() {
        super({
            key: 'TutoScene'
        });
    }

    init(data) {
        this.returnScene = data.returnScene;
    }

    create() {
        let bg = this.add.image(0, 0, 'backgroundOptions').setOrigin(0, 0);
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        let title = this.add.text(this.cameras.main.width / 2, 200, 'Tutoriel', { font: '100px', fill: '#000000' }).setOrigin(0.5);

        let touches = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'Touches :', { font: '50px', fill: '#000000' }).setOrigin(0.5, 0.5);
        let controlImage = this.add.image(this.cameras.main.width / 4, this.cameras.main.height / 2 - 30, 'keyboard').setOrigin(0.5, 0.5);
        let controlText = this.add.text(this.cameras.main.width / 4 * 2, this.cameras.main.height / 2 - 30, "Les touches pour avancer sont les flèches. Pour sauter, appuyez sur la flèche du haut (un double jump est possible mais il faut savoir le dompter)... en gros c'est mal codé mdrr restez bien sur la plateforme", { font: '20px Arial', fill: '#000000', align: 'center', wordWrap: { width: 700, useAdvancedWrap: true } }).setOrigin(0.5, 0.5);

        let gameObjective = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'But du jeu :', { font: '50px', fill: '#000000' }).setOrigin(0.5);
        let beeImage = this.add.image(this.cameras.main.width / 4 -50, this.cameras.main.height / 2 + 180, 'enemy').setOrigin(0.5);
        let coinImage = this.add.image(this.cameras.main.width / 4 + 50, this.cameras.main.height / 2 + 180, 'star').setOrigin(0.5);
        let gameDescription = this.add.text(this.cameras.main.width / 4 * 2, this.cameras.main.height / 2 + 200, 'Le principe est de tuer tous les enemis en leur sautant dessus et de récolter chaque pièce dans le temps imparti (2:00)', { font: '20px Arial', fill: '#000000', align: 'center', wordWrap: { width: 700, useAdvancedWrap: true } }).setOrigin(0.5);

        let bonus = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 300, 'Bonus :', { font: '50px', fill: '#000000' }).setOrigin(0.5);
        let magicHat = this.add.image(this.cameras.main.width / 4 -50, this.cameras.main.height / 2 + 370, 'magic-cap').setOrigin(0.5);
        let rickImage = this.add.image(this.cameras.main.width / 4 +50, this.cameras.main.height / 2 + 370, 'rick-7').setOrigin(0.5);
        let bonusDescription = this.add.text(this.cameras.main.width / 4 * 2, this.cameras.main.height / 2 + 390, 'Récoltez la casquette et appuyez sur Ctrl pour utiliser le mode fou d\'Odin. Restez appuyé sur B pour débloquer un power-up spécial.', { font: '20px Arial', fill: '#000000', align: 'center', wordWrap: { width: 700, useAdvancedWrap: true } }).setOrigin(0.5);
        
        const backButton = this.add.image(100, 100, 'backButton').setInteractive().setScale(1.5);
    backButton.on('pointerdown', () => this.scene.start(this.returnScene));
    }
}

class MainScene extends Phaser.Scene {
    cursors
    player
    enemy
    timer = 0;
    timerText = null;
    gameIsFinished = false;

    constructor() {
        super({
            key: 'MainScene'
        });
        this.enemiesCount = 0;
    }

    create() {
      this.timer = 0;
    this.gameIsFinished = false;
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('PausedScene', {
                prevScene: 'MainScene'
            });
            this.scene.pause();
        });

        this.anims.create({
            key: "playerWalk-right",
            frames: [{
                    key: "run1-right"
                },
                {
                    key: "run2-right"
                },
            ],
            frameRate: 7,
            repeat: -1
        });


        this.anims.create({
            key: "playerWalk-left",
            frames: [{
                    key: "run1-left"
                },
                {
                    key: "run2-left"
                },
            ],
            frameRate: 7,
            repeat: -1
        });

        let frames = [];
        let animationsWaiting = [{
                key: "player",
                repeats: 5
            },
            {
                key: "player-left",
                repeats: 10
            },
            {
                key: "player",
                repeats: 10
            },
            {
                key: "player-right",
                repeats: 10
            },
            {
                key: "player",
                repeats: 6
            },
        ];
        animationsWaiting.forEach(animation => {
            for (let i = 0; i < animation.repeats; i++) {
                frames.push({
                    key: animation.key
                });
            }
        });


        this.anims.create({
            key: "playerIdle",
            frames: frames,
            frameRate: 5,
            repeat: -1
        });

        function createRepeatedFrames(key, count) {
            var frames = [];
            for (var i = 0; i < count; i++) {
                frames.push({
                    key: key
                });
            }
            return frames;
        }

        this.anims.create({
            key: "playerRick",
            frames: [
                ...createRepeatedFrames("rick-1", 5),
                ...createRepeatedFrames("rick-2", 3),
                ...createRepeatedFrames("rick-3", 3),
                ...createRepeatedFrames("rick-4", 3),
                ...createRepeatedFrames("rick-5", 3),
                ...createRepeatedFrames("rick-6", 3),
                ...createRepeatedFrames("rick-7", 5),
                ...createRepeatedFrames("rick-8", 3)
            ],
            frameRate: 20,
            repeat: -1
        });


        this.anims.create({
            key: "playerJump",
            frames: [{
                key: "jump"
            }],
            frameRate: 1,
        });


        this.anims.create({
            key: "coinRotation",
            frames: [{
                    key: "star"
                },
                {
                    key: "coin-2"
                },
                {
                    key: "coin-3"
                },
                {
                    key: "coin-4"
                },
                {
                    key: "coin-5"
                },
                {
                    key: "coin-2"
                },
                {
                    key: "coin-3"
                },
                {
                    key: "star"
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "bee-enemy",
            frames: [{
                    key: "enemy"
                },
                {
                    key: "enemy2"
                },
                {
                    key: "enemy3"
                },
                {
                    key: "enemy2"
                },
                {
                    key: "enemy"
                },
                {
                    key: "enemy2"
                },
                {
                    key: "enemy3"
                },
                {
                    key: "enemy2"
                },
                {
                    key: "enemy"
                }
            ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "bee-enemy-reversed",
            frames: [{
                    key: "enemy-reversed"
                },
                {
                    key: "enemy2-reversed"
                },
                {
                    key: "enemy3-reversed"
                },
                {
                    key: "enemy2-reversed"
                },
                {
                    key: "enemy-reversed"
                },
                {
                    key: "enemy2-reversed"
                },
                {
                    key: "enemy3-reversed"
                },
                {
                    key: "enemy2-reversed"
                },
                {
                    key: "enemy-reversed"
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        const world = {
            width: 5000,
            height: 1080
        }

        this.cameras.main.setBounds(0, 0, world.width, world.height);
        this.physics.world.setBounds(0, 0, world.width, world.height);


        this.timerText = this.add.text(1720, 16, 'Temps: 2:00', {
                fontSize: '32px',
                fill: '#000'
            })
            .setOrigin(0)
            .setScrollFactor(0);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.gameIsFinished) {
                    this.timer++;

                    let minutes = Math.floor((120 - this.timer) / 60);
                    let seconds = (120 - this.timer) % 60;
                    this.timerText.setText('Temps: ' +
                        (minutes < 10 ? '0' + minutes : minutes) + ':' +
                        (seconds < 10 ? '0' + seconds : seconds)
                    );
                }
            },
            callbackScope: this,
            loop: true
        });
        let enemies = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.Between(100, world.width - 100);
            let y = Phaser.Math.Between(100, world.height - 100);
            let enemy = enemies.create(x, y, 'enemy');
            console.log(enemy);
            enemy.setScale(1.2, 1.2);
            enemy.setCollideWorldBounds(true);
            enemy.setGravityY(2);
            enemy.setVelocityX(-300);
            enemy.setVelocityY(null);
            enemy.step = -300;
            enemy.anims.play('bee-enemy', true);

            setInterval(() => {
              if(enemy) {
                  enemy.setVelocityY(-1 * (Math.random() + 1) * 500);
              }
          }, Math.random() * 2000 + 1000);
        }

        this.enemies = enemies;
        this.enemiesCount = enemies.getChildren().length;
        this.player = new Player(this, 0, 0);


        this.magicCap = this.physics.add.sprite(
          Math.floor(Math.random() * world.width),
          Math.floor(Math.random() * world.height),
          'magic-cap'
        );
        this.magicCap.setCollideWorldBounds(true);

        const colorList = [
          0xff0000, 0x0000ff, 0x00ff00, 0xffc0cb, 0xffff00 
        ];
        
        function randomFlashyColor() {
          return colorList[Math.floor(Math.random() * colorList.length)];
        }
        
        this.time.addEvent({
          delay: 100,
          callback: () => {
            let color = randomFlashyColor();
            this.magicCap.setTintFill(color);
          },
          callbackScope: this,
          loop: true
        });

        let stars = this.physics.add.group({
            key: 'star',
            repeat: 59,
            setXY: {
                x: 500,
                y: 0,
                stepX: 70
            }
        })
        stars.children.iterate((child) => {
            child.setScale(1, 1);
            child.setCollideWorldBounds(true);
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
            child.setGravityY(0);
            child.anims.play('coinRotation', true);
            child.setInteractive().on('pointerdown', () => {
                console.log('you hit a star');
            })
        })

        this.score = 0;
        this.capScore = 0;
        this.hud = new HUD(this);


        const collectStar = (player, star) => {
          star.disableBody(true, true);
          player.inventory.addItem("star");
          this.sound.play('coinCollect');
          this.score+= 1;
          this.hud.update(this.capScore, this.score);
          if (this.score >= 60 && this.enemiesCount === 0) {
              this.victory();
          }
      };
        
      const collectCap = (player, cap) => {
        cap.disableBody(true, true);
        player.inventory.addItem("magic-cap");
        this.sound.play('cap');
        this.capScore += 1;
        this.hud.update(this.capScore, this.score);
      };


        function weightedRandom(max, numDice) {
            let num = 0;
            for (let i = 0; i < numDice; i++) {
                num += Math.random() * max;
            }
            return num / numDice;
        }

        let platforms = this.physics.add.staticGroup();
        let deathBlocks = this.physics.add.staticGroup();


        for (let i = 0; i < 50; i++) {
            let x = Math.floor(Math.random() * (world.width - 200) / 100) * 100;
            let y = 200 + Math.floor(weightedRandom(world.height - 200, 2) / 100) * 100;


            if (Math.random() > blockDeathProbability) {
                platforms.create(x, y, "block");
            } else {
                deathBlocks.create(x, y, "block-death");
            }

            if (Math.random() > 0.9) {
                if (Math.random() > blockDeathProbability) {
                    platforms.create(x + 100, y, "block");
                } else {
                    platforms.create(x + 100, y, "block-death");
                }
            }

            if (Math.random() > 0.9) {
                if (Math.random() > blockDeathProbability) {
                    platforms.create(x, y + 100, "block");
                } else {
                    platforms.create(x, y + 100, "block-death");
                }

                if (Math.random() > 0.6) {
                    if (Math.random() > blockDeathProbability) {
                        platforms.create(x + 100, y + 100, "block");
                    } else {
                        platforms.create(x + 100, y + 100, "block-death");
                    }
                }
            }

            x += 100;
        }

        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars, deathBlocks);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, deathBlocks, this.touchDeathBlock, null, this);
        this.physics.add.collider(this.enemies, platforms);
        this.physics.add.collider(this.enemies, deathBlocks);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, stars, collectStar, null, this);
        if(this.magicCap) {
          this.physics.add.collider(this.magicCap, platforms);
          this.physics.add.collider(this.magicCap, deathBlocks);
          this.physics.add.overlap(this.player, this.magicCap, collectCap, null, this);
      }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player, true);
    }


    touchDeathBlock(player, block) {
      if (!player.superModeActive) {
        if (block.texture.key === "block-death") {
            this.sound.play('explosion');
            this.endGame("Vous n'auriez pas dû toucher ce bloc");
        }
      }
    }

    hitEnemy(player, enemy) {
        if (player.superModeActive) {
          enemy.disableBody(true, true);
          this.sound.play('enemyDeath');
          this.enemiesCount -= 1;
          if (this.score >= 60 && this.enemiesCount === 0) {
            this.victory();
          }
        } else {
          if (player.body.touching.down && enemy.body.touching.up) {
            enemy.disableBody(true, true);
            this.sound.play('enemyDeath');
            this.enemiesCount -= 1;
        
            if (this.score >= 60 && this.enemiesCount === 0) {
              this.victory();
            }
          } else {
            this.sound.play('scream');
            this.endGame("Les monstres vous ont dévorés");
          } 
        }
      }

    update() {
        if (this.timer >= 120) {
            this.endGame("Le chronomètre est écoulé");
            this.timer = 0;
        }

        this.player.update(this.cursors);
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.body.onWall()) {
                enemy.step *= -1;
                if (enemy.step > 0) {
                    enemy.anims.play('bee-enemy-reversed', true);
                } else {
                    enemy.anims.play('bee-enemy', true);
                }
            }
            enemy.setVelocityX(enemy.step);
        });
        this.player.inventory.update();
      }

    endGame(reason = '') {;
        this.physics.pause();
        this.gameIsFinished = true;
        this.sound.get('backgroundMusic').stop();
        this.sound.play('failure');
        this.player.setTint(0xff0000);

        let centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let background = this.add.rectangle(centerX, centerY, this.game.config.width + 300, this.game.config.height + 300, 0x000000);
        background.setDepth(1);

        this.tweens.add({
            targets: background,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 2000
        });

        let gameOver = this.add.text(centerX, centerY, 'Vous \u00EAtes mort. Raison : ' + reason, {
            fontSize: '32px',
            fill: '#ff0000'
        });
        gameOver.setOrigin(0.5);
        gameOver.setDepth(2);

        let replayButton = this.add.text(centerX, centerY + 70, 'Rejouer', {
            fontSize: '32px',
            fill: '#ffffff'
        });
        replayButton.setOrigin(0.5);
        replayButton.setInteractive();
        replayButton.setDepth(2);

        replayButton.on('pointerdown', () => {
            this.scene.restart();
        });
    }
    victory() {
      this.physics.pause();
      this.gameIsFinished = true;
      this.sound.get('backgroundMusic').stop();
      this.sound.play('victory');
      let centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      let centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
      let background = this.add.rectangle(centerX, centerY, this.game.config.width + 300, this.game.config.height + 300, 0x00ff00);
      background.setAlpha(0);
      background.setDepth(1);
  
      this.tweens.add({
          targets: background,
          alpha: {
              from: 0,
              to: 1
          },
          duration: 2000
      });
  
      let victoryText = this.add.text(centerX, centerY, 'Vous avez gagn\u00E9 !', {
          fontSize: '64px',
          fill: '#000000'
      });
      victoryText.setOrigin(0.5);
      victoryText.setDepth(2);
  
      let elapsedTime = this.timer; 
let elapsedMinutes = Math.floor(elapsedTime / 60);
let elapsedSeconds = elapsedTime % 60;
let elapsedTimeText = this.add.text(centerX, centerY + 100, 'Temps écoulé : ' +
    (elapsedMinutes < 10 ? '0' + elapsedMinutes : elapsedMinutes) + ':' +
    (elapsedSeconds < 10 ? '0' + elapsedSeconds : elapsedSeconds), 
    {
    fontSize: '32px',
    fill: '#000000'
});
elapsedTimeText.setOrigin(0.5);
elapsedTimeText.setDepth(2);
  
      let replayButton = this.add.text(centerX, centerY + 140, 'Rejouer', {
          fontSize: '32px',
          fill: '#000000'
      });
      replayButton.setOrigin(0.5);
      replayButton.setInteractive();
      replayButton.setDepth(2);
      replayButton.on('pointerdown', () => {
          this.scene.restart();
      });
  }

}

class HUD {
  constructor(scene) {
    this.scene = scene;

    this.scoreText = this.scene.add.text(60, 20, 'x 0', {
      fontSize: '32px',
      fill: '#000'
  }).setOrigin(0).setScrollFactor(0);

    this.capText = this.scene.add.text(240, 20, 'x 0', {
        fontSize: '32px',
        fill: '#000'
    }).setOrigin(0).setScrollFactor(0);

    this.coinImage = this.scene.add.image(20, 40, 'star').setScrollFactor(0).setDepth(2);
    this.coinImage.setScale(0.5);

    this.capImage = this.scene.add.image(200, 40, 'magic-cap').setScrollFactor(0).setDepth(2);
    this.capImage.setScale(0.5);

    console.log(this.capText);
  }

  update(capScore, score) {
    if (!this.capText) {
      console.log('capText is undefined');
    } else {
      this.capText.setText('x ' + capScore);
    }
    
    if (!this.scoreText) {
      console.log('scoreText is undefined');
    } else {
      this.scoreText.setText('x ' + score);
    }
  }
}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.setTint(0xffffff);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setScale(1.2, 1.2);
        this.body.setSize(this.width, this.height);
        this.canJump = true;
        this.isJumping = false;
        this.jumpCount = 2; // Ajout du compteur de sauts
        this.keyB = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.keyCtrl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.rickSong = this.scene.sound.add('rickSong');
        this.crazyMagic = this.scene.sound.add('crazyMagic');
        this.inventory = new Inventory();
        this.isRickAnimationPlaying = false;
        this.superModeActive = false;
this.hyperJump = false;
    }

    update(cursors, keyB) {
      if (this.body.blocked.down || this.body.touching.down) {
        this.canJump = true;
        this.isJumping = false;
        this.jumpCount = 2;
      }

      if (Phaser.Input.Keyboard.JustDown(cursors.up) && this.canJump && this.jumpCount > 0) {
        const originalJumpState = -450 * 1.5;
        this.setVelocityY((this.superModeActive && this.hyperJump) ? -1000 : originalJumpState);
        this.isJumping = true;
        this.canJump = false;
        this.jumpCount--;
    }

      if(!this.isRickAnimationPlaying) {
        const originalSpeedState = 160 * 2; 
        const superSpeedState = originalSpeedState * 3;

        if (cursors.left.isDown) {  
            this.setVelocityX(this.superModeActive && this.hyperJump ? -superSpeedState : -originalSpeedState);
            this.anims.play("playerWalk-left", true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.superModeActive && this.hyperJump ? superSpeedState : originalSpeedState);
            this.anims.play("playerWalk-right", true);
        } else if (cursors.up.isDown) {
            this.anims.play("playerJump", true);
        } else {
            this.setVelocityX(0);
            this.anims.play("playerIdle", true);
        }
    }
  
      if (this.keyB.isDown && !this.isRickAnimationPlaying) {
        this.isRickAnimationPlaying = true;
        this.anims.play("playerRick", true);
        this.rickSong.play();
      } else if (this.keyB.isUp && this.isRickAnimationPlaying) {
        this.isRickAnimationPlaying = false;
        this.anims.stop();
        this.rickSong.stop();
      }

      if (Phaser.Input.Keyboard.JustDown(this.keyCtrl)) {
        this.triggerSuperMode();
    }
    }
    triggerSuperMode() {
      const inventory = this.inventory.getContents();
    
      if (inventory["magic-cap"] && inventory["magic-cap"] > 0) {
          this.inventory.removeItem("magic-cap", inventory["magic-cap"]);
          this.scene.hud.update(0, this.scene.score);
          this.playColorAnimation();
          this.superModeActive = true;
          this.hyperJump = true;
          
          this.scene.time.delayedCall(8000, () => {
              this.stopColorAnimation();
              this.superModeActive = false;
              this.hyperJump = false;
          }, [], this);
      }
    }
    playColorAnimation() {
      this.tint = Math.random() * 0xFFFFFF;
      this.crazyMagic.play();
      this.colorAnimation = this.scene.time.addEvent({
          delay: 250,
          callback: () => {
              this.tint = Math.random() * 0xFFFFFF;
          },
          callbackScope: this,
          loop: true
      });
  }
  stopColorAnimation() {
      this.colorAnimation.destroy();
      this.tint = 0xFFFFFF;
      this.crazyMagic.stop();
  }
}
function resizeGame(game) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    let maxWidth = MAX_WIDTH;
    let maxHeight = MAX_HEIGHT;
    let scaleMode = SCALE_MODE;
    let scale = Math.min(w / width, h / height);
    let newWidth = Math.min(w / scale, maxWidth);
    let newHeight = Math.min(h / scale, maxHeight);
    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;
    let smooth = 1;
    if (scaleMode === 'SMOOTH') {
        const maxSmoothScale = 1.15;
        const normalize = (value, min, max) => {
            return (value - min) / (max - min);
        };
        if (width / height < w / h) {
            smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
        } else {
            smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
        }
    }

    game.scale.resize(newWidth * smooth, newHeight * smooth);
    game.canvas.style.width = newWidth * scale + 'px';
    game.canvas.style.height = newHeight * scale + 'px';
    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
}

window.addEventListener('load', () => {
    const game = new Phaser.Game({
        backgroundColor: '#ffffff',
        parent: 'phaser-game',
        scale: {
            mode: Phaser.Scale.FIT,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 1200
                },
                debug: false
            }
        },
        scene: [PreloadScene, MenuScene, OptionsScene, MainScene, PausedScene, TutoScene]

    });
    window.addEventListener('resize', event => {
        resizeGame(game);
    });
    resizeGame(game);
});
// window.onerror = function(message, url, lineNumber) {
//   console.log("Error: "+message+" in "+url+" at line "+lineNumber);
// }