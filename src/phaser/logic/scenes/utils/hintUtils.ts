export const renderHint = (scene: Phaser.Scene) => {
  scene.add
    .text(16, 16, 'Use arrow keys to move', {
      font: '18px monospace',
      // @ts-ignore
      fill: '#000000',
      padding: { x: 20, y: 10 },
      backgroundColor: '#ffffff'
    })
    .setScrollFactor(0)
    .setDepth(30);
};
