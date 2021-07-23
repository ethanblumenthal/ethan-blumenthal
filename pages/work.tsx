import Image from 'next/image';

import Layout from '../components/layout';
import { IconButton } from '../elements/buttons';
import {
  BackgroundContainer,
  ContentContainer,
  FlexEvenlyContainer,
  FlexStartContainer,
  MainContent,
} from '../elements/containers';
import { Code } from 'react-feather';

import { SectionHeader, SubText, Text } from '../elements/text';
import { PageHeader } from '../elements/text';
import { CenterContainer } from '../elements/containers';
import { PROJECTS, IProject } from '../utils';

const Work = () => (
  <Layout pageTitle="Work" description="Work">
    <CenterContainer>
      <PageHeader style={{ margin: '2rem' }}>Work</PageHeader>
    </CenterContainer>

    {PROJECTS.map(({ name, description, image, tags, githubURL }: IProject, idx) => (
      <BackgroundContainer key={name} color={idx % 2 === 0 ? 'offset' : null}>
        <ContentContainer>
          <FlexEvenlyContainer style={{ flexDirection: idx % 2 === 0 ? 'row-reverse' : null }}>
            <Image src={image} alt={name} width={500} height={250} />

            <MainContent isOnRight={idx % 2 !== 0}>
              <SubText style={{ marginBottom: '0.5rem' }}>{tags.join(' • ')}</SubText>
              <SectionHeader style={{ marginBottom: '1rem' }}>{name}</SectionHeader>
              <Text style={{ marginBottom: '1rem' }}>{description}</Text>

              <FlexStartContainer>
                <a href={githubURL} target="_blank" style={{ marginRight: '0.5rem' }}>
                  <IconButton>
                    <Code />
                    Code
                  </IconButton>
                </a>
              </FlexStartContainer>
            </MainContent>
          </FlexEvenlyContainer>
        </ContentContainer>
      </BackgroundContainer>
    ))}
  </Layout>
);

export default Work;
