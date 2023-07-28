import { useForm } from "react-hook-form";

const UseFormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRules = {
    //이메일 필드의 유효성 검사
    required: "이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  };
  const passwordRules = {
    //비밀번호 필드의 유효성 검사
    required: "비밀번호는 필수 입력입니다.",
    minLength: {
      value: 8,
      message: "8자리 이상 비밀번호를 사용하세요.",
    },
  };

  return {
    register,
    handleSubmit,
    errors,
    emailRules,
    passwordRules,
  };
};

export default UseFormValidation;