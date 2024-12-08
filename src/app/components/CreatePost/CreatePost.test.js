// CreatePost.test.js
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { CreatePost } from './CreatePost';
import {
    renderWithModal,
    setupModalContainer,
    cleanupModalContainer,
} from '../../__test__/TestUtils';

describe('CreatePost', () => {
    beforeEach(() => {
        setupModalContainer();
    });

    afterEach(() => {
        cleanupModalContainer();
    });

    test('renders Create new post button', () => {
        renderWithModal(<CreatePost />);
        const buttonElement = screen.getByText('Create new post');
        expect(buttonElement).toBeInTheDocument;
    });

    test('toggles CreatePostPopover visibility on button click', () => {
        renderWithModal(<CreatePost />);
        const openButtonElement = screen.getByText('Create new post');

        // Initially, the popover should not be visible
        expect(screen.queryByTestId('create-post-popover')).not.toBeInTheDocument;

        // Click the button to open the popover
        fireEvent.click(openButtonElement);
        expect(screen.getByTestId('create-post-popover')).toBeInTheDocument;

        const closeButtonElement = screen.getByTestId('close-popover-button');

        // Click the button again to close the popover
        fireEvent.click(closeButtonElement);
        expect(screen.queryByTestId('create-post-popover')).not.toBeInTheDocument;
    });
});
