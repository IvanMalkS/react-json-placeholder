'use client';
import { useEffect } from 'react';
import { jsonPlaceholderStore } from '../../stores/jsonPlaceholderStore/jsonPlaceholderStore';

export const PostLists = () => {
    const { loading, error, loadPosts, getPostsByPage } = jsonPlaceholderStore(state => ({
        loading: state.loading,
        error: state.error,
        loadPosts: state.loadPosts,
        getPostsByPage: state.getPostsByPage,
    }));

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    if (error) return <div>Error: {error.message}</div>;

    if (loading) return <div>Loading ...</div>;
    const postPerPage = getPostsByPage();
    return (
        <ul className="ml-auto mr-auto flex flex-col gap-2 w-1/2">
            {postPerPage?.map(post => (
                <li className="block p-2 border-amber-200 border-2 " key={post.id}>
                    <h2 className="w-full block border-amber-100 border-b-2">{post.title}</h2>
                    <p>{post.body}</p>
                    {post?.userId && (
                        <span className="ml-auto block w-max">By user {post.userId}</span>
                    )}
                </li>
            ))}
        </ul>
    );
};
