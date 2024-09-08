'use client';
import { jsonPlaceholderStore } from '@/app/stores/jsonPlaceholderStore/jsonPlaceholderStore';
import { useEffect, useState } from 'react';
import cn from 'classnames';

export const PostPagination = () => {
	const { getPostsPages, setCurrentPage } = jsonPlaceholderStore((state) => ({
		getPostsPages: state.getPostsPages,
		setCurrentPage: state.setCurrentPage,
	}));
	const [currentPaginationIdx, setCurrentPaginationIde] = useState<number>(1);

	useEffect(() => {
		setCurrentPage(currentPaginationIdx);
	}, [currentPaginationIdx]);

	const paginationButtons = [];
	const maxPaginationIdx = getPostsPages();
	for (let i = currentPaginationIdx - 1; i <= currentPaginationIdx + 1; i++) {
		if (i === 1) {
			i = 2;
		}

		if (i > maxPaginationIdx - 1) {
			break;
		}

		if (i < 1) {
			continue;
		}

		paginationButtons.push(
			<li
				className={cn({
					'p-2.5 cursor-pointer bg-amber-400 rounded-md': true,
					'bg-amber-700 text-white ': currentPaginationIdx === i,
				})}
				key={i}
				onClick={() => setCurrentPaginationIde(i)}
			>
				{i}
			</li>,
		);
	}
	return (
		<ul className="flex gap-2 ml-auto mr-auto w-max mt-auto pb-2">
			{maxPaginationIdx > 1 && (
				<li
					className={'p-2.5 cursor-pointer bg-amber-400 rounded-md'}
					onClick={() => setCurrentPaginationIde(currentPaginationIdx - 1)}
				>
					Previous
				</li>
			)}

			<li
				className={cn({
					'p-2.5 cursor-pointer bg-amber-400 rounded-md': true,
					'bg-amber-700 text-white ': currentPaginationIdx === 1,
				})}
				key={1}
				onClick={() => setCurrentPaginationIde(1)}
			>
				{1}
			</li>
			{currentPaginationIdx > 2 && (
				<li className="flex items-center justify-center text-xl">...</li>
			)}
			{paginationButtons}
			{currentPaginationIdx < maxPaginationIdx - 1 && (
				<li className="flex items-center justify-center text-xl">...</li>
			)}
			{maxPaginationIdx > 1 && (
				<li
					className={cn({
						'p-2.5 cursor-pointer bg-amber-400 rounded-md': true,
						'bg-amber-700 text-white ':
							currentPaginationIdx === maxPaginationIdx,
					})}
					key={maxPaginationIdx}
					onClick={() => setCurrentPaginationIde(maxPaginationIdx)}
				>
					{maxPaginationIdx}
				</li>
			)}
			{maxPaginationIdx > 1 && (
				<li
					className={'p-2.5 cursor-pointer bg-amber-400 rounded-md'}
					onClick={() => setCurrentPaginationIde(currentPaginationIdx + 1)}
				>
					Next
				</li>
			)}
		</ul>
	);
};
