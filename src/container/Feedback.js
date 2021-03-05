import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        height: 50,
        padding: "5px",
        margin: "0 auto"
    },
    label: {
      textAlign: "center",
      marginBottom: 10
    },
    alert: {
      position: "absolute",
      left: "50%",
      bottom: "-70%"
    }
  }));

  function Alert(props) {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
  }
  

const Feedback = () => {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(
        {
            title: "",
            description: "",
        }
    );
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const { t, i18n } = useTranslation();

    let label = {
      title: t('feedback.title'),
      description: t('feedback.description'),
      send: t('feedback.send'),
      name: t('feedback.name'),
      event: t('feedback.event'),
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post("/api/feedback", newUser)
            .then(res => {
              setNewUser({title: "", description: ""})
              setOpenSnackbar(true);
            })
    }

    const closeSnacbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackbar(false);
    };

    return (
      <>
        <form style={{display: "grid", minHeight:370, maxWidth: 400, margin:"0 auto"}} onSubmit={handleSubmit} encType='multipart/form-data'>
            <Typography className={classes.label} variant="h5" component="h2">
              {label.name}
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label={label.title}
              name="title"
              multiline
              variant="outlined"
              value={newUser.title}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-static"
              label={label.description}
              name="description"
              type="text"
              multiline
              rows={6}
              variant="outlined"
              value={newUser.description}
              onChange={handleChange}
            />
            <Button
              variant="contained" 
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}>{label.send}</Button>
        </form>
        <Snackbar className={classes.alert} open={openSnackbar} autoHideDuration={2000} onClose={closeSnacbar}>
          <Alert onClose={closeSnacbar} severity="success">
            {label.event}
          </Alert>
        </Snackbar>
     </> 
  );
}

export default Feedback;