import type { NextPage } from 'next'
// import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { useState } from 'react'
import { inferQueryOutput } from '../utils/trpc'
import Link from 'next/link'

const btn =
  'inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-lg text-xs font-medium rounded-xl text-gray-700 bg-white hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

type PokemonFromServer = inferQueryOutput<'pokemon.get-by-id'>

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer
  vote: () => void
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img src={props.pokemon.sprites.front_default} className="w-64 h-64 " />
      <div className="text-xl text-center capitalize mt-[-0.5rem] mb-2">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Better
      </button>
    </div>
  )
}

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['pokemon.hello', { text: 'from tRPC' }])

  const [ids, setIds] = useState(() => getOptionsForVote())
  // const [first, second] = ids
  const first = ids[0] || 1
  const second = ids[1] || 2
  const firstPokemon = trpc.useQuery(['pokemon.get-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['pokemon.get-by-id', { id: second }])
  const voteMutation = trpc.useMutation(['cast-vote'])

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen text-3xl font-bold">
        Loading . . .
      </div>
    )

  const voteForBetter = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second })
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first })
    }
    setIds(getOptionsForVote())
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">
        Which Pokemon is better looking?
      </div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForBetter(first)}
              />
              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForBetter(second)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
      <div className="absolute bottom-0 w-full pb-2 text-xl text-center">
        <a href="https://github.com/">Github</a>
        {' | '}
        <Link href="/results">
          <a>Results</a>
        </Link>
      </div>
    </div>
  )
}

export default Home
