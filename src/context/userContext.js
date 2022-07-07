import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { firebaseAuth, fStore } from '../firebase';
import { USER_NOT_FOUND, EMAIL_ALREADY_IN_USE, WRONG_PASSWORD } from '../constants/errorCode';
import { setDoc, doc, Timestamp, getDoc, updateDoc } from 'firebase/firestore';

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        setLoading(true);
        const unsubsribe = onAuthStateChanged(firebaseAuth, (res) => {
            if (res) {
                setUser(res);
                getDoc(doc(fStore, 'users', firebaseAuth.currentUser.uid)).then((docSnap) => {
                    if (docSnap.exists) {
                        setProfile(docSnap.data());
                    }
                });
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

            try {
                setLoading(true);
                const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)

                await sendEmailVerification(firebaseAuth.currentUser);

                await setDoc(doc(fStore, 'users', result.user.uid), {
                    uid: result.user.uid,
                    fullName,
                    email,
                    createdAt: Timestamp.fromDate(new Date()),
                    role: 'user',
                    avatarUrl: '',
                });

                setLoading(false);

            } catch (error) {
                if (error.code === EMAIL_ALREADY_IN_USE) setError('Email đã được sử dụng!')
                else setError(error.code)

                setLoading(false);
            }

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
        profile
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
}