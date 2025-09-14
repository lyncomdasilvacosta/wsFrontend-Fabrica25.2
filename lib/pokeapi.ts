export type SimplePokemon = {
  name: string
  url: string
}

export async function fetchPokemons(limit = 151, offset = 0) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Falha ao buscar pokémons =/')
  const data = await res.json()
  return data.results as SimplePokemon[]
}

export async function fetchPokemonByNameOrId(idOrName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`)
  if (!res.ok) throw new Error('Pokémon não encontrado =/')
  return await res.json()
}