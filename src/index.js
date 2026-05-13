const OWNER = "tehleader1";
const REPO = "dojj-command-center";

let discoveryPool = [
  { source:"Product Hunt", url:"https://www.producthunt.com", route:"DigitalHut.app", routeUrl:"https://digitalhut.app", category:"startup AI marketplace" },
  { source:"Houzz", url:"https://www.houzz.com", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"home design landscaping" },
  { source:"ArchDaily", url:"https://www.archdaily.com", route:"SupportRD.com", routeUrl:"https://supportrd.com", category:"architecture design planning" },
  { source:"Landscape Management", url:"https://landscapemanagement.net", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"commercial landscaping" },
  { source:"Thomasnet", url:"https://www.thomasnet.com", route:"LasersMarket.com", routeUrl:"https://lasersmarket.com", category:"industrial suppliers equipment" }
];

function slugify(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}

function blogHtml(item){
  const slug = slugify(`${item.source}-${item.route}`);
  const shot = `https://image.thum.io/get/width/1200/crop/800/${item.url}`;
  const icon = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`;

  return `<!DOCTYPE html>
<html>
<head>
<title>${item.source} + ${item.route} | Dojj Relationship</title>
<meta name="description" content="Dojj relationship analysis connecting ${item.source} with ${item.route}.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{background:#020617;color:white;font-family:Arial;padding:30px;line-height:1.6}
.card{background:#111827;border-radius:20px;padding:22px;margin:18px 0}
a{color:#38bdf8}.hero{width:100%;border-radius:18px}
</style>
</head>
<body>
<h1>${item.source} + ${item.route}</h1>
<div class="card">
<img src="${icon}" alt="${item.source} logo">
<p><strong>External Source:</strong> <a href="${item.url}">${item.url}</a></p>
<p><strong>Internal Route:</strong> <a href="${item.routeUrl}">${item.routeUrl}</a></p>
<p><strong>Category Signal:</strong> ${item.category}</p>
</div>

<div class="card">
<h2>Website Screenshot</h2>
<img class="hero" src="${shot}" alt="Screenshot preview of ${item.source}">
</div>

<div class="card">
<h2>Feature-for-Feature Connection</h2>
<p>${item.source} is connected to ${item.category}. Dojj matched that with ${item.route} because the audience, service intent, and operational value overlap.</p>
<ul>
<li>External traffic source: ${item.source}</li>
<li>Internal business route: ${item.route}</li>
<li>Backlink route: ${item.url} → ${item.routeUrl}</li>
<li>Purpose: relationship discovery, referral routing, and SEO-supported operational visibility.</li>
</ul>
</div>

<div class="card">
<h2>Contacts</h2>
<p>Dojj / general coordination: 980-230-6202</p>
<p>Email: zzzanthony123@gmail.com</p>
<p>PlantMan direct only: 704-533-5163</p>
</div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/discover") {
      return Response.json({ results: discoveryPool.slice(0,3) });
    }

    if (url.pathname === "/api/preview") {
      const i = Number(url.searchParams.get("i") || 0);
      return new Response(blogHtml(discoveryPool[i]), {headers:{"content-type":"text/html"}});
    }

    if (url.pathname === "/api/publish") {
      const i = Number(url.searchParams.get("i") || 0);
      const item = discoveryPool[i];
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
        body:JSON.stringify({
          message:`Publish Dojj relationship blog: ${slug}`,
          content
        })
      });

      const result = await gh.json();
      return Response.json({ published: gh.ok, path, url:`/blog/${slug}.html`, github:result });
    }

    return new Response(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{background:#020617;color:white;font-family:Arial;padding:35px}
.card{background:#111827;border-radius:20px;padding:22px;margin:18px 0}button{background:#38bdf8;border:0;border-radius:12px;padding:14px;font-weight:bold;width:100%;margin:6px 0}a{color:#38bdf8}
</style></head><body>
<h1>Dojj Command Center</h1>
<div class="card"><h2>Live Discovery</h2><button onclick="load()">Load 3 External Sources</button><div id="out"></div></div>
<script>
async function load(){
 const d=await fetch('/api/discover').then(r=>r.json());
 out.innerHTML=d.results.map((x,i)=>\`
 <div class="card"><h3>\${x.source}</h3><p><a href="\${x.url}" target="_blank">\${x.url}</a></p><p>Route: <a href="\${x.routeUrl}">\${x.route}</a></p><p>\${x.category}</p>
 <a href="/api/preview?i=\${i}" target="_blank"><button>Preview Blog</button></a>
 <button onclick="publish(\${i})">Approve + Publish</button></div>\`).join('');
}
async function publish(i){
 const r=await fetch('/api/publish?i='+i).then(r=>r.json());
 alert(r.published ? 'Published: '+r.url : 'Publish failed. Check GITHUB_TOKEN.');
}
</script></body></html>`, {headers:{"content-type":"text/html"}});
  }
}
