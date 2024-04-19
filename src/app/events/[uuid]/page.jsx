export default async function EventPage({ params }) {
  const uuid = params.uuid;

  let headersList = {
    Accept: "application/json",
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let response = await fetch("https://szvdpeocqojvcebknuak.supabase.co/rest/v1/events?id=eq." + uuid, { headers: headersList });

  let data = await response.json();
  console.log(data);
  const eventInfo = data[0];

  return (
    <div>
      <article>
        <h1>{eventInfo.name}</h1>
        <dl>
          <dt className="font-bold">Hvornår:</dt>
          <dd>{eventInfo.when}</dd>
        </dl>
        <p className="font-bold">Nice to know:</p>
        <p>{eventInfo.description}</p>
      </article>
    </div>
  );
}
