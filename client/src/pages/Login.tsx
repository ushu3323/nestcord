/* eslint-disable jsx-a11y/label-has-associated-control */
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import useUser from '../hooks/useUser';

export default function Login() {
  const {
    user, login, isLoading, isAuthenticating,
  } = useUser();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validateOnChange: false,
    onSubmit: (values) => {
      login(values, ({ success, error }) => {
        if (success) return navigate('/chat');
        if (error.input) {
        /* eslint-disable no-underscore-dangle */
          const { username, password } = error.input;
          return formik.setErrors({
            username: username?._errors.join('\n') ?? '',
            password: password?._errors.join('\n') ?? '',
          });
        /* eslint-enable no-underscore-dangle */
        }
        return toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
      });
    },
  });

  if (isLoading) {
    return <ProgressSpinner />;
  }

  if (user) {
    return <Navigate to="/chat" />;
  }

  type FieldNames = keyof typeof formik.initialValues;

  const isFormFieldInvalid = (name: FieldNames) => !!(formik.errors[name]);

  const getFormErrorMessage = (name: FieldNames) => (
    formik.errors[name]
      ? <small className="p-error">{formik.errors[name]}</small>
      : <small className="p-error">&nbsp;</small>
  );

  return (
    <div className="h-screen flex justify-center items-center">
      <Toast ref={toast} />
      <Card className="w-96">
        <h1 className="text-3xl font-bold text-center mb-10">Log in</h1>
        <form onSubmit={formik.handleSubmit} className="w-full px-5">
          <div className="flex flex-col gap-2">
            <div>
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('username') })}
                />
                <label htmlFor="username">Username</label>
              </span>
              {getFormErrorMessage('username')}
            </div>
            <div>
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  type="password"
                  className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('username') })}
                  pt={{
                    input: { className: 'w-full' },
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  feedback={false}
                  toggleMask
                />
                <label htmlFor="password">Password</label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <Button type="submit" label="Join" className="w-full mt-5" loading={isAuthenticating} />
          </div>
        </form>
      </Card>
    </div>
  );
}
