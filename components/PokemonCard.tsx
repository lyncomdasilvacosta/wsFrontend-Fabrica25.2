import Link from 'next/link'

type Props = {
  id: number
  name: string
  image: string
  isList?: boolean
  onToggleFavorite?: (id: number) => void
  isFavorite?: boolean
}

export default function PokemonCard({
  id,
  name,
  image,
  isList = false,
  onToggleFavorite,
  isFavorite
}: Props) {
  const padded = String(id).padStart(3, '0')

  const containerClass = isList
    ? 'flex items-center space-x-4 p-3 bg-white rounded-lg shadow-2xl shadow-red-400/70'
    : 'p-4 bg-yellow-200 rounded-lg shadow-lg shadow-red-400/90'

  const contentClass = isList
    ? 'flex items-center space-x-4'
    : 'block text-center'

  return (
    <div className={containerClass}>
      <Link href={`/detalhes/${id}`} className={contentClass}>
        <img
          src={image}
          alt={name}
          className={
            isList
              ? 'w-20 h-20 object-contain'
              : 'w-32 h-32 mx-auto object-contain'
          }
        />
        <div>
          <div className="font-semibold capitalize">{name}</div>
          <div className="text-sm text-gray-500">#{padded}</div>
        </div>
      </Link>

      <div className="ml-auto flex items-center space-x-2">
        <button
          onClick={() => onToggleFavorite?.(id)}
          aria-label="favoritar"
          className="text-xl"
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <span className={isFavorite ? 'text-blue-400' : 'text-gray-400'}>
            {isFavorite ? '★' : '☆'}
          </span>
        </button>
      </div>
    </div>
  )
}
