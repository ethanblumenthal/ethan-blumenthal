import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

import { ImageCard } from '../elements/cards';
import { CardHeader, Text, SubText } from '../elements/text';
import { BackgroundContainer, GridContainer } from '../elements/containers';
import { IPost } from '../utils';

const Posts = ({ allPosts }) => (
  <BackgroundContainer>
    <GridContainer>
      {allPosts &&
        allPosts.map(({ date, title, excerpt, coverImage, slug }: IPost) => (
          <Link href={`/blog/${slug}`} key={slug}>
            <ImageCard key={title}>
              <Image src={coverImage.url} alt={title} height={200} width={350} />
              <SubText>{moment(date).format('MMMM D, YYYY')}</SubText>
              <CardHeader>{title}</CardHeader>
              <Text>{excerpt}</Text>
            </ImageCard>
          </Link>
        ))}
    </GridContainer>
  </BackgroundContainer>
);

export default Posts;
