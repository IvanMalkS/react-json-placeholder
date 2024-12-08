import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatePostForm } from './CreatePostForm';
import { useForm } from 'react-hook-form';
import { jsonPlaceholderStore } from '../../stores/jsonPlaceholderStore/jsonPlaceholderStore';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));

jest.mock('../../stores/jsonPlaceholderStore/jsonPlaceholderStore', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

describe('CreatePostForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form correctly', () => {
        useForm.mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
        });

        jsonPlaceholderStore.mockReturnValue({
            loading: false,
            error: null,
            createPost: jest.fn(),
        });

        render(<CreatePostForm />);

        expect(screen.getByText('Posts addition form')).toBeInTheDocument;
        expect(screen.getByText('Title')).toBeInTheDocument;
        expect(screen.getByText('Message')).toBeInTheDocument;
        expect(screen.getByText('Create new post')).toBeInTheDocument;
    });

    test('submits the form correctly', async () => {
        const mockCreatePost = jest.fn();

        // Mocking useForm
        useForm.mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(
                callback => e => callback({ title: 'Test Title', body: 'Test Message' }, e)
            ),
            formState: { errors: {} },
        });

        jsonPlaceholderStore.mockReturnValue({
            loading: false,
            error: null,
            createPost: mockCreatePost,
        });

        render(<CreatePostForm />);

        fireEvent.change(screen.getByPlaceholderText('Lorem'), { target: { value: 'Test Title' } });
        fireEvent.change(
            screen.getByPlaceholderText('Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
            { target: { value: 'Test Message' } }
        );

        const form = screen.getByTestId('create-new-post-form');

        fireEvent.submit(form);

        await waitFor(() => {
            expect(mockCreatePost).toHaveBeenCalledWith({
                title: 'Test Title',
                body: 'Test Message',
            });
        });
    });
});
