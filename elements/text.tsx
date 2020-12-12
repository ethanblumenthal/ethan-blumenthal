import styled from 'styled-components';
import { devices } from '../utils';

export const PageHeader = styled.h1`
  font-size: 2.75rem;
  font-family: 'Ariel';
  margin-bottom: 1rem;
`;

export const SectionHeader = styled.h2`
  font-size: 2.25rem;
  font-family: 'Ariel';
`;

export const ColorSectionHeader = styled(SectionHeader)`
  color: ${({ theme }) => theme.colors.white};
`;

export const CardHeader = styled.h3`
  font-size: 1.75rem;
  font-family: 'Ariel';
  /* margin: 1rem 0; */
`;

export const ColorCardHeader = styled(CardHeader)`
  color: ${({ theme }) => theme.colors.white};
`;

export const FooterHeader = styled(CardHeader)`
  /* font-size: 1.5rem; */
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0;
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.7rem;
  font-weight: 300;

  @media ${devices.desktop} {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
`;

export const FooterText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 0.5rem;
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.8rem;
  text-transform: uppercase;
`;
