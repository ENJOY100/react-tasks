const STORAGE_KEY = 'react-tasks';

export const storage = {
    fetch() {
        const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return items;
    },
    save(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    },
    clear() {
        localStorage.clear();
    }
}