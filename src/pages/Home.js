import React, {useEffect, useRef, useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {getFilterMarker, mapClearMarker} from '../store/actions/map';
import {getUserId} from "../services/LocalStorageService";
import {deleteMarker} from "../services/MapService";
import MarkerClusterGroup from "react-leaflet-markercluster";


const mapFilter = {
    location: [50.0042617, 36.2034271], date: [0, 2020],
};
let timer;

const Home = () => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [dateValue, setDateValue] = useState(mapFilter.date);
    const [clickStart, setClickStart] = useState(false);
    const apiData = useSelector(res => res.map, shallowEqual);
    const storageUserId = getUserId();

    useEffect(() => {
        handleChangeViewPort();
    }, []);


    const handleChangeDateSlider = (event, newValue) => {
        setDateValue(newValue);
    };

    const handleSubmit = () => {
        mapFilter.date = dateValue;
        handleChangeViewPort();
    };

    const handleChangeViewPort = () => {
        const bounds = mapRef.current.leafletElement.getBounds();
        const zoom = mapRef.current.leafletElement.getZoom();
        if (zoom > 3) {
            const data = {
                topRight: bounds.getNorthEast(),
                bottomLeft: bounds.getSouthWest(),
                date: mapFilter.date
            };
            dispatch(getFilterMarker(data));
        } else {
            dispatch(mapClearMarker());
        }
    };

    const handleDeleteMarker = async (id) => {
        await deleteMarker(id);
        await handleChangeViewPort();
    };

    const handlePlay = () => {
        if (!clickStart) {
            let i = dateValue[0];

            function f() {
                timer = setTimeout(() => {
                    setDateValue([i, dateValue[1]]);
                    i++;
                    if (i < mapFilter.date[1]) {
                        f();
                    }
                }, 10, 0)
            }
            setClickStart(true);
            f();
        }
    };

    const handleStop = () => {
        setClickStart(false);
        clearTimeout(timer);
    };

    return (
        <div className='home-page'>
            <Map
                center={apiData.mapLocation || mapFilter.location}
                zoom={10}
                tap={true}
                ref={mapRef}
                onViewportChanged={handleChangeViewPort}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    showCoverageOnHover={false}
                    maxClusterRadius={200}
                >
                    {apiData.markers.data && apiData.markers.data.map(marker => (
                        <Marker position={[marker.lat, marker.lng]} key={marker.id + marker.lat}>
                            <Popup>
                                <div className="marker-map">
                                    {marker.description}
                                    {storageUserId && +storageUserId === marker.userId ? (
                                        <Button
                                            className='button-delete-marker'
                                            onClick={() => handleDeleteMarker(marker.id)}
                                            color="secondary"
                                            size="small"
                                            variant="contained"
                                        >delete marker</Button>
                                    ) : null}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </Map>
            <div className="bottom-map">
                <div className="bottom-map-slider">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handlePlay}
                    >
                        play
                    </Button>
                    <Button
                        onClick={handleStop}
                        color="primary"
                        variant="contained"
                    >
                        stop
                    </Button>
                    <Typography id="range-slider" gutterBottom>
                        Date range
                    </Typography>
                    <Slider
                        value={dateValue}
                        onChange={handleChangeDateSlider}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        max={new Date().getFullYear()}
                    />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<SearchIcon/>}
                    onClick={handleSubmit}
                    className="bottom-map-button"
                >
                    Search
                </Button>
            </div>
        </div>
    )
};

export default Home;