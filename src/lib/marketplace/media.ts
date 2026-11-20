const assets=import.meta.glob<{default:{url:string}}>('/src/assets/*.asset.json',{eager:true});
export function imageFor(value:string){if(!value.startsWith('asset:'))return value;return assets[`/src/assets/${value.slice(6)}.webp.asset.json`]?.default.url??'';}
