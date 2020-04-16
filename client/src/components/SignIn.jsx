import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFormValidation from "../hooks/useFormValidation";
import validateAuth from "../hooks/validateAuth";
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const classes = useStyles();
  const INITIAL_STATE = {
    email: "",
    password: ""
  };
  const {
    handleChange,
    handleSubmitSignIn,
    values,
    loginState
  } = useFormValidation(INITIAL_STATE, validateAuth);
  const [toDashboard, setToDashboard] = React.useState(false);
  const [toSignUp, setToSignUp] = React.useState(false);

  return (
  loginState? <Redirect to = {{ pathname: "/Dashboard" }} />
  :
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>

        <form onSubmit={handleSubmitSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value ={values.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={values.password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"

            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="signup"  variant="body2">
                {'Create an account'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
