import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { ArrowButtonRight } from '../elements/buttons';
import { SectionHeader, CardHeader, Text } from '../elements/text';
import {
  BackgroundContainer,
  ContentContainer,
  HeaderContainer,
  LgGridContainer,
} from '../elements/containers';
import { SKILLSET } from '../utils';
import { SkillCard, CardContent } from '../elements/cards';

const Skillset = () => (
  <BackgroundContainer>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader>Skillset</SectionHeader>

        <a
          href="https://ethanblumenthal.s3.us-east-2.amazonaws.com/ethan_blumenthal_resume.pdf"
          target="_blank"
        >
          <ArrowButtonRight>
            View resume
            <FontAwesomeIcon icon={faArrowRight} />
          </ArrowButtonRight>
        </a>
      </HeaderContainer>

      <LgGridContainer>
        {SKILLSET.map(({ title, skills }) => (
          <SkillCard key={title}>
            <CardContent style={{ textAlign: 'center' }}>
              <CardHeader style={{ marginBottom: '0.5rem' }}>{title}</CardHeader>
              {skills.map((skill) => (
                <Text style={{ marginBottom: '0.5rem' }} key={skill}>
                  {skill}
                </Text>
              ))}
            </CardContent>
          </SkillCard>
        ))}
      </LgGridContainer>
    </ContentContainer>
  </BackgroundContainer>
);

export default Skillset;
