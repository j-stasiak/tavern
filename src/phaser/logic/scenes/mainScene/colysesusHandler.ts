import Phaser from 'phaser';
import { ReactPhaserProps } from '../../../../components/providers/ReactPhaserCommonsProvider';
import Player from '../../../Player';
import OnlinePlayer, { DYNAMIC_PLAYER_FIELDS } from '../../../OnlinePlayer';

export const handleColyseus = (gameProps: ReactPhaserProps, player: Player, scene: Phaser.Scene) => {
  const addPlayer = (
    sessionId: any,
    player: {
      nick: string;
      map: Phaser.Tilemaps.Tilemap;
      x: any;
      y: any;
      onChange: (changes: any) => void;
      position: any;
    }
  ) => {
    gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
      // @ts-ignore
      scene: scene,
      playerId: sessionId,
      nick: player.nick,
      key: sessionId,
      map: player.map,
      x: player.x,
      y: player.y
    });
    player.onChange = (changes) => {
      changes.forEach((change: { field: string; previousValue: any; value: boolean }) => {
        if (DYNAMIC_PLAYER_FIELDS.includes(change.field) && change.previousValue !== change.value) {
          if (change.field === 'x' || change.field === 'y') {
            gameProps.colyseus.onlinePlayers[sessionId].move(change.field, change.value);
          } else if (change.field === 'walking') {
            if (change.value) {
              gameProps.colyseus.onlinePlayers[sessionId].playWalkingAnimation(player.position);
            } else {
              gameProps.colyseus.onlinePlayers[sessionId].stopWalkingAnimation(player.position);
            }
          } else if (change.field === 'map') {
            gameProps.colyseus.onlinePlayers[sessionId].destroy();

            // @ts-ignore
            if (change.value === scene.mapManager.mapName && !gameProps.colyseus.onlinePlayers[sessionId].scene) {
              gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
                // @ts-ignore
                scene: scene,
                nick: player.nick,
                playerId: sessionId,
                key: sessionId,
                map: change.value,
                x: player.x,
                y: player.y
              });
            }
          } else {
            gameProps.colyseus.onlinePlayers[sessionId][change.field] = change.value;
          }
        }
      });
    };
  };

  gameProps.colyseus.room.then((room: any) => {
    room.state.messages.onAdd = (message: { nick: string; message: string }, _: any) => {
      gameProps.chat.setMessages([...room.state.messages]);
      gameProps.principal.nick === message.nick && player.toggleSpeechBubble(message.message); //
      for (const [sessionId, player] of room.state.players) {
        message.nick === player.nick && gameProps.colyseus.onlinePlayers[sessionId].toggleSpeechBubble(message.message);
      }

      for (const onlinePlayer in gameProps.colyseus.onlinePlayers) {
        gameProps.colyseus.onlinePlayers[onlinePlayer].update();
      }

      //message.nick === principalNick && player.showBubble

      // gameProps.colyseus.gameProps.colyseus.onlinePlayers.find(value => value.)
    };
    for (const [sessionId, player] of room.state.players) {
      if (sessionId !== room.sessionId) {
        console.log('Adding another players...');
        addPlayer(sessionId, player);
      }
    }
    room.state.players.onAdd = (
      player: {
        nick: string;
        map: Phaser.Tilemaps.Tilemap;
        x: any;
        y: any;
        onChange: (changes: any) => void;
        position: any;
      },
      sessionId: any
    ) => {
      console.log('Player joined, setting up listeners...');
      addPlayer(sessionId, player);
    };

    room.state.players.onRemove = (
      player: {
        nick: string;
        map: Phaser.Tilemaps.Tilemap;
        x: any;
        y: any;
        onChange: (changes: any) => void;
        position: any;
      },
      sessionId: any
    ) => {
      if (gameProps.colyseus.onlinePlayers[sessionId]) {
        gameProps.colyseus.onlinePlayers[sessionId].destroy();
        delete gameProps.colyseus.onlinePlayers[sessionId];
      }
    };
  });
};
