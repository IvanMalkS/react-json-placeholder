import { PostLists } from '@/app/components/PostLists';
import { PostPagination } from '@/app/components/PostPagination';
import { PostFilters } from '@/app/components/PostFilters';

export default function Home() {
	return (
		<>
			<PostFilters />
			<PostLists />

			<PostPagination />
		</>
	);
}
