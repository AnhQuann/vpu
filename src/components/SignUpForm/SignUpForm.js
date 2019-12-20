import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import M from 'materialize-css';
import { useAuth } from '../../context/Auth';
import { withValidated } from '../../hoc/FormValidated';
import { SignUpView } from './SignUpView';
import app from '../../config/firebaseConfig';

function SignUpForm(props) {
  const {
    history,
    validateForm,
    handleChangeField,
    handleFocusField,
    formInfo,
    inputErrors,
    isValidated,
    disabled,
    setDisabled,
    loading,
    isError,
    setIsError,
    setFormError,
    formError,
    setLoading,
    handleBlurField,
    forceUpdateFieldsValue,
    redirectToReferer
  } = props;
  const signUpForm = useRef(null);
  const confirmModal = useRef(null);
  const { setLoggingInfo, signUpTypingInfo, setSignUpTypingInfo, authenticated } = useAuth();

  function handleSubmitForm(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    if (isValidated) {
      app.auth().createUserWithEmailAndPassword(formInfo.email, formInfo.password)
        .then(user => {
          const instance = M.Modal.init(confirmModal.current);
          instance.open();
          setLoading(false);
          setDisabled(false);
        })
        .catch(err => {
          setIsError(true);
          setFormError(err.message)
          setLoading(false);
          setDisabled(false);
        })
    } else {
      validateForm(formSchema, formInfo);
      setLoading(false);
    }
  }

  function redirectToLogin() {
    setLoggingInfo(formInfo);
    setSignUpTypingInfo(formInfo)
    history.push("/login");
  }

  function isEmptyObj(obj) {
    if (obj) {
      return Object.values(obj).every(x => (x === null || x === ''))
    } else {
      return true;
    }
  }

  useEffect(() => {
    localStorage.setItem("authRefererPath", '/sign-up');
    authenticated && redirectToReferer();
    if (!isEmptyObj(signUpTypingInfo)) {
      const signUpTyping = { ...formInfo, email: signUpTypingInfo.email, password: signUpTypingInfo.password };
      forceUpdateFieldsValue(signUpTyping);
      validateForm(formSchema, signUpTyping);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SignUpView
      signUpRef={signUpForm}
      handleSubmitForm={handleSubmitForm}
      formInfo={formInfo}
      handleBlurField={handleBlurField}
      handleChangeField={handleChangeField}
      handleFocusField={handleFocusField}
      inputErrors={inputErrors}
      disabled={disabled}
      loading={loading}
      confirmRef={confirmModal}
      redirectToLogin={redirectToLogin}
      isError={isError}
      formError={formError}
      setSignUpTypingInfo={setSignUpTypingInfo}
    />
  )
};


const formSchema = yup.object().shape({
  email: yup.string().required('Email is a requred field.').email('Email must be a valid email.'),
  password: yup.string().required('Password is a requred field.').min(6, 'Password should be at least 6 charaters.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Confirm Password must match.').required('Confirm Password is a requred field.')
})

const initialValue = { email: "", password: "", confirmPassword: "" };
const initialErrValue = { email: "", password: "", confirmPassword: "" };

export default withValidated(SignUpForm)(formSchema)(initialValue)(initialErrValue);