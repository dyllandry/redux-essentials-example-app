import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";

const initialState = [
	{
		id: '1',
		title: 'First Post!',
		content: 'Hello!',
		user: '0',
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 3,
			hooray: 1,
			heart: 1,
			rocket: 0,
			eyes: 0
		}
	},
	{
		id: '2',
		title: 'Second Post!',
		content: 'More text',
		user: '1',
		date: sub(new Date(), { minutes: 5}).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 1,
			heart: 0,
			rocket: 5,
			eyes: 5
		}
	},
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId
					}
				};
			}
		},
		postEdited(state, action) {
			let existingPost = state.find(post => post.id === action.payload.id);
			if (existingPost) {
				existingPost.title = action.payload.title;
				existingPost.content = action.payload.content;
			}
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			let existingPost = state.find(post => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		}
  },
});

export const { postAdded, postEdited, reactionAdded } = postsSlice.actions;

export default postsSlice;
