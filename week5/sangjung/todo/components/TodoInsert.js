import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';
import { useCallback, useState } from 'react';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e =>{
        setValue(e.target.value);
    },[]);

    const onSubmit = useCallback(
        e=>{
            onInsert(value);
            setValue('');
            e.preventDefault(); //해당 타겟의 기본 이벤트를 막을 수 있음
            //현재 type이 submit임 그러면 submit 동작을 하게 되는데 이것을 막을 수 있음.
        },
        [onInsert,value],
    );

    return(
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    )
}

export default TodoInsert;