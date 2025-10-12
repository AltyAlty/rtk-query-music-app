import './index.css';
import {createRoot} from 'react-dom/client';
/*Компонент "BrowserRouter" из библиотеки React Router позволяет пользоваться роутингом из этой библиотеки.*/
import {BrowserRouter} from 'react-router';
import {App} from '@/app/ui/App/App.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
