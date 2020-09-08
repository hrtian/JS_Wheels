import React, { Component, Fragment } from 'react'
import data from './Data'
import Msg from './Msg'
import Input from './Input'
import Stats from './Stats'

class App extends Component {
    state = { data }
    addMsg = (newName, newContent) => {
        let { data } = this.state;
        data.push({
            id: Date.now(),
            name: newName,
            content: newContent,
            checked: false
        });
        console.log(data);
        this.setState({ data })
    }

    delMsg = (id) => {
        let { data } = this.state;
        this.setState({
            data: data.filter(item => id !== item.id),
        })
    }

    switchChecked = (id, val) => {
        let { data } = this.state;
        data.forEach(item => {
            if(Number(id) === item.id) {
                item.checked = val;
            }
        })
        this.setState({ data });
    }

    delSelectedMsg = () => {
        let { data } = this.state;
        data = data.filter(item => !item.checked);
        this.setState({ data });
    }

    selectAll = (val) => {
        let { data } = this.state;
        data.forEach(item => item.checked = val);
        this.setState({ data });
    }

    updateMsg = (id, val) => {
        let { data } = this.state;
        data.forEach(item => {
            if(item.id === id) {
                item.content = val;
            }
        })
        this.setState({data});
    }

    render() {
        let { data } = this.state;
        localStorage.setItem("data", JSON.stringify(data));
        return (
            <Fragment>
                <h2 className="title">留言板</h2>
                <Input addMsg={this.addMsg} />
                {
                    data.length ? (
                        <Fragment>
                            <Msg
                                data={data}
                                delMsg={this.delMsg}
                                switchChecked={this.switchChecked}
                                updateMsg={this.updateMsg}
                            />
                            <Stats
                                data={data}
                                selectAll={this.selectAll}
                                delSelectedMsg={this.delSelectedMsg}
                            />
                        </Fragment>

                    ) : ""
                }
            </Fragment>
        );
    }
}

export default App;