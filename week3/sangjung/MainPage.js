import classNames from 'classnames/bind';

import pagesModuleScss from './styles/pages.module.scss';

const style = classNames.bind(pagesModuleScss);

const MainPage = ({onClicked,pages}) => {

    // props를 받아서 page만큼의 버튼 생성
    const buttons = Object.keys(pages).map((page) => {
        return <button key={page} name={page} onClick={onClicked} className={style('button',{activated : page === "MainPage"})}>{page}</button>;
    })

    return (
        <>
        <header className={style('header')}>
            <h1>MainPage</h1>
        </header>
        <div className={style('container')}>
            <div>
                <h2>
                    contents
                </h2>
            </div>
            <div>
                {buttons}
            </div>
        </div>
        <footer className={style('footer')}>
            footer
        </footer>
        </>
    )
}

export default MainPage;