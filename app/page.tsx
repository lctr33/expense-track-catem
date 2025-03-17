//import Image from "next/image";
import { Button } from '../components/ui/button';
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font[family-name: var(--font-geist-sans)]">
      <h1 className="text-4xl [font-weight:1000] text-primary animate-fadeInUp">
        Seguimiento de Gastos CATEM
      </h1>
      <Button variant="outline" size={'lg'}>
        Loggeate aquí perro
      </Button>
    </div>
  );
}
