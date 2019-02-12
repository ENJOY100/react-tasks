import React from 'react';

const ModalTitle = (props) => {
    let title = '';
    switch (props.modalStatus) {
        case 'add': {
            title = 'Add category';
            break;
        }
        case 'edit': {
            title = 'Edit category';
            break;
        }
        case 'edit-todo': {
            title = 'Edit todo';
            break;
        }
    }
    return title;
}

export default ModalTitle;