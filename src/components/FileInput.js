import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';

const readFileAsDataURL = (file) =>
	new Promise(resolve => {
		const reader = new FileReader();

		reader.onload = (event) => {
			resolve(event.target.result);
		}

		reader.readAsDataURL(file);
	})

class FileInput extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		name: PropTypes.string,
		maxHeight: PropTypes.number,
		handleContentChange: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired
	}

	constructor (props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	handleFileChange = (event) => {
		const file = event.target.files[0];
		const { type , handleContentChange } = this.props;

		if( file && ( (type === 'image' && file.type.match(/^image\//)) ||  (type === 'video' && file.type.match(/^video\//)) ) ) {
			readFileAsDataURL(file).then(originalURL => {
				this.setState({ value: originalURL });
				handleContentChange(originalURL);
			})
		} else {
			this.setState({ value: '' });
		}
	}

	render() {
		const { className, name, type } = this.props;
		const { value } = this.state;

		const style = {
			position: 'relative'
		}

		if (value) {
			style.backgroundImage = `url("${value}")`
			style.backgroundRepeat = 'no-repeat'
			style.backgroundPosition = 'center'
			style.backgroundSize = 'cover'
		}

		return (
			<div>
				{value && <CancelIcon style={{ float: 'right' }} onClick={() => this.setState({value: ''})} />}
				<div className={className} style={style}>
					{type === 'image' && <input type="hidden" name={name} value={value} />}
					{type === 'video' && <video>
						<source src={value} />
					</video>}
					<input
						ref={node => this.fileInput = node}
						type="file"
						onChange={this.handleFileChange}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							opacity: 0
						}}
					/>
				</div>
			</div>
		)
	}
}

export default FileInput;