import Image from 'next/image';

import {
  BackgroundContainer,
  ContentContainer,
  FlexEvenlyContainer,
  MainContent,
} from '../elements/containers';
import { Button } from '../elements/buttons';
import { PageHeader, Text } from '../elements/text';
import { HEADER } from '../utils';

const Header = () => (
  <BackgroundContainer>
    <ContentContainer>
      <FlexEvenlyContainer>
        <Image src={HEADER.image} alt={HEADER.title} width={400} height={400} />

        <MainContent>
          <PageHeader>{HEADER.title}</PageHeader>
          <Text style={{ margin: '1rem 0' }}>{HEADER.summary}</Text>
          <a href="mailto:ethan.blumenthal@gmail.com" target="_blank">
            <Button>Get in touch</Button>
          </a>
        </MainContent>
      </FlexEvenlyContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Header;
