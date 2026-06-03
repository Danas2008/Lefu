import { Reservation } from "@/types";
import { formatDate, formatTime } from "./utils";

export function reservationConfirmationEmail(reservation: Reservation): {
  subject: string;
  html: string;
} {
  const subject = `Potvrzení rezervace — Lefu Čínská restaurace`;
  const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potvrzení rezervace</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0F0F0F; font-family: Georgia, serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; }
    .header { background: linear-gradient(135deg, #8B0000, #4B0000); padding: 40px 30px; text-align: center; }
    .header-logo { font-size: 14px; color: #D4AF37; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px; }
    .header-title { font-size: 28px; color: #FFFFFF; margin: 0 0 8px; }
    .header-subtitle { font-size: 14px; color: #D4AF37; margin: 0; letter-spacing: 2px; }
    .divider { height: 2px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 0; }
    .body { padding: 40px 30px; }
    .greeting { font-size: 16px; color: #E0E0E0; margin-bottom: 24px; }
    .confirmed-badge { display: inline-block; background-color: #1a3a1a; border: 1px solid #2a6a2a; color: #4CAF50; padding: 8px 20px; border-radius: 4px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px; }
    .details-card { background-color: #111111; border: 1px solid #2A2A2A; border-left: 4px solid #D4AF37; border-radius: 4px; padding: 24px; margin-bottom: 30px; }
    .details-title { font-size: 11px; color: #D4AF37; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 20px; }
    .detail-row { display: flex; margin-bottom: 12px; border-bottom: 1px solid #2A2A2A; padding-bottom: 12px; }
    .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .detail-label { font-size: 12px; color: #888; letter-spacing: 1px; text-transform: uppercase; width: 140px; flex-shrink: 0; padding-top: 2px; }
    .detail-value { font-size: 15px; color: #F0F0F0; }
    .info-box { background-color: #0F0F0F; border: 1px solid #2A2A2A; border-radius: 4px; padding: 20px 24px; margin-bottom: 30px; }
    .info-box p { font-size: 14px; color: #888; margin: 0 0 8px; line-height: 1.6; }
    .info-box p:last-child { margin: 0; }
    .cta-button { display: block; background: linear-gradient(135deg, #8B0000, #6B0000); color: #FFFFFF; text-align: center; padding: 16px 30px; border-radius: 4px; text-decoration: none; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px; }
    .footer { background-color: #111111; padding: 30px; text-align: center; border-top: 1px solid #2A2A2A; }
    .footer-name { font-size: 16px; color: #D4AF37; margin: 0 0 8px; }
    .footer-address { font-size: 13px; color: #666; margin: 0 0 4px; }
    .footer-contact { font-size: 13px; color: #666; margin: 0; }
    .footer-chinese { font-size: 20px; color: #8B0000; margin: 20px 0 0; letter-spacing: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">樂福</div>
      <h1 class="header-title">Lefu Čínská restaurace</h1>
      <p class="header-subtitle">Autentická čínská kuchyně v srdci Prahy</p>
    </div>
    <div class="divider"></div>
    <div class="body">
      <p class="greeting">Vážený/á ${reservation.first_name} ${reservation.last_name},</p>
      <p style="color:#888;font-size:15px;margin-bottom:24px;">
        Těší nás, že jste si vybrali Lefu Čínskou restauraci. Níže naleznete podrobnosti vaší rezervace.
      </p>
      <div class="confirmed-badge">✓ Rezervace potvrzena</div>
      <div class="details-card">
        <p class="details-title">Detaily rezervace</p>
        <div class="detail-row">
          <span class="detail-label">Datum</span>
          <span class="detail-value">${formatDate(reservation.date)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Čas</span>
          <span class="detail-value">${formatTime(reservation.time)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Počet hostů</span>
          <span class="detail-value">${reservation.guests} ${reservation.guests === 1 ? "osoba" : reservation.guests <= 4 ? "osoby" : "osob"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Číslo rezervace</span>
          <span class="detail-value" style="font-size:12px;color:#D4AF37;">${reservation.id.toUpperCase().slice(0, 8)}</span>
        </div>
        ${reservation.notes ? `
        <div class="detail-row">
          <span class="detail-label">Poznámka</span>
          <span class="detail-value">${reservation.notes}</span>
        </div>
        ` : ""}
      </div>
      <div class="info-box">
        <p><strong style="color:#D4AF37;">Prosíme mějte na paměti:</strong></p>
        <p>• Rezervace platí na 2 hodiny od vámi zvoleného času.</p>
        <p>• V případě zpoždění více než 15 minut nás prosím informujte telefonicky.</p>
        <p>• Zrušení rezervace je možné nejpozději 2 hodiny před příchodem.</p>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/rezervace" class="cta-button">Upravit nebo zrušit rezervaci</a>
    </div>
    <div class="footer">
      <p class="footer-name">Lefu Čínská restaurace</p>
      <p class="footer-address">Václavské náměstí 1, 110 00 Praha 1</p>
      <p class="footer-contact">+420 222 333 444 · info@lefu-restaurace.cz</p>
      <p class="footer-chinese">樂福</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, html };
}

export function reservationCancellationEmail(reservation: Reservation): {
  subject: string;
  html: string;
} {
  const subject = `Zrušení rezervace — Lefu Čínská restaurace`;
  const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Zrušení rezervace</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0F0F0F; font-family: Georgia, serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; }
    .header { background: linear-gradient(135deg, #2A2A2A, #1A1A1A); padding: 40px 30px; text-align: center; }
    .header-title { font-size: 24px; color: #FFFFFF; margin: 0 0 8px; }
    .header-subtitle { font-size: 14px; color: #D4AF37; margin: 0; }
    .body { padding: 40px 30px; }
    .cancelled-badge { display: inline-block; background-color: #3a1a1a; border: 1px solid #6a2a2a; color: #ef4444; padding: 8px 20px; border-radius: 4px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px; }
    .details-card { background-color: #111; border: 1px solid #2A2A2A; border-left: 4px solid #888; border-radius: 4px; padding: 24px; margin-bottom: 30px; }
    .detail-row { display: flex; margin-bottom: 12px; border-bottom: 1px solid #2A2A2A; padding-bottom: 12px; }
    .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .detail-label { font-size: 12px; color: #888; text-transform: uppercase; width: 140px; flex-shrink: 0; }
    .detail-value { font-size: 15px; color: #F0F0F0; }
    .cta-button { display: block; background: linear-gradient(135deg, #8B0000, #6B0000); color: #fff; text-align: center; padding: 16px 30px; border-radius: 4px; text-decoration: none; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px; }
    .footer { background-color: #111; padding: 30px; text-align: center; border-top: 1px solid #2A2A2A; }
    .footer-name { font-size: 16px; color: #D4AF37; margin: 0 0 8px; }
    .footer-address { font-size: 13px; color: #666; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="header-title">Lefu Čínská restaurace</h1>
      <p class="header-subtitle">Autentická čínská kuchyně v srdci Prahy</p>
    </div>
    <div class="body">
      <p style="color:#E0E0E0;font-size:16px;margin-bottom:24px;">Vážený/á ${reservation.first_name} ${reservation.last_name},</p>
      <p style="color:#888;font-size:15px;margin-bottom:24px;">Vaše rezervace byla zrušena. Doufáme, že vás uvidíme brzy.</p>
      <div class="cancelled-badge">✗ Rezervace zrušena</div>
      <div class="details-card">
        <div class="detail-row">
          <span class="detail-label">Datum</span>
          <span class="detail-value">${formatDate(reservation.date)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Čas</span>
          <span class="detail-value">${formatTime(reservation.time)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Počet hostů</span>
          <span class="detail-value">${reservation.guests}</span>
        </div>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/rezervace" class="cta-button">Vytvořit novou rezervaci</a>
    </div>
    <div class="footer">
      <p class="footer-name">Lefu Čínská restaurace</p>
      <p class="footer-address">Václavské náměstí 1, 110 00 Praha 1 · +420 222 333 444</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, html };
}
