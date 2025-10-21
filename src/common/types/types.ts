/*Тип для тегов плейлиста.*/
export type Tag = {
    id: string
    name: string
};

/*Тип для пользователя, владеющего плейлистом.*/
export type User = {
    id: string
    name: string
};

/*Тип для объекта с обложками для плейлиста.*/
export type Images = {
    main: Cover[]
};

/*Тип для обложки для объекта с обложками для плейлиста.*/
export type Cover = {
    type: 'original' | 'medium' | 'thumbnail'
    width: number
    height: number
    fileSize: number
    url: string
};