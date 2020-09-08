import React, { Component } from "react";

export default class Stats extends Component {
	render() {
		let { data, delSelectedMsg, selectAll } = this.props;
		let msgLength = data.length;
		let selectedLen = data.filter((item) => item.checked).length;
		let checkedAll = data.every((item) => item.checked);
		return (
			<div className="sum">
				<label>
					<input
						type="checkbox"
						checked={checkedAll}
						onChange={({ target }) => {
							selectAll(target.checked);
						}}
					/>
					<span>选中全部</span>
				</label>
				{/* eslint-disable-next-line */}
				<a
					onClick={() => {
						delSelectedMsg();
					}}
				>
					删除选中项
				</a>
				<p>
					当前选中 <span>{selectedLen}</span> 项，共{" "}
					<span>{msgLength}</span> 条留言
				</p>
			</div>
		);
	}
}
