import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate=useNavigate()
    return (
        <>
                <Link to="balance"><h5>Balance  Inquiry</h5></Link>
                <Link to="deposite "><h5>Deposite</h5></Link>
                <Link to="withdraw"><h5>Withdraw</h5></Link>
                <Link to="transaction"><h5>Account Statement</h5></Link>
                <Link to="statement"><h5>Statement</h5></Link>
                <Link to="profile "><h5>Profile</h5></Link>
                <Link to="resetpass"><h5>Change Password</h5></Link>
          
        </>
    );
};

export default Sidebar;

