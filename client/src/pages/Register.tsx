/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

export default function Register() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96">
        <h1 className="text-3xl font-bold text-center">User register</h1>
        <form className="w-full px-5">
          <div className="flex flex-col gap-8">
            <div />
            <div>
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="username"
                  className="p-inputtext-sm w-full"
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
            <div>
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  className="p-inputtext-sm w-full"
                />
                <label htmlFor="email">E-mail</label>
              </span>
            </div>
            <div>
              <span className="p-float-label">
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  className="p-inputtext-sm w-full"
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
            <Button type="submit" label="Register" className="w-full mt-5" />
          </div>
        </form>
      </Card>
    </div>
  );
}
