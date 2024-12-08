import { SubmitHandler, useForm } from 'react-hook-form';
import { jsonPlaceholderStore } from '../../stores/jsonPlaceholderStore/jsonPlaceholderStore';

interface PostForm {
    title: string;
    body: string;
}

interface CreatePostFormProps {
    setPopoverOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePostForm = ({ setPopoverOpen }: CreatePostFormProps) => {
    const { register, handleSubmit, formState } = useForm<PostForm>({
        mode: 'onChange',
    });

    const { loading, error, createPost } = jsonPlaceholderStore(state => ({
        loading: state.loading,
        error: state.error,
        createPost: state.createPost,
    }));

    const titleError = formState.errors['title']?.message;
    const messageError = formState.errors['body']?.message;

    const onFormSubmit: SubmitHandler<PostForm> = async value => {
        try {
            await createPost(value);
            if (!loading && !error && setPopoverOpen) {
                setPopoverOpen(false);
            }
        } catch (e) {
            console.error('Error creating post', e);
        }
    };

    return (
        <>
            <h2 className="w-full text-center mb-4">Posts addition form</h2>
            <form
                data-testid="create-new-post-form"
                className="border-t-2 border-b-2 pt-1 pb-1 border-amber-200 flex flex-col gap-4 items-center"
                onSubmit={handleSubmit(onFormSubmit)}
                id="post-form"
            >
                <label className="block w-full">
                    <span className="block mb-1">Title</span>
                    <input
                        className="block w-full bg-transparent border-2 border-amber-200 p-2"
                        placeholder="Lorem"
                        {...register('title', {
                            required: 'Title is required',
                        })}
                    />
                    {titleError && <span className="text-red-600 block mt-1">{titleError}</span>}
                </label>
                <label className="block w-full">
                    <span className="block mb-1">Message</span>
                    <textarea
                        className="block w-full bg-transparent border-2 border-amber-200 p-2"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        {...register('body', {
                            required: 'Message is required',
                            pattern: {
                                value: /^.{11,}$/,
                                message: 'Message must be at least 11 characters long',
                            },
                        })}
                    />
                    {messageError && (
                        <span className="text-red-600 block mt-1">{messageError}</span>
                    )}
                </label>
                <button
                    className="text-center w-full p-2 bg-amber-200 text-amber-950"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Create new post'}
                </button>
                {error && (
                    <span className="text-red-600 block mt-1">
                        Something went very wrong ........
                    </span>
                )}
            </form>
        </>
    );
};
