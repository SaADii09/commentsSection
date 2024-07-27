import React, { useState } from "react";
import { Comment, InputBox } from "./components/index.js";

const App = () => {
	const [comments, setComments] = useState([]);

	const addComment = (text) => {
		const newComment = {
			id: Date.now(),
			text,
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
		<div className="App">
			<InputBox onSubmit={addComment} />
			<div className="comments">
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} addReply={addReply} />
				))}
			</div>
		</div>
	);
};

export default App;
