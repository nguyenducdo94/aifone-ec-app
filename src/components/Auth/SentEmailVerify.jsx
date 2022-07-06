import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useUserContext } from '../../context/userContext';

const SentEmailVerify = () => {
    const { logOutUser } = useUserContext();

    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <Grid display='flex' direction='column' container alignItems='center' justifyContent='center'>
            <h3 style={{ marginTop: '100px' }}>
                Email xác nhận đã được gửi! Hãy kiểm tra hòm thư và tiến hành xác nhận!
            </h3>

            <Button variant="contained" color="primary" onClick={handleClick}>Đã xác nhận</Button>
            <Button style={{ marginTop: '20px' }} variant="contained" color="secondary" onClick={logOutUser}>Quay về màn hình đăng nhập</Button>
        </Grid>
    )
}

export default SentEmailVerify