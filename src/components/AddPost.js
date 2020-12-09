import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Grid, Card, CardHeader, CardActions, Avatar, TextareaAutosize, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import { addNewPost } from '../redux/actions/postsAction';
import FileInput from './FileInput';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 600,
		marginTop: 30,
		marginRight: 10,
	},
	avatar: {
		backgroundColor: '#306c95',
		color: 'white',
	},
	title: {
		width: '85%',
		maxWidth: 450,
		borderRadius: 15,
		border: 'solid 1px #306c95',
		outline: 'none',
	},
	header: {
		borderBottom: 'solid 1px lightgray',
	},
}));

function AddPost (props) {
	const [ postType, setPostType ] = useState('text')
	const [ postContent, setPostContent ] = useState('');
	const classes = useStyles();
	const { addPost } = props;

	const changePostType = (type) => {
		setPostType(type);
	}

	const handleContentChange = (value) =>{
		setPostContent(value);
	}

	const savePost = () => {
		if (postContent !== '') {
			addPost({
				content: postContent,
				type: postType,
				postDate: Date(),
			});
			setPostContent('');
			setPostType('text');
		}
	}

	const renderInput = () => {
		if(postType === 'text') {
			return (
				<TextareaAutosize 
					className={classes.title} 
					rowsMin={2}
					value={postContent}
					onChange={(e) => handleContentChange(e.target.value)} 
				/>
			);
		} else {
			const classOne = 'create-image-input';
			return (
				<FileInput 
					className={`${classOne} ${postType}`}
					name='avatarURL'
					maxHeight={100}
					handleContentChange={handleContentChange}
					type={postType}
				/>
			);
		}
	}

	return (
		<Grid container justify="center">
			<Grid item xs={12}>
				<Card className={classes.root}>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" className={classes.avatar}> U </Avatar>
						}
						title={ renderInput() }
						className={classes.header}
					/>
					<CardActions>
					<Grid container justify="flex-end">
						<Grid item xs={12} space={1} container wrap="wrap">
							<Grid item xs={3}>
								<Button variant="contained" onClick={() => changePostType('text')}>
									<TextFieldsIcon color="primary" /> Add Text
								</Button>
							</Grid>
							<Grid item xs={3}>
								<Button variant="contained" onClick={() => changePostType('video')}>
									<VideocamIcon color="primary" /> Add Video
								</Button>
							</Grid>
							<Grid item xs={3}>
								<Button variant="contained" onClick={() => changePostType('image')}>
									<PhotoLibraryIcon color="primary" /> Add Image
								</Button>
							</Grid>
						</Grid>
						<Grid item>
							<Button variant="contained" className={classes.avatar} onClick={savePost}>
								Post
							</Button>
						</Grid>
					</Grid>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
}

const mapDispatchToProps = dispatch => ({
	addPost: post => dispatch(addNewPost(post))
});

export default connect(null, mapDispatchToProps)(AddPost);