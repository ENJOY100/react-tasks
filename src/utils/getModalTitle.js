//import React from 'react';

const GetModalTitle = (props) => {
    switch (props.modal.status) {
        case 'add': {
            return 'Add category';
        }
        case 'edit': {
            return 'Edit category';
        }
        case 'edit-todo': {
            return 'Edit todo';
        }
        default: {
            return 'Edit'
        }
    }
}

export default GetModalTitle;

// REFACTORED