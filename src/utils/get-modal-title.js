export const getModalTitle = (props) => {
    switch (props.status) {
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