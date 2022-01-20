import * as Colyseus from 'colyseus.js';

/*================================================
| Array with current online players
*/

const onlinePlayers: any[] = [];

/*================================================
| Colyseus connection with server
*/
const client = new Colyseus.Client('ws://localhost:4001');
const room = client
  .joinOrCreate('poke_world')
  .then((room) => {
    console.log(room.sessionId, 'joined', room.name);
    return room;
  })
  .catch((e) => {
    console.log('JOIN ERROR', e);
  });

export { onlinePlayers, room };
