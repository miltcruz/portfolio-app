import React, { useState } from 'react'
import { db } from '../../config/firebase'
import { blog } from '../../config/CONSTANTS'


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        db.collection(blog)
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
                <title>{props.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingLg}>
                    Add Blog
                </h1>
                <p>
                    {notification}
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        Title<br />
                        <input type="text" value={title}
                            onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        Content<br />
                        <textarea value={content}
                            onChange={({ target }) => setContent(target.value)} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </article>
        </Layout>
    )
}

export default CreatePost;