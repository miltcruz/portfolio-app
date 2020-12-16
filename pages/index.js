import { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { blogCol, fbDb } from '../lib/firebase'
import Link from 'next/link'


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    fbDb.collection(blogCol)
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I am a Front-End Developer with robust problemsolving skills and proven experience in creating and
          designing web applications. I am self-motivated with
          over 10 years of IT experience, and 7 years of
          development experience in a fast-paced, high-tech
          environments with cross functional teams using
          agile methodology.
      </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {blogs.map(blog =>
            <li className={utilStyles.listItem} key={blog.id}>
              <Link href={`/${blogCol}/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </Layout>
  )
}

export default Home;
