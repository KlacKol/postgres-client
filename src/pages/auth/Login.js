import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {PATH_AUTH_REGISTRATION} from "../../routeList";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {useDispatch} from "react-redux";
import {logUser} from "../../store/actions/auth";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();
    const [emailOrName, emailOrNameChangeHandler] = useState('');
    const [password, passwordChangeHandler] = useState('');
    const dispatch = useDispatch();


    const handlerSubmit = (e) => {
        e.preventDefault();
        const check = isEmailOrName(emailOrName);
        const result = {[check]: emailOrName, password};
        dispatch(logUser(result));
    };

    const isEmailOrName = (val) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return val.match(mailFormat) ? 'email' : 'name';
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Insza
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handlerSubmit}
                >
                    <TextValidator
                        label='Email address or name'
                        name='emailOrName'
                        variant="outlined"
                        margin="normal"
                        autoComplete="email"
                        autoFocus
                        value={emailOrName}
                        fullWidth
                        className={'large-margin'}
                        onChange={({target: {value}}) => emailOrNameChangeHandler(value)}
                        validators={['required', 'minStringLength: 3', 'maxStringLength: 20', 'trim']}
                        errorMessages={['this field is required', 'minimum 3 character', 'maximum 20 character', 'the field cannot contain spaces']}
                    />
                    <TextValidator
                        label='Password'
                        name='password'
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        fullWidth
                        onChange={({target: {value}}) => passwordChangeHandler(value)}
                        validators={['required', 'minStringLength: 3', 'maxStringLength: 20', 'trim']}
                        errorMessages={['this field is required', 'minimum 3 character', 'maximum 20 character', 'the field cannot contain spaces']}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid>
                            <NavLink to={PATH_AUTH_REGISTRATION}>
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
};

export default SignIn;