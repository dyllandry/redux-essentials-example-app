import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./postsSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

	const users = useSelector(state => state.users);

  const onTitleChange = e => setTitle(e.target.value);
  const onContentChange = e => setContent(e.target.value);
	const onUserChange = e => setUserId(e.target.value);

	const canSave = title && content && userId;

  const onSavePostClicked = e => {
		e.preventDefault();
    if (canSave) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  }

	const userOptions = users.map(user => (
		<option value={user.id} key={user.id}>{user.name}</option>
	));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

				<label htmlFor="user">User: </label>
				<select id="user" name="user" onChange={onUserChange}>
					<option value=""></option>
					{userOptions}
				</select>

        <label htmlFor="postTitle">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button
					type="button"
					onClick={onSavePostClicked}
					disable={canSave}
				>
					Save Post
				</button>
      </form>
    </section>
  );
}
