import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Card, CardHeader, CardContent, Avatar, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 600,
		marginTop: 30,
		marginRight: 10,
	},
	avatar: {
		backgroundColor: ' #306c95',
		color: 'white',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	video: {
		height: 300,
		width: '98%',
	}
}));

function PostsList(props) {

	const classes = useStyles();
	const { posts } = props;
	const sortedPosts = posts.slice().sort((a, b) => b.postDate - a.postDate)

	return (
		<Grid container justify="center">
			{sortedPosts?.length > 0 && sortedPosts.map((post, index) => {
				return (
					<Grid item xs={12} key={index}>
						<Card className={classes.root}>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}> U </Avatar>
								}
								title="user"
								subheader={post.postDate.split('G')[0]}
							/>
							<CardContent>
								{post?.type === 'text' && <Typography>
									{post.content}
								</Typography>}

								{post?.type === 'image' && <CardMedia 
									className={classes.media}
									image={post.content}
									title="post content"
								/>}

								{post?.type === 'video' && <video className={classes.video} controls>
									<source src={post.content} />
								</video>}
								
							</CardContent>
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
}

PostsList.propTypes = {
	posts: PropTypes.array.isRequired,
}

export default PostsList;