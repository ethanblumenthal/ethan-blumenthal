import Image from 'next/image';

import {
  BackgroundContainer,
  ContentContainer,
  FlexEvenlyContainer,
  MainContent,
} from '../elements/containers';
import { PageHeader, Text } from '../elements/text';
import { HEADER } from '../utils';
import Subscribe from './contact';

const Header = () => (
  <BackgroundContainer>
    <ContentContainer>
      <FlexEvenlyContainer>
        <Image src={HEADER.image} alt={HEADER.title} width={400} height={400} />

        <MainContent>
          <PageHeader>{HEADER.title}</PageHeader>
          <Text style={{ margin: '1rem 0' }}>{HEADER.summary}</Text>
          <Subscribe isOutline={false} />
        </MainContent>
      </FlexEvenlyContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Header;
