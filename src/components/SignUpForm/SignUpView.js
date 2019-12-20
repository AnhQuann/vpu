import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Form.css';

export const SignUpView = (props) => {
  const {
    signUpRef,
    handleSubmitForm,
    formInfo,
    handleBlurField,
    handleChangeField,
    handleFocusField,
    inputErrors,
    disabled,
    loading,
    confirmRef,
    redirectToLogin,
    isError,
    formError,
    setSignUpTypingInfo,
  } = props;
  return (
    <div>
      <form className="form sign-up" ref={signUpRef} onSubmit={handleSubmitForm}>
        <div className="input-field">
          <i className="material-icons input-icon">email</i>
          <input id="email" type="text" value={formInfo.email} onFocus={(e) => handleFocusField(e, signUpRef)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
          <div className="error-field">{inputErrors.email}</div>
          <label htmlFor="email" className={formInfo.email && 'active'}>Email</label>
        </div>
        <div className="input-field">
          <i className="material-icons input-icon">lock</i>
          <input id="password" type="password" value={formInfo.password} onFocus={(e) => handleFocusField(e, signUpRef)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
          <div className="error-field">{inputErrors.password}</div>
          <label htmlFor="password" className={formInfo.password && 'active'}>Password</label>
        </div>
        <div className="input-field">
          <i className="material-icons input-icon">lock_outline</i>
          <input id="confirmPassword" type="password" value={formInfo.confirmPassword} onFocus={(e) => handleFocusField(e, signUpRef)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
          <div className="error-field">{inputErrors.confirmPassword}</div>
          <label htmlFor="confirmPassword" className={formInfo.confirmPassword && 'active'}>Confirm Password</label>
        </div>
        {isError && <div className="error-after-submit">{formError}</div>}
        <button disabled={disabled} className="btn">
          {loading ? <div className="loading"></div> : <span>SIGN UP</span>}
        </button>
        <Link to="/login"><div className="redirect-link" onClick={(e) => setSignUpTypingInfo(formInfo)}>Already have an account? Sign in now!</div></Link>
      </form>
      <div className="modal" id="confirmRegistered" ref={confirmRef}>
        <div className="modal-content">
          <h6>Registered Successfully. Do you want redirect to login?</h6>
        </div>
        <div className="modal-footer">
          <button className="waves-effect waves-light btn modal-close">Cancel</button>
          <button onClick={redirectToLogin} className="waves-effect waves-light btn">Ok</button>
        </div>
      </div>
    </div>
  )
};