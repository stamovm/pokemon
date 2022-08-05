import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  console.log('hello:' hello)
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="p-8">{hello.data.greeting}</div>
      <div className="text-2xl text-center">Which Pokemon looks stronger?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="w-16 h-16 bg-teal-200" />
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-teal-200" />
      </div>
    </div>
  )
}

export default Home
