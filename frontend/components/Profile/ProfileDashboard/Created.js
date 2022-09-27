import Link from 'next/link';
import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';
import Button from '../../UI/Button';

export default function Created(props) {
  return (
    <div className={classes['profile-elements']}>
      {props.elements.map((el, i) => (
        <DashboardElement key={`created-el-${i}`}>
          <p>{el.txt}</p>
          <Link href={el.url} passHref>
            <a>View Project</a>
          </Link>
        </DashboardElement>
      ))}
      <Button>Create New Project</Button>
    </div>
  );
}
