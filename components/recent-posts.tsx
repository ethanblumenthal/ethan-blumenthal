import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { SectionHeader, CardHeader, Text, SubText } from '../elements/text';
import { OffsetContainer, FlexContainer } from '../elements/containers';
import { ArrowButton } from '../elements/buttons';
import { Card } from '../elements/cards';
import { IPost } from '../utils';

const RecentPosts = ({ posts }) => (
  <OffsetContainer>
    <FlexContainer>
      <SectionHeader>Recent Articles</SectionHeader>
      <Link href="/blog">
        <ArrowButton>
          View all
          <FontAwesomeIcon icon={faArrowRight} />
        </ArrowButton>
      </Link>
    </FlexContainer>

    <FlexContainer>
      {posts &&
        posts.slice(0, 3).map(({ title, date, excerpt }: IPost) => (
          <Card key={title}>
            <SubText>{date}</SubText>
            <CardHeader>{title}</CardHeader>
            <Text>{excerpt}</Text>
          </Card>
        ))}
    </FlexContainer>
  </OffsetContainer>
);
export default RecentPosts;
