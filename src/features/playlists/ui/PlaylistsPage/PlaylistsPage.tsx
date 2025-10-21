import s from './PlaylistsPage.module.css';
import {useFetchPlaylistsQuery} from '@/features/playlists/api/playlistsAPI.ts';

export const PlaylistsPage = () => {
    /*Вызов хука, созданного при помощи RTK Query, возвращает объект. Внутри этого объекта может быть несколько свойств:
    - "currentData" - последний успешно полученные ответ.
    - "data" - последний успешно полученные ответ, но может сбрасываться на undefined, если делается новый запрос с
    новыми аргументами.
    - "endpointName" - имя endpoint в созданном API.
    - "fulfilledTimeStamp" - метка времени, когда был завершен запрос.
    - "isError" - флаг, показывающий не произошла ли ошибка при выполнении запроса.
    - "isFetching" - флаг, показывающий происходит ли загрузка данных.
    - "isLoading" - флаг, показывающий происходит ли загрузка данных первый раз в пустой кэш.
    - "isSuccess" - флаг, показывающий был ли успешно завершен запрос.
    - "isUninitialized" - флаг, показывающий, что запрос еще не был проинициализирован.
    - "refetch" - специальная функция для перевызова запроса.
    - "requestId" - ID запроса.
    - "startedTimeStamp" - метка времени, когда был начат запрос.
    - "status" - статус запроса.

    Хук, созданный при помощи RTK Query, может также принимать параметры: аргументы запроса и опции запроса. Опции могут
    быть следующими:
    - "skip" - позволяет пропустить запрос для текущей отрисовки. Изначально false.
    - "pollingInterval" - позволяет автоматически запускать запрос повторно через каждые несколько миллисекунд.
    Изначально 0.
    - "selectFromResult" - позволяет изменять возвращенные данные хуком, чтобы получить часть этих данных.
    - "refetchOnMountOrArgChange" - позволяет принудительно перезапускать запрос при монтировании, то есть позволяет
    принудительно перезапускать запрос, если с момента последнего запроса к тому же кэшу прошло достаточно времени в
    секундах, если указано число. Изначально false.
    - "refetchOnFocus" - позволяет принудительно перезапускать запрос, когда окно браузера снова становится активным.
    Изначально false.
    - "refetchOnReconnect" - позволяет принудительно перезапускать запрос при восстановлении сетевого подключения.
    Изначально false.*/
    const {data, isLoading} = useFetchPlaylistsQuery({pageSize: 4});

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>

            <div className={s.items}>
                {/*Ответ запроса изначально undefined, поэтому используем "?".*/}
                {data?.data.map(playlist => {
                    return (
                        <div className={s.item} key={playlist.id}>
                            <div>title: {playlist.attributes.title}</div>
                            <div>description: {playlist.attributes.description}</div>
                            <div>userName: {playlist.attributes.user.name}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};