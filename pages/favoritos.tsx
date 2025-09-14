import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PokemonCard from '../components/PokemonCard'

export default function Favoritos(){
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(()=>{
    const favs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favs')||'[]') : []
    setFavorites(favs)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold mb-4">Favoritos</h1>
        {favorites.length === 0 ? (
          <p>Nenhum pokémon favoritado. =/</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map(id => (
              <PokemonCard key={id} id={id} name={`#${String(id).padStart(3,'0')}`} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}