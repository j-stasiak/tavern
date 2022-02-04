import { Scene } from 'phaser';

export const handleLoadingScreen = (scene: Scene) => {
  const progressBar = scene.add.graphics();
  const progressBox = scene.add.graphics();
  const progressBoxXPos = scene.cameras.main.width / 3;
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(progressBoxXPos, 270, 320, 50);
  scene.load.image('logo', 'assets/images/tavern.png');
  for (let i = 0; i < 20; i++) {
    scene.load.image('logo' + i, 'assets/images/tavern.png');
  }
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      //@ts-ignore
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);
  const percentText = scene.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      //@ts-ignore
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
  const assetText = scene.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      //@ts-ignore
      fill: '#ffffff'
    }
  });
  assetText.setOrigin(0.5, 0.5);

  //@ts-ignore
  scene.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(progressBoxXPos, 280, 300 * value, 30);
    //@ts-ignore
    percentText.setText(parseInt(value * 100) + '%');
  });
  //@ts-ignore
  scene.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
  scene.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });
};
