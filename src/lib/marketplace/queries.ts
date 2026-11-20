import {queryOptions} from '@tanstack/react-query';
import {getListings} from './public.functions';
export const listingsQuery=queryOptions({queryKey:['listings'],queryFn:()=>getListings(),staleTime:30_000});
