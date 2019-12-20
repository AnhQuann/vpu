import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import '../../assets/css/Form.css';
import { withValidated } from '../../hoc/FormValidated';

function AddNewWordForm(props) {
  const {
    history,
    validateForm,
    handleChangeField,
    handleFocusField,
    formInfo,
    inputErrors,
    isValidated,
    disabled,
    forceUpdateFieldsValue,
    setDisabled,
    loading,
    isError,
    setIsError,
    setLoading,
    handleBlurField
  } = props;
  const form = useRef(null);

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(formInfo);
    forceUpdateFieldsValue(initialValues);
  }

  function backToMenu() {
    history.push('/index.html')
  }

  return (
    <div>
      <form className="form" ref={form} onSubmit={handleSubmitForm}>
        <div className="input-field">
          <i className="material-icons input-icon">edit</i>
          <input id="en" type="text" className="validate" value={formInfo.en} onFocus={(e) => handleFocusField(e, form)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
          <div className="error-field">{inputErrors.en}</div>
          <label className={`${formInfo.en !== initialValues.en && 'active'}`} htmlFor="en">English word</label>
        </div>
        <div className="input-field">
          <i className="material-icons input-icon">edit</i>
          <input id="vi" type="text" className="validate" value={formInfo.vi} onFocus={(e) => handleFocusField(e, form)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} />
          <div className="error-field">{inputErrors.vi}</div>
          <label className={`${formInfo.vi !== initialValues.vi && 'active'}`} htmlFor="vi">Vietnamese mean</label>
        </div>
        <div className="file-field input-field">
          <div className="file-icon">
            <i className="material-icons input-icon">image</i>
            <input type="file" multiple id="img" onFocus={(e) => handleFocusField(e, form)} onChange={(e) => handleChangeField(e)} onBlur={(e) => handleBlurField(e)} value={formInfo.img} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one or more files"
              onFocus={(e) => handleFocusField(e, form)}
              onChange={(e) => handleChangeField(e)}
              onBlur={(e) => handleBlurField(e)}
              value={formInfo.img}
            />
            <div className="error-field">{inputErrors.img}</div>
          </div>
        </div>
        {isError && <div className="error-after-submit">Something error!</div>}
        <button disabled={disabled} style={{ marginBottom: 10 }} className="btn">
          {loading ? <div className="loading"></div> : <span>ADD NEW WORD</span>}
        </button>
        <button onClick={backToMenu} className="btn" type="button">BACK TO MENU</button>
      </form>
    </div>
  )
};

const formSchema = yup.object().shape({
  en: yup.string().required('English Word is a requred field.'),
  vi: yup.string().required('Vietnamese Mean is a requred field.'),
  img: yup.string().required('Choose an image to learn better.'),
});

const initialValues = { en: "", vi: "", img: "" };
const initialErrValues = { en: "", vi: "", img: "" };

export default withValidated(AddNewWordForm)(formSchema)(initialValues)(initialErrValues);