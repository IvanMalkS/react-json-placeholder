import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { PostFilters } from './PostFilters';
import { mockJsonPlaceholderStore } from '../../__test__/TestUtils';
import { MOCK_POST_LIST } from '../../__test__/constants';
import { fireEvent, waitFor } from '@testing-library/react';

jest.mock('../../stores/jsonPlaceholderStore/jsonPlaceholderStore', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

describe('PostFilters', () => {
    const mockSortPosts = jest.fn();
    const mockFindPostsByTitle = jest.fn();

    beforeEach(() => {
        mockJsonPlaceholderStore({
            posts: MOCK_POST_LIST,
            sortPosts: mockSortPosts,
            findPostsByTitle: mockFindPostsByTitle,
        });
    });

    test('renders search and filters', () => {
        render(<PostFilters />);
        expect(screen.queryByTestId('search-by-title')).toBeInTheDocument;
        expect(screen.getByTestId('filters-select')).toBeInTheDocument;
    });

    it('renders filter inputs correctly', () => {
        render(<PostFilters />);

        expect(screen.getByPlaceholderText('Find by title words')).toBeInTheDocument;
        expect(screen.getByTestId('search-by-title')).toBeInTheDocument;
    });

    it('calls findPostsByTitle with correct value after typing', async () => {
        render(<PostFilters />);

        const input = screen.getByPlaceholderText('Find by title words');

        fireEvent.change(input, { target: { value: 'Post' } });

        await waitFor(() => {
            expect(mockFindPostsByTitle).toHaveBeenCalledWith('Post');
        });
    });

    it('calls sortPosts with correct value when selecting sort option', () => {
        render(<PostFilters />);

        const select = screen.getByTestId('search-by-title');

        fireEvent.change(select, { target: { value: 'title' } });

        expect(mockSortPosts).toHaveBeenCalledWith('title');
    });

    it('displays sort options based on post keys', () => {
        render(<PostFilters />);

        const options = screen.getAllByRole('option');

        expect(options).toHaveLength(4);
    });

    it('calls findPostsByTitle after a delay', async () => {
        render(<PostFilters />);

        const input = screen.getByPlaceholderText('Find by title words');
        fireEvent.change(input, { target: { value: 'Test' } });

        await waitFor(() => {
            expect(mockFindPostsByTitle).toHaveBeenCalledWith('Test');
        });
    });
});
