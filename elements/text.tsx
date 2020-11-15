import styled from 'styled-components';

export const PageHeader = styled.h1`
  font-size: 2.75rem;
`;

export const SectionHeader = styled.h2`
  font-size: 2.25rem;
  margin-top: 0;
`;

export const CardHeader = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0;
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.5rem;
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 0;
`;
