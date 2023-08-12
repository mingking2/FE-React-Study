import {MdAdd} from "react-icons/md"
import "./TodoInsert.scss"
import { useCallback, useState } from "react";
import React from "react";

const TodoInsert = ({onInsert}) => {
  const [value, setValue] = useState("")

  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const onSubmit = useCallback(e => {
    onInsert(value)
    setValue("")
    e.preventDefault()
  }, [onInsert, value])

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input 
        placeholder="Enter the text..."
        value={value}
        onChange={onChange}
      />
      <button type="submit" onClick={onSubmit}>
        <MdAdd></MdAdd>
      </button>
    </form>
  );
}

export default React.memo(TodoInsert);
