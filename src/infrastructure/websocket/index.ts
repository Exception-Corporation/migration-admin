import io from 'socket.io-client';
import config from '@/infrastructure/config';

export const SocketIO = io(config.api.migration.url, {
  transports: ['websocket']
});

SocketIO.on('connect_error', (err) => {
  alert(err.toString());
});
