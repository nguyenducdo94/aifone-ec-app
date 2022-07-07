import React from 'react';
import { Divider, Menu, MenuItem, ButtonBase, InputBase, Typography, IconButton, Toolbar, AppBar, Grow, Avatar } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useNavigate } from 'react-router-dom'

import { firebaseAuth } from '../../firebase';
import { useInterfaceContext } from '../../context/interfaceContext';
import { useUserContext } from '../../context/userContext';

import useStyles from './styles';

export default function PrimarySearchAppBar() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const navigate = useNavigate();

   const { SidebarMenuClick } = useInterfaceContext();
   const { profile } = useUserContext();

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleLogout = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      firebaseAuth.signOut()
   }

   const userInfoClick = () => {
      navigate('/profile')
      handleMenuClose()
   }

   const menuId = 'primary-search-account-menu';
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={userInfoClick}><InfoOutlinedIcon color='primary' />&emsp;Thông tin</MenuItem>
         <Divider />
         <MenuItem onClick={handleMenuClose}><EditOutlinedIcon color='primary' /> &emsp;Sửa thông tin</MenuItem>
         <Divider />
         <MenuItem onClick={handleMenuClose}><SettingsOutlinedIcon color='primary' />&emsp;Cài đặt tài khoản</MenuItem>
         <Divider />
         <MenuItem onClick={handleLogout}><ExitToAppOutlinedIcon color='primary' />&emsp;Thoát</MenuItem>
      </Menu>
   );

   const mobileMenuId = 'primary-search-account-menu-mobile';
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >

         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               <Avatar className={classes.avatar} alt="user_avatar" src={profile?.avarUrl}>{profile?.fullName?.substring(0, 1)}</Avatar>
            </IconButton>
            <p>Profile</p>
         </MenuItem>
      </Menu>
   );

   const handelClickMenu = () => {
      SidebarMenuClick();
   }

   return (
      <Grow in timeout={{ appear: 1000, enter: 500, exit: 1000 }}>
         <div className={classes.grow}>
            <AppBar position="static">
               <Toolbar>
                  <IconButton
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     aria-label="open drawer"
                     onClick={handelClickMenu}
                  >
                     <MenuIcon />
                  </IconButton>
                  <ButtonBase onClick={() => (navigate('/'))}>
                     <Typography className={classes.title} noWrap>
                        QUẢN LÝ CỬA HÀNG
                     </Typography>
                  </ButtonBase>
                  <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                     </div>
                     <InputBase
                        placeholder="Tìm kiếm..."
                        classes={{
                           root: classes.inputRoot,
                           input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                     />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                     <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                     >
                        <Avatar className={classes.avatar} >{profile?.fullName?.substring(0, 2)}</Avatar>
                     </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                     <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                     >
                        <MoreIcon />
                     </IconButton>
                  </div>
               </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
         </div>
      </Grow>
   );
}
