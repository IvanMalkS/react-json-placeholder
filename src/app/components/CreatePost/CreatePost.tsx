'use client';
import React, { useState } from 'react';
import { CreatePostPopover } from '../CreatePostPopover/CreatePostPopover';

export const CreatePost = () => {
    const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setPopoverOpen(!isPopoverOpen)}>Create new post</button>
            <CreatePostPopover isPopoverOpen={isPopoverOpen} setPopoverOpen={setPopoverOpen} />
        </>
    );
};
