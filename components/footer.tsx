import Image from 'next/image';
import styled from 'styled-components';
import { Phone, Mail, Linkedin, GitHub, MapPin, Twitter } from 'react-feather';

import {
  BackgroundContainer,
  FooterContainer,
  ContentContainer,
  StackContainer,
} from '../elements/containers';
import { CardHeader, SubText, Text } from '../elements/text';

const Anchor = styled.a`
  display: flex;

  & > * {
    color: ${({ theme }) => theme.colors.grey};
    transition: ${({ theme }) => theme.transitions.ease};
    margin: 0 1rem 1rem 0;
  }

  &:hover > * {
    color: ${({ theme }) => theme.colors.tertiery};
  }
`;

const Footer = () => (
  <footer>
    <BackgroundContainer color="footer">
      <ContentContainer>
        <FooterContainer>
          <StackContainer>
            <CardHeader style={{ marginBottom: '0.5rem', color: '#5993C2' }}>Contact</CardHeader>

            <Anchor href="mailto:ethan.blumenthal@gmail.com" target="_blank">
              <Mail />
              <Text>ethan.blumenthal@gmail.com</Text>
            </Anchor>

            <Anchor href="tel:847-373-3778" target="_blank">
              <Phone />
              <Text>847-373-3778</Text>
            </Anchor>

            <Anchor href="https://www.google.com/maps?q=Austin" target="_blank">
              <MapPin />
              <Text>Austin, TX</Text>
            </Anchor>
          </StackContainer>

          <StackContainer>
            <CardHeader style={{ marginBottom: '0.5rem', color: '#5993C2' }}>Follow Me</CardHeader>

            <Anchor href="https://twitter.com/ethanblumenthal" target="_blank">
              <Twitter />
              <Text>Twitter</Text>
            </Anchor>

            <Anchor href="https://www.linkedin.com/in/ethanblumenthal/" target="_blank">
              <Linkedin />
              <Text>LinkedIn</Text>
            </Anchor>

            <Anchor href="https://github.com/ethanblumenthal" target="_blank">
              <GitHub />
              <Text>GitHub</Text>
            </Anchor>
          </StackContainer>

          <StackContainer>
            <Image src={'/logo.svg'} alt={'Ethan Blumenthal'} width={50} height={50} />
            <SubText style={{ marginTop: '1rem' }}>
              &copy; {new Date().getFullYear()} Ethan Blumenthal
            </SubText>
          </StackContainer>
        </FooterContainer>
      </ContentContainer>
    </BackgroundContainer>
  </footer>
);

export default Footer;
