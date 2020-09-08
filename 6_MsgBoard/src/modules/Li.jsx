import React, { Component, createRef } from 'react'

export default class Li extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val: this.props.data.content,
			edit: false
		}
	}

	editArea = createRef();
	componentDidUpdate(prevProps, prevState) {
		if(!prevState.edit && this.state.edit) {
			this.editArea.current.focus();
		}
	}

	switchEdit = () => {
		let { edit } = this.state;
		edit = true;
		this.setState({ edit });
	}

	render() {
		let { data, delMsg, switchChecked, updateMsg } = this.props;
		let { id, name, checked } = data;
		let { val, edit } = this.state;
		return (
			<li className={edit ? "editing" : ""}>
				<h3>{name}</h3>
				<input type="checkbox"
					checked={checked}
					id={id}
					onChange={({ target }) => {
						switchChecked(target.id, target.checked);
					}} />
				<p onDoubleClick={() => { this.switchEdit() }}>{val}</p>
				<textarea
					value={val}
					ref={this.editArea}
					onChange={
						({ target }) => {
							this.setState({ val: target.value });
					}}
					onBlur={
						() => {
								if (val.trim()) {
									updateMsg(id, val);
								} else {
									this.setState({ val: data.content });
								}
								this.setState({ edit: false });
							}
					}
				>	
				</textarea>
				{/* eslint-disable-next-line */}
				<a onClick={() => delMsg(id)}>删除</a>
			</li>
		);
	}
}