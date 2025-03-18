'use client';

import Image from 'next/image';
import {Button} from '../button';
import NavLink from './nav-link';
import { type Metadata } from 'next'
import { UserButton, SignedIn, useUser } from '@clerk/nextjs';

export default function Header() {
    const { user } = useUser();
    const isLoggedIn = false;
    const isAdmin = user?.publicMetadata?.role === 'admin';
    return <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        <div className="flex justify-start">
            <NavLink href="/" className="flex items-center gap-2 lg:gap-2 shrink-0">
            <Image 
                src="/logo-catem.png" 
                alt="" 
                width={100} 
                height={100} 
                className="w-5 h-5 lg:w-8 lg:h-8 hover:rotate-12 transform transition duration-200 ease-in-out"/>
            <span className="font-extrabold lg:text-xl text-gray-900">CATEM</span>
            </NavLink>
        </div>

        {/* Solo mostrar si el usuario está logueado y es admin */}
        {isAdmin && (
          <div className="flex-1 flex justify-center">
            <NavLink href="/Conciliacion" className="text-lg font-semibold text-gray-700 hover:text-gray-900">
              Conciliación
            </NavLink>
          </div>
        )}

        <SignedIn>
            <div className="flex justify-end">
                <UserButton />
            </div>
        </SignedIn>
    </nav>;
}