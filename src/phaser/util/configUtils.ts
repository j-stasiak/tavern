import { ReactPhaserProps } from '../../react-phaser-middleware/ReactPhaserTransmitter';

// @ts-ignore
export const getGameProps = (game: Phaser.Game): ReactPhaserProps => game.reactProps;
