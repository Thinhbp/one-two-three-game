export enum ACTIONS {
    SET_PAGE
}

export enum PAGES {
    HOME,
    ROOM,
}

const initState = {
    page: PAGES.HOME,
};

function reducer(state: any, action: { type: number, payload: any }) {
    switch (action.type) {
        case ACTIONS.SET_PAGE:
            console.log(state, action)
            return { ...state, ...action.payload };
        default:
            throw new Error("Action is invalid");
    }
}

export { initState };
export default reducer;
