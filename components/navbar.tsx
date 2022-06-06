import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Moon, Search, Sun } from 'react-feather';

import { CardHeader } from '../elements/text';
import { BackgroundContainer, FlexContainer, IconContainer } from '../elements/containers';
import { OutlineButton } from '../elements/buttons';
import { PAGES } from '../utils';
import Image from 'next/image';

const UnorderedList = styled.ul`
  display: flex;
  list-style: none;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  transition: ${({ theme }) => theme.transitions.ease};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NavBar = ({ theme, setTheme }) => {
  const router = useRouter();

  return (
    <BackgroundContainer short>
      <FlexContainer>
        <FlexContainer>
          <Link href="/">
            <>
              <Image
                src={'/logo.svg'}
                alt={'Ethan Blumenthal'}
                width={50}
                height={50}
                style={{ marginRight: '1rem' }}
              />
              <CardHeader style={{ cursor: 'pointer' }}>Ethan Blumenthal</CardHeader>
            </>
          </Link>

          {/* <UnorderedList>
            {PAGES.map(({ title, slug }) => (
              <Link href={slug} key={slug}>
                <ListItem style={{ color: router.pathname === slug ? '#5993C2' : '' }}>
                  {title}
                </ListItem>
              </Link>
            ))}
          </UnorderedList> */}
        </FlexContainer>

        <FlexContainer style={{ width: '10rem' }}>
          {/* <Link href="/tags">
            <IconContainer>
              <Search />
            </IconContainer>
          </Link> */}
          <IconContainer onClick={() => setTheme(!theme)}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </IconContainer>
          <a href="mailto:ethan.blumenthal@gmail.com" target="_blank">
            <OutlineButton>Get in touch</OutlineButton>
          </a>
        </FlexContainer>
      </FlexContainer>
    </BackgroundContainer>
  );
};

export default NavBar;
