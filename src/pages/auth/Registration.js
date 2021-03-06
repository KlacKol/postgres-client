import React, {useState} from 'react';
import {Avatar, Button, Grid, Typography, Container, FormControlLabel, Checkbox} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {makeStyles} from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone'
import {NavLink} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {PATH_AUTH_LOGIN} from "../../routeList";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {regUser} from "../../store/actions/auth";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();

    const [name, nameChangeHandler] = useState('');
    const [email, emailChangeHandler] = useState('');
    const [password, passwordChangeHandler] = useState('');
    const [image, imageChangeHandler] = useState(null);
    const [isAdmin, isAdminChangeHandler] = useState(false);
    const dispatch = useDispatch();

    const handlerSubmit = (e) => {
        e.preventDefault();
        const result = new FormData();
        result.append('avatar', image);
        result.append('name', name);
        result.append('email', email);
        result.append('password', password);
        result.append('isAdmin', isAdmin);
        dispatch(regUser(result));
    };

    return (
        <Container className='page-registration' component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handlerSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                label='Email address'
                                name='email'
                                variant="outlined"
                                value={email}
                                fullWidth
                                autoComplete="email"
                                autoFocus
                                onChange={({target: {value}}) => emailChangeHandler(value)}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'Email is not valid']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                label='Password'
                                name='password'
                                type='password'
                                variant="outlined"
                                autoComplete="current-password"
                                value={password}
                                fullWidth
                                onChange={({target: {value}}) => passwordChangeHandler(value)}
                                validators={['required', 'minStringLength: 3', 'maxStringLength: 20', 'trim']}
                                errorMessages={['this field is required', 'minimum 3 character', 'maximum 20 character', 'the field cannot contain spaces']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                label='Name'
                                name='name'
                                variant="outlined"
                                value={name}
                                fullWidth
                                onChange={({target: {value}}) => nameChangeHandler(value)}
                                validators={['required', 'minStringLength: 3', 'maxStringLength: 20', 'trim']}
                                errorMessages={['this field is required', 'minimum 3 character', 'maximum 20 character', 'the field cannot contain spaces']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h1>Avatar</h1>
                            <DropzoneArea
                                name="avatar"
                                filesLimit={1}
                                acceptedFiles={['image/jpeg', 'image/png']}
                                onChange={file => imageChangeHandler(file[0])}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox onChange={e => isAdminChangeHandler(e.target.checked)} icon={<ThumbDownIcon />} checkedIcon={<ThumbUpIcon />} name="checkedIsAdmin" />}
                                label="isAdmin"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to={PATH_AUTH_LOGIN}>
                                Already have an account? Sign in
                            </NavLink>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
};

export default SignUp;