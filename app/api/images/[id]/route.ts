import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Devuelve imágenes específicas para el usuario con el ID "user_2uUvPQB3swvt6pN5Cziwz76M393"
  if (id === 'user_2uUvPQB3swvt6pN5Cziwz76M393') {
    return NextResponse.json({
      images: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
    });
  }

  // Devuelve un array vacío para otros usuarios
  return NextResponse.json({ images: [] });
}