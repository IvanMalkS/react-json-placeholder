import React from 'react';
import Link from 'next/link';
import { CreatePost } from '../CreatePost/CreatePost';

export const SideBar = () => {
    return (
        <aside className="flex flex-col gap-2 border-amber-400 border-r-4 h-full p-2 pt-4">
            <Link href="/">JSONPlaceholder</Link>
            <CreatePost />
        </aside>
    );
};
