import React from 'react';
import { Drawer, Grow, Divider, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FaceIcon from '@material-ui/icons/Face';
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
import ReportIcon from '@material-ui/icons/Report';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AppsIcon from '@material-ui/icons/Apps';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import MailIcon from '@material-ui/icons/Mail';
import useStyles from './styles';
import {useInterfaceContext} from '../../context/interfaceContext';

export default function PersistentDrawerLeft(user) {
   const classes = useStyles();
   
   const {sidebarShowStatus} = useInterfaceContext();


   return (
      <div className={classes.root}>
         <Drawer id='sidebar'
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={sidebarShowStatus}
            classes={{
               paper: classes.drawerPaper,
            }}
         >
            <Divider />
            <List>
               <ListItem button>
                  <ListItemIcon><DashboardIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Tổng quan' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><EventNoteIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Đơn hàng' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><ShoppingCartIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Sản phẩm' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><DirectionsRunIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Nhân viên' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><FaceIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Khách hàng' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><Filter9PlusIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Khuyến mãi' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><ReportProblemIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Báo cáo' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><AssessmentIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Thống kê truy cập' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><AppsIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Ứng dụng' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><PhonelinkSetupIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Quản lý website' />
               </ListItem>
               <ListItem button>
                  <ListItemIcon><ReportIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Góp ý' />
               </ListItem>
            </List>
         </Drawer>
      </div>
   );
}
