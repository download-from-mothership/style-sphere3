import React from 'react';
import { Button, Input, Card, CardHeader, CardBody, CardFooter } from 'shadcn/ui';

const AuthForm = () => {
  return (
    <Card className="auth-form-container">
      <CardHeader>
        <h2>Create an account</h2>
        <p>Enter your email below to create your account</p>
      </CardHeader>
      <CardBody>
        <div className="social-buttons">
          <Button variant="outline" className="github-button">GitHub</Button>
          <Button variant="outline" className="google-button">Google</Button>
        </div>
        <div className="divider">OR CONTINUE WITH</div>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" placeholder="m@example.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" />
          </div>
        </form>
      </CardBody>
      <CardFooter>
        <Button type="submit" className="create-account-button">Create account</Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm; 