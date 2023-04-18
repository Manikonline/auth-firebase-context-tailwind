import React, { useContext } from 'react';
import AuthProvider from '../Providers/AuthProvider';

const Home = () => {
    const user=useContext(AuthProvider)
    return (
        <div>
            <h3>This is home { user && <span>{user.displayName}</span>}</h3>
        </div>
    );
};

export default Home;