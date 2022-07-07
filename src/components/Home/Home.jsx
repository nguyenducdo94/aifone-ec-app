import React from 'react';
import Appbar from '../Appbar/Appbar';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../UserMenu/Profile';
import SentEmailVerify from '../Auth/SentEmailVerify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const Home = () => {
    const { user } = useUserContext();

    return (
        <div>
            <BrowserRouter>
                {user?.emailVerified ?
                    (<>
                        <Appbar />
                        <Sidebar />
                        <Routes>
                            <Route path='/dashboard' exact element={<Dashboard />} />
                            <Route path='/profile' exact element={<Profile />} />
                            <Route path='*' exact element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </>
                    ) :
                    (
                        <Routes>
                            <Route path='/emailverify' exact element={<SentEmailVerify />} />
                            <Route exact path="*" element={<Navigate to="/emailverify" />} />
                        </Routes>
                    )
                }

            </BrowserRouter>
        </div>
    )
}

export default Home