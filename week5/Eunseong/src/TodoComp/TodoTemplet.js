import "./TodoTemplet.scss"

const TodoTemplet = ({children}) => {
  return (
    <div className="TodoTemplet">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
}

export default TodoTemplet;