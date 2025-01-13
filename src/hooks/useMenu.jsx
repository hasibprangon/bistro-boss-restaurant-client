import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true)
    const AxiosSecure = useAxiosSecure();
    useEffect(() => {
        AxiosSecure.get(`http://localhost:5000/menu`)
            .then(res => {
                setMenu(res.data);
                setLoading(false)
            })
    }, [])
    return [menu, loading]
};

export default useMenu;