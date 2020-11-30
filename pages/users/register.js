import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useState } from 'react'
import { fbAuth } from '../../config/firebase'
import { useRouter } from 'next/router'

const Register = () => {
    const pageTitle = 'Create account'
    const router = useRouter(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passConf, setPassConf] = useState('');
    const [notification, setNotification] = useState('');
    const handleRegistration = (e) => {
        e.preventDefault();
        if (password !== passConf) {
            setNotification(
                'Password and password confirmation does not match'
            )
            setTimeout(() => {
                setNotification('')
            }, 2000)
            setPassword('');
            setPassConf('');
            return null;
        }

        fbAuth.createUserWithEmailAndPassword(username, password)
            .catch((err) => {
                console.log(err.code, err.message)
            });

        router.push("/")
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
                <form onSubmit={handleRegistration}>
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
                    <div>
                        Confirm Password <br />
                        <input type="password" value={passConf}
                            onChange={({ target }) => setPassConf(target.value)} />
                    </div>
                    <br />
                    <button type="submit">Register</button>
                </form>
            </section>
        </Layout>
    )
}

export default Register