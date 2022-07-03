import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, RefObject } from 'react';
import styled from 'styled-components';
import { Moon, Search, Sun, X } from 'react-feather';

import { SectionHeader, CardHeader, SubText } from '../elements/text';
import { ExitButton, ThemeButton, OutlineButton } from '../elements/buttons';
import {
  BackdropContainer,
  BackgroundContainer,
  ContentContainer,
  FlexContainer,
  FlexEvenlyContainer,
  IconContainer,
  ModalContainer,
} from '../elements/containers';
import { PAGES } from '../utils';
import useModal from '../hooks/useModal';

const UnorderedList = styled.ul`
  list-style: none;
  padding: 1rem 0;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  transition: ${({ theme }) => theme.transitions.ease};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const MobileNav = ({ theme, setTheme }) => {
  const node: RefObject<any> = useRef();
  const [modal, openModal] = useModal(node);
  const router = useRouter();

  const renderModal = () => (
    <>
      <ModalContainer small ref={node}>
        <ExitButton onClick={() => openModal(false)}>
          <X />
        </ExitButton>
        <UnorderedList>
          {PAGES.map(({ title, slug }) => (
            <Link href={slug} key={slug}>
              <ListItem style={{ color: router.pathname === slug ? '#8A99A8' : '' }}>
                <SectionHeader>{title}</SectionHeader>
              </ListItem>
            </Link>
          ))}
        </UnorderedList>

        <FlexEvenlyContainer>
          <div>
            <SubText style={{ paddingBottom: '0.5rem' }}>Change Theme</SubText>
            <ThemeButton onClick={() => setTheme('dark')}>
              {theme === 'dark' ? <Moon /> : <Sun />}
            </ThemeButton>
          </div>

          <div>
            <SubText style={{ paddingBottom: '0.5rem' }}>Search Tags</SubText>
            <Link href="/tags">
              <ThemeButton>
                <Search />
              </ThemeButton>
            </Link>
          </div>
        </FlexEvenlyContainer>
      </ModalContainer>
      <BackdropContainer />
    </>
  );

  return (
    <BackgroundContainer short>
      <ContentContainer>
        <FlexContainer>
          <Link href="/">
            <CardHeader>Ethan Blumenthal</CardHeader>
          </Link>
          {/* <OutlineButton onClick={() => openModal(true)}>Menu</OutlineButton>
          {modal ? renderModal() : null} */}

          <IconContainer onClick={() => setTheme(!theme)}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </IconContainer>
        </FlexContainer>
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default MobileNav;
