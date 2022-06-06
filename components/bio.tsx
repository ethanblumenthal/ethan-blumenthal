import {
  BackgroundContainer,
  ContentContainer,
  DesktopWrapper,
  FlexEvenlyContainer,
  MainContent,
  MobileWrapper,
} from '../elements/containers';
import { PageHeader, Text } from '../elements/text';
import { RoundImage } from '../elements/images';
import { BIO } from '../utils';
import { ArrowButtonRight } from '../elements/buttons';
import { ArrowRight } from 'react-feather';

const Bio = () => (
  <BackgroundContainer>
    <ContentContainer>
      <FlexEvenlyContainer>
        <RoundImage src={BIO.image} alt={BIO.title} width={400} height={400} />

        <MainContent isOnRight>
          <PageHeader>{BIO.title}</PageHeader>
          <Text style={{ margin: '1rem 0' }}>{BIO.description}</Text>
          <a
            href="https://ethanblumenthal.s3.us-east-2.amazonaws.com/ethan_blumenthal_resume.pdf"
            target="_blank"
          >
            <ArrowButtonRight>
              View resume
              <ArrowRight />
            </ArrowButtonRight>
          </a>
        </MainContent>
      </FlexEvenlyContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Bio;
