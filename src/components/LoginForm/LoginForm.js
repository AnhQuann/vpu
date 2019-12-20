import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useAuth } from '../../context/Auth';
import { withValidated } from '../../hoc/FormValidated';
import { LoginView } from './LoginView';
import app from '../../config/firebaseConfig';

function LoginForm(props) {
  const {
    validateForm,
    handleChangeField,
    handleFocusField,
    formInfo,
    inputErrors,
    isValidated,
    disabled,
    forceUpdateFieldsValue,
    redirectToReferer,
    setDisabled,
    loading,
    isError,
    setIsError,
    setLoading,
    handleBlurField,
  } = props;

  const loginForm = useRef(null);
    const { authenticated, setLoggingInfo, loggingInfo } = useAuth();

  function handleSubmitForm(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    if (isValidated) {
      app.auth().signInWithEmailAndPassword(formInfo.email, formInfo.password)
        .then(user => {
          redirectToReferer();
        })
        .catch(err => {
          setIsError(true);
          setLoading(false);
          setDisabled(false);
        })
    } else {
      validateForm(formSchema, formInfo);
      setLoading(false);
    }
  }

  function isEmptyObj(obj) {
    if (obj) {
      return Object.values(obj).every(x => (x === null || x === ''))
    } else {
      return true;
    }
  }

  useEffect(() => {
    localStorage.setItem("authRefererPath", '/login');
    authenticated && redirectToReferer();
    if (!isEmptyObj(loggingInfo)) {
      const newLoginInfo = { ...formInfo, email: loggingInfo.email, password: loggingInfo.password };
      forceUpdateFieldsValue(newLoginInfo);
      validateForm(formSchema, newLoginInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <LoginView
      loginRef={loginForm}
      handleSubmitForm={handleSubmitForm}
      formInfo={formInfo}
      handleBlurField={handleBlurField}
      handleChangeField={handleChangeField}
      handleFocusField={handleFocusField}
      inputErrors={inputErrors}
      disabled={disabled}
      loading={loading}
      isError={isError}
      setLoggingInfo={setLoggingInfo}
    />
  )
};


const formSchema = yup.object().shape({
  email: yup.string().required('Email is a requred field.').email('Email must be a valid email.'),
  password: yup.string().required('Password is a requred field.').min(6, "")
});

const initialValue = { email: "", password: "" };
const initialErrValue = { email: "", password: "" };

export default withValidated(LoginForm)(formSchema)(initialValue)(initialErrValue);