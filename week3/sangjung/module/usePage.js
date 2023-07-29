import {useReducer} from 'react';

const reducer = ( action, pages, initialPage) =>{
    if(Object.keys(pages).includes(action)) return [pages[action], action];
    else return initialPage;
}

const usePage = (initialPage, pages) => {
    const [state, dispatch] = useReducer((_ , action)=>reducer(action, pages, initialPage), [initialPage, initialPage.name]);

    const onClicked = ({target}) => {
        dispatch(target.name);
    };

    const getPage = (page) =>{
        dispatch(page);
    }

    const page = [
        ()=>state[0]({onClicked, pages}),
        state[1],
        getPage
    ];

    return page;
}

export default usePage;
