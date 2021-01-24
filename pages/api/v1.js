const { https } = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp();
const firestore = app.firestore();
const ALLOWED_ORIGINS = [
    'http://localhost:8888',
    'http://localhost:3000'
];

let headers;

exports.getDashboard = https.onRequest(async (req, res) => {

    // get user id
    const userId = req.query.uid;
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
            "Content-Type": "application/json"
        }

    } else {
        headers = {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    }
    // set appropriate header
    res.set(headers);

    if (userId) {

        const userDoc = await firestore
            .doc(`users/${userId}`)
            .get();

        const userData = userDoc.data();

        if (userData) {
            const companies = await getCompanies(userData.companies);
            const surveys = await getSurveys(userData.surveys);

            res.send({
                companies,
                surveys
            });
        }

        return;
    }

    res.send('No user Id (uid) found.');
})

const getCompanies = async (companies) => {
    const fetchPromises = [];
    companies.forEach((companyId) => {
        const nextPromise = firestore
            .doc(`companies/${companyId}`)
            .get();

        fetchPromises.push(nextPromise);
    });

    const snapshots = await Promise.all(fetchPromises);
    const data = snapshots.map(snapshot => {
        const { dateEst, name } = snapshot.data();
        return {
            id: snapshot.id,
            name,
            dateEst: (dateEst) ? dateEst.toDate() : dateEst
        }
    });

    return data;
}

const getSurveys = async (surveys) => {
    const fetchPromises = [];
    surveys.forEach((surveyId) => {
        const nextPromise = firestore
            .doc(`surveys/${surveyId}`)
            .get();

        fetchPromises.push(nextPromise);
    });

    const snapshots = await Promise.all(fetchPromises);
    const data = snapshots.map(snapshot => {
        const { dateTaken, title, ...survey } = snapshot.data();
        return {
            id: snapshot.id,
            title,
            survey,
            dateTaken: (dateTaken) ? dateTaken.toDate() : dateTaken,
        }
    });

    return data;
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