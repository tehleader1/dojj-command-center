const OWNER = "tehleader1";
const REPO = "dojj-command-center";

const sources = [
  { source:"Product Hunt", url:"https://www.producthunt.com", route:"DigitalHut.app", routeUrl:"https://digitalhut.app", category:"startup AI marketplace", color:"#ff6154" },
  { source:"Houzz", url:"https://www.houzz.com", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"home design landscaping", color:"#4dbc15" },
  { source:"ArchDaily", url:"https://www.archdaily.com", route:"SupportRD.com", routeUrl:"https://supportrd.com", category:"architecture design planning", color:"#111827" },
  { source:"Landscape Management", url:"https://landscapemanagement.net", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"commercial landscaping", color:"#16a34a" },
  { source:"Thomasnet", url:"https://www.thomasnet.com", route:"LasersMarket.com", routeUrl:"https://lasersmarket.com", category:"industrial suppliers equipment", color:"#2563eb" },
  { source:"Dezeen", url:"https://www.dezeen.com", route:"SupportRD.com", routeUrl:"https://supportrd.com", category:"design architecture products", color:"#111111" }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function blogHtml(item) {
  const sourceHost = new URL(item.url).hostname;
  const routeHost = new URL(item.routeUrl).hostname;
  const shot1 = `https://image.thum.io/get/width/1200/crop/800/${item.url}`;
  const shot2 = `https://image.thum.io/get/width/1200/crop/800/${item.routeUrl}`;
  const icon1 = `https://www.google.com/s2/favicons?domain=${sourceHost}&sz=128`;
  const icon2 = `https://www.google.com/s2/favicons?domain=${routeHost}&sz=128`;

  return `<!DOCTYPE html>
<html>
<head>
<title>${item.source} + ${item.route} | Dojj Relationship Intelligence</title>
<meta name="description" content="Dojj relationship page connecting ${item.source} with ${item.route} through product, service, design, and traffic-aligned business signals.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{margin:0;background:#020617;color:white;font-family:Arial,sans-serif;line-height:1.6}
.hero{padding:50px 24px;background:linear-gradient(135deg,${item.color},#020617 65%);}
.wrap{max-width:1100px;margin:auto;padding:24px}
.card{background:#111827;border:1px solid #334155;border-radius:24px;padding:24px;margin:22px 0}
.grid{display:grid;grid-template-columns:1fr;gap:20px}
@media(min-width:760px){.grid{grid-template-columns:1fr 1fr}}
img{max-width:100%;border-radius:18px}
.logo{width:64px;height:64px;background:white;padding:10px;border-radius:18px}
a{color:#38bdf8}
.cta{display:inline-block;background:#38bdf8;color:#020617;text-decoration:none;padding:14px 20px;border-radius:14px;font-weight:bold;margin:6px 6px 6px 0}
.green{background:#22c55e}
.tag{color:#38bdf8;font-weight:bold;text-transform:uppercase}
</style>
</head>
<body>

<section class="hero">
  <div class="wrap">
    <div class="tag">Dojj Relationship Intelligence</div>
    <h1>${item.source} + ${item.route}</h1>
    <p>Feature-for-feature connection between an external traffic source and a routed Dojj business asset.</p>
    <a class="cta" href="${item.url}" target="_blank">Visit ${item.source}</a>
    <a class="cta green" href="${item.routeUrl}" target="_blank">Visit ${item.route}</a>
  </div>
</section>

<div class="wrap">

<div class="grid">
  <div class="card">
    <img class="logo" src="${icon1}">
    <h2>${item.source}</h2>
    <p><a href="${item.url}" target="_blank">${item.url}</a></p>
    <p><strong>Detected category:</strong> ${item.category}</p>
  </div>

  <div class="card">
    <img class="logo" src="${icon2}">
    <h2>${item.route}</h2>
    <p><a href="${item.routeUrl}" target="_blank">${item.routeUrl}</a></p>
    <p><strong>Dojj route:</strong> operational match and backlink target.</p>
  </div>
</div>

<div class="grid">
  <div class="card">
    <h2>External Website Screenshot</h2>
    <img src="${shot1}" alt="${item.source} screenshot">
  </div>

  <div class="card">
    <h2>Routed Business Screenshot</h2>
    <img src="${shot2}" alt="${item.route} screenshot">
  </div>
</div>

<div class="card">
  <h2>Feature-for-Feature Match</h2>
  <ul>
    <li><strong>External signal:</strong> ${item.category}</li>
    <li><strong>Internal route:</strong> ${item.route}</li>
    <li><strong>Traffic opportunity:</strong> relationship content can attract search and referral visibility.</li>
    <li><strong>Backlink path:</strong> ${item.url} → ${item.routeUrl}</li>
  </ul>
</div>

<div class="card">
  <h2>Ad Structure</h2>
  <p><strong>Attention:</strong> ${item.source} audience already shows interest in ${item.category}.</p>
  <p><strong>Offer:</strong> ${item.route} provides the routed business layer for that interest.</p>
  <p><strong>Action:</strong> Use the relationship page to guide traffic toward the correct Dojj business destination.</p>
</div>

<div class="card">
  <h2>Contacts</h2>
  <p>Dojj / general coordination: 980-230-6202</p>
  <p>Email: zzzanthony123@gmail.com</p>
  <p>PlantMan direct only: 704-533-5163</p>
</div>

</div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/blog/")) {
      const raw = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main${url.pathname}`;
      const r = await fetch(raw);
      if (r.ok) return new Response(await r.text(), {headers:{"content-type":"text/html"}});
      return new Response("Blog not found yet. Wait for GitHub/Cloudflare redeploy.", {status:404});
    }

    if (url.pathname === "/api/discover") {
      const shuffled = sources.sort(() => Math.random() - 0.5).slice(0,3);
      return Response.json({ results: shuffled });
    }

    if (url.pathname === "/api/preview") {
      const i = Number(url.searchParams.get("i") || 0);
      return new Response(blogHtml(sources[i]), {headers:{"content-type":"text/html"}});
    }

    if (url.pathname === "/api/publish") {
      const i = Number(url.searchParams.get("i") || 0);
      const item = sources[i];
      const slug = slugify(`${item.source}-${item.route}`);
      const path = `blog/${slug}.html`;
      const content = btoa(unescape(encodeURIComponent(blogHtml(item))));

      const gh = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
        method:"PUT",
        headers:{
          "Authorization":`Bearer ${env.GITHUB_TOKEN}`,
          "Accept":"application/vnd.github+json",
          "User-Agent":"DojjPublisher"
        },
        body:JSON.stringify({ message:`Publish Dojj blog: ${slug}`, content })
      });

      const result = await gh.json();
      return Response.json({ published: gh.ok, path, liveUrl:`/blog/${slug}.html`, githubUrl:result?.content?.html_url || null, error: gh.ok ? null : result });
    }

    return new Response(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{background:#020617;color:white;font-family:Arial;padding:35px}
.card{background:#111827;border-radius:20px;padding:22px;margin:18px 0}button{background:#38bdf8;border:0;border-radius:12px;padding:14px;font-weight:bold;width:100%;margin:6px 0}a{color:#38bdf8}
</style></head><body>
<h1>Dojj Command Center</h1>
<div class="card"><h2>Live Discovery</h2><button onclick="load()">Load 3 External Sources</button><div id="out"></div></div>
<script>
let current=[];
async function load(){
 const d=await fetch('/api/discover').then(r=>r.json());
 current=d.results;
 out.innerHTML=current.map((x,i)=>\`
 <div class="card"><h3>\${x.source}</h3><p><a href="\${x.url}" target="_blank">\${x.url}</a></p><p>Route: <a href="\${x.routeUrl}">\${x.route}</a></p><p>\${x.category}</p>
 <a href="/api/preview?i=\${i}" target="_blank"><button>Preview Blog</button></a>
 <button onclick="publish(\${i})">Approve + Publish</button></div>\`).join('');
}
async function publish(i){
 const r=await fetch('/api/publish?i='+i).then(r=>r.json());
 if(r.published){
   alert('Published successfully: '+r.liveUrl+' — loading 3 new sources next.');
   await load();
 } else {
   alert(JSON.stringify(r.error));
 }
}
load();
</script></body></html>`, {headers:{"content-type":"text/html"}});
  }
}
