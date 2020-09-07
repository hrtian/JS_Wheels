import React, { Component } from "react";

export default class AddTodo extends Component {
	render() {
		let { addTodo } = this.props;
		return (
			<div id="create-todo">
				<input
					id="new-todo"
					placeholder="What needs to be done?"
					autoComplete="off"
					type="text"
					onKeyDown={({target, keyCode}) => {
						if (keyCode === 13 && target.value.trim()) {
							addTodo(target.value);
							target.value = "";
						}
					}}
				/>
			</div>
		);
	}
}
