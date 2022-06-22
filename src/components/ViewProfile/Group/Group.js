import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Interweave from 'interweave';

const Group = (props) => {
  const { icon, text, underline, bold } = props;
  return (
    <div className="group">
      <FontAwesomeIcon icon={icon} />
      <p className={classNames({
        'underline': underline === true,
        'bold': bold === true
      })}>
          <Interweave content={text} />
      </p>
    </div>
  );
};

export default Group;
