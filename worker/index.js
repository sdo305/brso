const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function handleSend(env, body) {
  const chatMap = { clicks: env.CHAT_CLICKS, important: env.CHAT_IMPORTANT };
  const chat_id = chatMap[body.channel] || env.CHAT_IMPORTANT;

  const payload = { chat_id, text: body.text, parse_mode: 'HTML' };
  if (body.reply_markup) {
    try {
      payload.reply_markup = typeof body.reply_markup === 'string'
        ? JSON.parse(body.reply_markup) : body.reply_markup;
    } catch {}
  }

  const result = await tg(env, 'sendMessage', payload);
  return json({ ok: true, message_id: result.ok ? result.result.message_id : null });
}

async function handleCheckIp(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,isp,org,proxy,hosting,mobile,query`,
      { signal: ctrl.signal }
    );
    clearTimeout(tid);
    const d = await r.json();
    if (d.status === 'success') {
      return json({
        ok: true, ip: d.query, country: d.countryCode, isp: d.isp,
        org: d.org, proxy: d.proxy, hosting: d.hosting, mobile: d.mobile,
        suspicious: d.proxy || d.hosting,
      });
    }
  } catch {}
  return json({ ok: true, ip, country: '', isp: '', org: '', proxy: false, hosting: false, mobile: false, suspicious: false });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    const path = new URL(request.url).pathname;

    if (request.method === 'GET' && path === '/geo') {
      return json({
        ok: true,
        country: request.headers.get('CF-IPCountry') || '',
        ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      });
    }

    if (request.method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch {}
      if (path === '/check-ip') return handleCheckIp(request);
      if (path === '/send') return handleSend(env, body);
    }

    return json({ error: 'Not found' }, 404);
  },
};
