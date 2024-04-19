import { redirect } from "next/navigation";

export default async function AddEventPage() {
  async function submit(formData) {
    "use server";
    let headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };
    // console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    let bodyContent = JSON.stringify({
      name: formData.get("name"),
      when: formData.get("when"),
      description: formData.get("description"),
    });

    let response = await fetch("https://szvdpeocqojvcebknuak.supabase.co/rest/v1/events", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    // console.log(data);
    const id = data[0].id;
    redirect("/events/" + id);
  }
  return (
    <form action={submit}>
      <div className="formcontrol">
        <label htmlFor="form_name">Titel</label>
        <input id="form_name" type="text" name="name"></input>
      </div>
      <div className="formcontrol">
        <label htmlFor="form_when">Hvornår</label>
        <input id="form_when" type="date" name="when"></input>
      </div>
      <div className="formcontrol">
        <label htmlFor="form_description">Andet du vil sige</label>
        <input id="form_description" type="text" name="description"></input>
      </div>
      <button>Gem</button>
    </form>
  );
}
