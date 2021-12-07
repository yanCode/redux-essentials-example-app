import {FC} from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import {PostParam, useAppSelector} from 'src/app/store'
import {useSelector} from "react-redux";
import {getPostById} from "./postSlice";

const SinglePostPage: FC<RouteComponentProps<PostParam>> =
    ({
         match: {
             params: {postId},
         },
     }) => {
        const post = useAppSelector(state=>getPostById(state, postId))

        if (!post) {
            return (
                <section>
                    <h2>Post not found!</h2>
                </section>
            )
        }

        return (
            <section>
                <article className="post">
                    <h2>{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    <Link to={`/editPost/${post.id}`} className="button">
                        Edit Post
                    </Link>
                </article>
            </section>
        )
    }
export default SinglePostPage