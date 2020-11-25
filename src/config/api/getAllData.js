import { firebaseDatabase } from '../firebase';

const getAllData = () => {
    return new Promise((resolve, reject) => {
        firebaseDatabase
            .ref('galery')
            .once('value')
            .then(snapshot => {
                const data = [];
                if (snapshot.val()) {
                    Object.keys(snapshot.val()).map(key => {
                        return data.push({
                            key: key,
                            url: snapshot.val()[key]
                        });
                    });
                }
                return resolve(data);
            })
            .catch(err => reject(err));
    });
}

export default getAllData;