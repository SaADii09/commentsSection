import React, { useState, lazy, Suspense } from "react";
import debounce from "lodash.debounce";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

function TextInput() {
    const [inputValue, setInputValue] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleButtonClick = () => {
        setShowEmojiPicker(true);
    };

    const handleEmojiSelect = (emojiData) => {
        setInputValue((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const debouncedHandleEmojiSelect = debounce(handleEmojiSelect, 500);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                aria-label="Text input"
            />
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
                aria-label="Show emoji picker"
            >
                Show Emoji Picker
            </button>
            {showEmojiPicker && (
                <div className="mt-2">
                    <Suspense
                        fallback={
                            <div className="text-center p-4">
                                Loading emoji picker...
                            </div>
                        }
                    >
                        <EmojiPicker
                            onEmojiClick={debouncedHandleEmojiSelect}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </Suspense>
                </div>
            )}
        </div>
    );
}

export default TextInput;
