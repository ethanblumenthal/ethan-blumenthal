import { SmallCard } from '../elements/cards';
import { SectionHeader, Text, SubText } from '../elements/text';
import {
  BackgroundContainer,
  ContentContainer,
  HeaderContainer,
  LgGridContainer,
} from '../elements/containers';
import { QUALIFICATIONS } from '../utils';
import { Bookmark, Code } from 'react-feather';

const Qualifications = () => (
  <BackgroundContainer>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader>Qualifications</SectionHeader>
      </HeaderContainer>

      <LgGridContainer>
        {QUALIFICATIONS.map(({ title, description, link, icon }) => (
          <a href={link} target="_blank" key={title}>
            <SmallCard>
              {icon === 'book' ? (
                <Bookmark style={{ color: '#ffb700', marginBottom: '0.5rem' }} />
              ) : (
                <Code style={{ color: '#ffb700', marginBottom: '0.5rem' }} />
              )}
              <SubText style={{ marginBottom: '0.5rem' }}>{description}</SubText>
              <Text>{title}</Text>
            </SmallCard>
          </a>
        ))}
      </LgGridContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Qualifications;
