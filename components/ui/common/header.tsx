import Image from 'next/image';
import {Button} from '../button';
import NavLink from './nav-link';

export default function Header() {
    const isLoggedIn = false;
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

        {isLoggedIn ?(<div>
            <NavLink href="/Conciliacion">Conciliación</NavLink>
            <Button>Cerrar Sesión</Button>
        </div>
        )
        :(
        <div className="flex justify-end lg:justify-1">
            <NavLink href="/login">Iniciar sesión</NavLink>
        </div>
        )}

    </nav>;
}