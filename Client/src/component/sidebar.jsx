import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate=useNavigate()
    return (
        <>
                <Link to="home"><h3>Home</h3></Link>
                <Link to="history"><h3>History</h3></Link>
                <Link to="transaction"><h3>Transaction</h3></Link>
                <button className='btn btn-primary' onClick={()=>{localStorage.clear(),navigate('/')}}>Logout</button>
          
        </>
    );
};

export default Sidebar;

