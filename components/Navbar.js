export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo">Resume_IQ</div>
                <ul className="nav-links">
                    <li><a href="#home">About</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="btn-primary" onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}>
                    Upload Resume
                </button>
            </div>
        </nav>
    );
}
