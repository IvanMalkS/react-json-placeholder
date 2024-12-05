import { create } from 'zustand';
import {
    CreatePost,
    JsonPlaceholderInterface,
    Post,
} from '@/app/stores/jsonPlaceholderStore/jsonPlaceholderInterface';
import { jsonPlaceholderApi } from '../../composables/jsonPlaceholderApi';
import { AxiosError, AxiosResponse } from 'axios';

const api = jsonPlaceholderApi();

const POSTS_PER_PAGE = 5;

export const jsonPlaceholderStore = create<JsonPlaceholderInterface>()((set, get) => ({
    posts: [],
    allPosts: [],
    loading: false,
    error: null,
    currentPage: 1,
    currentSortType: 'id',
    loadPosts: async () => {
        set({ loading: true, error: null });
        try {
            const response: AxiosResponse<Array<Post>> = await api.get('/posts');
            set({ posts: response.data, loading: false, allPosts: response.data });
        } catch (error) {
            set({ error: error as AxiosError, loading: false });
        }
    },
    getPostsPages: (): number => {
        const { posts } = get();
        return Math.ceil(posts.length / POSTS_PER_PAGE);
    },
    getPostsByPage: (): Array<Post> => {
        const { posts, getPostsPages, currentPage } = get();
        const pageCount = getPostsPages();
        if (currentPage > pageCount && currentPage < 1) {
            return [];
        }
        const minIdx = (currentPage - 1) * POSTS_PER_PAGE;
        const maxIdx = currentPage * POSTS_PER_PAGE;
        return posts.slice(minIdx, maxIdx);
    },
    createPost: async (newPost: CreatePost) => {
        set({ loading: true, error: null });
        try {
            newPost.userId = Math.ceil(Math.random() * 10 + 1);
            const response: AxiosResponse<Post> = await api.post('/posts', newPost);
            // By default id for new post is 101, so it provides errors in list render keys
            response.data.id = Math.ceil(Math.random() * 1000 + 1);
            const { posts, sortPosts, currentSortType } = get();
            const newPostsList = [...posts, response.data];
            sortPosts(currentSortType);
            set({ posts: newPostsList, allPosts: newPostsList, loading: false });
        } catch (error) {
            set({ error: error as AxiosError, loading: false });
        }
    },
    setCurrentPage: (page: number) => {
        set({ currentPage: page });
    },
    sortPosts: (sortType: keyof Post) => {
        const { posts } = get();
        if (!posts.every(post => sortType in post)) {
            return;
        }
        const sortedPosts = posts.toSorted((prevPost, nextPost) => {
            if (prevPost && nextPost) {
                const prevValue = prevPost[sortType];
                const nextValue = nextPost[sortType];
                if (typeof prevValue === 'string' && typeof nextValue === 'string') {
                    return prevValue.toLowerCase().localeCompare(nextValue.toLowerCase());
                } else if (typeof prevValue === 'number' && typeof nextValue === 'number') {
                    return prevValue - nextValue;
                }
            }
            return 0;
        });
        set({ posts: sortedPosts, currentSortType: sortType });
    },
    findPostsByTitle: (title: string) => {
        const { allPosts } = get();
        if (title.trim() === '') {
            set({ posts: allPosts });
            return;
        }

        const foundPosts = allPosts.filter(post =>
            post.title.toLowerCase().includes(title.toLowerCase())
        );
        set({ posts: foundPosts });
    },
}));
