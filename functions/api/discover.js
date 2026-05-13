export async function onRequestGet() {

  return new Response(
    JSON.stringify({
      status: "working",
      message: "Dojj API online"
    }),
    {
      headers: {
        "content-type": "application/json"
      }
    }
  );

}
