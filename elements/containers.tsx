import styled from 'styled-components';
import { devices } from '../utils';

export const BlogContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 46rem;
  padding: 4rem 0;
  margin: 0 auto;

  @media ${devices.desktop} {
    padding: 4rem 1rem;
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

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const LgGridContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
