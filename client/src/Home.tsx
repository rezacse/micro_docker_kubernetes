
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
        I am other page!
        <Link to="/"> Go back Home </Link>
        </div>
    );
}

export default Home;