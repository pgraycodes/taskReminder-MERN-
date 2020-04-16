import React from 'react';
import axios from 'axios';




function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [loginState, setLoginState] = React.useState(false);

//   React.useEffect(() => {
//     if (toDashboard) {
//       return <Redirect to="/Dashboard" />;
//     }
//   }, []);

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    axios
      .post('/api/v1/auth/login', values)
      .then(function (res) {
        if (res.status === 200) {
          //to check on token
        console.log(res);
        //invoke to redirect
        setLoginState(true);
        
      }}  )
      .catch(function (error) {
        setLoginState(false)
        console.log(error);
      });
  };

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  return {
    handleChange,
    handleSubmitSignIn,
    values,
    errors,
    loginState
 
  };
}

export default useFormValidation;
