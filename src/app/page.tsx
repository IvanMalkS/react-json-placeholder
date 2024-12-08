import { PostLists } from './components/PostList/PostLists';
import { PostPagination } from './components/PostPagination/PostPagination';
import { PostFilters } from './components/PostFilters/PostFilters';

export default function Home() {
    return (
        <>
            <PostFilters />
            <PostLists />
            <PostPagination />
        </>
    );
}
