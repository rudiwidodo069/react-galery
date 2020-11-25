import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import LightBox from './LightBox';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '90% !important',
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    delete: {
        margin: '5px 5px 5px 0',
        fontWeight: 'bold',
        [theme.breakpoints.between('xs', 'sm')]: {
            marginTop: 0,
            marginBottom: 20,
            width: '90%'
        }
    }
}));

export default function CardImages({ images, deleteData }) {
    const classes = useStyles();

    const [lightBox, setLightBox] = React.useState(false);
    const [image, setImage] = React.useState({ url: '', alt: '', index: 0 });

    const handleLightboxOpen = (alt, url, index) => {
        setLightBox(true);
        setImage({ url: url, alt: alt, index: index });
    }

    const handleLightBoxClose = () => {
        setLightBox(false);
        setImage({ url: '', alt: '', index: 0 });
    }

    const handlePrevImage = () => {
        if (image.index > 0) {
            const { key, url } = images[image.index - 1];
            setImage({ url: url.image, key: key, index: image.index - 1 });
        } else {
            const { key, url } = images[images.length - 1];
            setImage({ url: url.image, key: key, index: images.length - 1 });
        }
    }

    const handleNextImage = () => {
        if (image.index < images.length - 1) {
            const { key, url } = images[image.index + 1];
            setImage({ url: url.image, key: key, index: image.index + 1 });
        } else {
            const { key, url } = images[0];
            setImage({ url: url.image, key: key, index: 0 });
        }
    }

    return (
        <div className={classes.root}>
            {images.map((image, index) => (
                <Fragment key={image.key}>
                    <ButtonBase
                        className={classes.image}
                        focusRipple
                        focusVisibleClassName={classes.focusVisible}
                        onClick={() => handleLightboxOpen(image.key, image.url.image, index)}
                        style={{
                            width: '23%',
                            height: 350,
                            margin: '5px 0 0 0',
                        }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url.image})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                margin: 25
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.key}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => deleteData(image.key)}
                        className={classes.delete}>hapus</Button>
                </Fragment>
            ))}
            {lightBox && <MemoLightBox
                url={image.url}
                alt={image.alt}
                prev={handlePrevImage}
                next={handleNextImage}
                close={handleLightBoxClose} />}
        </div>
    );
}

const MemoLightBox = React.memo(LightBox);