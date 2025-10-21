/*Импортируем функцию "createApi()" из RTK Query для создания объектов API. Чтобы не было проблем нужно делать импорт из
"@reduxjs/toolkit/query/react". Также импортируем функцию "fetchBaseQuery()" из RTK Query, которая является оберткой над
функцией "fetch()" и упрощает осуществление запросов.*/
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {FetchPlaylistsArgs, PlaylistsResponse} from '@/features/playlists/api/playlistsAPI.types.ts';

/*Функция "createApi()" из RTK Query может принимать много параметров в виде большого объекта. Используемые в данном
случае параметры (все обязательные):
- "reducerPath" - имя редьюсера, то есть место куда будут сохранены состояние и actions для этого API.
- "baseQuery" - описание instance (экземпляра) - объекта, содержащего необходимые параметры для запросов.
- "endpoints" - метод, возвращающий объект с endpoints для API, описанными с помощью функций, которые будут вызываться
при вызове соответствующих методов этого API, например, "get", "post", "put", "patch" или "delete".

Метод "build.query()" по умолчанию создает запрос "get", поэтому свойство "method" в таком случае указывать
необязательно.

У объекта "build" есть несколько методов:
- "build.query()" - метод для получения данных с сервера, обычно используется для GET-запросов.
- "build.mutation()" - метод для изменения данных на сервере.
- "build.infiniteQuery()" - метод для реализации "бесконечной прокрутки".

В параметрах методов "build.query()", "build.mutation()" и "build.infiniteQuery()" всегда указывается объект со
методом "query()". В этот методе "query()" можно указывать аргументы запроса. Метод "query()" возвращает объект,
описывающий запрос.

При типизации метода "build.query()" первым указывается тип того, что возвращается запросом, а вторым указываются
аргументы запроса.

В итоге функция "createApi()" создает объект API, который содержит все endpoints в виде хуков, определенных в параметре
"endpoints".

Для получения API-ключа нужно зарегистрироваться здесь "https://apihub.it-incubator.io/ru".*/
export const playlistsAPI = createApi({
    reducerPath: 'playlistsAPI',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {'API-KEY': import.meta.env.VITE_API_KEY}
    }),

    endpoints: build => ({
        /*Описываем GET-запрос для получения плейлистов.*/
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: ({pageSize}) => (
                {
                    method: 'get',
                    url: `playlists?pageSize=${pageSize}`
                }
            ),

            /*Сокращенная версия.*/
            // query: () => `playlists`,
        })
    })
});

/*Получаем хук "useFetchPlaylistsQuery()" из API "playlistsAPI". Название хука формируется следующим образом:
"use" + "FetchPlaylists" + "query" = "useFetchPlaylistsQuery".*/
export const {useFetchPlaylistsQuery} = playlistsAPI;