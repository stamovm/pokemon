import { createRouter } from './context'
import { z } from 'zod'

import { PokemonClient } from 'pokenode-ts'

export const pokemonRouter = createRouter()
  .query('get-by-id', {
    input: z.object({ id: z.number() }),
    resolve({ input }) {
      const api = new PokemonClient()
      const pokemon = api.getPokemonById(input.id)

      return pokemon
    },
  })
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        hi: `Hello fromm poki`,
      }
    },
  })
