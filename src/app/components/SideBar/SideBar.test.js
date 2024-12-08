import React from 'react';
import { screen } from '@testing-library/react';
import { SideBar } from './SideBar';
import { renderWithRouter } from '../../__test__/TestUtils';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('SideBar', () => {
    test('renders JSONPlaceholder link', () => {
        renderWithRouter(<SideBar />);
        const linkElement = screen.getByText('JSONPlaceholder');
        expect(linkElement).toBeInTheDocument;
    });

    test('renders CreatePost component', () => {
        renderWithRouter(<SideBar />);
        const createPostElement = screen.getByText('Create new post');
        expect(createPostElement).toBeInTheDocument;
    });
});
