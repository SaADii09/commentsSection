import React, { useState } from "react";
import InputBox from "./index.js";

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
		<div className="comment">
			<p>{comment.text}</p>
			<button onClick={handleReplyClick}>Reply</button>
			{showReplyBox && <InputBox onSubmit={handleAddReply} />}
			{comment.replies && (
				<div className="replies">
					{comment.replies.map((reply) => (
						<Comment key={reply.id} comment={reply} addReply={addReply} />
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
