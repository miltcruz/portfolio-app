const { https } = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp()
const firestore = app.firestore()

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
});

exports.helloWorld = https.onRequest((request, response) => {
    response.send("Hello New Year!");
})*/


exports.getCompanies = https.onRequest(async (req, res) => {
    const userId = req.query.uid;
    if (userId) {

        res.set('Access-Control-Allow-Origin', 'http://localhost:3000/') //change URL

        res.set('Access-Control-Allow-Origin', '*');

        if (req.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.set('Access-Control-Max-Age', '3600');
            res.status(204).send('');
        } else {
            const snapshot = await firestore
                .collection('companies')
                .limit(1)
                .get()


            snapshot.forEach(docSnap => {
                res.send(docSnap.data())
            })
        }

        return;
    }
    res.send('No user Id (uid) found.')
})