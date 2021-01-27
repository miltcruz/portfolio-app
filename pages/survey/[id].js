import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import endpoints from '../api/endpoints'

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${endpoints.survey}/${params.id}`)
    const surveyData = await res.json()

    return {
        props: { surveyData }
    }
}

const Survey = ({ surveyData }) => {
    const { title, dateTaken, response } = surveyData;
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={dateTaken} />
                </div>
                <ul className={utilStyles.list}>
                    {response.map(({ id, question, answer }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <small className={utilStyles.lightText}>
                                {question}
                            </small>
                            {answer}
                        </li>
                    ))}
                </ul>
            </article>
        </Layout>
    )
}

export default Survey