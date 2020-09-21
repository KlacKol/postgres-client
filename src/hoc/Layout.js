import React, {useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
    ListItemIcon, ListItemText, ListItem, IconButton, Divider, Typography, List, Toolbar, AppBar, CssBaseline, Drawer, SvgIcon
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import FaceIcon from '@material-ui/icons/Face';

import {PATH_ADD_MARKER, PATH_ADMIN_PANEL, PATH_HOME, PATH_PROFILE_PAGE} from "../routeList";
import {authClearError, logoutUser} from "../store/actions/auth";
import {mapClearError} from "../store/actions/map";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const Layout = ({children}) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const reduxData = useSelector(res => res, shallowEqual);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutUser = () => {
        handleDrawerClose();
        dispatch(logoutUser());
    }

    const showErrorAlert = (err, type) => {
        alert(err);
        switch (type) {
            case 'user':
                return dispatch(authClearError());
            case 'map':
                return dispatch(mapClearError());
            default:
                return null;
        }
    }

    return (
        <div className={classes.root}>
            {reduxData.user.loggedIn ? (
                <>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                name='toggle-menu'
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                History maps
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem button name='menu-page-home' component={Link} onClick={handleDrawerClose} to={PATH_HOME}>
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                            <ListItem button name='menu-page-add-marker' component={Link} onClick={handleDrawerClose} to={PATH_ADD_MARKER}>
                                <ListItemIcon><AddIcon/></ListItemIcon>
                                <ListItemText primary="Add new marker"/>
                            </ListItem>
                            <ListItem button name='menu-page-profile' component={Link} onClick={handleDrawerClose} to={PATH_PROFILE_PAGE}>
                                <ListItemIcon><FaceIcon/></ListItemIcon>
                                <ListItemText primary="Profile"/>
                            </ListItem>
                            <ListItem name='menu-page-logout' button onClick={handleLogoutUser}>
                                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                            {reduxData.user.isAdmin ? (
                                <ListItem name='menu-page-admin' button component={Link} onClick={handleDrawerClose} to={PATH_ADMIN_PANEL}>
                                    <ListItemIcon>
                                        <SvgIcon viewBox={'0 0 24 24'}>
                                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                <title/>
                                                <g id="Google">
                                                    <g id="Gadmin">
                                                        <path className="cls-1"
                                                              d="M480.31,319.72l-49.15-40.48a168.54,168.54,0,0,0,0-46.48l49.15-40.48a15.6,15.6,0,0,0,3.6-19.84l-41.6-72a15.55,15.55,0,0,0-19-6.8L363.6,116a175.63,175.63,0,0,0-40.14-23.17L313,29.88a15.59,15.59,0,0,0-15.38-13H214.41a15.59,15.59,0,0,0-15.38,13L188.54,92.81A175.63,175.63,0,0,0,148.4,116L88.66,93.6a15.55,15.55,0,0,0-19,6.8l-41.6,72a15.6,15.6,0,0,0,3.6,19.84l49.15,40.48a168.54,168.54,0,0,0,0,46.48L31.69,319.72a15.6,15.6,0,0,0-3.6,19.84l41.6,72a15.55,15.55,0,0,0,19,6.8L148.4,396a175.63,175.63,0,0,0,40.14,23.17L199,482.12a15.59,15.59,0,0,0,15.38,13h83.18a15.59,15.59,0,0,0,15.38-13l10.49-62.93A175.63,175.63,0,0,0,363.6,396l59.74,22.38a15.55,15.55,0,0,0,19-6.8l41.6-72A15.6,15.6,0,0,0,480.31,319.72Z"/>
                                                        <path className="cls-1"
                                                              d="M483.91,339.56l-41.6,72a15.55,15.55,0,0,1-19,6.8L363.6,396a175.63,175.63,0,0,1-40.14,23.17L313,482.12a15.59,15.59,0,0,1-15.38,13H256.66V16.84h40.93a15.59,15.59,0,0,1,15.38,13l10.49,62.93A175.63,175.63,0,0,1,363.6,116L423.34,93.6a15.55,15.55,0,0,1,19,6.8l41.6,72a15.6,15.6,0,0,1-3.6,19.84l-49.15,40.48a168.54,168.54,0,0,1,0,46.48l49.15,40.48A15.6,15.6,0,0,1,483.91,339.56Z"/>
                                                        <path className="cls-2"
                                                              d="M308.61,318.39v172.2a15.53,15.53,0,0,1-11,4.57H214.41a15.57,15.57,0,0,1-9.78-3.45V318.39Z"/>
                                                        <path className="cls-2"
                                                              d="M308.61,318.39v172.2a15.53,15.53,0,0,1-11,4.57H256.64V318.39Z"/>
                                                        <path className="cls-2"
                                                              d="M308.61,154.28v70.53l-52,31.19-52-31.19V154.28A113.72,113.72,0,0,0,142.24,256c0,65.13,53.07,114.35,114.32,114.38a114.28,114.28,0,0,0,52.05-216.1Z"/>
                                                        <path className="cls-2"
                                                              d="M371,256a113.68,113.68,0,0,0-62.39-101.72v70.53l-52,31.19V370.38A114.51,114.51,0,0,0,371,256Z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Admin"/>
                                </ListItem>
                            ) : null}
                        </List>
                    </Drawer>
                </>
            ) : null}
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {reduxData.user.error ? showErrorAlert(reduxData.user.error, 'user') : null}
                {reduxData.map.error ?  showErrorAlert(reduxData.map.error, 'map') : null}
                <div className={classes.drawerHeader}/>
                {children}
            </main>
        </div>
    )
};

export default Layout;