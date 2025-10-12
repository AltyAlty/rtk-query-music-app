import s from './Header.module.css';
/*Компонент "NavLink" из библиотеки React Router позволяет создавать навигационные ссылки.*/
import {NavLink} from 'react-router';
import {Path} from '@/common/routing';

const navItems = [
    {to: Path.Main, label: 'Main'},
    {to: Path.Playlists, label: 'Playlists'},
    {to: Path.Tracks, label: 'Tracks'},
    {to: Path.Profile, label: 'Profile'},
];

export const Header = () => {
    return (
        <header className={s.container}>
            <nav>
                <ul className={s.list}>
                    {
                        navItems.map(item => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}

                                    /*Компонент "NavLink" автоматически передает в эту функцию объект с параметрами.
                                    Одним из свойств этого объекта является свойство "isActive". Свойство "isActive"
                                    показывает активна ли какая-то навигационная ссылка.*/
                                    className={
                                        ({isActive}) => `link${isActive ? ` ${s.activeLink}` : ''}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
};