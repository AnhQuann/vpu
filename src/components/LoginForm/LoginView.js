import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Form.css';

export const LoginView = (props) => {
  const {
    loginRef,
    handleSubmitForm,
    formInfo,
    handleBlurField,
    handleChangeField,
    handleFocusField,
    inputErrors,
    disabled,
    loading,
    isError,
    setLoggingInfo
  } = props;
  return (
    <form className="form login" ref={loginRef} onSubmit={handleSubmitForm}>
      <div className="input-field">
        <i className="material-icons input-icon">email</i>
        <input id="email" type="text" className="validate" value={formInfo.email} onFocus={(e) => handleFocusField(e, loginRef)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
        <div className="error-field">{inputErrors.email}</div>
        <label htmlFor="email" className={formInfo.email && 'active'}>Email</label>
      </div>
      <div className="input-field">
        <i className="material-icons input-icon">lock</i>
        <input id="password" type="password" className="validate" value={formInfo.password} onFocus={(e) => handleFocusField(e, loginRef)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
        <div className="error-field">{inputErrors.password}</div>
        <label htmlFor="password " className={formInfo.password && 'active'}>Password</label>
      </div>
      {isError && <div className="error-after-submit">The username or password provided were incorrect!</div>}
      <button disabled={disabled} className="btn">
        {loading ? <div className="loading"></div> : <span>LOGIN</span>}
      </button>
      <Link to="/sign-up"><div className="redirect-link" onClick={(e) => setLoggingInfo(formInfo)}>Don't have an account? Sign up now!</div></Link>
    </form>
  )
};