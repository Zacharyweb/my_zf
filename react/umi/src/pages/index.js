import { Redirect} from 'react-router-dom';
import styles from './index.css';
import Link from 'umi/link';
export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <Link to="/profile">去个人中心</Link>
    </div>
  );
}
