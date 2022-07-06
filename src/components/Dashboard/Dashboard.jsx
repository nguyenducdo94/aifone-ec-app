import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import { Divider, Grow, Paper, Button } from '@material-ui/core';
import { useUserContext } from '../../context/userContext';
import { useInterfaceContext } from '../../context/interfaceContext';

const Dashboard = () => {
   const classes = useStyles();
   const { user } = useUserContext();
   const { sidebarShowStatus } = useInterfaceContext();

   return (
      <Grow in timeout={{ appear: 1000, enter: 500, exit: 1000 }}>
         <div className={clsx({ [classes.root]: !sidebarShowStatus, [classes.rootShift]: sidebarShowStatus })}>

            <div className={classes.container}>
               <Paper className={classes.content} elevation={6}>
                  <h1>Chào mừng bạn!</h1>
                  <Divider />
                  <h2>Tên: {user.displayName}</h2>
                  <h2>Địa chỉ email: {user.email}</h2>
                  <Divider />
                  <div style={{ display: 'flex', direction: 'row' }}>
                     <h4>Bạn muốn bắt đầu công việc chứ?</h4>
                     <Button style={{ margin: ' 10px' }} variant='contained' color='primary'>Bắt đầu</Button>
                  </div>
               </Paper>
            </div>
         </div >
      </Grow >
   )
}

export default Dashboard