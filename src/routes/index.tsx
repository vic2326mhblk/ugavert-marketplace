import {createFileRoute} from '@tanstack/react-router';
import {Storefront} from '@/components/marketplace/storefront';
import {listingsQuery} from '@/lib/marketplace/queries';
import {metadata} from '@/lib/marketplace/catalog';
export const Route=createFileRoute('/')({validateSearch:(search:Record<string,unknown>):{q?:string}=>typeof search['q']==='string'?{q:search['q']}:{},loader:({context})=>context.queryClient.ensureQueryData(listingsQuery),head:()=>metadata('Uganda’s everyday marketplace','Discover electronics, foods, fashion, vehicles, houses, land and bridals. Connect directly with local sellers on UGAVERT.'),component:Home});
function Home(){const {q}=Route.useSearch();return <Storefront key={q??''} initialSearch={q??''}/>;}
