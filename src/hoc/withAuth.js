import { useAuth } from '../customHooks/index.js';
import { withRouter } from 'react-router-dom';

const WithAuth = props => useAuth(props) && props.children;

export default withRouter(WithAuth);