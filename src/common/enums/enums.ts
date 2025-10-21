/*Создаем переменную "CurrentUserReaction" и при помощи "as const" делаем свойства объекта доступными только для
чтения. Таким образом создаем enum.*/
export const CurrentUserReaction = {
    Like: 1,
    Dislike: -1,
    None: 0,
} as const;

/*На основе enum "CurrentUserReaction" создаем тип для реакции текущего пользователя на плейлист. Круглые скобки "()"
нужны для группировки и указания приоритета выполнения. Квадратные скобки "[]" нужны для индексного доступа к типам, то
есть для получения типов свойств объекта по их ключам. В итоге получаем тип "1 | -1 | 0".*/
export type CurrentUserReaction = (typeof CurrentUserReaction)[keyof typeof CurrentUserReaction];