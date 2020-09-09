import React, {useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import moment from "moment";
import {generateRandomMarker} from "../services/MapService";
import {Map, Marker, TileLayer} from "react-leaflet";
import {useDispatch} from "react-redux";
import {mapCreateMarker} from "../store/actions/map";
import {getUserId} from "../services/LocalStorageService";


const useStyles = makeStyles(theme => ({
    leftContainer: {
        marginLeft: 0,
        paddingLeft: 0
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    generateButton: {
        width: '50%',
        height: '15vh'
    },
    paperForm: {
        marginTop: theme.spacing(8),
    }
}));

ValidatorForm.addValidationRule('isDate', (value) => value <= moment().format('YYYY-MM-DD'));

const CreateMarker = () => {

    const classes = useStyles();
    const [showMarker, setShowMarker] = useState(null);
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const dispatch = useDispatch();
    const mapRef = useRef();
    const userId = getUserId();

    const handlerSubmit = () => {
        const data = {lat, lng, description, date, userId};
        const centerMap = mapRef.current.leafletElement.getCenter();
        dispatch(mapCreateMarker(data, centerMap));
    };

    const addMarker = (e) => {
        setShowMarker(e.latlng);
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
    };

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Grid item xs={6}>
                <div className={classes.paper}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PlaylistAddIcon/>}
                        onClick={generateRandomMarker}
                        className={classes.generateButton}
                    >
                        Generate random marker
                    </Button>
                    <div className={classes.paperForm}>
                        <Typography
                            component="h1"
                            variant="h3"
                            align='center'
                        >
                            Create new marker
                        </Typography>
                        <ValidatorForm
                            className={classes.form}
                            onSubmit={handlerSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                label='lat'
                                name='lat'
                                InputLabelProps={{shrink: true}}
                                value={lat}
                                onChange={({target: {value}}) => setLat(value)}
                                validators={['required', 'minNumber:-90', 'maxNumber:90']}
                                errorMessages={['this field is required', 'minimum -90 ', 'maximum 90 ']}
                            />

                            <TextValidator
                                label='lng'
                                name='lng'
                                InputLabelProps={{shrink: true}}
                                value={lng}
                                onChange={({target: {value}}) => setLng(value)}
                                validators={['required', 'minNumber:-180', 'maxNumber:180']}
                                errorMessages={['this field is required', 'minimum -180 ', 'maximum 180 ']}
                            />

                            <TextValidator
                                label='description'
                                name='description'
                                value={description}
                                onChange={({target: {value}}) => setDescription(value)}
                                validators={['required', 'minStringLength:20', 'maxStringLength:100', 'trim']}
                                errorMessages={['this field is required', 'minimum 20 characters', 'maximum 100 characters', 'the field cannot contain spaces']}
                            />
                            <TextValidator
                                label='date'
                                name='date'
                                type='date'
                                key='date'
                                value={date}
                                InputLabelProps={{shrink: true}}
                                onChange={({target: {value}}) => setDate(value)}
                                validators={['isDate']}
                                errorMessages={['date cant be more of now']}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                            </Button>
                        </ValidatorForm>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6}>
                <Map
                    tap={true}
                    center={[50.0042617, 36.2034271]}
                    zoom={10}
                    onClick={addMarker}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {showMarker && <Marker position={showMarker}/>}
                </Map>
            </Grid>
        </Grid>
    )
};

export default CreateMarker;