import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from 'react-router-dom';
import {PATH_AUTH_LOGIN} from "../../routeList";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {useDispatch} from "react-redux";
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
    const dispatch = useDispatch();


    const handlerSubmit = (e) => {
        e.preventDefault();
        const result = {name, email, password};
        dispatch(regUser(result));
    };

    return (
        <Container component="main" maxWidth="xs">
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