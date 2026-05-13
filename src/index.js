const OWNER = "tehleader1";
const REPO = "dojj-command-center";

const sources = [
  { source:"Product Hunt", url:"https://www.producthunt.com", route:"DigitalHut.app", routeUrl:"https://digitalhut.app", category:"startup AI marketplace", color:"#ff6154" },
  { source:"Houzz", url:"https://www.houzz.com", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"home design landscaping", color:"#4dbc15" },
  { source:"ArchDaily", url:"https://www.archdaily.com", route:"SupportRD.com", routeUrl:"https://supportrd.com", category:"architecture design planning", color:"#111827" },
  { source:"Landscape Management", url:"https://landscapemanagement.net", route:"ThePlantManInc.com", routeUrl:"https://theplantmaninc.com", category:"commercial landscaping", color:"#16a34a" },
  { source:"Thomasnet", url:"https://www.thomasnet.com", route:"LasersMarket.com", routeUrl:"https://lasersmarket.com", category:"industrial suppliers equipment", color:"#2563eb" }
];

function slugify(text){
  return text.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function blogHtml(item){

  const shot1 =
    `https://image.thum.io/get/width/1200/crop/800/${item.url}`;

  const shot2 =
    `https://image.thum.io/get/width/1200/crop/800/${item.routeUrl}`;

  return `
<!DOCTYPE html>
<html>
<head>
<title>${item.source} + ${item.route}</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>

body{
background:#020617;
color:white;
font-family:Arial;
margin:0;
line-height:1.6;
}

.hero{
padding:60px 24px;
background:linear-gradient(135deg,${item.color},#020617 70%);
}

.wrap{
max-width:1100px;
margin:auto;
padding:24px;
}

.card{
background:#111827;
border-radius:24px;
padding:24px;
margin:20px 0;
border:1px solid #334155;
}

.grid{
display:grid;
grid-template-columns:1fr;
gap:20px;
}

@media(min-width:760px){
.grid{
grid-template-columns:1fr 1fr;
}
}

img{
max-width:100%;
border-radius:20px;
}

a{
color:#38bdf8;
}

.btn{
display:inline-block;
padding:14px 18px;
background:#38bdf8;
color:#020617;
border-radius:14px;
text-decoration:none;
font-weight:bold;
margin-right:8px;
}

.green{
background:#22c55e;
}

</style>
</head>

<body>

<section class="hero">

<div class="wrap">

<h1>${item.source} + ${item.route}</h1>

<p>
Dojj relationship intelligence route.
</p>

<a class="btn" href="${item.url}" target="_blank">
Visit Source
</a>

<a class="btn green" href="${item.routeUrl}" target="_blank">
Visit Route
</a>

</div>

</section>

<div class="wrap">

<div class="grid">

<div class="card">

<h2>${item.source}</h2>

<p>
<a href="${item.url}" target="_blank">
${item.url}
</a>
</p>

<p>
${item.category}
</p>

</div>

<div class="card">

<h2>${item.route}</h2>

<p>
<a href="${item.routeUrl}" target="_blank">
${item.routeUrl}
</a>
</p>

<p>
Operational Dojj route target.
</p>

</div>

</div>

<div class="grid">

<div class="card">

<h2>External Screenshot</h2>

<img src="${shot1}">

</div>

<div class="card">

<h2>Route Screenshot</h2>

<img src="${shot2}">

</div>

</div>

<div class="card">

<h2>Relationship Summary</h2>

<p>
Dojj matched ${item.source}
with ${item.route}
through category overlap,
traffic relevance,
operational compatibility,
and SEO relationship potential.
</p>

</div>

</div>

</body>
</html>
`;
}

export default {

async fetch(request, env){

const url = new URL(request.url);

if(url.pathname.startsWith("/blog/")){

const raw =
`https://raw.githubusercontent.com/${OWNER}/${REPO}/main${url.pathname}`;

const r = await fetch(raw);

if(r.ok){

return new Response(
await r.text(),
{
headers:{
"content-type":"text/html"
}
}
);

}

return new Response("Blog not found",{status:404});

}

if(url.pathname === "/api/discover"){

const shuffled =
sources
.sort(()=>Math.random()-0.5)
.slice(0,3);

return Response.json({
results:shuffled
});

}

if(url.pathname === "/api/history"){

const gh = await fetch(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/blog`,
{
headers:{
"Authorization":`Bearer ${env.GITHUB_TOKEN}`,
"Accept":"application/vnd.github+json",
"User-Agent":"DojjHistory"
}
}
);

const data = await gh.json();

if(!Array.isArray(data)){

return Response.json({
ok:false,
error:data
});

}

return Response.json({

ok:true,

blogs:data
.filter(x=>x.name.endsWith(".html"))
.map(x=>({

name:x.name,

live:`/blog/${x.name}`,

github:x.html_url

}))
.reverse()

});

}

if(url.pathname === "/api/publish"){

const i =
Number(url.searchParams.get("i") || 0);

const item =
sources[i];

const slug =
slugify(`${item.source}-${item.route}`);

const path =
`blog/${slug}.html`;

const content =
btoa(unescape(encodeURIComponent(blogHtml(item))));

const gh =
await fetch(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
{
method:"PUT",
headers:{
"Authorization":`Bearer ${env.GITHUB_TOKEN}`,
"Accept":"application/vnd.github+json",
"User-Agent":"DojjPublisher"
},
body:JSON.stringify({
message:`Publish ${slug}`,
content
})
}
);

const result =
await gh.json();

return Response.json({
published:gh.ok,
path,
live:`/blog/${slug}.html`,
github:result
});

}

return new Response(`

<!DOCTYPE html>
<html>
<head>

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>

body{
background:#020617;
color:white;
font-family:Arial;
padding:30px;
}

.card{
background:#111827;
padding:24px;
border-radius:20px;
margin:20px 0;
}

button{
width:100%;
padding:14px;
border-radius:12px;
border:0;
background:#38bdf8;
font-weight:bold;
margin-top:10px;
}

a{
color:#38bdf8;
}

</style>

</head>

<body>

<h1>Dojj Command Center</h1>

<div class="card">

<h2>Discovery</h2>

<button onclick="load()">
Load 3 Sources
</button>

<div id="out"></div>

</div>

<div class="card">

<h2>Published Blogs</h2>

<button onclick="historyList()">
Refresh History
</button>

<div id="history"></div>

</div>

<script>

let current=[];

async function load(){

const d =
await fetch('/api/discover')
.then(r=>r.json());

current=d.results;

out.innerHTML =
current.map((x,i)=>\`

<div class="card">

<h3>\${x.source}</h3>

<p>
<a href="\${x.url}" target="_blank">
\${x.url}
</a>
</p>

<p>
Route:
<a href="\${x.routeUrl}" target="_blank">
\${x.route}
</a>
</p>

<p>
\${x.category}
</p>

<a href="/api/preview?i=\${i}" target="_blank">
<button>
Preview Blog
</button>
</a>

<button onclick="publish(\${i})">
Approve + Publish
</button>

</div>

\`).join("");

}

async function publish(i){

const r =
await fetch('/api/publish?i='+i)
.then(r=>r.json());

if(r.published){

alert(
'Published successfully'
);

await historyList();

await load();

}else{

alert(JSON.stringify(r.github));

}

}

async function historyList(){

const d =
await fetch('/api/history')
.then(r=>r.json());

if(!d.ok){

history.innerHTML =
'<p>History failed.</p>';

return;

}

history.innerHTML =
d.blogs.map((b,idx)=>\`

<div class="card">

<h3>
Published Blog \${idx+1}
</h3>

<p>
\${b.name}
</p>

<p>
<a href="\${b.live}" target="_blank">
Open Live Blog
</a>
</p>

<p>
<a href="\${b.github}" target="_blank">
Open GitHub File
</a>
</p>

</div>

\`).join("");

}

load();

historyList();

</script>

</body>
</html>

`,{
headers:{
"content-type":"text/html"
}
});

}

}
