const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
(async () => {
 const root = path.resolve(__dirname, '../backend/seeds');
 const assets = Object.entries(JSON.parse(fs.readFileSync(path.join(root,'service-images.json'))).assets);
 for(let start=0; start<assets.length; start+=24) {
  const parts=[];
  for(let i=0; i<Math.min(24,assets.length-start); i++) {
   const [key,a]=assets[start+i];
   const input=path.join(__dirname,'public',a.local_path);
   if (!fs.existsSync(input)) {console.log('Missing',key);continue;}
   const buffer=await sharp(input).resize(240,120,{fit:'inside'}).toBuffer();
   parts.push({input:buffer,left:(i%4)*250,top:Math.floor(i/4)*150});
   const label=`${start+i} ${a.title.slice(0,32)}`.replace(/&/g,'&amp;').replace(/</g,'&lt;');
   parts.push({input:Buffer.from(`<svg width="245" height="25"><text x="2" y="15" font-size="11">${label}</text></svg>`),left:(i%4)*250,top:Math.floor(i/4)*150+122});
  }
  await sharp({create:{width:1000,height:900,channels:3,background:'white'}}).composite(parts).jpeg().toFile(path.join(root,`image-research/review-${start/24}.jpg`));
 }
 fs.writeFileSync(path.join(root,'image-research/review-index.json'),JSON.stringify(assets.map(([key])=>key)));
})();
