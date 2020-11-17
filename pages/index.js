import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

const Home = () => {

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
    </Layout>
  )
}

export default Home;
