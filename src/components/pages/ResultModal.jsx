import { React, useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './ResultModal.css';


export default function ResultModal({ show, close, modalResult }) {

    const [headerMessage, setHeaderMessage] = useState("");
    const [bodyMessage, setBodyMessage] = useState("");

    useEffect(() => {
        if (modalResult >= 22 && modalResult <= 66) {
            setHeaderMessage("You lose");
            setBodyMessage("Try again next time.");
        } else if (modalResult >= 113 && modalResult <= 156) {
            setHeaderMessage("You lose");
            setBodyMessage("Try again next time.");
        } else if (modalResult >= 202 && modalResult <= 244) {
            setHeaderMessage("You lose");
            setBodyMessage("Try again next time.");
        } else if (modalResult >= 291 && modalResult <= 334) {
            setHeaderMessage("You lose");
            setBodyMessage("Try again next time.");
        } else if (modalResult >= (-24) && modalResult <= 20) {
            setHeaderMessage("Congratulations! You won 1000 pesos");
            setBodyMessage("Take a screenshot of your result and don't forget to share to your friends!");
        } else if (modalResult >= 158 && modalResult <= 200) {
            setHeaderMessage("Congratulations! You won 500 pesos");
            setBodyMessage("Take a screenshot of your result and don't forget to share to your friends!");
        } else if (modalResult >= 246 && modalResult <= 289) {
            setHeaderMessage("Congratulations! You won 200 pesos");
            setBodyMessage("Take a screenshot of your result and don't forget to share to your friends!");
        } else if (modalResult >= 68 && modalResult <= 111) {
            setHeaderMessage("Congratulations! You won 100 pesos");
            setBodyMessage("Take a screenshot of your result and don't forget to share to your friends!");
        } else if (modalResult === "Can only spin once!") {
            setHeaderMessage("Halt!");
            setBodyMessage("You can only spin once.");
        }
    }, [modalResult])



    return (
        <>
            <div className="modal-wrapper"
                style={{
                    transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
            >
                <div className="modal-header">
                    <span onClick={close}><CloseIcon /></span>
                </div>


                <div className="modal-content">
                    <div className="modal-body">
                        <h1>{headerMessage}</h1>
                        <h3>{bodyMessage}</h3>
                    </div>
                </div>

            </div>
        </>
    )
}
