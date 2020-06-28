import React, { Component } from 'react';

let WidgetComment = (props) => {
    return (
        <div>
            {props.data.comments.map(comment => (
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
                        onClick={() => props.onRemoveItem(comment.id)}
                    >
                        Удалить
      </button>
                </div>
            ))}
            <div className='widget__console'>
                <input
                    className='widget__input'
                    type="text"
                    placeholder='Ваше имя'
                    value={props.data.newName}
                    onChange={props.onChangeName}
                />
                <textarea
                    className='widget__text'
                    placeholder='Написать комментарий...'
                    value={props.data.newText}
                    onChange={props.onChangeText}
                >

                </textarea>
                <button
                    className='widget__btn widget__btn-add'
                    type="button"
                    onClick={props.onAddItem}
                >
                    Отправить
        </button>
            </div>
        </div>
    )
}


export default WidgetComment;