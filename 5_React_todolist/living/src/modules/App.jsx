import React, { Component, Fragment } from "react";
import data from "./Data";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import Stats from "./Stats";

export default class App extends Component {
	state = {
		data: data,
	};

	addTodo = (value) => {
		let { data } = this.state;
		data.push({
			id: Date.now(),
			title: value,
			done: false,
		});
		this.setState({ data });
	};

	checkedList = (id, checked) => {
		let { data } = this.state;
		data.forEach((item) => {
			if (item.id === id) {
				item.done = checked;
			}
		});
		this.setState({ data });
	};

	updateLise = (id, value) => {
		let { data } = this.state;
		data.forEach((item) => {
			if (item.id === id) {
				item.title = value;
			}
		});
		this.setState({ data });
	}

	removeList = (id) => {
		let { data } = this.state;
		data = data.filter((item) => item.id !== id);
		this.setState({ data });
	};

	clearDone = () => {
		let { data } = this.state;
		data = data.filter((item) => !item.done);
		this.setState({ data });
	};

	render() {
		let { data } = this.state;
		localStorage.setItem("data", JSON.stringify(data));
		return (
			<div id="todoapp">
				<div className="title">
					<h1>todo</h1>
				</div>
				<div className="content">
					<AddTodo addTodo={this.addTodo} />
					{data.length ? (
						<Fragment>
							<Todo
								data={data}
								checkedList={this.checkedList}
								updateLise={this.updateLise}
								removeList={this.removeList}
							/>
							<Stats data={data} clearDone={this.clearDone} />
						</Fragment>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}
