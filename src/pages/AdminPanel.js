import React, {useEffect} from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {removeUserInAdminPanel, takeAllUsers} from "../store/actions/map";
import {getUserId} from "../services/LocalStorageService";

const AdminPanel = () => {

    const dispatch = useDispatch();
    const users = useSelector(res => res.map.users, shallowEqual);
    const url = process.env.REACT_APP_APP_API_URL + '/uploads/';
    const userId = +getUserId();
    useEffect(() => {
        dispatch(takeAllUsers());
    }, [])

    const removeUser = (id) => {
        dispatch(removeUserInAdminPanel(id));
    }

    return (
        <>
            {users && users.map(user => (
                <List key={user.email + user.name}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={url + user.avatar}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={user.email}
                        />
                        {user.id !== userId ? (
                            <ListItemSecondaryAction>
                                <IconButton name={user.name} edge="end" aria-label="delete" onClick={() => removeUser(user.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        ) : null}
                    </ListItem>
                </List>
            ))}
        </>
    )
}

export default AdminPanel;