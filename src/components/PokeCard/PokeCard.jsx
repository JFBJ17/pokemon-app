import React from 'react';

function PokeCard({name, image}) {
	return (
		<div className='bg-slate-50 dark:bg-slate-400 flex flex-col shadow-xl rounded p-5 space-y-5'>
			<img className='h-80' src={image} alt='pokemon' />
			<span className='dark:text-white font-bold text-2xl sm:text-lg text-center uppercase'>
				{name}
			</span>
		</div>
	);
}

export default PokeCard;
