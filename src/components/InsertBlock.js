import React, { Component } from 'react';
import '../assets/core_blocks/InsertBlock.css'

class InsertBlock extends Component {
    render() {
        let clickEvent, changeEvent, value;
        /*Если будет всего 2 значения, то переделать под тернарный оператор*/
        if (this.props.addCategory) {
            clickEvent = this.props.addCategory;
            changeEvent = this.props.addCatValueChange;
            value = this.props.addCatValue;
        } else if (this.props.addTodo) {
            clickEvent = this.props.addTodo;
            changeEvent = this.props.addTodoValueChange;
            value = this.props.addTodoValue;
        }
        return (
            <div className="insert-block" style={this.props.style}>
                <input value={value} onChange={(event) => changeEvent(event)} className="insert-block__input" type="text" placeholder={this.props.placeholderName} />
                <button className="insert-block__btn" onClick={clickEvent}>
                    Add
                </button>
            </div>
        )
    }
}

export default InsertBlock;