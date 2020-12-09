import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 30,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
		backgroundColor: 'white',
	}
}));

function FilterForm(props) {

	const classes = useStyles();
	const [category, setCategory] = useState('all');

	const handleChange = (value) => {
		setCategory(value);
		props.filterPosts(value);
	}

	return (
		<Grid container justify="center" className={classes.root}>
			<Grid item xs={7}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="filter-label">Filter By</InputLabel>
					<Select
						labelId="filter-label"
						value={category}
						onChange={e => handleChange(e.target.value)}
						label="Filter By"
					>
						<MenuItem value="all">All Posts</MenuItem>
						<MenuItem value="text">Text</MenuItem>
						<MenuItem value="image">Images</MenuItem>
						<MenuItem value="video">Videos</MenuItem>
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
}

FilterForm.propTypes = {
	filterPosts: PropTypes.func.isRequired
}

export default FilterForm;