'use client';
import { jsonPlaceholderStore } from '../../stores/jsonPlaceholderStore/jsonPlaceholderStore';
import { Post } from '../../stores/jsonPlaceholderStore/jsonPlaceholderInterface';
import { useEffect, useState } from 'react';

export const PostFilters = () => {
    const { posts, sortPosts, findPostsByTitle } = jsonPlaceholderStore(state => ({
        posts: state.posts,
        sortPosts: state.sortPosts,
        findPostsByTitle: state.findPostsByTitle,
    }));
    const [filterTitle, setFilterTitle] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            findPostsByTitle(filterTitle);
        }, 500);
        return () => clearTimeout(timer);
    }, [filterTitle, findPostsByTitle]);

    const postFilterOptions: (keyof Post)[] =
        posts.length > 0 ? (Object.keys(posts[0]) as (keyof Post)[]) : [];

    return (
        <section className={'flex justify-between w-max p-2 gap-5'}>
            <h2 className="visually-hidden">Filters</h2>
            <label className="flex w-max gap-2 items-center">
                <span className={'block'}>Sort by</span>
                <select
                    className="block bg-transparent border-2 border-amber-200 p-1"
                    onChange={e => sortPosts(e.target.value as keyof Post)}
                    data-testid="search-by-title"
                >
                    {postFilterOptions.map(key => (
                        <option key={key}>{key}</option>
                    ))}
                </select>
            </label>
            <input
                data-testid="filters-select"
                className={'block border-amber-200 border-2 p-1'}
                placeholder={'Find by title words'}
                onChange={e => setFilterTitle(e.target.value)}
                value={filterTitle}
            />
        </section>
    );
};
