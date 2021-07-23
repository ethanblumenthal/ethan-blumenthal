import Layout from '../components/layout';
import Bio from '../components/bio';
import Experience from '../components/experience';
import Skillset from '../components/skillset';
import Qualifications from '../components/qualifications';

const About = () => (
  <Layout pageTitle="About" description="About">
    <Bio />
    <Experience />
    <Qualifications />
    <Skillset />
  </Layout>
);

export default About;
