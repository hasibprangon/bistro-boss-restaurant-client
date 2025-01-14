import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery} from '@tanstack/react-query';

const useCart = () => {
   const AxiosSecure = useAxiosSecure();
   const { data: cart = [] } = useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
         const res = await AxiosSecure.get('/carts')
         return res.data;
      }
   })
   return [cart];
};

export default useCart;