'use client';  // Importante: Indica que este es un componente cliente

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import BgGradient from '@/components/ui/common/bg-gradient';

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      const role = user?.publicMetadata?.role;  // Obtener el rol del usuario

      if (role === 'operator') {
        router.replace('/operator-page');  // Redirigir a la página de operador
      } else if (role == 'admin') {
        router.replace('/admin-page');  // Redirigir a la página de administrador
      }
    }
  }, [isSignedIn, user, router]);

  return (    
    <div className="realtive w-full">
      <BgGradient />
      <div className="flex flex-col">
        <section className="realtive mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
          <div className="">
            <h1 className="font-bold py-6 text-center">
              Control y Seguimiento Financiero CATEM</h1>
            <div className="flex justify-center">
              <Link href="/sign-in" className="flex gap-2 items-center">
                <Button variant={'link'} className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r 
                from-slate-900 
                to-rose-500 
                hover:from-rose-500 
                hover:to-slate-900 
                hover:no-underline 
                font-bold
                shadow-lg transition-all duration-300">
                  <span>Iniciar sesión</span>
                  <ArrowRight className="animate-pulse" />
                </Button>
              </Link>
            </div>
            <Link href="/sign-up" className="mt-4 text-gray-500 hover:underline text-sm flex justify-center px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16">
                Registrarse
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
