import Layout from '../../components/layout'
import Head from 'next/head'
import * as axios from 'axios'
import utilStyles from '../../styles/utils.module.css'
import { useEffect, useState } from 'react'
import { fbAuth } from '../../lib/firebase'
import { useRouter } from 'next/router'
import Date from '../../components/date'
import Link from 'next/link'

const Dashboard = () => {
    const pageTitle = 'Dashboard';
    const [notification, setNotification] = useState('');
    const [companies, setCompanies] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const router = useRouter();
    const url = 'http://localhost:5000/portfolio-app-2868c/us-central1/getDashboard'
    const user = fbAuth.currentUser;
    useEffect(async () => {
        if (user) {

            await axios({
                url,
                method: 'get',
                heading: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                params: {
                    uid: user.uid
                }
            })
                .then((data) => {
                    console.log(data.data);
                    const { companies, surveys } = data.data
                    setCompanies(companies)
                    setSurveys(surveys)
                })
                .catch((err) => {
                    setNotification(err.toString())
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
                <h2 className={utilStyles.headingLg}>Company</h2>
                <ul className={utilStyles.list}>
                    {companies.map(company =>
                        <li className={utilStyles.listItem} key={company.id}>
                            {company.name}
                            <br />
                            <small className={utilStyles.lightText}>
                                Established Date: <Date dateString={company.dateEst} />
                            </small>
                        </li>
                    )}
                </ul>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Surveys</h2>
                <ul className={utilStyles.list}>
                    {surveys.map(survey =>
                        <li className={utilStyles.listItem} key={survey.id}>
                            <Link href={`/survey/${survey.id}`}>
                                <a>{survey.title}</a>
                            </Link>
                        </li>
                    )}
                </ul>
            </section>
        </Layout>
    )
}

export default Dashboard