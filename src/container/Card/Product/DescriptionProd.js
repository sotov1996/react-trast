/*import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "../card.css"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "30%",
  },
  media: {
      height: "100%",
      width: "90%",
      margin: "0 auto",
  },
  description: {
    width: "68%",
    height: 390,
    padding: 15,
    wordWrap: "break-word"
  },
  header: {
    width: "100%",
    height: "60px",
    marginBottom: 20,
    textAlign: "center",
    padding:"15px 0",
    wordWrap: "break-word"
  },
  btnBack: {
    position: "absolute",
    left: 6
  }
});

const DescriptionProduct = () => {
  const classes = useStyles();

    const [brends, setBrends] = useState({})
    const [btnback, setBtnback] = React.useState(false);

    const link = window.location.href;
    const id = link.split("/").pop()

    useEffect(() => {
      fetch(`/api/product/${id}`)
      .then(result => result.json())
      .then(res => {
        setBrends(res[0])
      })
  }, []);

    return (
        <div>
          <Button 
            className={classes.btnBack} 
            variant="contained" 
            color="primary" 
            onClick={() => setBtnback(!btnback)} >
            Back </Button>
          {btnback ? <Redirect to={`/product/${brends.brend}`} />: null}
          <div key ={brends._id} style={{margin: "0 auto", padding: "0 70px"}}>
          <Card className={classes.header}>
            <Typography variant="h5" component="h2">
              {brends.product}
            </Typography>
          </Card>
          <div className="card">
              <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image={`${process.env.PUBLIC_URL}/images/${brends.logo}`}
                    title="Contemplative Reptile"
                  />
              </Card>
              <Card className={classes.description}>
                <Typography variant="h6" component="h5">
                  {brends.description}
                </Typography>
              </Card>
            </ div>  
          </div>
        </div>
    )
}

export default DescriptionProduct;*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    height: 400
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 350
  },
  main: {
    margin: "0 auto",
  },
  btnBack: {
    position: "absolute",
    left: 2
  }
});

const DescriptionProduct = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [brends, setBrends] = useState({})
    const [btnback, setBtnback] = React.useState(false);

    const link = window.location.href;
    const id = link.split("/").pop()

    useEffect(() => {
      fetch(`/api/product/${id}`)
      .then(result => result.json())
      .then(res => {
        setBrends(res[0])
      })
  }, []);

  return (
    <>
    <Button className={classes.btnBack} 
            variant="contained" 
            color="primary" 
            onClick={() => setBtnback(!btnback)} >
            {t('btn.back')} </Button>
          {btnback ? <Redirect to={`/product/${brends.brend}`} />: null}
    <Grid className={classes.main} item xs={12} md={9}>
      <CardActionArea component="a">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {brends.product}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {brends.description}
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={`${process.env.PUBLIC_URL}/images/${brends.logo}`} title={brends.logo} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
    </>
  );
}

export default DescriptionProduct;