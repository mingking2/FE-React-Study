import UseFormValidation from "./UseFormValidation";

const LoginForm = () => {
  const { register, handleSubmit, errors, emailRules, passwordRules } = UseFormValidation();

  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="test@email.com"
        {...register("emailCheck", emailRules)}
      />
      {errors.emailCheck && (
        <small role="alert">{errors.emailCheck.message}</small>
      )}
      <br/>

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호 입력"
        {...register("passwordCheck", passwordRules)}
      />
      {errors.passwordCheck && (
        <small role="alert">{errors.passwordCheck.message}</small>
      )}
      <br/>
      <small>비밀번호 규칙 : 8자이상 숫자 + 영문자 + 특수문자</small>
      <br/>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default LoginForm;
