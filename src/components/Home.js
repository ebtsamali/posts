import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddPost from './AddPost';
import PostsList from './PostsList';
import FilterForm from './FilterForm';


const useStyles = makeStyles(() => ({
	root: {
	  flexGrow: 1,
	},
 })); 


function Home(props) {

	const classes = useStyles();
	const [posts, setPosts] = useState([]);
	const { allPosts } = props;

	useEffect(() => {
		setPosts(allPosts);
	}, [allPosts]);

	const filterPosts = (filterKey) => {
		if (filterKey === 'all') {
			setPosts(allPosts);
			return;
		}
		const filteredPosts = allPosts.filter(post => post.type === filterKey);
		setPosts(filteredPosts);
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={2} justify="center" wrap="wrap">
				<Grid item xs={4}>
					<FilterForm filterPosts={filterPosts} />
				</Grid>
				<Grid item xs={8}>
					<AddPost />
					<PostsList posts={posts} />
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = state => ({
	allPosts: state.posts.userPosts
})

export default connect(mapStateToProps)(Home);
