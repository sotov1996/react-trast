import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import FolderIcon from '@material-ui/icons/Folder';
import {Link} from "react-router-dom";
import "../App.css"
import { useTranslation } from 'react-i18next'

const ListItems = () => {
  const { t, i18n } = useTranslation();
    return (
            <List>
              <Link className="list-text" to="/">
                  <ListItem button>
                    <ListItemIcon title={t('menu.main')}>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    {t('menu.main')}
                </ListItem>
              </Link>
              <Link className="list-text" to="/feedback">
                  <ListItem button>
                    <ListItemIcon title={t('menu.feedback')}>
                      <SendIcon />
                    </ListItemIcon>
                    {t('menu.feedback')}
                </ListItem>
              </Link>
              <Link className="list-text" to="/contact">
                  <ListItem button>
                    <ListItemIcon title={t('menu.contact')}>
                      <FolderIcon />
                    </ListItemIcon>
                    {t('menu.contact')}
                </ListItem>
              </Link>
              <Link className="list-text" to="/login">
                  <ListItem button>
                    <ListItemIcon title={t('menu.admin')}>
                      <DashboardIcon />
                    </ListItemIcon>
                    {t('menu.admin')}
                </ListItem>
              </Link>
            </List>
    );
}

export default ListItems;