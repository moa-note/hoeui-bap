import {avgReview, adjustedReview, validOrder, type Vendor} from './data';
export type SearchOptions={budget:number;quantity:number;category:string;mode:string;sort:string};
export function searchMenus(items:Vendor[],o:SearchOptions){
 const name=(a:Vendor,b:Vendor)=>a.name.localeCompare(b.name,'ko')||a.menu.name.localeCompare(b.menu.name,'ko')||a.menu.id.localeCompare(b.menu.id);
 const recent=(a:Vendor,b:Vendor)=>(b.verifiedAt||'').localeCompare(a.verifiedAt||'');
 const group=(v:Vendor)=>avgReview(v)===null?0:v.reviews.length>=3?2:1;
 return items.filter(v=>Number.isInteger(v.menu.price)&&v.menu.price>=10000&&v.menu.price<=50000&&v.menu.price<=o.budget&&validOrder(v,o.quantity)&&(o.category==='전체'||v.category===o.category)&&(o.mode==='전체'?(v.delivery===true||v.pickup===true):o.mode==='배달'?v.delivery===true:v.pickup===true)).sort((a,b)=>{
  if(o.sort==='price')return a.menu.price-b.menu.price||recent(a,b)||name(a,b);
  if(o.sort==='recent')return recent(a,b)||name(a,b);
  if(o.sort==='rating')return group(b)-group(a)||(adjustedReview(b)??-1)-(adjustedReview(a)??-1)||b.reviews.length-a.reviews.length||name(a,b);
  return recent(a,b)||(o.budget-a.menu.price)-(o.budget-b.menu.price)||name(a,b);
 });
}
export function validPhone(phone:string){return /^\+?[\d\s()-]{7,25}$/.test(phone)&&phone.replace(/\D/g,'').length>=7;}
export function validAddress(address:string){return Boolean(address.trim())&&!address.includes('가상');}
export function mapLink(value:string|undefined,address:string){if(!value)return '';try{const u=new URL(value);if(u.protocol==='https:'&&u.hostname==='naver.me'&&!u.username&&!u.password&&!u.port&&/^\/[A-Za-z0-9]{6,20}$/.test(u.pathname)&&!u.search)return u.href;if(!validAddress(address))return '';if(u.protocol!=='https:'||u.username||u.password||u.port||!['map.naver.com','place.map.kakao.com','map.kakao.com','maps.google.com','www.google.com'].includes(u.hostname)||(u.hostname==='www.google.com'&&!u.pathname.startsWith('/maps')))return '';return u.href;}catch{return '';}}
export function deliveryFeeForOrder(v:Vendor,qty:number){return v.freeDeliveryFrom!=null&&v.menu.price*qty>=v.freeDeliveryFrom?0:v.deliveryFee;}
export function orderCost(v:Vendor,qty:number,mode:string){const food=v.menu.price*qty,fee=deliveryFeeForOrder(v,qty);return {food,total:mode==='배달'&&fee!==null?food+fee:null};}
export function browseMenus(items:Vendor[],priceBand=0){return items.filter(v=>Number.isInteger(v.menu.price)&&v.menu.price>=10000&&v.menu.price<=50000&&(!priceBand||Math.floor(v.menu.price/10000)===priceBand)).sort((a,b)=>a.menu.price-b.menu.price||a.name.localeCompare(b.name,'ko')||a.menu.name.localeCompare(b.menu.name,'ko'));}

