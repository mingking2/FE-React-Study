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
    validate: {
      // 비밀번호에 숫자, 영어 소문자, 특수문자가 각각 하나 이상 포함되어야 함
      hasNumber: (value) =>
        /\d/.test(value) || "숫자를 최소 한 개 이상 포함해야 합니다.",
      hasChar: (value) =>
        /[a-zA-Z]/.test(value) || "영문자를 최소 한 개 이상 포함해야 합니다.",
      hasSpecialChar: (value) =>
        /[^A-Za-z0-9]/.test(value) ||
        "특수문자를 최소 한 개 이상 포함해야 합니다.",
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