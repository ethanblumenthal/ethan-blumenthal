import styled from 'styled-components';
import { devices } from '../utils';

export const BlogContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 46rem;
  padding: 4rem 0;
  margin: 0 2rem;

  @media ${devices.tablet} {
    padding: 4rem 1rem;
    margin: auto;
  }
`;

export const BackgroundContainer = styled.div`
  background-color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.background};
  padding: ${({ short }) => (short ? '1rem 2rem' : '2rem')};

  @media ${devices.tablet} {
    padding: ${({ short }) => (short ? '1rem 3rem' : '3rem')};
  }

  @media ${devices.desktop} {
    padding: ${({ short }) => (short ? '1rem 4rem' : '4rem')};
  }
`;

export const ContentContainer = styled.div`
  max-width: 74rem;
  margin: 0 auto;
`;

export const MainContent = styled.div`
  margin: 2rem 0 0 0;

  @media ${devices.tablet} {
    max-width: 50%;
    margin: ${({ isOnRight }) => (isOnRight ? '0 0 0 2rem' : '0 2rem 0 0')};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media ${devices.tablet} {
    flex-wrap: nowrap;
  }
`;

export const FooterContainer = styled(FlexContainer)`
  flex-direction: column;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: 'flex-start';
  }
`;

export const FlexCenterContainer = styled(FlexContainer)`
  justify-content: center;

  @media ${devices.tablet} {
    flex-wrap: nowrap;
  }
`;

export const FlexEvenlyContainer = styled(FlexContainer)`
  justify-content: space-evenly;

  @media ${devices.tablet} {
    flex-wrap: nowrap;
  }
`;

export const FlexStartContainer = styled(FlexContainer)`
  justify-content: flex-start;

  @media ${devices.tablet} {
    flex-wrap: nowrap;
  }
`;

export const SkillContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiery};
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  height: 5.75rem;
  padding: 1.75rem;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
`;

export const LgGridContainer = styled.div`
  display: inline-grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: ${({ small }) => (small ? '20rem' : '30rem')};
  position: absolute;
  top: calc(50% - 10rem);
  left: ${({ small }) => (small ? 'calc(50% - 10rem)' : 'calc(50% - 15rem)')};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  z-index: 999;
  text-align: center;
`;

export const BackdropContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.5rem);
  z-index: 99;
`;

export const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media ${devices.tablet} {
    align-items: flex-start;
  }
`;

export const DesktopWrapper = styled.div`
  @media ${devices.navigation} {
    display: none;
  }
`;

export const MobileWrapper = styled.div`
  @media ${devices.desktop} {
    display: none;
  }
`;

export const IconContainer = styled.span`
  cursor: pointer; ;
`;
