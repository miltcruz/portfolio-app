import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useState } from 'react'
import { fbAuth, fbDb, usersCol } from '../../lib/firebase'
import { useRouter } from 'next/router'

const Login = () => {
    const pageTitle = 'Login';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();
    const handleLogin = (e) => {
        e.preventDefault();

        fbAuth.signInWithEmailAndPassword(username, password)
            .then((userCred) => {

                if (userCred.user.emailVerified === false) {
                    setNotification('Please verify your email address.');
                    setPassword('');

                    return null;
                }

                //set default user data
                fbDb.doc(`/${usersCol}/${userCred.user.uid}`)
                    .update({ lastLogin: new Date() });
                setUsername('');
                setPassword('');
                router.push("/account/dashboard");
            })
            .catch((err) => {
                console.log(err.code, err.message);
                setNotification(err.message);
            })
    }

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h1 className={utilStyles.headingXl}>
                    {pageTitle}
                </h1>
                <p>
                    {notification}
                </p>
                <form onSubmit={handleLogin}>
                    <div>
                        Email <br />
                        <input type="text" value={username}
                            onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        Password <br />
                        <input type="password" value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </section>
        </Layout>
    )
}

export default Login