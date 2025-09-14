import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-yellow-400 shadow-md h-12">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-full">
        
        {/* Link Home */}
        <Link href="/" className="text-black font-bold text-xl">
          Home
        </Link>

        {/* Logo */}
        <img
          src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo-0.png"
          alt="Pokémon Logo"
          width={250}
          height={50}
          style={{ objectFit: "contain" }}
        />

        {/* Link Favoritos */}
        <Link href="/favoritos" className="text-black font-bold text-xl">
          Favoritos
        </Link>
      </div>
    </header>
  );
}

