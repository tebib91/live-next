import { Server as HTTPServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { WebSocket, WebSocketServer } from 'ws';
import { getCpuLoad, getRamUsage } from '../utils';

type NextApiResponseServer = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      wss: WebSocketServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServer
) {
  console.log('Initializing WebSocket server...');

  if (!res.socket.server.wss) {
    const wss = new WebSocketServer({ noServer: true });
    res.socket.server.wss = wss;

    wss.on('connection', (client: WebSocket) => {
      console.log('A client connected!');

      const sendSystemUsage = () => {
        const cpuLoad = getCpuLoad();
        const ramUsage = getRamUsage();
        client.send(JSON.stringify({ cpuLoad, ramUsage }));
      };

      const interval = setInterval(sendSystemUsage, 5000);

      client.on('message', message => {
        console.log('Received message:', message.toString());
        client.send(`Echo: ${message}`);
      });

      client.on('close', () => {
        clearInterval(interval);
        console.log('A client disconnected!');
      });

      client.on('error', error => {
        console.error('WebSocket error:', error);
      });
    });

    res.socket.server.on('upgrade', (request, socket, head) => {
      console.log('Handling upgrade request...');
    });
  } else {
    console.log('WebSocket server already running.');
  }
  res.status(200).end();
}
