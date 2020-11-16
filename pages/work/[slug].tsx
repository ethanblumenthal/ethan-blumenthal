import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout';
import { getAllProjectsBySlug, getProjectBySlug } from '../../api/contentful';
import { PageHeader } from '../../elements/text';
import { BlogContainer } from '../../elements/containers';
import { ArrowButton } from '../../elements/buttons';

const Header = styled.header`
  text-align: center;
`;

export default function Project({ project }) {
  const { title, content } = project;
  const router = useRouter();

  if (!router.isFallback && !project) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Header>
        <PageHeader>{title}</PageHeader>

        <Link href="/work">
          <ArrowButton>
            <FontAwesomeIcon icon={faArrowLeft} />
            See all projects
          </ArrowButton>
        </Link>
      </Header>

      <BlogContainer>{documentToReactComponents(content.json)}</BlogContainer>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProjectBySlug(params.slug, preview);

  return {
    props: {
      project: data?.project ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsBySlug();
  return {
    paths: allProjects?.map(({ slug }) => `/work/${slug}`) ?? [],
    fallback: true,
  };
}
