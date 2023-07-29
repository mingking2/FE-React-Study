import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomModal from "./CustomModal";
import { useLocalStorage } from "react-use";

const App = () => {
  const userIdRef = useRef();
  const userPasswordRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegOrLogin, setIsRegOrLogin] = useState(null);
  const [userList, setUser] = useLocalStorage("userList", []);
  const [isLogin, setIsLogin] = useState(false);

  const openRegister = () => {setIsModalOpen(true); setIsRegOrLogin(true);}
  const openLogin = () => {setIsModalOpen(true); setIsRegOrLogin(false);}
  const closeModal = () => {setIsModalOpen(false);}

  const loginHandle = () =>{
    const loginId = userIdRef.current.value;
    const loginPassword = userPasswordRef.current.value;
    try {
      const userFindId = userList.find((user) => user.id === loginId);
      if (userFindId) {
        const userFindPwd = userList.find((user)=> user.password === loginPassword);
        if(userFindPwd){
        closeModal();
        setIsLogin(true);
        }
        else{
          const err = new Error("Wrong Password");
          throw err;
        }
      } else {
        const err = new Error("Not Found User");
        throw err;
      }
    } catch (err) {
      alert(err);
    }
  }
  const signUpHandle = () => {
    const newUserId = userIdRef.current.value;
    const userPassword = userPasswordRef.current.value;
    const newUser = { id: newUserId, password: userPassword };
    try {
      const userToFind = userList.find((user) => user.id === newUserId);
      if (!userToFind) {
        setUser([...userList, newUser]);
        closeModal();
      } else {
        const err = new Error("Already Exist");
        throw err;
      }
    } catch (err) {
      alert(err);
    }
  };

  const logOut = () => {
    setIsLogin(false);
  };

  const createRegister = () =>{
    return (<CustomModal isOpen={isModalOpen} closeModal={closeModal}>
    <Box>
      <Typography
        variant="h6"
        component="input"
        placeholder="아이디"
        ref={userIdRef}
      />
      <br />
      <Typography
        variant="h6"
        component="input"
        placeholder="비밀번호"
        ref={userPasswordRef}
      />
      {isRegOrLogin ?
      <Button variant= "contained" onClick={signUpHandle}>회원가입</Button>
      :
      <Button variant= "contained" onClick={loginHandle}>로그인</Button>
  }
    </Box>
  </CustomModal>)
  }

  return (
    <div>
      <div>
        {isLogin ? (
          <Button variant="outlined" onClick={logOut} sx={{ mt: 2, ml: 2 }}>
            로그아웃
          </Button>
        ) : (
          <div>
          <Button variant="outlined" onClick={openRegister} sx={{ mt: 2, ml: 2 }}>
          회원가입
        </Button>
          <Button variant="outlined" onClick={openLogin} sx={{ mt: 2, ml: 2 }}>
            로그인
          </Button>
          </div>
        )}
      </div>
      {createRegister()}
    </div>
  );
};

export default App;
