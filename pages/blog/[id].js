import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { db } from '../../config/firebase'
import { blog } from '../../config/CONSTANTS';

const Blog = (props) => {
    return (
        <Layout>
            <Head>
                <title>{props.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>
                    {props.title}
                </h1>
                <p>
                    {props.content}
                </p>
            </article>
        </Layout>
    )
}

export const getServerSideProps = async ({ query }) => {
    const content = {}
    await db.collection(blog)
        .doc(query.id)
        .get()
        .then(result => {
            content['title'] = result.data().title;
            content['content'] = result.data().content;
        }); 
        
        return {
            props: {
                title: content.title,
                content: content.content,
            }
        }
}

export default Blog