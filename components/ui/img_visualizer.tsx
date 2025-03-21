import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ImgVisualizerProps {
  images: string[];
  operator: { id: string; username?: string } | null;
  onClose: () => void;
}

export default function ImgVisualizer({ images, operator, onClose }: ImgVisualizerProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || ''); // Imagen seleccionada
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: 'center', backgroundSize: 'contain' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%', // Ajusta el nivel de zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ backgroundPosition: 'center', backgroundSize: 'contain' });
  };

  return (
    <div className="w-full bg-gray-100 text-gray-800 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg flex flex-row gap-6">
        {/* Miniaturas de imágenes */}
        <div className="w-1/5 h-[80vh] overflow-y-auto flex flex-col gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer hover:opacity-75"
              onClick={() => setSelectedImage(image)} // Cambiar la imagen seleccionada
            >
              <Image
                src={image}
                alt={`Imagen ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Imagen seleccionada con efecto de zoom */}
        <div
          className="w-[45%] h-[80vh] flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundRepeat: 'no-repeat',
            ...zoomStyle,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {!selectedImage && <p className="text-gray-500">No hay imágenes disponibles.</p>}
        </div>

        {/* Información adicional y formulario */}
        <div className="w-[30%] h-[80vh] flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-gray-700">
            Operador: {operator?.username || 'Usuario'}
          </h3>

          {/* Campo de Fecha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fecha" className="text-lg font-semibold text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Folio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="folio" className="text-lg font-semibold text-gray-700">
              Folio
            </label>
            <input
              type="text"
              id="folio"
              name="folio"
              placeholder="Ingresa el folio"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Placa */}
          <div className="flex flex-col gap-2">
            <label htmlFor="placa" className="text-lg font-semibold text-gray-700">
              Placa
            </label>
            <input
              type="text"
              id="placa"
              name="placa"
              placeholder="Ingresa la placa"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Cap. (M3) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="capacidad" className="text-lg font-semibold text-gray-700">
              Cap. (M3)
            </label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              placeholder="Ingresa la capacidad en M3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Concepto */}
          <div className="flex flex-col gap-2">
            <label htmlFor="concepto" className="text-lg font-semibold text-gray-700">
              Concepto
            </label>
            <input
              type="text"
              id="concepto"
              name="concepto"
              placeholder="Ingresa el concepto"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Costo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="costo" className="text-lg font-semibold text-gray-700">
              Costo
            </label>
            <input
              type="number"
              id="costo"
              name="costo"
              placeholder="Ingresa el costo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Observaciones */}
          <div className="flex flex-col gap-2">
            <label htmlFor="observaciones" className="text-lg font-semibold text-gray-700">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              placeholder="Ingresa las observaciones"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white text-lg font-bold py-3 rounded-lg hover:bg-red-600 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Enlace para volver a la página principal */}
      <div className="mt-6 text-center">
        <Link href="/" legacyBehavior>
          <a className="text-blue-500 hover:text-blue-600 transition-all">
            Volver a la página principal
          </a>
        </Link>
      </div>
    </div>
  );
}