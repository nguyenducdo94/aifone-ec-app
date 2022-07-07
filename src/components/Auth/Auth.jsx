import React from 'react';
import Sign from './Sign';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Auth = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign' exact element={<Sign />} />
                <Route path='*' exact element={<Navigate to="/sign" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Auth