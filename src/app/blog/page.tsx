'use client';

import { useRouter } from 'next/navigation';

type Publicacion = {
  titulo: string;
  url: string;
  periodo: string;
  active: boolean;
};

export default function Blog() {
  const router = useRouter();

  const publicaciones: Publicacion[] = [
    { titulo: '¿Qué es B2F y por qué deberías conocerlo ya?', url: 'blog/periodouno', periodo: 'periodo 1',active: true },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 2.', url: 'blog/periodo2', periodo: 'periodo 2' ,active: false },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 3.', url: '/periodo3', periodo: 'periodo 3' ,active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 4.', url: '/periodo4', periodo: 'periodo 4' ,active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 5', url: '/periodo5', periodo: 'periodo 5' ,active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 6', url: '/periodo6', periodo: 'periodo 6',active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 7', url: '/periodo7', periodo: 'periodo 7',active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 8', url: '/periodo8', periodo: 'periodo 8' ,active: false  },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 9', url: '/periodo9', periodo: 'periodo 9' ,active: false },
    { titulo: '¡Prepárate! Aquí aparecerá el contenido del Período 10', url: '/periodo10', periodo: 'periodo 10', active: false },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        📚 Nuestras Publicaciones sobre el GAC
      </h1>
      <ul className="space-y-4">
        {publicaciones.map((pub) => (
          <li key={pub.periodo}>
          <button
            onClick={() => {
              if (pub.active) {
                router.push(pub.url);
              }
            }}
            className={`w-full text-left p-4 rounded-lg shadow-md bg-white border border-gray-200 transition duration-200 flex justify-between items-center ${
              pub.active ? "cursor-pointer hover:bg-blue-50" : "cursor-default"
            }`}
          >
            <span className="text-lg font-medium text-gray-800">{pub.titulo}</span>
            <span className="text-sm text-blue-600">{pub.periodo}</span>
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
