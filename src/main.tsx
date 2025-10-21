import './index.css';
import {createRoot} from 'react-dom/client';
/*Импортируем компонент "BrowserRouter" из библиотеки React Router, который позволяет пользоваться роутингом из этой
библиотеки.*/
import {BrowserRouter} from 'react-router';
/*Импортируем компонент "Provider" из библиотеки "React Redux", который позволяет использовать store в приложении.*/
import {Provider} from 'react-redux';
/*Импортируем store.*/
import {store} from '@/app/model/store.ts';
import {App} from '@/app/ui/App/App.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);