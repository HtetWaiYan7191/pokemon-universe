const getAllPokemons = async (id,pokemons,base_url) => {
    const result = await fetch(`${base_url}/${id}`);
    const new_poke = await result.json();
    pokemons = [...pokemons,new_poke];
    return pokemons;
}

export default getAllPokemons;