import Link from "next/link"

export default function PostCard ({ post }){
    return (
        <Link href={post.uri} className={"card"} key={post.id}>
            <a className="card" id={post.id}>
                <h3>{post.title} &rarr;</h3>
            </a>
        </Link>
    )
}