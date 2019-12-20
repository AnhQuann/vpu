import React, { Component } from 'react';

export const withValidated = FormComponent => formSchema => initialValue => initialErrValue => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: initialErrValue,
        formError: "",
        isValidated: false,
        disabled: true,
        loading: false,
        isError: false,
        formInfo: initialValue,
        skipFields: false,
      }
    }

    validateForm = (formSchema, validateValue, idShowErrors) => {
      const { errors, skipFields } = this.state;
      formSchema.validate(validateValue, { abortEarly: false })
        .then(() => {
          this.setState({ errors: initialErrValue, isValidated: true, disabled: false });
        })
        .catch(err => {
          let newErrors;
          if (idShowErrors && !skipFields) {
            const fieldError = [...err.inner].find(input => input.path === idShowErrors);
            newErrors = { ...errors, [idShowErrors]: fieldError ? fieldError.message : "" }
          } else {
            const errorsObj = [...err.inner].map(input => ({ [input.path]: input.message }));
            newErrors = errorsObj.reduce((newErrObj, eachErr) => ({ ...newErrObj, ...eachErr }));
          }
          this.setState({ errors: newErrors, isValidated: false, disabled: true })
        })
    }

    handleChangeField = (e) => {
      const { formInfo } = this.state;
      const newFormInfo = { ...formInfo, [e.target.id]: e.target.value };
      this.validateForm(formSchema, newFormInfo, e.target.id);
      this.setState({ formInfo: newFormInfo });
    }

    handleFocusField = (e, form) => {
      const { errors } = this.state;
      e.target.previousSibling.style.color = "#64cbef";
      this.setState({ errors: {...errors, [e.target.id]: ""} })
      const { formInfo } = this.state;
      const fields = [...form.current.elements];
      const currentFieldIndex = fields.findIndex(el => el.id === e.target.id);
      if (currentFieldIndex > 0) {
        const fieldsBefore = fields.filter(el => fields.indexOf(el) < currentFieldIndex);
        fieldsBefore.every(field => {
          if (field.value === "") {
            this.validateForm(formSchema, formInfo);
            this.setState({ skipFields: true });
            return false
          } else {
            return true;
          }
        })
      }
    }

    handleBlurField = (e) => {
      e.target.previousSibling.style.color = "#000000";
    }

    forceUpdateFieldsValue = (newFormInfo) => {
      this.setState({ formInfo: newFormInfo })
    }

    setDisabled = (disabled) => {
      this.setState({ disabled })
    }

    setLoading = (loading) => {
      this.setState({ loading })
    }

    setIsError = (isError) => {
      this.setState({ isError });
    }

    setFormError = (formError) => {
      this.setState({ formError });
    }

    redirectToReferer = () => {
      const { history } = this.props;
      const referer = localStorage.getItem("referer");
      referer ? history.push(referer) : history.push("/index.html");
    }

    render() {
      const { formInfo, errors, isValidated, disabled, loading, isError, formError } = this.state;
      return (
        <FormComponent
          validateForm={this.validateForm}
          handleChangeField={this.handleChangeField}
          handleFocusField={this.handleFocusField}
          handleBlurField={this.handleBlurField}
          forceUpdateFieldsValue={this.forceUpdateFieldsValue}
          setDisabled={this.setDisabled}
          setLoading={this.setLoading}
          setIsError={this.setIsError}
          setFormError={this.setFormError}
          redirectToReferer={this.redirectToReferer}
          formInfo={formInfo}
          inputErrors={errors}
          isValidated={isValidated}
          disabled={disabled}
          loading={loading}
          isError={isError}
          formError={formError}
          {...this.props}
        />
      );
    }
  }
};
