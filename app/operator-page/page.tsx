'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BgGradient from '@/components/ui/common/bg-gradient';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [nuevaObra, setNewObra] = useState('');

  const [obras,setObra] = useState([
    { nombre: 'Obra Chamilpa', ruta: '/login/trabajador'},
  ]);

  const filteredObras = obras.filter((obra) =>
    obra.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const agregarObra = () => {

    if (nuevaObra.trim() === '') {
      alert('El nombre de la obra no puede estar vacío.');
      return;
    }
    if (obras.some((obra) => obra.nombre.toLowerCase() === nuevaObra.toLowerCase())) {
      alert('Esta obra ya existe.');
      return;
    }

    const nuevaObraObj = { nombre: nuevaObra, ruta: '/login/trabajador' };
    setObra([...obras, nuevaObraObj]);
    setNewObra('');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-100 text-gray-800 p-4">
      {/* Fondo de gradiente */}
      <BgGradient />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-5">
          Selecciona la obra a la que deseas subir tus notas
        </h1>

        {/* Barra de búsqueda */}
        <div className="w-full mb-8">
          <input
            type="text"
            placeholder="Buscar obra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Formulario para añadir obra */}
        <div className="w-full mb-8 flex gap-2">
          <input
            type="text"
            placeholder="Nombre de la nueva obra..."
            value={nuevaObra}
            onChange={(e) => setNewObra(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={agregarObra}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition-all"
          >
            Añadir
          </button>
        </div>

        {/* Contenedor de las cajas */}
        <main className="w-full flex flex-wrap justify-center gap-6">
        <BgGradient />
          {filteredObras.map((obra, index) => (
            <Link key={index} href={obra.ruta} passHref legacyBehavior>
              <a className="w-full sm:w-[45%] p-8 rounded-xl shadow-lg bg-white bg-opacity-80 transition-all hover:scale-105 cursor-pointer flex flex-col items-center">
                {/* Ícono de construcción */}
                <div className="mb-4">
                  <Image
                    src="/construccion-icon.png"
                    alt="icono de construcción"
                    width={80}
                    height={80}
                  />
                </div>
                {/* Nombre de la obra */}
                <p className="text-2xl font-bold text-gray-700 text-center">{obra.nombre}</p>
              </a>
            </Link>
          ))}
        </main>

        {filteredObras.length === 0 && (
          <p className="text-gray-700 text-lg text-center">No se encontraron obras.</p>
        )}
      </div>
    </div>
  );
}