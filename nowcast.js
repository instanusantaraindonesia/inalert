module.exports=async function(req,res){
  try{
    const r=await fetch('https://www.bmkg.go.id/alerts/nowcast/id',{headers:{'accept':'application/xml,text/xml,*/*'}});
    if(!r.ok)throw Error('BMKG '+r.status);
    const xml=await r.text();
    const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(m=>m[1]);
    const clean=s=>String(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]+>/g,'').trim();
    const tag=(s,n)=>{const m=s.match(new RegExp('<'+n+'[^>]*>([\\s\\S]*?)<\\/'+n+'>','i'));return m?clean(m[1]):''};
    const alerts=items.map(x=>({title:tag(x,'title'),description:tag(x,'description'),link:tag(x,'link'),pubDate:tag(x,'pubDate'),author:tag(x,'author')})).filter(x=>x.title||x.description);
    res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=180');
    res.status(200).json({source:'BMKG',updated_at:new Date().toISOString(),count:alerts.length,alerts});
  }catch(e){res.status(502).json({error:'Gagal mengambil peringatan dini cuaca BMKG'})}
}
