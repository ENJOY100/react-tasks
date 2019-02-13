const STORAGE_KEY = 'react-tasks';

export const storage = {
    fetch() {
        const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        let taskLastID;
        taskLastID = items[items.length - 1] ? items[items.length - 1].id : 0;
        storage.uid = taskLastID;

        return items;
    },
    save(items) {
        /*for (let item in items) {
            items[item].opened = false;
        }*/
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    },
    clear() {
        localStorage.clear();
    }
}