import Phaser from 'phaser';

export interface LayerStorage {
  belowLayer: Phaser.Tilemaps.TilemapLayer;
  aboveLayer: Phaser.Tilemaps.TilemapLayer;
  worldLayer: Phaser.Tilemaps.TilemapLayer;
}
export interface MapManager {
  mapName: 'mainMapScene';
  map: Phaser.Tilemaps.Tilemap;
}
