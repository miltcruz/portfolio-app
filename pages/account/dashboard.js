import Layout from '../../components/layout'
import Head from 'next/head'
import * as axios from 'axios'
import utilStyles from '../../styles/utils.module.css'
import { useEffect, useState } from 'react'
import { fbAuth } from '../../lib/firebase'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const pageTitle = 'Dashboard';
    const [notification, setNotification] = useState('');
    const [companies, setcompanies] = useState([]);
    const router = useRouter();
    const url = 'http://localhost:5000/portfolio-app-2868c/us-central1/getCompanies'
    const user = fbAuth.currentUser;
    useEffect(() => {
        if (user) {
            axios({
                url,
                method: 'get',
                params: {
                    uid: user.ui
                }
            })
                .then((data) => {
                    console.log('data', data)
                }).catch((err) => {
                    console.log('err', err)
                })
        }
        else {
            router.push("/account/login");
        }

    }, []);

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
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {companies.map(company =>
                        <li className={utilStyles.listItem} key={company.id}>
                            {company.name}
                        </li>
                    )}
                </ul>
            </section>
        </Layout>
    )
}

export default Dashboard