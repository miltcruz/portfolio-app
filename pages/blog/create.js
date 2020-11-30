import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import React, { useState } from 'react'
import { fbDb } from '../../config/firebase'
import { blogCol } from '../../config/CONSTANTS'


const Create = () => {
    const pageTitle = 'Add Blog'
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        fbDb.collection(blogCol)
            .add({
                title: title,
                content: content,
            });
        setTitle('');
        setContent('');
        setNotification('Blogpost created'); setTimeout(() => {
            setNotification('')
        }, 2000)
    }

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h1 className={utilStyles.headingLg}>
                    {pageTitle}
                </h1>
                <p>
                    {notification}
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        Title <br />
                        <input type="text" value={title}
                            onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        Content <br />
                        <textarea value={content}
                            onChange={({ target }) => setContent(target.value)} />
                    </div>
                    <br />
                    <button type="submit">Save</button>
                </form>
            </section>
        </Layout>
    )
}

export default Create;