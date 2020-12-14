import { React, useState } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ResultModal from './ResultModal';
import './SpinPage.css';

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(#880000, #4f0303)',
    },
    mainContainer: {
        width: '90%'
    },
    spinBtn: {
        disabled: 'true'
    }
}));


const SpinPage = ({ match }) => {

    const classes = useStyles();

    const [btnState, setBtnState] = useState(true);
    const [show, setShow] = useState(false);
    const [modalResult, setModalResult] = useState("");
    const studentNumber = match.params.sNum;



    const spin = () => {
        setBtnState(false);
        const wheel = document.querySelector('.WheelImg');
        Axios.get(`https://starlighting-server.herokuapp.com/api/spin/${studentNumber}`).then((response) => {
            if (response.data === "can't spin again") {
                openModal("Can only spin once!");
            } else {
                var actualDeg = response.data;
                var initialDeg = 360 * 19 + actualDeg;

                wheel.style.transition = 'all 10s ease-out';
                wheel.style.transform = `rotate(${initialDeg}deg)`;
                wheel.classList.add('blur');


                wheel.addEventListener('transitionend', function () {
                    wheel.classList.remove('blur');
                    wheel.style.transition = 'none';
                    this.style.transform = `rotate(${actualDeg}deg)`;
                    openModal(actualDeg);
                    setBtnState(true);
                });
            }
        });
    };

    const closeModalHandler = () => setShow(false);


    const openModal = (result) => {
        setModalResult(result);
        setShow(true);
    };

    return (
        <>
            <div>
                {show ? <div onClick={closeModalHandler} className="back-drop"></div> : null}
                <ResultModal show={show} close={closeModalHandler} modalResult={modalResult} />
            </div>
            <div className={classes.root}>
                <div className={classes.mainContainer}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <div className="WheelContainer">
                                <img src="/images/marker.png" alt="Wheel Marker" className="WheelMarker" />
                                <img src="/images/wheelFinal2.png" alt="Wheel" className="WheelImg" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="btnContainer">
                                <Button size="large" variant="contained" color="secondary" onClick={spin} className={btnState ? '' : 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary Mui-disabled Mui-disabled'}>
                                    Spin!
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}



export default SpinPage;