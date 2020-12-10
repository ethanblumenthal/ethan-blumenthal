import styled from 'styled-components';

export const PageHeader = styled.h1`
  font-size: 2.75rem;
  font-family: 'Ariel';
`;

export const SectionHeader = styled.h2`
  font-size: 2.25rem;
  font-family: 'Ariel';
  margin-top: 0;
`;

export const ColorSectionHeader = styled(SectionHeader)`
  color: ${({ theme }) => theme.colors.white};
`;

export const CardHeader = styled.h3`
  font-size: 1.75rem;
  font-family: 'Ariel';
  margin-bottom: 0;
`;

export const ColorCardHeader = styled(CardHeader)`
  color: ${({ theme }) => theme.colors.white};
  padding-left: 1.75rem;
  margin-bottom: 1.75rem;
`;

export const FooterHeader = styled(CardHeader)`
  /* font-size: 1.5rem; */
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0;
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.7rem;
  font-weight: 300;
`;

export const FooterText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 0.5rem;
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 0;
`;
