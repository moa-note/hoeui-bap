const fs=require('node:fs'),path=require('node:path');
const target=path.resolve('docs');if(target!==path.join(process.cwd(),'docs'))throw Error('unexpected output path');if(fs.existsSync(target))fs.rmSync(target,{recursive:true,force:true});fs.cpSync(fs.existsSync('.next-pages/index.html')?'.next-pages':'out',target,{recursive:true});fs.writeFileSync(path.join(target,'.nojekyll'),'');console.log('GitHub Pages: docs 폴더 생성 완료');

