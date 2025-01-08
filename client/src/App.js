import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import './App.css';

function App() {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);

    const renderPage = () => {
        switch (page) {
            case 'signup':
                return <Signup setPage={setPage} setUser={setUser} />;
            case 'login':
                return <Login setPage={setPage} setUser={setUser} />;
            case 'profile':
                return <Profile user={user} setPage={setPage} setUser={setUser} />;
            default:
                return (
                    <div>
                        <h1>Welcome</h1>
                        <button onClick={() => setPage('signup')}>Signup</button>
                        <button onClick={() => setPage('login')}>Login</button>
                    </div>
                );
        }
    };

    return <div>{renderPage()}</div>;
}

export default App;
