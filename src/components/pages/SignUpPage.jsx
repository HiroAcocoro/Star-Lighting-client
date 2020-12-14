import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Hiroshi Acocoro
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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
    logo: {
        width: '30%'
    }
}));

function SignUpPage(props) {
    const [studentFirstName, setStudentFirstName] = useState("");
    const [studentLastName, setStudentLastName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");

    const { history } = props;

    const checkStudent = (student) => {
        Axios.get(`https://starlighting-server.herokuapp.com/api/checkstudent/${student}`).then((response) => {
            if (response.data === "new") {
                //submit student data
                submitStudentData()
            } else {
                //check student data
                if (studentFirstName === response.data[0].studentFirstName && studentLastName === response.data[0].studentLastName && studentNumber === response.data[0].studentNumber) {
                    //login
                    history.push(`/spin/${studentNumber}`)
                } else {
                    alert("Already signed in, please enter your correct information");
                }
            }
        });
    };

    const submitStudentData = () => {
        Axios.post('https://starlighting-server.herokuapp.com/api/insert', {
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            studentNumber: studentNumber
        }).then((response) => {
            if (response.status === 200) {
                //login
                history.push(`/spin/${studentNumber}`);
            } else {
                console.log(response);
            }
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src="images/cobras.png" className={classes.logo} alt="Cobras" />
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => { setStudentFirstName(e.target.value) }}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="studentFirstName"
                                color="secondary"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => { setStudentLastName(e.target.value) }}
                                variant="outlined"
                                fullWidth
                                id="studentLastName"
                                color="secondary"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => { setStudentNumber(e.target.value) }}
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                name="studentNumber"
                                label="Student Number"
                                id="studentNumber"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={() => { checkStudent(studentNumber) }}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Continue
                        </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(SignUpPage);