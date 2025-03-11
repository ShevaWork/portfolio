import React from "react";
type Params = {
  email: string;
};

const EmailTemplate = ({ email }: Params) => {
  return (
    <>
      <h1>It`s portfolio message</h1>
      <h3>Write mesage to {email}</h3>
      <p>Час отримання: {new Date().toLocaleString()}</p>
    </>
  );
};

export default EmailTemplate;
