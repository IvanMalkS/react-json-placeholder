import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostPagination } from './PostPagination';
import { mockJsonPlaceholderStore } from '../../__test__/TestUtils';

// Мокаем jsonPlaceholderStore
jest.mock('../../stores/jsonPlaceholderStore/jsonPlaceholderStore', () => ({
    jsonPlaceholderStore: jest.fn(),
}));

describe('PostPagination', () => {
    const mockGetPostsPages = jest.fn();
    const mockSetCurrentPage = jest.fn();

    beforeEach(() => {
        mockJsonPlaceholderStore({
            getPostsPages: mockGetPostsPages,
            setCurrentPage: mockSetCurrentPage,
        });

        mockGetPostsPages.mockReturnValue(5);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders pagination buttons correctly', () => {
        render(<PostPagination />);

        expect(screen.getByText('Previous')).toBeInTheDocument;
        expect(screen.getByText('1')).toBeInTheDocument;
        expect(screen.getByText('Next')).toBeInTheDocument;
    });

    test('calls setCurrentPage when a pagination button is clicked', async () => {
        render(<PostPagination />);

        const page2Button = screen.getByText('2');
        fireEvent.click(page2Button);

        await waitFor(() => {
            expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
        });
    });

    test('shows Previous and Next buttons when there are multiple pages', async () => {
        render(<PostPagination />);

        expect(screen.getByText('Previous')).toBeInTheDocument;
        expect(screen.getByText('Next')).toBeInTheDocument;
    });

    test('does not show Previous and Next buttons when on first and last page respectively', async () => {
        mockSetCurrentPage.mockReturnValueOnce(1);

        render(<PostPagination />);

        expect(screen.queryByText('Previous')).not.toBeInTheDocument;

        expect(screen.getByText('Next')).toBeInTheDocument;
    });

    test('hides pagination buttons when only one page is available', () => {
        mockGetPostsPages.mockReturnValueOnce(1);

        render(<PostPagination />);

        expect(screen.queryByText('Previous')).not.toBeInTheDocument;
        expect(screen.queryByText('Next')).not.toBeInTheDocument;
    });
});
