import React, { createRef, Component } from "react";

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			val: this.props.data.title,
		};
	}

	editIpt = createRef();

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.edit && this.state.edit) {
			this.editIpt.current.focus();
		}
	}

	render() {
		let { data, id, removeList, checkedList, updateLise } = this.props;
		let { edit, val } = this.state;
		return (
			<li className={edit ? "editing" : ""}>
				<div className={data.done ? "done" : "todo"}>
					<div className="display">
						<input
							className="check"
							type="checkbox"
							checked={data.done}
							onChange={({ target }) => {
								checkedList(id, target.checked);
							}}
						/>
						<div
							className="todo-content"
							onDoubleClick={() => this.setState({ edit: true })}
						>
							{data.title}
						</div>
						<span
							className="todo-destroy"
							onClick={() => {
								removeList(id);
							}}
						></span>
					</div>
					<div className="edit">
						<input
							className="todo-input"
							type="text"
							value={val}
							onChange={({ target }) => {
								this.setState({ val: target.value });
							}}
							ref={this.editIpt}
							onBlur={() => {
								if (val.trim()) {
									updateLise(id, val);
								} else {
									this.setState({ val: data.title });
								}
								this.setState({ edit: false });
							}}
						/>
					</div>
				</div>
			</li>
		);
	}
}
