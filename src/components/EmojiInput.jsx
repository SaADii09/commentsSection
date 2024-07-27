import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { EmojiPicker } from "emoji-picker-react";
import debounce from "lodash.debounce";

function TextInput() {
	const [inputValue, setInputValue] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleButtonClick = () => {
		setShowEmojiPicker(true);
	};

	const handleEmojiSelect = (emoji) => {
		setInputValue(inputValue + emoji);
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
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
				aria-label="Show emoji picker"
			>
				Show Emoji Picker
			</button>
			{showEmojiPicker && (
				<Suspense fallback={<div>Loading...</div>}>
					<EmojiPickerWrapper
						onEmojiSelect={debouncedHandleEmojiSelect}
						className="w-full p-2 border border-gray-300 rounded-lg"
					/>
				</Suspense>
			)}
		</div>
	);
}

function EmojiPickerWrapper(props) {
	try {
		return <EmojiPicker {...props} />;
	} catch (error) {
		console.error(error);
		return <div>Error loading emoji picker</div>;
	}
}

export default TextInput;
