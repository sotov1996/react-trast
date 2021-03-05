import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItems from './listItems';
import Login from "./login"
import Admin from "./Admin/Admin"
import Feedback from "./Feedback"
import MediaCard from "./Card/card"
import Contact from "./Contact/Contact"
import ProductCard from "./Card/Product/Product"
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Cropped from "./images/cropped-LOGO_96.png"
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import DescriptionProd from "./Card/Product/DescriptionProd"

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    height:103,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "rgb(92, 92, 255)",
    paddingBottom:20,
    paddingTop:20,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    display: "flex",
    margin:"0 auto",
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    position: "relative"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    margin: "0 auto"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { t, i18n } = useTranslation();

  const handleclick = (lang) => {
      i18n.changeLanguage(lang)
  }

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{position:"absolute",marginLeft:50}}>
            <img src={Cropped}/>
          </div>
          <div style={{position:"absolute", marginLeft:155}}>
            <div style={{display:"grid"}}>
              <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title2}>
                TRAST Super Clean
              </Typography>
              <Typography color="inherit" noWrap className={classes.title2}>
                {t('header')}
              </Typography>
            </div>
          </div>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {/*setTitle()*/}
          </Typography>
          <div>
            <div>
              <ReactCountryFlag 
                  countryCode="RU" 
                  onClick={()=>handleclick('ru')}
                  style={{width: '2em', height: '2em', cursor: "pointer", marginRight:8}}
                  svg />
              <ReactCountryFlag 
                  countryCode="PL" 
                  onClick={()=>handleclick('pl')}
                  style={{width: '2em', height: '2em', cursor: "pointer"}}
                  svg />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      
      <Router>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <ListItems />
              <Divider />
            </Drawer>
          
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/" component={MediaCard} />
                        <Route path="/product/:brend" component={ProductCard} />
                        <Route path="/id/:id" component={DescriptionProd} />
                        <Route  path="/login" component={Login} />
                        <Route  path="/admin" component={Admin} />
                        <Route  path="/feedback" component={Feedback} />
                        <Route  path="/contact" component={Contact} />
                    </Switch>
                  </Grid>
                </Grid>
              </Container>
            </main>
      </Router>
      
    </div>
      {/*<Typography className={classes.footer} variant="body2" color="textSecondary" align="center">
        {'OOO SLM-TRAST © '}
        <Link color="inherit" href={`http://${window.location.host}`}>
          {`${window.location.host}`}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
            </Typography>*/}
              
    </>
  );
}