import React, { Component, Fragment } from 'react'

class Input extends Component {
    state = {
        name: '',
        content: ''
    }

    render() {
        let { addMsg } = this.props;
        let { name, content } = this.state;
        return (
            <Fragment>
                <div className="addMessage">
                    <input
                        type="text"
                        placeholder="请输入昵称"
                        value={name}
                        onChange={({ target }) => { this.setState({ name: target.value }) }}
                    />
                    <textarea
                        placeholder="请输入留言"
                        value={content}
                        onChange={({ target }) => { this.setState({ content: target.value }) }}
                    />
                    <button onClick={() => {
                        if (name && content) {
                            addMsg(name, content);
                            this.setState({ name: "", content: "" });
                        }
                    }}>提交留言</button>
                </div>
            </Fragment>
        );
    }
}

export default Input;