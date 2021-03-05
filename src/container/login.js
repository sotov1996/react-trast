import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import "../../src/App.css";
import { useTranslation } from 'react-i18next'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    minHeight: 50,
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    position:"relative",
    left: "50%"
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [credential, setCredential] = useState({
      login:'',
      password: ''
  })
  const [resdata, setResdata] = useState('')
  const label = {
    name: t('admin.name'),
    login: t('admin.login'),
    password:  t('admin.password'),
    signin: t('admin.signin')
  }
  const [open, setOpen] = React.useState(false);

  const addUser = async(e) => {
      e.preventDefault()
    await axios.get(`api/login?login=${credential.login}&password=${credential.password}`)
        .then(res => {
          setResdata(res.data)
          if(res.data=="error"){
            setOpen(true);
          }
    })
  }

  const handleChange = (e) => {
    setCredential({...credential, [e.target.name]: e.target.value});
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {label.name}
        </Typography>
        <form className={classes.form} onSubmit={addUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label={label.login}
            name="login"
            autoComplete="login"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={label.password}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button 
            className={classes.submit}
            type="submit" 
            fullWidth variant="contained" 
            color="primary">
              {t('admin.signin')} </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert className={classes.alert} onClose={handleClose} severity="error">
          {t('snackbar.error')}
        </Alert>
      </Snackbar>
      {resdata == "success" ? <Redirect to="/admin" /> : null}
    </Container>
  );
}

export default SignIn