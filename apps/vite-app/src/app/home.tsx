import { Link } from 'react-router-dom';

export const Home = () => (
  <div>
    This is the generated root route.{' '}
    <Link to="/page-2">Click here for page 2.</Link>
  </div>
);
