import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { ArrowButtonRight } from '../elements/buttons';
import { ColorSectionHeader, ColorCardHeader } from '../elements/text';
import {
  BackgroundContainer,
  ContentContainer,
  HeaderContainer,
  LgGridContainer,
  SkillContainer,
} from '../elements/containers';
import { SKILLSET } from '../utils';

const Skillset = () => (
  <BackgroundContainer color="primary">
    <ContentContainer>
      <HeaderContainer>
        <ColorSectionHeader>Skillset</ColorSectionHeader>

        <Link href="/resume">
          <ArrowButtonRight>
            View resume
            <FontAwesomeIcon icon={faArrowRight} />
          </ArrowButtonRight>
        </Link>
      </HeaderContainer>

      <LgGridContainer>
        {SKILLSET.map((skill) => (
          <SkillContainer key={skill}>
            <ColorCardHeader>{skill}</ColorCardHeader>
          </SkillContainer>
        ))}
      </LgGridContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Skillset;
