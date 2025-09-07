// CooperativeContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const CooperativeContext = createContext();

export const useCooperative = () => {
    const context = useContext(CooperativeContext);
    if (!context) {
        throw new Error('useCooperative must be used within a CooperativeProvider');
    }
    return context;
};

export const CooperativeProvider = ({ children }) => {
    const [cooperativeId, setCooperativeId] = useState(null);
    const [cooperativeData, setCooperativeData] = useState(null);
    const [email, setEmail] = useState(null);

    const updateCooperativeId = useCallback((id) => {
        console.log('Updating cooperative ID:', id);
        setCooperativeId(id);
    }, []);

    const updateCooperativeData = useCallback((data) => {
        console.log('Updating cooperative data:', data);
        setCooperativeData(data);
        if (data?.id) {
            setCooperativeId(data.id);
        }
    }, []);

    const updateEmail = useCallback((email) => {
        console.log('Updating email:', email);
        setEmail(email);
    }, []);

    const clearCooperativeData = useCallback(() => {
        setCooperativeId(null);
        setCooperativeData(null);
        setEmail(null);
    }, []);

    const value = {
        cooperativeId,
        cooperativeData,
        email,
        updateCooperativeId,
        updateCooperativeData,
        updateEmail,
        clearCooperativeData,
    };
    console.log(cooperativeId)
    return (
        <CooperativeContext.Provider value={value}>
            {children}
        </CooperativeContext.Provider>
    );
};


export const withCooperative = (Component) => {
    return function WrappedComponent(props) {
        return (
            <CooperativeProvider>
                <Component {...props} />
            </CooperativeProvider>
        );
    };
};