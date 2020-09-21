import React from "react";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {getUrlAvatar} from "../services/AuthService";
import DeleteIcon from "@material-ui/icons/Delete";

const ProfilePage = () => {
    const avatar = getUrlAvatar();

    return (
        <div>
            <h1>Profile</h1>
            <Avatar style={{width: 300, height: 300}} src={avatar}/>
            <Button>delete profile</Button>
            <h3>Markers</h3>
            <List >
                <ListItem>
                    <ListItemText
                        primary='aye'
                        secondary='aye'
                    />
                    <ListItemSecondaryAction>

                        <IconButton edge="end" aria-label="delete" onClick={() => console.log('remove')}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}

export default ProfilePage;