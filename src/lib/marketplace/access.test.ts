import {describe,it,expect} from 'vitest';
import {categories,filterListings,type Listing} from './catalog';
describe('UGAVERT marketplace rules',()=>{
 it('keeps all six requested marketplace sections separate',()=>{expect(categories.map(c=>c.id)).toEqual(['electronics','foods','fashion','transport','property','bridals']);});
 it('shows all matching listings on Home and limits search to the requested item',()=>{const base={description:'',location:'Kampala',created_at:'2026-01-01'};const items=[{...base,id:'a',title:'Apple iPhone',category:'electronics',price:200},{...base,id:'b',title:'Fresh apples',category:'foods',price:100}] as Listing[];expect(filterListings(items,'','', 'price-low').map(i=>i.id)).toEqual(['b','a']);expect(filterListings(items,'iPhone','','').map(i=>i.id)).toEqual(['a']);});
});
