import {createServerFn} from '@tanstack/react-start';
import {createClient} from '@supabase/supabase-js';
import type {Database} from '@/integrations/supabase/types';
export const getListings = createServerFn({method:'GET'}).handler(async()=>{
 const key=process.env['SUPABASE_PUBLISHABLE_KEY'];const url=process.env['SUPABASE_URL'];
 if(!key||!url) throw new Error('Marketplace connection unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const {data,error}=await client.from('listings').select('*, seller_profiles(*)').eq('status','active').order('created_at',{ascending:false}).limit(200);
 if(error)throw new Error(error.message);
 return await Promise.all((data??[]).map(async item=>{
  const photos=await Promise.all(item.photo_paths.map(async p=>{const {data}=await client.storage.from('listing-photos').createSignedUrl(p,3600);return data?.signedUrl??'';}));
  return {...item,photos:photos.filter(Boolean)};
 }));
});
