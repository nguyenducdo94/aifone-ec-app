import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import { Divider, Grow, Paper, Button } from '@material-ui/core';
import { useUserContext } from '../../context/userContext';
import { useInterfaceContext } from '../../context/interfaceContext';
import Camera from '../svg/Camera'
import Delete from '../svg/Delete'
import Img from '../../assets/no-avatar.jpg'

const Profile = () => {
   const classes = useStyles();
   const { profile } = useUserContext();
   const { sidebarShowStatus } = useInterfaceContext();

   return (
      <Grow in timeout={{ appear: 1000, enter: 500, exit: 1000 }}>
         <div className={clsx({ [classes.root]: !sidebarShowStatus, [classes.rootShift]: sidebarShowStatus })}>

            <div className={classes.container}>
               <Paper className={classes.content} elevation={6}>
                  <div className={classes.profile_container}>
                     <div className={classes.img_container}>
                        <img className={classes.img_container_img} src={profile.avatarUrl || Img} alt="avatar" />
                        <div className={classes.img_container_overlay}>
                           <div>
                              <label htmlFor="photo">
                                 <Camera />
                              </label>
                              {profile.avatarUrl ? <Delete /> : null}
                              <input
                                 type="file"
                                 accept="image/*"
                                 style={{ display: "none" }}
                                 id="photo"
                              // onChange={(e) => setImg(e.target.files[0])}
                              />
                           </div>
                        </div>
                     </div>
                     <div className={classes.text_container}>
                        <h3 className={classes.text_container_profile_name}>{profile.fullName}</h3>
                        <p>Email: {profile.email}</p>
                        <p>Tài khoản: {profile.role === 'user' ? 'người dùng thường' : (profile.role === 'admin' ? 'admin' : 'none')}</p>
                        <hr />
                        <small>Tham gia từ: {profile.createdAt.toDate().toDateString()}</small>
                     </div>
                  </div>
               </Paper>
            </div>
         </div >
      </Grow >
   )
}

export default Profile