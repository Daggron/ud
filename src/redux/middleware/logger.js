const Log = (store) => (next) => (action) => {
        console.log('triggered action is '+action);
        const dispacthAction = next(action);
        console.log('updation done new values are', store.getState());
    return dispacthAction;
}

export default Log;