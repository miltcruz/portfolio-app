import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useState } from 'react'
import { fbAuth, fbDb, usersCol } from '../../lib/firebase'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const pageTitle = 'Dashboard';
    //const router = useRouter();
    const [notification, setNotification] = useState('');

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
            </section>
        </Layout>
    )
}

export default Dashboard