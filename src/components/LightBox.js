import React from 'react';
import { makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0, 0.6)'
    },
    lightbox: {
        width: '90%',
        height: '75%',
        background: '#ddd',
        position: 'relative',
        padding: 20,

        '& img': {
            width: '100%',
            height: '100%'
        }
    },
    close: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        right: '-1rem',
        top: '-1rem',
        cursor: 'pointer'
    },
    prev: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '-1.5rem',
        cursor: 'pointer'
    },
    next: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        right: '-1.5rem',
        cursor: 'pointer'
    }
}))

export default function LightBox({ url, alt, close, prev, next }) {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <div className={classes.lightbox}>
                <div className={classes.close} onClick={close}>
                    <CancelIcon style={{ width: '100%', height: '100%' }} color="secondary" />
                </div>
                <img src={url} alt={alt} />
                <div className={classes.prev} onClick={prev}>
                    <ArrowBackIcon fontSize="large" />
                </div>
                <div className={classes.next} onClick={next}>
                    <ArrowForwardIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}
