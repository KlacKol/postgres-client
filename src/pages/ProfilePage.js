import React, {useEffect} from "react";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {mapDeleteMarkerById, mapGetAllUserMarkers, removeUserProfile} from "../store/actions/map";
import {getAvatar, getUserId} from "../services/LocalStorageService";
import {Map, Marker, TileLayer} from "react-leaflet";
import Grid from "@material-ui/core/Grid";

const ProfilePage = () => {

    const dispatch = useDispatch();
    const avatarName = getAvatar();
    const avatar = process.env.REACT_APP_APP_API_URL + '/uploads/' + avatarName;
    const markers = useSelector(res => res.map.markers, shallowEqual);
    const userId = getUserId();

    useEffect(() => {
        if (markers) {
            dispatch(mapGetAllUserMarkers(userId))
        }
    }, [])

    const deleteMarker = (id) => {
        dispatch(mapDeleteMarkerById(id));
    }

    const deleteProfile = () => {
        dispatch(removeUserProfile(userId))
    }

    return (
        <div>
            <div className='profile-header'>
                <h1>Profile</h1>
                <Avatar className='profile-avatar' src={avatar}/>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    onClick={deleteProfile}
                >Delete profile</Button>
            </div>
            <h3 style={{textAlign: 'center'}}>Markers</h3>
            {markers.length > 0 ? markers.map(marker => (
                <List key={marker.id}>
                    <ListItem>
                        <ListItemText
                            primary='description'
                            secondary={marker.description}
                        />
                        <Grid item xs={10}>
                            <Map
                                tap={true}
                                center={[marker.lat, marker.lng]}
                                zoom={10}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[marker.lat, marker.lng]}/>
                            </Map>
                        </Grid>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteMarker(marker.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            )) : <p>you don't have any marker</p>}
        </div>
    )
}

export default ProfilePage;