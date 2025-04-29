import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { InputBox } from "../components";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

const Comment = ({ comment, addReply, onEdit, onDelete }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [isEditing]);

    const handleReplyClick = () => {
        setShowReplyBox(!showReplyBox);
    };

    const handleAddReply = (text) => {
        addReply(comment.id, text);
        setShowReplyBox(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowEmojiPicker(false);
        // Use setTimeout to ensure the input is rendered before focusing
        setTimeout(() => {
            if (editInputRef.current) {
                editInputRef.current.focus();
                // Select all text for easier editing
                editInputRef.current.select();
            }
        }, 0);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editText.trim()) {
            onEdit(comment.id, editText);
            setIsEditing(false);
            setShowEmojiPicker(false);
        }
    };

    const handleDelete = () => {
        onDelete(comment.id);
    };

    const handleEmojiSelect = (emojiData) => {
        setEditText((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="flex flex-col space-y-3 p-4 rounded-xl bg-gradient-glass border border-dark-400 mb-4 shadow-glass hover:shadow-lg transition-all duration-300">
            {isEditing ? (
                <div className="w-full">
                    <form onSubmit={handleEditSubmit} className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                ref={editInputRef}
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-dark-300 text-white border border-dark-400 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="Add emoji"
                            >
                                😊
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setShowEmojiPicker(false);
                            }}
                            className="px-4 py-2 bg-dark-400 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200"
                        >
                            Cancel
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
            ) : (
                <>
                    <p className="text-white text-sm font-medium">
                        {comment.text}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleReplyClick}
                            className="self-start px-4 py-1.5 text-sm font-medium rounded-lg bg-accent-primary text-white hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Reply
                        </button>
                        <button
                            onClick={handleEdit}
                            className="self-start px-4 py-1.5 text-sm font-medium rounded-lg bg-accent-primary text-white hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="self-start px-4 py-1.5 text-sm font-medium rounded-lg bg-accent-danger text-white hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}

            {showReplyBox && (
                <div className="ml-4 mt-2 bg-dark-300 bg-opacity-50 p-4 rounded-lg">
                    <InputBox onSubmit={handleAddReply} />
                </div>
            )}
            {comment.replies && (
                <div className="ml-8 space-y-4 border-l-2 border-dark-400 pl-4">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            addReply={addReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
