import { getUsers } from '@/app/api/clerk/operators/core';

export async function GET() {
  try {
    const users = await getUsers();
    
    // Filtrar solo usuarios con rol 'operator'
    const operators = users.data.filter(
      (user) => user.publicMetadata?.role === 'operator'
    );

    return new Response(JSON.stringify(operators), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
