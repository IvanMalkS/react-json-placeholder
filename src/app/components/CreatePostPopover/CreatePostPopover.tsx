import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { CreatePostForm } from '@/app/components/CreatePostForm/CreatePostForm';

interface CreatePostPopoverProps {
    isPopoverOpen: boolean;
    setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePostPopover = ({ isPopoverOpen, setPopoverOpen }: CreatePostPopoverProps) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setPopoverOpen(false);
            }
        };
        if (isPopoverOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopoverOpen, setPopoverOpen]);

    return (
        <>
            {isPopoverOpen &&
                createPortal(
                    <div className="flex w-full h-full absolute inset-0 items-center justify-center bg-amber-950">
                        <section
                            className="h-max p-5 border-2 border-amber-200 text-amber-50 flex flex-col w-2/3"
                            ref={popoverRef}
                            data-testid="create-post-popover"
                        >
                            <CreatePostForm setPopoverOpen={setPopoverOpen} />
                            <button
                                className="w-max ml-auto block mt-4 p-2 bg-amber-200 text-amber-950"
                                onClick={() => setPopoverOpen(false)}
                                data-testid="close-popover-button"
                            >
                                Close popover
                            </button>
                        </section>
                    </div>,
                    document.getElementById('modal') as Element
                )}
        </>
    );
};
