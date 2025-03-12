import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={footerSectionStyle}>
                <h4>About Our Bank</h4>
                <p>We are committed to providing our customers with exceptional service, competitive rates, and a wide range of financial products.</p>
            </div>
            <div style={footerSectionStyle}>
                <h4>Contact Us</h4>
                <p>Email: support@ourbank.com</p>
                <p>Phone: 1-800-555-1234</p>
                <p>Address: 123 Bank St, Financial City, FC 12345</p>
            </div>
            <div style={footerSectionStyle}>
                <h4>Quick Links</h4>
                <ul style={linkListStyle}>
                    <li><Link to="/home" style={linkStyle}>Home</Link></li>
                    <li><Link to="/login" style={linkStyle}>Login</Link></li>
                    <li><Link to="/register" style={linkStyle}>Register</Link></li>
                </ul>
            </div>
            <div style={footerSectionStyle}>
                <h4>Follow Us</h4>
                <ul style={linkListStyle}>
                    <li><Link to="https://facebook.com" style={linkStyle}>Facebook</Link></li>
                    <li><Link to="https://twitter.com" style={linkStyle}>Twitter</Link></li>
                    <li><Link to="https://linkedin.com" style={linkStyle}>LinkedIn</Link></li>
                </ul>
            </div>
            <div style={footerSectionStyle}>
                <p>&copy; {new Date().getFullYear()} Our Bank. All rights reserved.</p>
            </div>
        </footer>
    );
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem',
    backgroundColor: '#7e30de',
    color: '#fff',
    flexWrap: 'wrap',
    textAlign: 'left',
};

const footerSectionStyle = {
    flexBasis: '20%',
    marginBottom: '1rem',
};

const linkListStyle = {
    listStyle: 'none',
    padding: 0,
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
};

export default Footer;

