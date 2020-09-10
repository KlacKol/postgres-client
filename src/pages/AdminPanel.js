import React, {useEffect} from "react";
import {
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton
} from "@material-ui/core";
import RedditIcon from '@material-ui/icons/Reddit';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {takeAllUsers} from "../store/actions/map";
import {deleteUser} from "../services/AdminService";

const AdminPanel = () => {

    const dispatch = useDispatch();
    const users = useSelector(res => res.map.users, shallowEqual);

    useEffect(() => {
        dispatch(takeAllUsers());
    }, [])

    const removeUser = async (email) => {
        await deleteUser(email);
        dispatch(takeAllUsers());
    }

    return (
        <>
            {users && users.map(user => (
                <List key={user.email + user.name}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {user.isAdmin ? <RedditIcon/> : <PersonIcon/>}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={user.email}
                        />
                        <ListItemSecondaryAction>

                            <IconButton edge="end" aria-label="delete" onClick={() => removeUser(user.email)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            ))}
        </>
    )
}

export default AdminPanel;