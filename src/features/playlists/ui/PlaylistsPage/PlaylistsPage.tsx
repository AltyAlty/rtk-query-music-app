import s from './PlaylistsPage.module.css';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery
} from '@/features/playlists/api/playlistsAPI.ts';
import {CreatePlaylistForm} from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx';
import type {PlaylistData, UpdatePlaylistArgs} from '@/features/playlists/api/playlistsAPI.types.ts';
import {EditPlaylistForm} from '@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx';
import {PlaylistItem} from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx';

export const PlaylistsPage = () => {
    /*Используем хук "useState()" для сохранения состояния находимся ли мы в режиме редактирования плейлиста или нет.*/
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>();

    /*Вызов query-хука, созданного при помощи RTK Query, возвращает объект. Внутри этого объекта может быть несколько
    свойств:
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
    const {data, isLoading} = useFetchPlaylistsQuery({pageSize: 6});
    const [deletePlaylist] = useDeletePlaylistMutation();

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm('Delete the playlist?')) deletePlaylist(playlistId);
    };

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id);

            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(t => t.id),
            });
        } else {
            setPlaylistId(null);
        }
    };

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>

            <div className={s.items}>
                {/*Ответ запроса изначально undefined, поэтому используем "?".*/}
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id;

                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditing ? (
                                <EditPlaylistForm
                                    playlistId={playlistId}
                                    handleSubmit={handleSubmit}
                                    register={register}
                                    editPlaylist={editPlaylistHandler}
                                    setPlaylistId={setPlaylistId}/>
                            ) : (
                                <PlaylistItem
                                    playlist={playlist}
                                    deletePlaylist={deletePlaylistHandler}
                                    editPlaylist={editPlaylistHandler}/>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};