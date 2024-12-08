import { render, screen, waitFor } from '@testing-library/react';
import { PostLists } from './PostLists';
import { mockJsonPlaceholderStore } from '../../composables/test-utils';
import { MOCK_POST_LIST } from '../../__test__/constants';

jest.mock('../../stores/jsonPlaceholderStore/jsonPlaceholderStore', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

describe('PostLists', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state correctly', () => {
        mockJsonPlaceholderStore({
            loading: true,
        });

        render(<PostLists />);

        expect(screen.getByText('Loading ...')).toBeInTheDocument;
    });

    test('renders error state correctly', () => {
        mockJsonPlaceholderStore({
            loading: false,
            error: { message: 'Something went wrong' },
        });

        render(<PostLists />);

        expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument;
    });

    test('renders posts correctly', async () => {
        mockJsonPlaceholderStore({
            loading: false,
            getPostsByPage: jest.fn(() => MOCK_POST_LIST),
        });

        render(<PostLists />);

        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument;
            expect(screen.getByText('Body 1')).toBeInTheDocument;
            expect(screen.getByText('By user 1')).toBeInTheDocument;

            expect(screen.getByText('Post 2')).toBeInTheDocument;
            expect(screen.getByText('Body 2')).toBeInTheDocument;
            expect(screen.getByText('By user 2')).toBeInTheDocument;
        });
    });
});
