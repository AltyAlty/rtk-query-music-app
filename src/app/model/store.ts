/*Импортируем функцию "configureStore()" для создания и конфигурации store.*/
import {configureStore} from '@reduxjs/toolkit';
/*Импортируем функцию "setupListeners()" позволяющую подключать слушателей для событий "refetchOnFocus" и
"refetchOnReconnect", чтобы была возможность автоматически перезагружать данные при возвращении на страницу или при
восстановлении подключения. При вызове этой функции в ней можно передать "store.dispatch" для настройки слушателей по
умолчанию, но можно также передать отдельную callback-функцию для более тонкой настройки слушателей.*/
import {setupListeners} from '@reduxjs/toolkit/query';
import {playlistsAPI} from '@/features/playlists/api/playlistsAPI.ts';

/*Создаем store.*/
export const store = configureStore({
    /*Создаем редьюсер для работы с плейлистами.*/
    reducer: {[playlistsAPI.reducerPath]: playlistsAPI.reducer},
    /*Свойство "middleware" содержит массив middlewares.

    Подключаем middleware по умолчанию "getDefaultMiddleware()" для использования дополнительных функций RTK Query:
    кэширование, инвалидация и pooling. Так же в этом middleware есть thunks.

    Если нужно подключить больше middlewares, то их нужно указывать в вызове метода "concat()". Подключаем middleware
    для плейлистов при помощи метода "concat()".*/
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(playlistsAPI.middleware)
});

setupListeners(store.dispatch);