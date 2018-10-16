
const dev = location.hostname === 'localhost';

export const SERVER = dev ? 'http://localhost:3000' : 'https://shayanypn-mern-chatapp.herokuapp.com';
export const WS = dev ? 'ws://localhost:3000' : 'ws://shayanypn-mern-chatapp.herokuapp.com';
