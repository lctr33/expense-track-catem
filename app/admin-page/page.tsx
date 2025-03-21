'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import BgGradient from '@/components/ui/common/bg-gradient';
import ImgVisualizer from '@/components/ui/img_visualizer';

export default function AdminPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [operators, setOperators] = useState<{ id: string; username?: string; publicMetadata?: { role?: string } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState<{ id: string; username?: string } | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (isSignedIn === undefined || user === undefined) {
      return; // Espera a que los datos estén disponibles
    }

    if (!isSignedIn) {
      router.replace('/');
      return;
    }
    if (user?.publicMetadata?.role !== 'admin') {
      router.replace('/');
      return;
    }

    async function fetchOperators() {
      try {
        const res = await fetch('/api/clerk/operators');
        if (!res.ok) {
          console.error('Error fetching operators:', res.statusText);
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error('Unexpected response format:', data);
          return;
        }
        const filteredOperators = data.filter(
          (operator) => operator.publicMetadata?.role === 'operator'
        );
        setOperators(filteredOperators);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOperators();
  }, [isSignedIn, user, router]);

  const handleOperatorClick = async (operator: { id: string; username?: string }) => {
    setSelectedOperator(operator);
    try {
      const res = await fetch(`/api/images/${operator.id}`); // Endpoint para obtener imágenes del usuario
      if (!res.ok) {
        console.error('Error fetching images:', res.statusText);
        return;
      }
      const data = await res.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-100 text-gray-800 p-4 flex flex-col items-center">
      <BgGradient />
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Panel de Administración
      </h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">
        Lista de Usuarios (Operadores)
      </h2>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {operators.length > 0 ? (
          <ul className="space-y-3">
            {operators.map((operator) => (
              <li
                key={operator.id}
                className="flex justify-between items-center p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOperatorClick(operator)}
              >
                <span className="text-lg">
                  {operator.username || 'Usuario sin nombre de usuario'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay operadores registrados.</p>
        )}
      </div>

      {/* Mostrar ImgVisualizer si hay un operador seleccionado */}
      {selectedOperator && (
        <ImgVisualizer
          images={images}
          operator={selectedOperator}
          onClose={() => setSelectedOperator(null)}
        />
      )}
    </div>
  );
}
