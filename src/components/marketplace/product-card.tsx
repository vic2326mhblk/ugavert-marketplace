import {Link} from '@tanstack/react-router';
import {Heart,MapPin,ArrowUpRight} from 'lucide-react';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {supabase} from '@/integrations/supabase/client';
import {imageFor} from '@/lib/marketplace/media';
import {money,type Listing} from '@/lib/marketplace/catalog';
import {useAccount} from './account-provider';
export function useFavorites(){const {user}=useAccount();return useQuery({queryKey:['favorites',user?.id],enabled:!!user,queryFn:async()=>{const {data,error}=await supabase.from('favorites').select('listing_id');if(error)throw error;return data?.map(f=>f.listing_id)??[];}});}
export function ProductCard({item}:{item:Listing}){
 const {user}=useAccount();const qc=useQueryClient();const {data:favorites=[]}=useFavorites();const saved=favorites.includes(item.id);
 const mutation=useMutation({mutationFn:async()=>{if(!user)throw new Error('Sign in to save your favourite items.');const res=saved?await supabase.from('favorites').delete().eq('listing_id',item.id).eq('user_id',user.id):await supabase.from('favorites').insert({listing_id:item.id,user_id:user.id});if(res.error)throw res.error;},onSuccess:()=>{void qc.invalidateQueries({queryKey:['favorites']});},onError:e=>toast.error(e.message)});
 return <article className="product-card"><div className="product-image"><Link to="/listing/$listingId" params={{listingId:item.id}}><img src={item.photos?.[0]||imageFor(item.image_url)} alt={item.title} loading="lazy"/></Link>{item.featured&&<span className="product-tag">Featured</span>}<Button variant="ghost" size="icon" className={`save-item ${saved?'is-saved':''}`} aria-label={saved?'Unsave item':'Save item'} title={saved?'Unsave item':'Save item'} disabled={mutation.isPending} onClick={()=>mutation.mutate()}><Heart fill={saved?'currentColor':'none'}/></Button></div><div className="product-copy"><span className="product-location"><MapPin size={11}/>{item.location}<span>•</span>{item.condition}</span><Link to="/listing/$listingId" params={{listingId:item.id}} className="product-title">{item.title}</Link><div className="product-price"><strong>{money(item.price)}</strong>{item.old_price&&<del>{money(item.old_price)}</del>}</div><div className="product-bottom"><span>{item.seller_profiles?.business_name.replace(' · Preview','')||'Local seller'}</span><Button variant="ghost" size="icon" asChild aria-label={`View ${item.title}`}><Link to="/listing/$listingId" params={{listingId:item.id}}><ArrowUpRight/></Link></Button></div></div></article>;
}
