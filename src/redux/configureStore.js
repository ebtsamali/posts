import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import PostsReducer from './reducers/postsReducer';

function configureStore() {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		combineReducers({
			posts: PostsReducer,
		}),
		composeEnhancers(applyMiddleware())
	)
	return store;
}

export default configureStore;