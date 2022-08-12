import type { NextPage } from 'next'
// import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { useState } from 'react'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['pokemon.hello', { text: 'from tRPC' }])

  const [ids, setIds] = useState(() => getOptionsForVote())
  const [first, second] = ids
  const firstPokemon = trpc.useQuery(['pokemon.get-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['pokemon.get-by-id', { id: second }])
  console.log('poki-poki: ', firstPokemon)
  console.log('poki-greet: ', hello?.data?.hi)
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">Which Pokemon looks stronger?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="flex flex-col w-64 h-64">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">Vs</div>

        <div className="flex flex-col w-64 h-64">
          <img
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
        </div>
        <div className="p-2" />
      </div>
    </div>
  )
}

export default Home
