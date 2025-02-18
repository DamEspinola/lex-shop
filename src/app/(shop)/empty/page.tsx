import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center flex-col sm:flex-row items-center h-[500px] sm:h-[700px]">
      <IoCartOutline size={80} className="mx-5" />

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>

        <Link href="/" className="text-green-700 mt-2 text-4xl">
          Regresar
        </Link>
      </div>
    </div>
  );
}
