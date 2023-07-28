/*
    시간이 없어서.. 많은 기능 못넣었습니다.. 너무 대충 만들어서 시간 되면 계속 수정할게유.. 
    MainPage.js
    SubPage_1.js
    SubPage_2.js
    SubPage_3.js
    SubPage_4.js
    위의 파일은 동일한 내용이지만 각기 다른 컴포넌트라고 가정했기에 따로 만들었음!

    사용 라이브러리
        - react-modal : 팝업창 디자인 되어있는 컴포넌트 라이브러리
        - react-cookie : 쿠키활용 쉽게 할 수 있는 라이브러리

     tracker
        |-Tracker.js : 페이지 이동 과정을 기록 
        |-UseCookies.js : 팝업창의 쿠키 동의 컴포넌트
        |-MainPage.js : 그냥 페이지
        |-SubPage_1.js : 그냥 페이지
        |-SubPage_2.js : 그냥 페이지
        |-SubPage_3.js : 그냥 페이지
        |-SubPage_4.js : 그냥 페이지
        |-module
            |-usePage.js : 커스텀 후크? 훅?
        |-styles
            |-pages.module.scss
            |-tracker.module.scss
            |-useCookies.module.scss

*/ 

import {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';    
import {useCookies} from 'react-cookie';

import usePage from './module/usePage';

import MainPage from './MainPage';
import SubPage_1 from './SubPage_1';
import SubPage_2 from './SubPage_2';
import SubPage_3 from './SubPage_3';
import SubPage_4 from './SubPage_4';
import UseCookies from './UseCookies';

import style from './styles/tracker.module.scss';


const pages = {
    MainPage, 
    SubPage_1,
    SubPage_2,
    SubPage_3,
    SubPage_4,
}

const modalStyle = {
    content: {
        width: '900px', 
        height: '600px', 
        margin: 'auto', 
      },
};

const Tracker = () => {
    const [page,name, getPage] = usePage(MainPage, pages);
    const pageRecord = useRef([]);
    const record = useRef();
    const [modalSwitch, setModalSwitch] = useState(true);
    const [isCookies, setIsCookies] = useState(false);
    const [cookies, setCookies] = useCookies();

    //팝업창 띄어주는 함수
    const showModal = () =>{
        if (!isCookies && !cookies.isUsed){
            return (
                <Modal 
                    isOpen={modalSwitch} 
                    style={modalStyle} 
                    ariaHideApp={false}
                >
                    <UseCookies setModalSwitch={setModalSwitch} setIsCookies={setIsCookies} />
                </Modal>
            )
        }else{
            if(!cookies.isUsed){
                //생각해보니까 isUsed 쓸 이유가 없는듯.. 일단 고
                setCookies('isUsed',true);
            }
        }   
    }

    //페이지가 바뀔때마다 기록하는 함수
    useEffect(()=>{
        if(pageRecord.current[pageRecord.current.length-1] !== name){
            pageRecord.current.push(name);
            setCookies('record',pageRecord.current);
        }
    },[name, setCookies])

    //쿠키가 있다면 기록된 페이지 로드
    useEffect(()=>{
        if(!record.current && cookies.isUsed && cookies.record){
            let count = 0;
            const _record = cookies.record;
            record.current = setInterval(()=>{
                if(count >= _record.length){
                    setCookies('record',[]);
                    clearInterval(record.current);
                }else{
                    getPage(_record[count]);
                    count++;
                }
            }, 100);
        }
    },[]);
    
    return (
        <>
            <div 
                className={style.container}
            >
                {page()}
            </div>
            {showModal()}
        </>
    )

}

export default Tracker;