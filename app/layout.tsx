import type {Metadata} from 'next';import './style.css';
export const metadata:Metadata={title:'회의밥 | 부산대 회의 도시락 정보',description:'부산대 배달·포장 도시락 검색과 추천'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
