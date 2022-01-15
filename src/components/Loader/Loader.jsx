import React from 'react';

function Loader() {
	return (
		<div className='col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center'>
			<div className='h-10 w-10 border-4 border-solid rounded-full border-b-red-600 animate-spin'></div>
		</div>
	);
}

export default Loader;
