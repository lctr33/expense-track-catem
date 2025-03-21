import { clerkClient } from '@clerk/clerk-sdk-node';

/**
 * Obtiene la lista de usuarios desde Clerk
 * @returns Lista de usuarios registrados
 */
export async function getUsers() {
  try {
    const userList = await clerkClient.users.getUserList({ limit: 100 });
    return userList; // Retorna la lista de usuarios
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    throw new Error('No se pudo obtener la lista de usuarios');
  }
}
