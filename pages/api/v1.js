const { https } = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require('../../permissions.json');
const { response } = require('express');

// init app
const app = express();
app.use(cors({ origin: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// init firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://portfolio-app-2868c.firebaseio.com"
})

// init database
const db = admin.firestore()

// GET surveys
app.get('/v1/surveys', (req, res) => {
    (async () => {
        try {
            let response = []
            await db.collection('surveys')
                .get()
                .then(snapshot => {
                    const docs = snapshot.docs;
                    docs.forEach((doc) => {
                        const { dateTaken, title, ...survey } = doc.data();
                        const item = {
                            id: doc.id,
                            title,
                            survey,
                            dateTaken: (dateTaken) ? dateTaken.toDate() : dateTaken
                        }
                        response.push(item)
                    })
                })
            return res.status(200).send(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })()
})

// GET survey by id
app.get('/v1/survey/:id', (req, res) => {
    (async () => {
        try {
            const item = await db.collection('surveys')
                .doc(req.params.id)
                .get()
            const { dateTaken, title, response } = item.data()
            return res.status(200).send({
                id: item.id,
                title,
                response,
                dateTaken: (dateTaken) ? dateTaken.toDate() : dateTaken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    })()
})

// GET dashboard by user id
app.get('/v1/dashboard/:uid', (req, res) => {
    (async () => {
        try {
            // get user id
            const uid = req.params.uid;
            if (uid) {
                const item = await db.collection('users')
                    .doc(uid)
                    .get()
                const data = item.data()
                if (data) {
                    const companies = await getCompanies(data.companies);
                    const surveys = await getSurveys(data.surveys);

                    return res.status(200).send({
                        companies,
                        surveys
                    });
                }
            }
            return res.status(400).json({ error: 'Provide valid user id (UID).' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error })
        }
    })()
})

exports.api = https.onRequest(app)


// HELPER functions
const getSnapshots = async (col, arr) => {
    const fetchPromises = []
    arr.forEach((id) => {
        const nextPromise = db.collection(col)
            .doc(id)
            .get()

        fetchPromises.push(nextPromise)
    })
    return await Promise.all(fetchPromises)
}

const getCompanies = async (companyIds) => {
    const snapshots = await getSnapshots('companies', companyIds)
    const data = snapshots.map(snapshot => {
        const { dateEst, name } = snapshot.data()
        return {
            id: snapshot.id,
            name,
            dateEst: (dateEst) ? dateEst.toDate() : dateEst
        }
    })
    return data
}

const getSurveys = async (surveyIds) => {
    const snapshots = await getSnapshots('surveys', surveyIds)
    const data = snapshots.map(snapshot => {
        const { dateTaken, title, ...survey } = snapshot.data()
        return {
            id: snapshot.id,
            title,
            survey,
            dateTaken: (dateTaken) ? dateTaken.toDate() : dateTaken,
        }
    })
    return data
}


/*const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
    dev: isDev,
    //location of .next generated after running -> yarn build
    conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
    return server
        .prepare()
        .then(() =>
            nextjsHandle(req, res)
        );
});)*/