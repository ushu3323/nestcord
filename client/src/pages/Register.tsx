/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { trpc, Utils } from '../utils/trpc';

export default function Register() {
  const registerMutation = trpc.users.register.useMutation();
  type MutationInput = Exclude<typeof registerMutation.variables, undefined>;

  const toast = useRef<Toast>(null);
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '' },
    validateOnChange: false,
    onSubmit: (values) => registerMutation.mutate(values, {
      onSuccess: () => toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Registered succesfully!' }),
      onError(opts) {
        const zodError: Utils.InferFormattedError<MutationInput> | null = (
          opts.data?.zodError ?? null
        );

        if (zodError) {
          /* eslint-disable no-underscore-dangle */
          const { username, email, password } = zodError;
          formik.setErrors({
            username: username?._errors.join('\n') ?? '',
            email: email?._errors.join('\n') ?? '',
            password: password?._errors.join('\n') ?? '',
          });
          /* eslint-enable no-underscore-dangle */
          return;
        }
        toast.current?.show({ severity: 'error', summary: 'Error', detail: opts.message });
      },
    }),
  });

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
        <h1 className="text-3xl font-bold text-center mb-10">User register</h1>
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
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('email') })}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <label htmlFor="email">E-mail</label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div>
              <span className="p-float-label">
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('username') })}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <label htmlFor="password">Password</label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <Button type="submit" label="Register" className="w-full mt-5" loading={registerMutation.isLoading} />
          </div>
        </form>
      </Card>
    </div>
  );
}
