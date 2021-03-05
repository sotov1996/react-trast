import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next'
import SimpleMap from './Map'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    marginBottom: 30
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
      <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('contact.contact')}
              </Typography>
              <Typography variant="h5" component="h2">
              OOO SLM-TREST2
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              slm-trast@tut.by
              </Typography>
              <Typography variant="body2" component="h5">
              +375291336336
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="h2">
              SLM-TRAST Sp. z o.o.
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              <a href="mailto: http://slm-trast.ovel.pl/">info@slm-trast.pl</a>
              </Typography>
              <Typography variant="body2" component="h5">
              +48604222999
              </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('contact.find')}
              </Typography>
              <Typography variant="h5" component="h2">
              {t('contact.adress')}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              {t('contact.adress1')}
              </Typography>
              <Typography variant="h5" component="h2">
              {t('contact.hours')}
              </Typography>
              <Typography variant="body2" component="h5">
              {t('contact.hours1')}
              </Typography>
            </CardContent>
        </Card>
        <SimpleMap />
      </div>
  );
}