
export async function onRequest(context) {

  return Response.json({

    status: "Dojj discovery online",

    results: [

      {

        source:
          "Product Hunt",

        sourceUrl:
          "https://www.producthunt.com",

        title:
          "Product Hunt - Discover Products",

        description:
          "Community driven startup and AI product discovery platform.",

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
          "Houzz - Home Design",

        description:
          "Architecture, landscaping, and home improvement inspiration.",

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

