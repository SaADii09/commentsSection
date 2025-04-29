import { useState, lazy, Suspense } from "react";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

const CommentInputBox = ({ onSubmit }) => {
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText("");
        setShowEmojiPicker(false);
    };

    const handleEmojiSelect = (emojiData) => {
        setText((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        placeholder="Write a comment..."
                        className="w-full px-4 py-2 rounded-lg bg-dark-300 text-white border border-dark-400 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 text-sm placeholder-gray-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Add emoji"
                    >
                        😊
                    </button>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    disabled={!text.trim()}
                >
                    Submit
                </button>
            </form>
            {showEmojiPicker && (
                <div className="absolute mt-2 z-10">
                    <Suspense
                        fallback={
                            <div className="text-white text-center p-4 bg-dark-200 rounded-lg">
                                Loading emoji picker...
                            </div>
                        }
                    >
                        <EmojiPicker
                            onEmojiClick={handleEmojiSelect}
                            theme="dark"
                            width={300}
                            height={400}
                        />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default CommentInputBox;
