import { Anchor } from 'react-feather';
import { Button, OutlineButton } from '../elements/buttons';

const Contact = ({ isOutline }) => {
  return (
    <a href="mailto:ethan.blumenthal@gmail.com" target="_blank">
      {isOutline ? <OutlineButton>Get In Touch</OutlineButton> : <Button>Get In Touch</Button>}
    </a>
  );
};

export default Contact;
