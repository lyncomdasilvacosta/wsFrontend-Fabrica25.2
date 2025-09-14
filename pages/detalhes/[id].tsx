import { GetServerSideProps } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { fetchPokemonByNameOrId } from '../../lib/pokeapi'

type Props = { pokemon: any }

export default function Detalhes({ pokemon }: Props){
  const padded = String(pokemon.id).padStart(3, '0')
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex-1">
        <div className="bg-yellow-200 rounded p-6 shadow-md shadow-red-300/80">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-48 h-48 object-contain" />
            <div>
              <h1 className="text-2xl font-bold capitalize">{pokemon.name} <span className="text-gray-500">#{padded}</span></h1>
              <p className="mt-9">Tipos: {pokemon.types.map((t:any)=>t.type.name).join(', ')}</p>
              <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>
              <p>Experiência base: {pokemon.base_experience}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id

  if (!id || Array.isArray(id)) {
    return { notFound: true }
  }

  try {
    const pokemon = await fetchPokemonByNameOrId(id)
    return { props: { pokemon } }
  } catch (e) {
    return { notFound: true }
  }
}

