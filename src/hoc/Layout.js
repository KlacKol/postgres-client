import React, {useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
    ListItemIcon, ListItemText, ListItem, IconButton, Divider, Typography, List, Toolbar, AppBar, CssBaseline, Drawer
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {PATH_ADD_MARKER, PATH_HOME} from "../routeList";
import {logoutUser} from "../store/actions/auth";


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
        padding: theme.spacing(3),
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
                            <ListItem button component={Link} onClick={handleDrawerClose} to={PATH_HOME}>
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                            <ListItem button component={Link} onClick={handleDrawerClose} to={PATH_ADD_MARKER}>
                                <ListItemIcon><AddIcon/></ListItemIcon>
                                <ListItemText primary="Add new marker"/>
                            </ListItem>
                            <ListItem button onClick={handleLogoutUser}>
                                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                        </List>
                    </Drawer>
                </>
            ) : null}
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {reduxData.user.error ? alert(reduxData.user.error) : null}
                {reduxData.map.error ?  alert(reduxData.map.error) : null}
                <div className={classes.drawerHeader}/>
                {children}
            </main>
        </div>
    )
};

export default Layout;