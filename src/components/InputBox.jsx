import React, { useState } from "react";

const InputBox = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!text.trim()}
            >
                Submit
            </button>
        </form>
    );
};

export default InputBox;
