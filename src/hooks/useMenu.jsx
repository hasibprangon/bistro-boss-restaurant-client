import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios(`http://localhost:5000/menu`)
            .then(res => {
                setMenu(res.data);
                setLoading(false)
            })
    }, [])
    return [menu, loading]
};

export default useMenu;