import type {CurrentUserReaction} from '@/common/enums';
import type {Images, Tag, User} from '@/common/types';

/*Тип для ответа от сервера при получении плейлистов.*/
export type PlaylistsResponse = {
    data: PlaylistData[]
    meta: PlaylistMeta
};

/*Тип для плейлиста в ответе от сервера при получении плейлистов.*/
export type PlaylistData = {
    id: string
    type: 'playlists'
    attributes: PlaylistAttributes
};

/*Тип для мета-данных в ответе от сервера при получении плейлистов.*/
export type PlaylistMeta = {
    page: number
    pageSize: number
    totalCount: number
    pagesCount: number
};

/*Тип для свойства "attributes" внутри плейлиста в ответе от сервера при получении плейлистов.*/
export type PlaylistAttributes = {
    title: string
    description: string
    addedAt: string
    updatedAt: string
    order: number
    dislikesCount: number
    likesCount: number
    tags: Tag[]
    images: Images
    user: User
    currentUserReaction: CurrentUserReaction
};

/*Тип для аргументов запроса по получению плейлистов.*/
export type FetchPlaylistsArgs = {
    pageNumber?: number
    pageSize?: number
    search?: string
    sortBy?: 'addedAt' | 'likesCount'
    sortDirection?: 'asc' | 'desc'
    tagsIds?: string[]
    userId?: string
    trackId?: string
};