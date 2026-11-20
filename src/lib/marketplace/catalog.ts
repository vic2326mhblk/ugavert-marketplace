import type { Database } from '@/integrations/supabase/types';
import home from '@/assets/hero-home.webp.asset.json';
import food from '@/assets/hero-food.webp.asset.json';
import electro from '@/assets/hero-electro.webp.asset.json';
import fashion from '@/assets/hero-fashion.webp.asset.json';
import transport from '@/assets/hero-transport.webp.asset.json';
import property from '@/assets/hero-houses.webp.asset.json';
import bridal from '@/assets/hero-bridal.webp.asset.json';
export const homeImage = home.url;
export const categories = [
 {id:'electronics',label:'Gadgets & Electronics',short:'Electronics',tag:'SMARTER TECH. BETTER LIVING.',headline:'Gadgets & electronics',sub:'Discover your next upgrade. From the latest phones to everyday essentials.',image:electro.url,hero:'electro',filters:['All gadgets','Phones','Laptops','Audio','Gaming','Cameras'],promo:'Your next upgrade starts here.',note:'Explore electronics'},
 {id:'foods',label:'Foods',short:'Foods',tag:'FRESH FROM LOCAL SELLERS',headline:'Fresh food. Everyday goodness.',sub:'Farm-fresh produce, pantry favourites and everything for your table.',image:food.url,hero:'food',filters:['All foods','Fruits','Vegetables','Pantry','Dairy & Eggs','Local produce'],promo:'Fresh picks for a healthier you.',note:'Explore foods'},
 {id:'fashion',label:'Fashion & Clothing',short:'Fashion',tag:'WEAR YOUR OWN STORY',headline:'Fashion & clothing',sub:'Modern essentials. Beautiful African prints. A style that is entirely yours.',image:fashion.url,hero:'fashion',filters:['All fashion','Women','Men','Shoes','Bags','Accessories'],promo:'A new season. Your signature style.',note:'Explore fashion'},
 {id:'transport',label:'Transport',short:'Transport',tag:'YOUR NEXT JOURNEY STARTS HERE',headline:'Find your next drive.',sub:'Cars, motorcycles and more. Meet local sellers and make your next move.',image:transport.url,hero:'transport',filters:['All vehicles','Cars','SUVs','Motorcycles','Vans','Commercial'],promo:'A better journey begins with a great find.',note:'Explore vehicles'},
 {id:'property',label:'Houses & Lands',short:'Property',tag:'FIND YOUR PLACE IN UGANDA',headline:'Houses & lands',sub:'From your first plot to your forever home. Find a place to call your own.',image:property.url,hero:'property',filters:['All properties','For sale','For rent','Land','Apartments','Commercial'],promo:'Make room for your next chapter.',note:'Explore properties'},
 {id:'bridals',label:'Bridals',short:'Bridals',tag:'FOR YOUR FOREVER MOMENTS',headline:'Bridals & beautiful beginnings',sub:'Discover exquisite jewellery, dreamy gowns and the details that make it yours.',image:bridal.url,hero:'bridal',filters:['All bridals','Jewellery','Rings','Gowns','Accessories','Bouquets'],promo:'A little sparkle. A lifetime of memories.',note:'Explore bridals'},
] as const;
export type Category = typeof categories[number];
export const getCategory = (id: string) => categories.find(c => c.id === id);
export type Listing = Database['public']['Tables']['listings']['Row'] & {seller_profiles:Database['public']['Tables']['seller_profiles']['Row'] | null; photos?:string[]};
export const money = (value:number) => `UGX ${new Intl.NumberFormat('en-UG',{maximumFractionDigits:0}).format(value)}`;
export function filterListings(items:Listing[], search:string, location:string, sort:string) {
 const q=search.toLowerCase().trim();
 return items.filter(i=>(!q || `${i.title} ${i.description} ${i.category}`.toLowerCase().includes(q)) && (!location || i.location.toLowerCase().includes(location.toLowerCase()))).sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
}
export function metadata(title:string, description:string) {return {meta:[{title:`${title} | UGAVERT`},{name:'description',content:description},{property:'og:title',content:`${title} | UGAVERT`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}
