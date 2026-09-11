const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function createEnquiryMailTemplate({ id, name, email, phone, company, subject, message }) {
    const fields = [["Name", name], ["Email", email], ["Phone", phone || "Not provided"], ["Company", company || "Not provided"], ["Service Required", subject || "General enquiry"]];
    const replyUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Quote request #${id} - ${subject || "General enquiry"}`)}`;
    return {
        subject: `New quote request #${id}: ${subject || "General enquiry"}`,
        text: ["Pujara Print N Pack — New Quote Request", `Request #${id}`, ...fields.map(([label, value]) => `${label}: ${value}`), "", "Requirements:", message, "", "Reply to this email to respond directly to the customer.", "Received from pujaraprintnpack.com"].join("\n"),
        html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>New Quote Request</title></head>
<body style="margin:0;background:#f8f7fb;font-family:Arial,Helvetica,sans-serif;color:#343957">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:20px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px"><tr><td style="padding:20px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center"><img src="cid:pujara-logo@pujaraprintnpack.com" width="170" alt="PUJARA PRINT N PACK" style="display:block;width:170px;max-width:100%;height:auto"><p style="margin:4px 0 12px;font-size:12px;color:#626986">Pujara Print N Pack</p></td></tr>
<tr><td height="4" style="height:4px;background:#7926ca;background:linear-gradient(90deg,#5900cc,#d91d9b,#ff9500);border-radius:4px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:18px 0 16px"><h1 style="margin:0 0 8px;color:#35008b;font-size:28px;line-height:1.2">New Quote Request</h1><p style="margin:0;color:#626986;font-size:14px;line-height:1.5">A new quote request was submitted through the Contact Us form.</p></td></tr>
<tr><td><table width="100%" cellpadding="10" cellspacing="0" style="border:1px solid #e6dfff;border-radius:5px;table-layout:fixed">${fields.map(([label, value]) => `<tr><th align="left" width="29%" style="background:#f3eeff;color:#4e0aa3;border-bottom:1px solid #eee8fc;font-size:13px;vertical-align:top">${label}:</th><td style="background:#fcfbff;border-bottom:1px solid #eee8fc;font-size:14px;line-height:1.4;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</td></tr>`).join("")}</table></td></tr>
<tr><td style="padding-top:14px"><div style="padding:14px;background:#f5f0ff;border:1px solid #e6dfff;border-radius:5px;font-size:14px;line-height:1.4;overflow-wrap:anywhere;word-break:break-word"><h2 style="margin:0 0 8px;font-size:14px;color:#400991">Requirements:</h2>${escapeHtml(message).replace(/\r?\n/g, "<br>")}</div></td></tr>
<tr><td align="center" style="padding:18px 0"><a href="${escapeHtml(replyUrl)}" style="display:inline-block;padding:13px 30px;border-radius:30px;background:#ff6818;background:linear-gradient(110deg,#ff8510,#ff3c30);color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold">REPLY TO CUSTOMER &rarr;</a></td></tr>
<tr><td align="center" style="border-top:1px solid #e6e8ef;padding-top:16px;font-size:12px;color:#626986;line-height:1.6">Received from <a href="https://pujaraprintnpack.com" style="color:#626986;text-decoration:none;font-weight:bold">pujaraprintnpack.com</a><br>Quote request #${escapeHtml(id)}</td></tr>
</table></td></tr></table></td></tr></table></body></html>`,
    };
}
