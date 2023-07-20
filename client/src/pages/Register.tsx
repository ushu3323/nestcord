/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

export default function Register() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="flex flex-column justify-center">
        <form action="">

          <div className="flex flex-col gap-5">
            <span className="p-float-label">
              <InputText id="username" className="p-inputtext-sm" />
              <label htmlFor="username">Username</label>
            </span>
            <span className="p-float-label">
              <InputText id="email" type="email" className="p-inputtext-sm" />
              <label htmlFor="email">E-mail</label>
            </span>
            <span className="p-float-label">
              <InputText id="password" type="password" className="p-inputtext-sm" />
              <label htmlFor="password">Password</label>
            </span>
            <Button label="Register" className="w-full mt-5" />
          </div>
        </form>
      </Card>
    </div>
  );
}
