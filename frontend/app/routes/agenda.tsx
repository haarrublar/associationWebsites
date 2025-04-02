// ./app/routes/agenda.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MetaFunction } from '@remix-run/node'; // or your framework's types

export const meta: MetaFunction = () => {
  return [
    { title: "Agenda View" },
    { name: "description", content: "View agenda items from Django" },
  ];
};

export default function AgendaView() {
  const [details, setDetails] = useState<Array<{
    id: number;
    event: string;
    date: string;
    description: string;
  }>>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/agendas/')
      .then(res => setDetails(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda Items</h1>
      <div className="space-y-4">
        {details.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{item.event}</h2>
            <p className="text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}