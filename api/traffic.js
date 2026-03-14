export default async function handler(req, res) {

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const url = req.url;
  const method = req.method;
  const time = new Date().toISOString();

  const data = {
    ip,
    url,
    method,
    userAgent,
    time
  };

  console.log(data);

  await fetch("https://shuffler.io/api/v1/hooks/webhook_a8318874-30e5-4b34-8bb0-07eaf3918d30", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  res.status(200).json({message:"logged"});
}
