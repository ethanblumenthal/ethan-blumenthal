import { useRef, RefObject } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SectionHeader, CardHeader, SubText } from '../elements/text';
import { ExitButton, ThemeButton, OutlineButton } from '../elements/buttons';
import {
  BackdropContainer,
  BackgroundContainer,
  ContentContainer,
  FlexContainer,
  FlexEvenlyContainer,
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
          <FontAwesomeIcon icon={faTimes} />
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
              <FontAwesomeIcon
                icon={theme === 'dark' ? faMoon : faSun}
                size="lg"
                onClick={setTheme}
              />
            </ThemeButton>
          </div>

          <div>
            <SubText style={{ paddingBottom: '0.5rem' }}>Search Tags</SubText>
            <Link href="/tags">
              <ThemeButton>
                <FontAwesomeIcon icon={faSearch} size="lg" />
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
          <OutlineButton onClick={() => openModal(true)}>Menu</OutlineButton>
          {modal ? renderModal() : null}
        </FlexContainer>
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default MobileNav;
