import type { NextPage } from 'next'
// import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { useState } from 'react'

const btn =
  'inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['pokemon.hello', { text: 'from tRPC' }])

  const [ids, setIds] = useState(() => getOptionsForVote())
  const [first, second] = ids
  const firstPokemon = trpc.useQuery(['pokemon.get-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['pokemon.get-by-id', { id: second }])
  console.log('poki-poki: ', firstPokemon?.data)
  // console.log('poki-greet: ', hello?.data?.hi)

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen text-3xl font-bold">
        Loading . . .
      </div>
    )

  const voteForBetter = (selected: number) => {
    // todo:  mutation to persist changes
    // updateIds(getOptionsForVote());
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">
        Which Pokemon is better looking?
      </div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="flex flex-col items-center w-64 h-64">
          <img
            src={firstPokemon.data?.sprites?.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForBetter(first)}>
            Better
          </button>
        </div>
        <div className="p-8">Vs</div>

        <div className="flex flex-col items-center w-64 h-64">
          <img
            src={secondPokemon.data?.sprites?.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForBetter(second)}>
            Better
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  )
}

export default Home
