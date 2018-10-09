import openSocket from 'socket.io-client';
import { WS } from './config';

const  socket = openSocket(WS);

export { socket };
