import Home from './ui';
import data from '../data/local-vendors.json';
import contributionConfig from '../data/contribution-form.json';
import type {Vendor} from '../lib/data';
export const dynamic='force-static';
export default function Page(){const base=process.env.NEXT_PUBLIC_BASE_PATH||'';const asset=(value:string)=>value.startsWith('/')?base+value:value;const vendors=data.vendors.map(v=>({...v,menu:{...v.menu,photoUrl:asset(v.menu.photoUrl),photoUrls:v.menu.photoUrls.map(asset)}})) as Vendor[];return <Home initial={vendors} demo={false} loadError={false} policy={null} contributionConfig={contributionConfig}/>;}
