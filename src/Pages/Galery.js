import React from 'react';
import { Typography, makeStyles, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import UploadComponent from '../components/UploadComponent';
import CardImages from '../components/CardImages';
import LinearWithValueLabel from '../components/Progres';
import getAllData from '../config/api/getAllData';
import deleteData from '../config/api/deleteData';

const useStyles = makeStyles(theme => ({
    rootLight: {
        width: '100%',
        background: '#ffffff',
        color: '#ffffff',
        transition: 'all 1.2s ease-in',

        '& h3': {
            textTransform: 'uppercase',
            margin: 0,
            [theme.breakpoints.between('xs', 'sm', 'md')]: {
                fontSize: 24
            }
        }
    },
    rootDark: {
        width: '100%',
        background: '#212121',
        transition: 'all 1.2s ease-in',
        color: '#ffffff',

        '& h3': {
            textTransform: 'uppercase',
            margin: 0,
            [theme.breakpoints.between('xs', 'sm', 'md')]: {
                fontSize: 24
            }
        }
    },
    title: {
        width: '100%',
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#3949ab'
    },
    upload: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '2rem'
    }
}));


export default function Galery() {

    const classes = useStyles();

    const [dark, setDark] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [file, setFile] = React.useState('');
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        try {
            const getAllImages = async () => {
                const response = await getAllData();
                setImages(response);
            }
            getAllImages();
        } catch (error) {
            console.error(error);
        }
    }, [file]);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
        setDark((prev) => !prev);
    };

    const handleDelete = async key => {
        try {
            const response = await deleteData(key);
            setImages(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={dark ? classes.rootDark : classes.rootLight}>
            <div className={classes.title}>
                <Typography variant="h3" gutterBottom>
                    Galery React - firebase
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={toggleChecked} />}
                    />
                </FormGroup>
            </div>
            <div className={classes.upload}>
                <MemoUploadImage change={e => setFile(e.target.files[0])} />
                {file && <LinearWithValueLabel file={file} setFile={setFile} />}
            </div>
            <div>
                <MemoCardImages theme={dark} images={images} deleteData={handleDelete} />
            </div>
        </div>
    )
}

const MemoCardImages = React.memo(CardImages);
const MemoUploadImage = React.memo(UploadComponent);