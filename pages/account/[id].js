import Layout from '../../components/layout'
import Head from 'next/head'
import endpoints from '../api/endpoints'
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date'
import Link from 'next/link'

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${endpoints.dashboard}/${params.id}`)
    const dashboardData = await res.json();

    return {
        props: {
            dashboardData
        }
    }
}

const Dashboard = ({ dashboardData }) => {
    const pageTitle = 'Dashboard';
    const { companies, surveys, error } = dashboardData;
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
                    {error}
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