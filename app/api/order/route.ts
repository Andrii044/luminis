import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (botToken && chatId) {
    const itemLines = data.items
      .map((i: { name: string; quantity: number; price: string }) => `• ${i.name} × ${i.quantity} — ${i.price}`)
      .join('\n')

    const text = [
      '🛍 *Нове замовлення!*',
      '',
      itemLines,
      '',
      `💰 Сума: € ${Number(data.total).toFixed(0)}`,
      '',
      `👤 ${data.name}`,
      `📞 ${data.phone}`,
      data.email ? `📧 ${data.email}` : null,
      `💬 Зв'язок: ${data.messenger}`,
      data.comment ? `📝 ${data.comment}` : null,
    ].filter(Boolean).join('\n')

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })
  }

  return NextResponse.json({ success: true })
}
