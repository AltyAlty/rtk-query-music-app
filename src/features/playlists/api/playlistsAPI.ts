/*Импортируем функцию "createApi()" из RTK Query для создания объектов API. Чтобы не было проблем нужно делать импорт из
"@reduxjs/toolkit/query/react". Также импортируем функцию "fetchBaseQuery()" из RTK Query, которая является оберткой над
функцией "fetch()" и упрощает осуществление запросов.*/
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs, PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
} from '@/features/playlists/api/playlistsAPI.types.ts';

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
        headers: {'API-KEY': import.meta.env.VITE_API_KEY},
        /*Метод "prepareHeaders()" принимает заголовки "headers" и API "api". Используем этот метод, чтобы прикреплять
        токен доступа к запросам. Метод "prepareHeaders()" работает как перехватчик всех запросов, чтобы добавлять к ним
        дополнительную информацию. В итоге и API-ключ и токен доступа будут указаны в Request Headers в запросах. При
        помощи параметра "api" можно, например, определять какой запрос выполняется и на какой endpoint.*/
        prepareHeaders: (headers, api) => {
            console.log(`Endpoint: ${api.endpoint}`);
            console.log(`Arguments:`);
            console.log(api.arg);
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
            return headers;
        }
    }),

    endpoints: build => ({
        /*Описываем GET-запросы для получения плейлистов.*/
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: ({pageSize}) => ({
                method: 'get',
                url: `playlists?pageSize=${pageSize}`
            }),

            /*Сокращенная версия.*/
            // query: () => `playlists`
        }),

        /*Описываем POST-запросы для создания плейлиста. Можно создать не больше 10 плейлистов.*/
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => ({
                method: 'post',
                url: `playlists`,
                body
            })
        }),

        /*Описываем DELETE-запросы для удаления плейлиста.*/
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({
                method: 'delete',
                url: `playlists/${playlistId}`
            })
        }),

        /*Описываем UPDATE-запросы для обновления плейлиста.*/
        updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => ({
                method: 'put',
                url: `playlists/${playlistId}`,
                body
            })
        })
    })
});

/*Получаем хук "useFetchPlaylistsQuery()" из API "playlistsAPI". Название хука формируется следующим образом:
"use" + "FetchPlaylists" + "query" = "useFetchPlaylistsQuery".*/
export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation
} = playlistsAPI;