export default function NotFound(){return <main className="container"><h1>요청한 페이지가 없습니다.</h1><a href={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/'}>도시락 찾기로</a></main>;}
