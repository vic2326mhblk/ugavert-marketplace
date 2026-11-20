import {createFileRoute,notFound} from '@tanstack/react-router';
import {Storefront} from '@/components/marketplace/storefront';
import {getCategory,metadata} from '@/lib/marketplace/catalog';
import {listingsQuery} from '@/lib/marketplace/queries';
export const Route=createFileRoute('/category/$category')({loader:async({params,context})=>{const category=getCategory(params.category);if(!category)throw notFound();await context.queryClient.ensureQueryData(listingsQuery);return {category};},head:({loaderData})=>metadata(loaderData?.category.label??'Section unavailable',loaderData?.category.sub??'Discover local finds on UGAVERT.'),component:CategoryPage});
function CategoryPage(){const {category}=Route.useLoaderData();return <Storefront key={category.id} category={category}/>;}
