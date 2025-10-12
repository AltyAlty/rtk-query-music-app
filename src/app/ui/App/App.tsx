import s from './App.module.css';
import {Header} from '@/common/components';
// import {Routing} from '@/common/routing/Routing.tsx';
import {Routing} from '@/common/routing';

export const App = () => {
    return (
        <>
            <Header/>

            <div className={s.layout}>
                <Routing/>
            </div>
        </>
    );
};