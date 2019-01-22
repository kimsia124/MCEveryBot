const Discord = require('discord.js');
const client = new Discord.Client();

const mc = require('minecraft-protocol');
const mcClient = mc.createClient({
  host: 'everyF.kr',
  username: 'whddlqn@naver.com',
  password: 'sia740822',
  version: '1.12.2',
});

mcClient.on('chat', (packet) => {
  const jsonMsg = JSON.parse(packet.message);
  console.log(jsonMsg);
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if(username === client.username) return;
    console.log(msg);
  };
});

mcClient.on('open_window', (packet) => {
  //const jsonMsg = JSON.parse(packet.i);
  console.log(packet);
})

mcClient.on('window_items', (packet) => {
  // const jsonMsg = JSON.parse(packet);
  console.log(packet);
})

client.login("NTM2OTMzOTI2Mzg4NjI5NTMx.Dyd6-w.v3Df1OWFe0_g5odd7BbW8JEk-as");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', (msg) => {
  console.log(msg.author.username, msg.content, msg.guild.name);

  const splitMsg = msg.content.split(' ');

  if (splitMsg[0] === '~봇') {
    if (splitMsg[1] === '섬') {
      if (splitMsg[2] === '레벨') {
        if (splitMsg[3] === '' || splitMsg[3] === ' ') {
          msg.reply('섬 레벨을 확인할 유저를 입력해주세요.');
          return;
        }
        mcClient.write('chat', { message: `/섬 레벨 ${splitMsg[3]}`});
        msg.reply('??');
      };

      if (splitMsg[2] === '순위') {
        mcClient.write('chat', { message: `/섬 순위`});
        msg.reply('?!');
      }
    };
  }
});