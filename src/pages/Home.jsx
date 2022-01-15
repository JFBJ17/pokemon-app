import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar/Navbar';
import PokeCard from '../components/PokeCard/PokeCard';
import Loader from '../components/Loader/Loader';

function Home() {
	const [pokemon, setPokemon] = useState([]);
	const [filterPokemon, setFilterPokemon] = useState([]);
	const [loadData, setLoadData] = useState({});
	const [loader, setLoader] = useState(false);

	const getPokemons = async (url) => {
		let Allpokemons;
		if (url) {
			Allpokemons = await axios.get(url);
		} else {
			Allpokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
		}
		const {next, previus} = Allpokemons.data;
		const res = await Promise.all(
			Allpokemons.data.results.map(async (element) => {
				const pokemonData = await axios.get(element.url);
				return pokemonData;
			})
		);

		const pokemonData = res.map((pokemon) => pokemon.data);
		pokemonData.length === 0 ? setLoader(false) : setLoader(true);
		setLoadData({...loadData, next, previus});
		setPokemon([...pokemon, ...pokemonData]);
		setFilterPokemon([...filterPokemon, ...pokemonData]);
	};

	const handleClick = () => {
		getPokemons(loadData.next);
	};

	const handleChange = (e) => {
		const filterPok = filterPokemon.filter((element) => {
			return (
				element.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
			);
		});
		setPokemon(filterPok);
	};

	useEffect(() => {
		getPokemons();
	}, []);

	return (
		<>
			<Navbar />
			<div className='container mx-auto my-20 px-5 space-y-10'>
				<div className='flex justify-center sm:justify-end'>
					<input
						type='search'
						placeholder='Buscar'
						className='h-10 border-2 border-blue-900 outline-none focus:outline focus:outline-offset-2 focus:outline-blue-600 rounded-md p-1'
						onChange={handleChange}
					/>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{pokemon.length > 0 ? (
						pokemon.map((element) => {
							return (
								<PokeCard
									name={element.name}
									image={
										element.sprites.other.dream_world.front_default ||
										element.sprites.other.home.front_default
									}
									key={element.id}
								/>
							);
						})
					) : (
						<Loader />
					)}
				</div>
				{loader ? (
					<>
						<div className='flex justify-center'>
							<button
								className='btn bg-red-500 hover:bg-red-700'
								onClick={handleClick}
							>
								Ver más
							</button>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default Home;
