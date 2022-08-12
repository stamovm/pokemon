const MAX_ID = 491

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokemonNumber = Math.floor(Math.random() * MAX_ID) + 1

  if (pokemonNumber !== notThisOne) return pokemonNumber
  return getRandomPokemon(notThisOne)
}

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon()
  const secondId = getRandomPokemon(firstId)

  return [firstId, secondId]
}
