import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PokemonCard from '../components/PokemonCard'
import { fetchPokemons } from '../lib/pokeapi'

type Simple = { name: string; url: string }

export default function Home() {
  const [pokemons, setPokemons] = useState<Simple[]>([])
  const [query, setQuery] = useState('')
  const [isList, setIsList] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    fetchPokemons(151).then(setPokemons).catch(console.error)
    const favs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favs') || '[]') : []
    setFavorites(favs)
  }, [])

  const enriched = useMemo(
    () =>
      pokemons.map((p, i) => ({
        ...p,
        id: i + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
      })),
    [pokemons]
  )

  const filtered = enriched.filter(p => p.name.includes(query.toLowerCase()))

  function toggleFav(id: number) {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('favs', JSON.stringify(next))
      return next
    })
  }

  return (
    /* min-h-screen garante que o wrapper ocupe a tela inteira, sem cobrir o gradiente do body */
    <div className="min-h-screen flex flex-col bg-transparent">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Pokémons</h1>
          <div className="flex items-center space-x-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome..."
              className="px-3 py-2 rounded"
            />
            {/* botão traduzido: mostra a ação que será executada (se isList=true mostra 'Grade' para mudar para grade) */}
            <button onClick={() => setIsList(s => !s)} className="px-3 py-2 rounded bg-white/20 text-white">
              {isList ? 'Grade' : 'Lista'}
            </button>
          </div>
        </div>

        <div className={isList ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
          {filtered.map(p => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              isList={isList}
              onToggleFavorite={toggleFav}
              isFavorite={favorites.includes(p.id)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
