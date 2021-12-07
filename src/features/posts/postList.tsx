import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'src/app/store'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {selectAllPosts} from "./postSlice";

const PostList: FC = () => {
    const posts = useSelector(selectAllPosts)
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const renderedPosts = orderedPosts.map(({id, title, content, user, date, reactions}) => (
        <article className="post-excerpt" key={id}>
            <h3>{title}</h3>
            <div>
                <PostAuthor userId={user}/>
                <TimeAgo timestamp={date}/>
            </div>
            <p className="post-content">{content.substring(0, 100)}</p>
            <ReactionButtons id={id} reactions={reactions}/>
            <Link to={`posts/${id}`}>View Details</Link>
        </article>
    ))
    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostList
