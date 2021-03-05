import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./card.css"
import { Redirect, Link } from "react-router-dom"
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginLeft: 30,
    marginBottom: 30
  },
  media: {
      height: 300,
      width: 250
  },
  card: {
    display: "flex",
    justifyContent: "space-between"
  },
  count: {
    paddingTop:25
  }
});

const MediaCard = () => {
  const classes = useStyles();

    const [brends, setBrends] = React.useState([])
    const [brendLength, setBrendLength] = React.useState({})

    useEffect(() => {
      fetch('/api/adminBrend')
      .then(result => result.json())
      .then(rowData => {
        setBrends(rowData[0])
        setBrendLength(rowData[1])
      })
  }, []);

    const getBrend = brends.map((el, index) => {
        return (
          <Link key={`${index}${el.brend}`} className="list-text" to={`/product/${el.brend}`}>
            <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${process.env.PUBLIC_URL}/images/${el.logo}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent className={classes.card}>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
                        {el.brend}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="h5">
                        {el.description}
                      </Typography>
                    </div>
                    <Typography className={classes.count} variant="h5" component="h4">
                      {brendLength[el.brend]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
    })

    return (
        <div className="card">
          {getBrend}
        </div>
    )
}

export default MediaCard;