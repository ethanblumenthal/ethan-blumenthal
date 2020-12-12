import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../../components/layout';
import Posts from '../../components/posts';
import { ThinButton } from '../../elements/buttons';
import { PageHeader } from '../../elements/text';
import { getAllPosts } from '../../api/contentful';

const Header = styled.header`
  text-align: center;
`;

const Blog = ({ allPosts }) => {
  const uniqueTags = new Set();
  allPosts.forEach(({ tags }) => {
    tags.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });

  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <PageHeader>Posts</PageHeader>
        {[...uniqueTags].map((tag) => (
          <Link href={`/tags/${tag}`}>
            <ThinButton>{tag}</ThinButton>
          </Link>
        ))}
      </Header>

      <Posts allPosts={allPosts} />
    </Layout>
  );
};

export default Blog;

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPosts(preview)) ?? [];
  return {
    props: { allPosts },
  };
}
