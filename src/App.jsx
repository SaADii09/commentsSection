import React, { useState } from "react";
import { InputBox, Comment } from "./components";
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

    const deleteComment = (commentId) => {
        const deleteFromComments = (comments) => {
            return comments.filter((comment) => {
                if (comment.id === commentId) {
                    return false;
                }
                comment.replies = deleteFromComments(comment.replies);
                return true;
            });
        };

        setComments(deleteFromComments(comments));
    };

    const editComment = (commentId, newText) => {
        const updateComments = (comments) => {
            return comments.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, text: newText };
                }
                return {
                    ...comment,
                    replies: updateComments(comment.replies),
                };
            });
        };

        setComments(updateComments(comments));
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
        <div className="min-h-screen bg-dark-100 flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-dark-100 py-4 px-4 sm:px-6 lg:px-8 border-b border-dark-400">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-dark-200 rounded-xl shadow-glass border border-dark-400 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Add a comment
                        </h2>
                        <InputBox onSubmit={addComment} />
                    </div>
                </div>
            </div>

            {/* Scrollable Comments Section */}
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                addReply={addReply}
                                onEdit={editComment}
                                onDelete={deleteComment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
