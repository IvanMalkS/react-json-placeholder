import { jsonPlaceholderStore } from './jsonPlaceholderStore';
import { mockJsonPlaceholderStore } from '../../__test__/TestUtils';
import { MOCK_POST_LIST } from '../../__test__/constants';
jest.mock('../../composables/jsonPlaceholderApi', () => ({
    jsonPlaceholderApi: jest.fn().mockReturnValue({
        get: jest.fn(),
        post: jest.fn(),
    }),
}));

describe('jsonPlaceholderStore', () => {
    const mockApiGet = require('../../composables/jsonPlaceholderApi').jsonPlaceholderApi().get;

    beforeEach(() => {
        // reset state of store before call
        mockJsonPlaceholderStore({
            posts: [],
            allPosts: [],
            loading: false,
            error: null,
            currentPage: 1,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should load posts successfully', async () => {
        mockApiGet.mockResolvedValueOnce({
            data: MOCK_POST_LIST,
        });

        const { loadPosts } = jsonPlaceholderStore.getState();
        await loadPosts();

        const { posts, loading, error } = jsonPlaceholderStore.getState();

        expect(loading).toBe(false);
        expect(error).toBeNull();
        expect(posts).toEqual(MOCK_POST_LIST);
    });

    test('should return correct number of pages', () => {
        const { getPostsPages } = jsonPlaceholderStore.getState();

        jsonPlaceholderStore.setState({
            posts: MOCK_POST_LIST,
        });

        const pages = getPostsPages();

        expect(pages).toBe(Math.ceil(MOCK_POST_LIST.length / 5));
    });

    test('should return posts for the current page', () => {
        const { getPostsByPage } = jsonPlaceholderStore.getState();

        jsonPlaceholderStore.setState({
            posts: MOCK_POST_LIST,
            currentPage: 2,
        });

        const postsForPage = getPostsByPage();

        expect(postsForPage).toEqual(MOCK_POST_LIST.slice(5, 10));
    });

    test('should sort posts by title correctly', () => {
        const { sortPosts } = jsonPlaceholderStore.getState();

        jsonPlaceholderStore.setState({
            posts: MOCK_POST_LIST,
        });

        sortPosts('title');

        const { posts } = jsonPlaceholderStore.getState();

        expect(posts).toEqual(MOCK_POST_LIST.sort((a, b) => a.title.localeCompare(b.title)));
    });

    test('should sort posts by id correctly', () => {
        const { sortPosts } = jsonPlaceholderStore.getState();

        jsonPlaceholderStore.setState({
            posts: MOCK_POST_LIST,
        });

        sortPosts('id');

        const { posts } = jsonPlaceholderStore.getState();

        expect(posts).toEqual(MOCK_POST_LIST.sort((a, b) => a.id - b.id));
    });

    test('should filter posts by title', () => {
        const { findPostsByTitle } = jsonPlaceholderStore.getState();

        jsonPlaceholderStore.setState({
            allPosts: MOCK_POST_LIST,
        });

        findPostsByTitle('Post 1');

        const { posts } = jsonPlaceholderStore.getState();

        expect(posts).toEqual([MOCK_POST_LIST[0]]);
    });
});
