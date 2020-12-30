import Head from 'next/head';

import Layout from '../../components/layout';
import Projects from '../../components/projects';
import { PageHeader } from '../../elements/text';
import { CenterContainer } from '../../elements/containers';
import { getAllProjects } from '../../api/contentful';

const Work = ({ allProjects }) => (
  <Layout>
    <Head>
      <title>Work</title>
    </Head>

    <CenterContainer>
      <PageHeader style={{ margin: '2rem' }}>Work</PageHeader>
    </CenterContainer>

    <Projects allProjects={allProjects} />
  </Layout>
);

export default Work;

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjects(preview)) ?? [];
  return {
    props: { allProjects },
  };
}
