import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyBeBWXaMG_MiRUkbCASIsr9xp_xatJchdM",
//     authDomain: "tesa-radio.firebaseapp.com",
//     databaseURL: "https://tesa-radio-default-rtdb.firebaseio.com",
//     projectId: "tesa-radio",
//     storageBucket: "tesa-radio.appspot.com",
//     messagingSenderId: "558985101546",
//     appId: "1:558985101546:web:21b66917674f8228815793",
//     measurementId: "G-J2TDMF6D1Y"
// };

export const filesUploadCtrl = async (req, res, next) => {
    const firebaseConfig = {
        apiKey: "AIzaSyBGXw53-_Wta-1KlK4HDdrSN8ioo_k0JSc",
        authDomain: "jsvideos-9169b.firebaseapp.com",
        projectId: "jsvideos-9169b",
        storageBucket: "jsvideos-9169b.appspot.com",
        messagingSenderId: "18335372244",
        appId: "1:18335372244:web:0c99d2a0269d5ab5573c41",
        measurementId: "G-Z93WWE4GQH"
    };

    try {
        const app = initializeApp(firebaseConfig);
        const storage = getStorage();

        const fileExtension = req.files.filename.name.slice((req.files.filename.name.lastIndexOf(".")));
        const uploadPath = `videos/${req.body.username}/${req.body.videoTitle}_${Date.now()+fileExtension}`;

        const mountainsRef = ref(storage, uploadPath);

        const firebaseUploadResponds = await uploadBytes(mountainsRef, req.files.filename.data, {
            md5Hash: req.files.filename.md5,
            contentEncoding: req.files.filename.encoding,
            contentType: req.files.filename.mimetype,
            customMetadata: {
                name: req.files.filename.name,
                size: req.files.filename.size,
                encoding: req.files.filename.encoding,
                truncated: req.files.filename.truncated,
                mimetype: req.files.filename.mimetype,
                md5: req.files.filename.md5,
            }
        });

        const gcRefPath = firebaseUploadResponds.ref.toString();

        if (gcRefPath) {
            const fileUrlPath = await getDownloadURL(mountainsRef);
            
            if (fileUrlPath) {
                return res.status(200).json({
                    statusCode: 200,
                    fileUrlPath,
                    gcRefPath,
                    request: req.body
                });
            };
        };

        return res.status(502).json({
            statusCode: 502,
            msg: "Ooops an error occured"
        });
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
