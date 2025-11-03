import Alert from "~/components/Alert";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';

export type Alert = {
  deviceId: number,
  message: string,
  timestamp: string,
  nivel: string,
  usuarios: number[]
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "test alertas" },
    { name: "description", content: "alertas jasjajsj" },
  ];
}

export default function Home() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io('http://localhost:8000', {
      auth: { token }
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });

    socket.on('alert', (alert) => {
      console.log('New alert:', alert);
      setAlerts(prev => [alert, ...prev]);
    });

    return () => { socket.disconnect() };
  }, []);

  return <div className="py-10">
    <h1 className="text-center text-5xl font-bold">Hello</h1>
    <div className="block m-auto w-7/12 py-6">
      <div className="flex justify-center items-center flex-wrap gap-4">
        {
          alerts.map((alert: Alert) => (
            <Alert {...alert} />
          ))
        }
      </div>
    </div>
  </div>;
}
