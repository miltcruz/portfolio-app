import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { fbDb } from '../../lib/firebase'
import { blogCol } from '../../lib/CONSTANTS';

export const getServerSideProps = async ({ query }) => {
    const content = {}
    await fbDb.collection(blogCol)
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

export default Blog