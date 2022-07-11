import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import PostWidget from '../components/PostWidget';
import { getAllPosts } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

export default function Home({ posts,widget }) {
  console.log(widget);
  return (
    <div className="container">
      <Head>
        <title>[PROJETO CMS] - Headless WP GADZ</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="title">
          Projeto CMS WP - Piloto GADZ
        </h1>

        <p className="description">START DO PROJETO
        </p>

        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.id} post={post}></PostCard>
              )
            })
          }
        </div>
        <div className='grid'>
          {
            widget.map( (wid) => {
              return (
                <PostWidget key={wid.id} widget={wid}></PostWidget>
              )
            })
          }
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps(){

  // Paste your GraphQL query inside of a gql tagged template literal
  const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          title
          date
          uri
          id
        }
      }
    }
  `;
    const OTHER_QUERY = gql`
    query WideGetHome {
      widgets(where: {sidebar: HOMEPAGE_WIDGET_AREA}) {
        nodes {
          id
          title
          type
          html
        }
      }
    }
    `;

  // Here we make a call with the client and pass in our query string to the 
  // configuration objects 'query' property
  const response = await client.query({
    query: GET_POSTS,
    context:{
      headers: { Accept: 'application/json' }
    }
  })

  const responseWdiget = await client.query({
    query: OTHER_QUERY,
    context:{
      headers: { Accept: 'application/json' }
    }
  })

  const posts = response?.data?.posts?.nodes; 
  console.log(responseWdiget);
  const widget = responseWdiget.data.widgets.nodes;
  console.log(responseWdiget.data.widgets.nodes);
  return {
    props: {
      posts,
      widget
    }
  }
  // return {
  //   props: {
  //     posts
  //   }
  // }
}