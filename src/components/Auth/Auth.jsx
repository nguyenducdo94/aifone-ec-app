import React, { useState, useEffect, useRef } from 'react';
import { Grow, Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { useUserContext } from '../../context/userContext';

const initialState = { fullName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const { signInUser, registerUser, forgotPassword } = useUserContext();

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState({
        fullName: { isError: false, message: '' },
        phoneNumber: { isError: false, message: '' },
        email: { isError: false, message: '' },
        password: { isError: false, message: '' },
        confirmPassword: { isError: false, message: '' }
    })

    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        let isInvalid = true;
        const errorAssign = {
            fullName: { isError: false, message: '' },
            email: { isError: false, message: '' },
            password: { isError: false, message: '' },
            confirmPassword: { isError: false, message: '' }
        }

        Object.keys(errorAssign).map(function (key) {
            const element = document.getElementsByName(key)[0];
            if (element?.value === '') {
                errorAssign[key]['isError'] = true;
                errorAssign[key]['message'] = 'Hãy nhập thông tin';
                isInvalid = false;
            }
        });

        setErrorMessage(errorAssign);

        if (!isInvalid) return false;

        if (isSignup) {
            registerUser(formData);
        }
        else {
            signInUser(formData);
        }
    };

    const forgotPasswordHandle = () => {
        const { email } = formData;
        if (email) {
            forgotPassword(email).then(() => {
                setFormData(initialState);
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    return (

        <Grow in timeout={{ appear: 1000, enter: 1000, exit: 1000 }}>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignup ? 'Đăng ký tài khoản' : 'Đăng nhập'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name='fullName' label='Họ và Tên' error={errorMessage.fullName.isError} helperText={errorMessage.fullName.message} handleChange={handleChange} autoFocus />
                                    </>
                                )
                            }
                            <Input name='email' label='Địa chỉ email' error={errorMessage.email.isError} helperText={errorMessage.email.message} handleChange={handleChange} type='email' />
                            <Input name='password' label='Mật khẩu' error={errorMessage.password.isError} helperText={errorMessage.password.message} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

                            {isSignup && <Input name='confirmPassword' label='Xác nhận mật khẩu' error={errorMessage.confirmPassword.isError} helperText={errorMessage.confirmPassword.message} handleChange={handleChange} type='password' />}
                        </Grid>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            {isSignup ? 'Đăng ký' : 'Đăng nhập'}
                        </Button>
                        {!isSignup &&
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Button onClick={forgotPasswordHandle}>
                                        Bạn quên mật khẩu?
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Bạn đã có tài khoản? Đăng nhập' : "Bạn chưa có tài khoản? Tạo mới"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Grow>
    );
};

export default Auth;