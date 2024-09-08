import { AxiosError } from 'axios';

export interface Post {
	userId?: number;
	id: number;
	title: string;
	body: string;
}

export interface CreatePost extends Omit<Post, 'id'> {}

export interface JsonPlaceholderInterface {
	posts: Array<Post>;
	allPosts: Array<Post>;
	loading: boolean;
	error: AxiosError | null;
	currentPage: number;
	currentSortType: keyof Post;
	loadPosts: () => Promise<void>;
	getPostsPages: () => number;
	getPostsByPage: () => Array<Post>;
	createPost: (newPost: CreatePost) => Promise<void>;
	setCurrentPage: (page: number) => void;
	sortPosts: (sortType: keyof Post) => void;
	findPostsByTitle: (title: string) => void;
}
