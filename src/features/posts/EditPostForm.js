import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postEdited} from "./postsSlice";

export const EditPostForm = ({ match }) => {
	const { postId } = match.params;

	const post = useSelector(state => state.posts.find(p => p.id === postId));
	const dispatch = useDispatch();
	const history = useHistory();

	const [title, setNewPostTitle] = useState(post.title);
	const [content, setNewPostContent] = useState(post.content);

	const onTitleInput = e => setNewPostTitle(e.target.value);
	const onContentInput = e => setNewPostContent(e.target.value);

	const handleSavePost = e => {
		e.preventDefault();
		if (title && content) {
			dispatch(postEdited({ id: postId, title, content }));
			history.push(`/posts/${postId}`);
		}
	};

	return (
		<section>
			<h2>Edit Post</h2>
			<form onSubmit={handleSavePost}>
				<label htmlFor="postTitle">Title: </label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleInput}
				/>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentInput}
				/>
				<button type="button" onClick={handleSavePost}>Save Post</button>
			</form>
		</section>
		
	);
}
