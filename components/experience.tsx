import { BaseCard } from '../elements/cards';
import { SectionHeader, CardHeader, Text, SubText } from '../elements/text';
import {
  BackgroundContainer,
  ContentContainer,
  GridContainer,
  HeaderContainer,
} from '../elements/containers';
import { EXPERIENCE } from '../utils';

interface IExperience {
  title: string;
  position: string;
  description: string;
  link: string;
}

const Experience = () => (
  <BackgroundContainer>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader>Experience</SectionHeader>
      </HeaderContainer>

      <GridContainer>
        {EXPERIENCE.map(({ title, position, description, link }: IExperience) => (
          <a href={link} target="_blank" key={title}>
            <BaseCard>
              <CardHeader style={{ marginBottom: '0.25rem' }}>{title}</CardHeader>
              <SubText style={{ marginBottom: '0.75rem' }}>{position}</SubText>
              <Text>{description}</Text>
            </BaseCard>
          </a>
        ))}
      </GridContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Experience;
