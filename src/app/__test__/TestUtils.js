import { useRouter } from 'next/router';
import { render } from '@testing-library/react';
import { jsonPlaceholderStore } from '../stores/jsonPlaceholderStore/jsonPlaceholderStore.ts';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../stores/jsonPlaceholderStore/jsonPlaceholderStore.ts', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

let modalRoot;

const setupModalContainer = () => {
    // Create modal container for test
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
};

const cleanupModalContainer = () => {
    // Delete modal container
    if (modalRoot) {
        document.body.removeChild(modalRoot);
        modalRoot = null;
    }
};

const renderWithRouter = (ui, { route = '/', ...renderOptions } = {}) => {
    useRouter.mockImplementation(() => ({
        pathname: route,
        query: {},
        asPath: '',
        push: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
    }));

    return render(ui, { ...renderOptions });
};

const renderWithModal = (ui, options) => {
    setupModalContainer();
    const result = render(ui, options);
    return result;
};

export const mockJsonPlaceholderStore = (stateOverrides = {}) => {
    const defaultState = {
        loading: false,
        error: null,
        loadPosts: jest.fn(),
        getPostsByPage: jest.fn(() => []),
    };

    const mockState = { ...defaultState, ...stateOverrides };

    jsonPlaceholderStore.mockReturnValue(mockState);
};

export * from '@testing-library/react';
export {
    renderWithRouter,
    setupModalContainer,
    cleanupModalContainer,
    renderWithModal,
    renderWithStore,
};
