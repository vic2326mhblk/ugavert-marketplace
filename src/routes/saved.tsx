import {createFileRoute,Link} from '@tanstack/react-router';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Heart} from 'lucide-react';
import {Shell} from '@/components/marketplace/shell';
import {ProductCard,useFavorites} from '@/components/marketplace/product-card';
import {useAccount} from '@/components/marketplace/account-provider';
import {Button} from '@/components/ui/button';
import {listingsQuery} from '@/lib/marketplace/queries';
import {metadata} from '@/lib/marketplace/catalog';
export const Route=createFileRoute('/saved')({loader:({context})=>context.queryClient.ensureQueryData(listingsQuery),head:()=>metadata('Your saved finds','Keep your favourite UGAVERT finds together and return to them whenever you are ready.'),component:Saved});
function Saved(){const {user}=useAccount();const {data:items}=useSuspenseQuery(listingsQuery);const {data:ids=[]}=useFavorites();const saved=items.filter(i=>ids.includes(i.id));return <Shell><div className="site-width min-h-[480px] pb-12"><div className="page-heading"><div><span className="eyebrow">A LITTLE SOMETHING YOU LOVED</span><h1>Your saved finds</h1><p>{saved.length} favourites, all in one place.</p></div><Heart className="text-primary"/></div>{!user?<div className="empty-state"><Heart/><h3>Keep the good finds close.</h3><p>Sign in to save items and pick up where you left off.</p><Button asChild><Link to="/auth" search={{next:'/saved'}}>Sign in to save</Link></Button></div>:saved.length?<div className="product-grid">{saved.map(item=><ProductCard key={item.id} item={item}/>)}</div>:<div className="empty-state"><Heart/><h3>Your next favourite is out there.</h3><p>Save the finds you love as you explore.</p><Button asChild><Link to="/">Explore the marketplace</Link></Button></div>}</div></Shell>;}
