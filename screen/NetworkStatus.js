import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    return isConnected;
};

export default NetworkStatus;
