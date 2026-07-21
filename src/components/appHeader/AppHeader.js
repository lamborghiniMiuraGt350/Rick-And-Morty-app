import { Link, NavLink } from 'react-router-dom';
import logo from '../../resources/img/logo.webp';
import './appHeader.scss';
const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src={logo} alt="Rick and Morty" style={{ width: '250px' }} /> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({ isActive }) => ({ color: isActive ? '#9f0013' : '' })} to='/'>Characters</NavLink></li>
                    /
                    <li><NavLink end style={({ isActive }) => ({ color: isActive ? '#9f0013' : '' })} to='episodes'>Episodes</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;