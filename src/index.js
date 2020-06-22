import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './style.css';

class WidgetComment extends Component {
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
            <div>

                {this.state.comments.map(comment => (
                    <div className='widget__comment' key={comment.id}>
                        <p>
                            {comment.name}
                        </p>
                        <p>
                            {comment.text}
                        </p>
                        <p>
                            {comment.date}
                        </p>
                        <button
                            type="button"
                            onClick={() => this.onRemoveItem(comment.id)}
                        >
                            Remove
              </button>
                    </div>
                ))}
                <div className='widget__console'>
                    <input
                        className='widget__input'
                        type="text"
                        placeholder='Ваше имя'
                        value={this.state.newName}
                        onChange={this.onChangeName}
                    />
                    <textarea
                        className='widget__text'
                        placeholder='Написать комментарий...'
                        value={this.state.newText}
                        onChange={this.onChangeText}
                    >

                    </textarea>
                    <button
                        className='widget__btn widget__btn-add'
                        type="button"
                        onClick={this.onAddItem}
                    >
                        Отправить
                </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <WidgetComment />,
    document.querySelector('.widget')
)