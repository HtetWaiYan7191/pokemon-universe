const getAllPokemons = async (id, pokemons, baseUrl) => {
  const result = await fetch(`${baseUrl}/${id}`);
  const newPoke = await result.json();
  pokemons = [...pokemons, newPoke];
  return pokemons;
};

export default getAllPokemons;