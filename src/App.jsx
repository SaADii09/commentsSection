import React, { useState } from "react";
import Comment from "./components/Comment.jsx";
import InputBox from "./components/InputBox.jsx";
import { initialComments } from "./data/commentData.js";

const App = () => {
    const [comments, setComments] = useState(initialComments);

    const addComment = (text) => {
        const newComment = {
            id: Date.now(),
            text,
            owner: "Current User",
            replies: [],
        };
        setComments([...comments, newComment]);
    };

    const addReply = (commentId, text) => {
        const updateComments = (comments) => {
            return comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                id: Date.now(),
                                text,
                                replies: [],
                            },
                        ],
                    };
                }
                return {
                    ...comment,
                    replies: updateComments(comment.replies),
                };
            });
        };

        setComments(updateComments(comments));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Add a comment
                    </h2>
                    <InputBox onSubmit={addComment} />
                </div>

                <div className="space-y-6">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            addReply={addReply}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
