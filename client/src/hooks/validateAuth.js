export default function validateAuth(values) {
    let errors = {};
    // Email Errors
    if (!values.email) {
      errors.email = "Required Email";
      alert(errors.email);

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
      alert(errors.email);
    }
    // Password Errors
    if (!values.password) {
      errors.password = "Required Password";
      alert(errors.password);
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 6 characters";
      alert(errors.password);

    }
    return errors;
  }
  