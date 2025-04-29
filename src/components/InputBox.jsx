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
                className="flex-1 px-4 py-2 rounded-lg bg-dark-300 text-white border border-dark-400 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 text-sm placeholder-gray-400"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                disabled={!text.trim()}
            >
                Submit
            </button>
        </form>
    );
};

export default InputBox;
