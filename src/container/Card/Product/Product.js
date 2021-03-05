import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import "../card.css";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginLeft: 30,
    marginBottom: 30
  },
  media: {
      height: 300,
      minWidth: 250,
      margin: "0 auto",
  },
  type: {
    width: 250,
    height: 100,
    margin: "0 auto",
  },
  desc: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  btnBack: {
    position: "absolute",
    left: 2
  }
});

const ProductCard = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [product, setProduct] = useState([])
  const [page, setPage] = React.useState(0);
  const [btnback, setBtnback] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const link = window.location.href;
  const brend = link.split("/").pop()

    useEffect(() => {
        axios(`/api/${brend}`)
        .then(prod => {
            setProduct(prod.data)
        })
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getProduct = () => product.map( (el,index) => {
      const link = window.location.href;
      const brend = link.split("/").pop()
        if(el.brend == brend){
            return (
              <Link key={`${index}${el.brend}`} className="list-text" to={`/id/${el._id}`}>
                <Card key={`${index}${el.brend}`} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.PUBLIC_URL}/images/${el.logo}`}
                      title="Contemplative Reptile"
                    />
                    <CardContent className={classes.type}>
                      <Typography className={classes.desc} gutterBottom variant="h6" component="h2">
                        {el.product}
                      </Typography>
                      <Typography variant="body1" component="h5">
                        {el.price}$
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
              );
        }
    })

    return (
      <>
        <Button 
          variant="contained" 
          className={classes.btnBack}
          color="primary" 
          onClick={() => setBtnback(!btnback)} >
          {t('btn.back')} </Button>
        {btnback ? <Redirect to="/" />: null}
        <div>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
          {getProduct()}
          </div>
          <div style={{display:"flex", justifyContent: "center"}}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={product.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </div>
        </div>
      </>
    )
}

export default ProductCard;