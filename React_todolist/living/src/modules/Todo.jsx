import React, { Component } from "react";
import List from "./List";

export default class Todo extends Component {
	render() {
		let { data, removeList, checkedList, updateLise } = this.props;
		return (
			<ul id="todo-list">
				{data.map((item) => (
					<List
						key={item.id}
						id={item.id}
						data={item}
						checkedList={checkedList}
						updateLise={updateLise}
						removeList={removeList}
					/>
				))}
			</ul>
		);
	}
}
