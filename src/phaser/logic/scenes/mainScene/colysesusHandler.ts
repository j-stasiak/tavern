import Phaser from 'phaser';
import { ReactPhaserProps } from '../../../../components/providers/ReactPhaserCommonsProvider';
import PrincipalPlayer from '../../gameObjects/PrincipalPlayer';
import OnlinePlayer, { DYNAMIC_PLAYER_FIELDS } from '../../gameObjects/OnlinePlayer';

interface PlayerModel {
  nick: string;
  map: Phaser.Tilemaps.Tilemap;
  x: any;
  y: any;
  onChange: (changes: any) => void;
  position: any;
}

export const handleColyseus = (gameProps: ReactPhaserProps, player: PrincipalPlayer, scene: Phaser.Scene) => {
  const addPlayer = (sessionId: any, onlinePlayer: PlayerModel) => {
    gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
      // @ts-ignore
      scene: scene,
      playerId: sessionId,
      nick: onlinePlayer.nick,
      key: sessionId,
      map: onlinePlayer.map,
      x: onlinePlayer.x,
      y: onlinePlayer.y
    });
    onlinePlayer.onChange = (changes) => {
      changes.forEach((change: { field: string; previousValue: any; value: boolean }) => {
        if (DYNAMIC_PLAYER_FIELDS.includes(change.field) && change.previousValue !== change.value) {
          if (change.field === 'x' || change.field === 'y') {
            gameProps.colyseus.onlinePlayers[sessionId].move(change.field, change.value);
          } else if (change.field === 'walking') {
            if (change.value) {
              gameProps.colyseus.onlinePlayers[sessionId].playWalkingAnimation(onlinePlayer.position);
            } else {
              gameProps.colyseus.onlinePlayers[sessionId].stopWalkingAnimation(onlinePlayer.position);
            }
          } else if (change.field === 'map') {
            player.reactProps.colyseus.room.then((resolvedRoom) => {
              gameProps.colyseus.onlinePlayers[sessionId].destroy();
              if (
                //@ts-ignore
                /*change.value === mapManager.mapName && */ sessionId !== resolvedRoom.sessionId &&
                !gameProps.colyseus.onlinePlayers[sessionId].scene
              ) {
                gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
                  // @ts-ignore
                  scene: scene,
                  nick: onlinePlayer.nick,
                  playerId: sessionId,
                  key: sessionId,
                  map: change.value,
                  x: onlinePlayer.x,
                  y: onlinePlayer.y
                });
              }
            });
          }
        }
      });
    };
  };

  gameProps.colyseus.room.then((room: any) => {
    room.state.messages.onAdd = (message: { nick: string; message: string }, _: any) => {
      renderNewMessageAboveAuthor(gameProps, room, message, player);
    };

    for (const [sessionId, onlinePlayer] of room.state.players) {
      if (sessionId !== room.sessionId) {
        addPlayer(sessionId, onlinePlayer);
      }
    }
    room.state.players.onAdd = (player: PlayerModel, sessionId: any) => {
      addPlayer(sessionId, player);
    };

    room.state.players.onRemove = (player: PlayerModel, sessionId: any) => {
      removePlayer(gameProps, sessionId);
    };
  });
};

function renderNewMessageAboveAuthor(
  gameProps: ReactPhaserProps,
  room: any,
  message: { nick: string; message: string },
  player: PrincipalPlayer
) {
  gameProps.chat.setMessages([...room.state.messages]);
  gameProps.principal.nick === message.nick && player.speechBubbleManager.toggleSpeechBubble(message.message);
  for (const [sessionId, player] of room.state.players) {
      gameProps.principal.nick !== message.nick && message.nick === player.nick &&
      gameProps.colyseus.onlinePlayers[sessionId].speechBubbleManager.toggleSpeechBubble(message.message);
  }
}

function removePlayer(gameProps: ReactPhaserProps, sessionId: any) {
  if (gameProps.colyseus.onlinePlayers[sessionId]) {
    gameProps.colyseus.onlinePlayers[sessionId].destroy();
    delete gameProps.colyseus.onlinePlayers[sessionId];
  }
}
