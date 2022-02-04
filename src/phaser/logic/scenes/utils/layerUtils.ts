import Phaser from 'phaser';

export const getLayers = (map: Phaser.Tilemaps.Tilemap) => {
  const tileset = map.addTilesetImage('tuxmon-sample-32px-extruded', 'MainMap');
  return {
    worldLayer: map.createLayer('World', tileset, 0, 0),
    aboveLayer: map.createLayer('Above Player', tileset, 0, 0),
    belowLayer: map.createLayer('Below Player', tileset, 0, 0)
  };
};
