import {useRef, useState} from 'react';
import classNames from 'classnames/bind';

import useCookiesModuleScss from './styles/useCookies.module.scss';
const style = classNames.bind(useCookiesModuleScss);

//쿠키 동의서 내용
const memo ='대충 쿠키 어쩌구 저쩌구' + '\n-'.repeat(100) + "\n 끝";

const UseCookies = ({setModalSwitch, setIsCookies}) => {
    const isChecked = useRef(false);
    const [isBlink, setIsBlink] = useState(false);

    //동의하면 쿠키 설정하고 비동의면 쿠키 활용 안하게
    const handleButton = ({target}) => {
        if(target.name === "agree"){
            if(isChecked.current){
                setModalSwitch(false);
                setIsCookies(true);
            }else{
                setIsBlink(true);
                setTimeout(()=>{
                    setIsBlink(false);
                },2000);
            }
        }else{
            setModalSwitch(false);
            setIsCookies(false);
        }
    }

    //체크박스 체크 유무 저장
    const handleCheckBox = ({target}) => {
        isChecked.current = target.checked;
    }

    return (
        <div className={style('modal')}>
            <header className={style('header')}>
                <span>쿠키 사용 동의?</span>
            </header>
            <div className={style('container')}>
                <textarea
                    value = {memo}
                    disabled
                >
                </textarea>
            </div>
            <footer className={style('footer')}>
                <input 
                    type="checkbox"
                    onChange={handleCheckBox}
                    className={style({blink:isBlink})}
                />
                <span>동의하세용?</span>
                <button name="agree" onClick={handleButton}>agree</button>
                <button name="disagree" onClick={handleButton}>disagree</button>
            </footer>
        </div>
    )
}

export default UseCookies;