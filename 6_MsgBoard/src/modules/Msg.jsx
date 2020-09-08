import React, { Component, Fragment } from 'react'
import Li from './Li'

export default class Msg extends Component {
	render() {
		let { data, delMsg, switchChecked, updateMsg } = this.props;
		return (
			<Fragment>
				<ul className="messageList">
					{data.map((item, index) => (
						<Li
							key={index}
							data={item}
							delMsg={delMsg}
							switchChecked={switchChecked}
							updateMsg={updateMsg}
						/>
					))}
				</ul>
			</Fragment>
		);
	}
}

// /(?=(?!\b)(\d{3})+$)/g