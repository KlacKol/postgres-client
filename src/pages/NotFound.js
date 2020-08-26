import React from 'react';
import Grid from "@material-ui/core/Grid";

const NotFound = () =>
        <Grid
            container
            direction='column'
            justify="center"
            alignItems="center"
        >
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
        </Grid>;

export default NotFound;