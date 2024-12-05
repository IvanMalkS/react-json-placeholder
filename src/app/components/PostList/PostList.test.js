import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PostLists } from './PostLists';
import { jsonPlaceholderStore } from '../../stores/jsonPlaceholderStore/jsonPlaceholderStore';

jest.mock('../../stores/jsonPlaceholderStore/jsonPlaceholderStore', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

describe('PostLists', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state correctly', () => {
        jsonPlaceholderStore.mockReturnValue({
            loading: true,
            error: null,
            loadPosts: jest.fn(),
            getPostsByPage: jest.fn(),
        });

        render(<PostLists />);

        expect(screen.getByText('Loading ...')).toBeInTheDocument;
    });

    test('renders error state correctly', () => {
        jsonPlaceholderStore.mockReturnValue({
            loading: false,
            error: { message: 'Something went wrong' },
            loadPosts: jest.fn(),
            getPostsByPage: jest.fn(),
        });

        render(<PostLists />);

        expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument;
    });

    test('renders posts correctly', async () => {
        const mockPosts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
        ];

        jsonPlaceholderStore.mockReturnValue({
            loading: false,
            error: null,
            loadPosts: jest.fn(),
            getPostsByPage: jest.fn(() => mockPosts),
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

    test('calls loadPosts on mount', () => {
        const mockLoadPosts = jest.fn();

        jsonPlaceholderStore.mockReturnValue({
            loading: false,
            error: null,
            loadPosts: mockLoadPosts,
            getPostsByPage: jest.fn(),
        });

        render(<PostLists />);

        expect(mockLoadPosts).toHaveBeenCalled();
    });
});
