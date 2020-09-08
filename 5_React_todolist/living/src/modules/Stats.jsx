import React, { Component } from "react";

export default class Stats extends Component {
	clearDone = () => {
		this.props.clearDone();
	};

	render() {
		let { data } = this.props;
		let doneLen = data.filter((item) => item.done).length;
		let todoLen = data.length - doneLen;
		return (
			<div id="todo-stats">
				<span className="todo-count">
					<span className="number">{todoLen}</span>
					<span className="word"> 项待完成</span>
				</span>
				{doneLen ? (
					<span className="todo-clear" onClick={this.clearDone}>
					 {/* eslint-disable-next-line */}
						<a>
							Clear <span>{doneLen}</span> 已完成事项
						</a>
					</span>
				) : ("")}
			</div>
		);
	}
}
