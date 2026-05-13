
export default {

  async fetch(request) {

    const url = new URL(request.url);

    if (url.pathname === "/api/discover") {

      return Response.json({

        status: "Dojj discovery online",

        results: [

          {

            source:
              "Product Hunt",

            sourceUrl:
              "https://www.producthunt.com",

            title:
              "Product Hunt",

            description:
              "Startup and AI marketplace discovery.",

            category:
              "startup marketplace",

            suggestedRoute:
              "DigitalHut.app",

            suggestedRouteUrl:
              "https://digitalhut.app",

            confidence:
              91

          },

          {

            source:
              "Houzz",

            sourceUrl:
              "https://www.houzz.com",

            title:
              "Houzz",

            description:
              "Architecture and landscaping inspiration.",

            category:
              "architecture landscaping",

            suggestedRoute:
              "ThePlantManInc.com",

            suggestedRouteUrl:
              "https://theplantmaninc.com",

            confidence:
              88

          }

        ]

      });

    }

    return new Response(`

<!DOCTYPE html>
<html>
<head>

<title>Dojj Command Center</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>

body {
  background:#020617;
  color:white;
  font-family:Arial;
  padding:40px;
}

.card {
  background:#111827;
  border-radius:20px;
  padding:24px;
}

button {
  background:#38bdf8;
  color:black;
  border:0;
  padding:14px;
  border-radius:12px;
  font-weight:bold;
  width:100%;
}

a {
  color:#38bdf8;
}

</style>

</head>

<body>

<h1>Dojj Command Center</h1>

<div class="card">

<h2>Live Discovery</h2>

<button onclick="runDiscovery()">
Run Live Discovery
</button>

<div id="results"></div>

</div>

<script>

async function runDiscovery() {

  const response =
    await fetch("/api/discover");

  const data =
    await response.json();

  document.getElementById(
    "results"
  ).innerHTML = data.results.map(item => \`

    <div style="margin-top:20px;">

      <h3>\${item.title}</h3>

      <p>

        <a href="\${item.sourceUrl}" target="_blank">

          \${item.sourceUrl}

        </a>

      </p>

      <p>

        \${item.description}

      </p>

      <p>

        Suggested Route:

        <a href="\${item.suggestedRouteUrl}" target="_blank">

          \${item.suggestedRoute}

        </a>

      </p>

      <p>

        Confidence:
        \${item.confidence}%

      </p>

    </div>

  \`).join("");

}

</script>

</body>
</html>

`, {

      headers: {

        "content-type":
          "text/html"

      }

    });

  }

}

