import React, { Component } from 'react';
import WidgetComment from '../components/WidgetComment'

class App extends Component {
    constructor() {
        super();

        this.state = {
            comments: [],
            newName: '',
            newText: ''
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem('state')) {
            this.setState({ ...JSON.parse(localStorage.getItem('state')) })
        }
    }

    onChangeName(ev) {
        this.setState({ newName: ev.target.value });
    }
    onChangeText(ev) {
        this.setState({ newText: ev.target.value });
    }
    onRemoveItem = (id) => {
        this.setState({
            comments: this.state.comments.filter(comment => comment.id !== id)
        }, () => localStorage.setItem('state', JSON.stringify(this.state)))
    }

    onAddItem() {
        if (this.state.newName !== '' && this.state.newText !== '') {
            const comments = this.state.comments;
            comments.push({
                id: this.state.comments.length ? this.state.comments.reduce((a, b) => a.id > b.id ? a : b).id + 1 : 1,
                name: this.state.newName,
                text: this.state.newText,
                date: new Date().toLocaleString()
            }),
                this.state.newName = '',
                this.state.newText = '',
                this.setState({ comments }, () => localStorage.setItem('state', JSON.stringify(this.state)))
        }
        else {
            alert('Заполните необходимые поля')
        }
    }


    render() {
        return (
            <WidgetComment
                componentDidMount={this.componentDidMount}
                onChangeName={this.onChangeName}
                onChangeText={this.onChangeText}
                onRemoveItem={this.onRemoveItem}
                onAddItem={this.onAddItem}
                data={this.state}
            />
        );
    }
}

export default App;