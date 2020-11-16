import Image from 'next/image';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts, getAllPostsForHome } from '../../api/contentful';
import { ScrollButton } from '../../elements/buttons';
import { PageHeader, Text, SubText } from '../../elements/text';
import { BlogContainer, FlexContainer, OffsetContainer } from '../../elements/containers';
import RecentPosts from '../../components/recent-posts';

const Content = styled.div`
  max-width: 35rem;
`;

export default function Post({ post, allPosts }) {
  const { date, title, excerpt, coverImage, content } = post;
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <OffsetContainer>
        <FlexContainer>
          <Content>
            <FlexContainer>
              <SubText>JavaScript - React - Theming</SubText>
              <SubText>{moment(date).format('MMMM D, YYYY')}</SubText>
              <SubText>9 Min Read</SubText>
            </FlexContainer>
            <PageHeader>{title}</PageHeader>
            <Text>{excerpt}</Text>
          </Content>

          <Image src={coverImage.url} alt={title} height={300} width={400} />
        </FlexContainer>
      </OffsetContainer>

      <BlogContainer>{documentToReactComponents(content.json)}</BlogContainer>
      <RecentPosts posts={allPosts} />
      <ScrollButton onClick={() => window.scrollTo(0, 0)}>
        <FontAwesomeIcon icon={faArrowUp} />
      </ScrollButton>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  const allPosts = (await getAllPostsForHome(preview)) ?? [];

  return {
    props: {
      post: data?.post ?? null,
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: true,
  };
}
