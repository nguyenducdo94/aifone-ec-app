import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase';
import { USER_NOT_FOUND, EMAIL_ALREADY_IN_USE, WRONG_PASSWORD } from '../constants/errorCode';

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const unsubsribe = onAuthStateChanged(firebaseAuth, (res) => {
            if (res) {
                setUser(res);
            } else {
                setUser(null);
            }
            setError('');
            setLoading(false);
        })
        return unsubsribe;
    }, []);

    const registerUser = async ({ fullName, email, password, confirmPassword }) => {
        if (password === confirmPassword) {
            setLoading(true);
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then(() =>
                    updateProfile(firebaseAuth.currentUser, {
                        displayName: fullName,
                    })
                )
                .then(() => sendEmailVerification(firebaseAuth.currentUser))
                .catch((error) => {
                    if (error.code === EMAIL_ALREADY_IN_USE) setError('Email đã được sử dụng!')
                })
                .finally(() => setLoading(false));

        } else {
            setError('Mật khẩu xác nhận không đúng');
        }
    };

    const signInUser = ({ email, password }) => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error) => {
                console.log(error)
                if (error.code === USER_NOT_FOUND)
                    setError('Tài khoản không tồn tại!')
                if (error.code === WRONG_PASSWORD)
                    setError('Bạn nhập sai mật khẩu!')
            })
            .finally(() => setLoading(false));
    };

    const logOutUser = () => {
        signOut(firebaseAuth);
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(firebaseAuth, email)
    };

    const contextValue = {
        user,
        loading,
        error,
        signInUser,
        registerUser,
        logOutUser,
        forgotPassword,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
}