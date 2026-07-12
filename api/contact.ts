type RequestLike={method?:string;body?:unknown}; type ResponseLike={status:(code:number)=>ResponseLike;json:(body:unknown)=>void};
type ContactBody={name?:unknown;email?:unknown;message?:unknown;website?:unknown};
const clean=(value:unknown,max:number)=>typeof value==="string"?value.trim().slice(0,max):"";
const escapeHtml=(value:string)=>value.replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]??char));

export default async function handler(req:RequestLike,res:ResponseLike){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  const body=(req.body??{}) as ContactBody; if(clean(body.website,200))return res.status(200).json({ok:true});
  const name=clean(body.name,100),email=clean(body.email,254),message=clean(body.message,5000);
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||message.length<10)return res.status(400).json({error:"Please provide a valid name, email, and message."});
  const apiKey=process.env.RESEND_API_KEY,contactEmail=process.env.CONTACT_EMAIL;
  if(!apiKey||!contactEmail)return res.status(503).json({error:"Contact service is not configured."});
  try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Portfolio Contact <onboarding@resend.dev>",to:[contactEmail],reply_to:email,subject:`Portfolio message from ${name}`,html:`<h2>New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g,"<br>")}</p>`})});
    if(!response.ok){console.error("Resend rejected contact email",response.status);return res.status(502).json({error:"Email delivery failed."});}
    return res.status(200).json({ok:true});
  }catch(error){console.error("Contact endpoint failed",error);return res.status(500).json({error:"Email delivery failed."});}
}
