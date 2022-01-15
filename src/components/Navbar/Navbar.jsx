import {Link} from 'react-router-dom';
import Logo from '../../images/Logo.png';

function Navbar() {
	return (
		<nav className='bg-slate-50 py-2.5 border-b-2 border-b-slate-800 shadow-lg flex justify-center items-center dark:bg-slate-800 dark:border-b-slate-50'>
			<Link to='/'>
				<img className='w-40 sm:w-48' src={Logo} alt='logo' />
			</Link>
		</nav>
	);
}

export default Navbar;
