import React, { useState } from "react";
import InputBox from "./InputBox.jsx";

const Comment = ({ comment, addReply }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const handleReplyClick = () => {
        setShowReplyBox(!showReplyBox);
    };

    const handleAddReply = (text) => {
        addReply(comment.id, text);
        setShowReplyBox(false);
    };

    return (
        <div className="flex flex-col space-y-3 p-4 rounded-lg bg-white shadow-sm border border-gray-200 mb-4">
            <p className="text-gray-800 text-sm">{comment.text}</p>
            <button
                onClick={handleReplyClick}
                className="self-start px-4 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
            >
                Reply
            </button>
            {showReplyBox && (
                <div className="ml-4 mt-2">
                    <InputBox onSubmit={handleAddReply} />
                </div>
            )}
            {comment.replies && (
                <div className="ml-8 space-y-4 border-l-2 border-gray-100 pl-4">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            addReply={addReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
