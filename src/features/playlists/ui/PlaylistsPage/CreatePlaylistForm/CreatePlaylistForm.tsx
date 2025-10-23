/*Импортируем из библиотеки React Hook Form хук "useForm()", который возвращает объект со свойствами. Одними из свойств
этого объекта являются свойства "register" и "handleSubmit". Свойство "register" содержит метод, который позволяет
регистрировать поля формы, чтобы собирать с них данные. Это достигается при помощи ref-ов в данной библиотеке, что не
заставляет перерисовывать компонент при каждом вводе символа в поле. Свойство "handleSubmit" содержит метод, который
позволяет собирать данные с зарегистрированных полей формы. Также импортируем тип "SubmitHandler" из этой библиотеки.*/
import {type SubmitHandler, useForm} from 'react-hook-form';
import {useCreatePlaylistMutation} from '@/features/playlists/api/playlistsAPI.ts';
import type {CreatePlaylistArgs} from '@/features/playlists/api/playlistsAPI.types.ts';

export const CreatePlaylistForm = () => {
    /*В библиотеке React Hook Form есть метод "reset()", который сбрасывает форму в изначальное состояние или в какое-то
    указанное состояние.*/
    const {register, handleSubmit, reset} = useForm<CreatePlaylistArgs>();

    /*Вызов mutation-хука, созданного при помощи RTK Query, возвращает массив. Первым элементом этого массива является
    функция, которая запускает запрос. В отличие от query-хуков, mutation-хуки не запускают запрос автоматически.
    Вызов этой функции возвращает успешно завершенный промис, так как под капотом RTK Query вызывается функция
    "createAsyncThunk()", создающая thunk и всегда возвращающая успешно завершенный промис, даже если была ошибка во
    время выполнения запроса. Также у этого промиса есть метод "unwrap()", который можно вызвать для получения
    необработанного ответа или ошибки, то есть использовать его для перехвата ошибок.

    Вторым элементом массива является объект с несколькими свойствами:
    - "data" - последний успешно полученные ответ, но может сбрасываться на undefined, если делается новый запрос.
    - "error" - ошибка запроса, если таковая есть.
    - "isError" - флаг, показывающий не произошла ли ошибка при выполнении запроса.
    - "isLoading" - флаг, показывающий происходит ли загрузка данных.
    - "isSuccess" - флаг, показывающий был ли успешно завершен запрос.
    - "isUninitialized" - флаг, показывающий, что запрос еще не был проинициализирован.
    - "reset" - метод, позволяющий вернуть хук в исходное состояние и удалить текущий результат из кэша.*/
    const [createPlaylist, {isLoading}] = useCreatePlaylistMutation();

    /*Создаем обработчика данных формы, который должен быть передан в метод "handleSubmit()".*/
    const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
        createPlaylist(data)
            .unwrap()
            .then(() => reset())
            .catch((error) => console.log(error));
    };

    if (isLoading) return <h1>Loading</h1>;

    return (
        /*Форму нужно обернуть в тег "form", чтобы она обрабатывалась библиотекой React Hook Form.*/
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>

            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>

            <div>
                <input {...register('description')} placeholder={'description'}/>
            </div>

            {/*Кнопка, собирающая данные, должна быть типа "submit", это здесь указано неявно.*/}
            <button>create playlist</button>
        </form>
    );
};