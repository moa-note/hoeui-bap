'use client';
import {useEffect,useState} from 'react';
import VendorDetail from './vendor-detail';
import Directory,{initialDirectoryState} from './directory';
type Policy=unknown;
import CommunityPanel from './community-panel';
import {contributionUrl,sourceLabel,type ContributionConfig} from '../lib/contributions';

import {searchMenus,validPhone,validAddress,mapLink,orderCost,deliveryFeeForOrder} from '../lib/search';
import {Search,MapPin,Phone,Plus,ArrowLeft,CheckCircle2,ShieldCheck,UtensilsCrossed,Truck,ShoppingBag,ImageIcon} from 'lucide-react';
import {avgReview,demoVendors,priceWon,validOrder,type Vendor} from '../lib/data';
type Page='home'|'detail'|'suggest';
export default function Home({initial,demo,preview=false,loadError,policy,advanced=false,contributionConfig}:{advanced?:boolean;contributionConfig:ContributionConfig;initial:Vendor[],demo:boolean;preview?:boolean;loadError:boolean;policy:Policy}){
 const [directoryState,setDirectoryState]=useState(initialDirectoryState);
 const [page,setPage]=useState<Page>('home'),[chosen,setChosen]=useState<Vendor>(initial[0]||demoVendors[0]),[detailTab,setDetailTab]=useState('menu'),[orderQty,setOrderQty]=useState(15),[photoIndex,setPhotoIndex]=useState(0);
 useEffect(()=>{const updated=initial.find(v=>v.menu.id===chosen.menu.id);if(updated)setChosen(updated);else if(page==='detail')setPage('home');},[initial]);
 const [receive,setReceive]=useState('배달');
 const cost=orderCost(chosen,orderQty,receive);
 const jump=(p:Page)=>{setPage(p);window.scrollTo({top:0,behavior:'auto'})};
 const selectVendor=(v:Vendor,qty=15)=>{setChosen(v);setPhotoIndex(0);setOrderQty(qty);setDetailTab('menu');setReceive(v.delivery===true?'배달':'방문 포장');jump('detail')};
 return <><header className="header"><div className="header-inner"><button className="brand" onClick={()=>jump('home')}><span className="logo"><UtensilsCrossed size={22}/></span><span><strong>회의밥</strong><small>부산대 회의 도시락 가이드</small></span></button><nav><button className={page==='home'?'nav-on':''} onClick={()=>jump('home')}>도시락 찾기</button><button className={page==='suggest'?'nav-on':''} onClick={()=>{jump('suggest')}}>추천·수정 제안</button></nav></div></header>
 <main className="container">{demo&&<div className="demo"><ShieldCheck size={17}/><span><strong>데모 모드:</strong> 화면에 표시된 업체·연락처·후기는 모두 가상 정보입니다. 실제 추천 접수는 운영 정책과 서비스 설정 확인 후 활성화됩니다.</span></div>}
 {preview&&<div className="demo" role="status"><ShieldCheck size={17}/><span><strong>사용자 제공 자료 · 로컬 미리보기:</strong> 사용자가 제공한 업체 정보와 사진입니다. 가상 업체와 섞이지 않으며 DB에는 저장되지 않습니다. 직접 업체에 확인한 자료는 ‘업체 확인일’을 별도로 표시합니다.</span></div>}
 {page==='home'&&<>{loadError&&<div role="alert" className="privacy">정보를 불러오지 못했습니다. <button className="btn secondary" onClick={()=>location.reload()}>다시 시도</button></div>}<Directory initial={initial} state={directoryState} setState={setDirectoryState} onSelect={selectVendor} onSuggest={()=>jump('suggest')}/></>}
 {page==='detail'&&<VendorDetail vendor={chosen} menus={initial.filter(v=>v.id===chosen.id)} quantity={orderQty} setQuantity={setOrderQty} onChoose={setChosen} onBack={()=>jump('home')} onSuggest={()=>jump('suggest')} config={contributionConfig}/>}
 {page==='suggest'&&<CommunityPanel config={contributionConfig} onHome={()=>jump('home')}/>}
 
 </main><footer className="footer"><span>회의밥 · 비공식 도시락 정보 공유 서비스</span><span>메뉴·가격·배달 조건은 주문 전 업체에 확인해 주세요.</span></footer></>;
}


