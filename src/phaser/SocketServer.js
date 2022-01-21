import * as Colyseus from 'colyseus.js';

/*================================================
| Array with current online players
*/

let onlinePlayers = {};

/*================================================
| Colyseus connection with server
*/
var client = new Colyseus.Client('ws://localhost:4001');
//TODO Change 'token' to real jwt
let room = client
  .joinOrCreate('poke_world', { 
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huZG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BEtVcDngv70orUHE1xfBUMnIyBgdcdpkH0EqI_nzF80' 
  })
  .then((room) => {
    console.log(room.sessionId, 'joined', room.name);
    return room;
  })
  .catch((e) => {
    console.log('JOIN ERROR', e);
  });

export { onlinePlayers, room };
