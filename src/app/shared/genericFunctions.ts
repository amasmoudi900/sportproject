export function generateId(Tab: any) {
    let max;
    if (Tab.length == 0) {
        max = 0;
    } else {
        max = Tab[0].id;
        for (let i = 1; i < Tab.length; i++) {
            if (Tab[i].id > max) {
                max = Tab[i].id;
            }
        }
    }
    return max + 1;
}

export function getFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}