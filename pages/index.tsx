import Layout from '../components/layout';
import Header from '../components/header';
import Bio from '../components/bio';
import Experience from '../components/experience';
import Skillset from '../components/skillset';
import Qualifications from '../components/qualifications';

const Home = () => (
  <Layout pageTitle="Home" description="Home">
    <Bio />
    <Experience />
    <Qualifications />
    <Skillset />
  </Layout>
);

export default Home;
