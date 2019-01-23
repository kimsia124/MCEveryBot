const Discord = require('discord.js');
const client = new Discord.Client();

const mc = require('minecraft-protocol');
const mcClient = mc.createClient({
  host: 'everyF.kr',
  username: 'whddlqn@naver.com',
  password: 'sia740822',
  version: '1.12.2',
});

/*
mcClient.on('open_window', (packet) => {
  //const jsonMsg = JSON.parse(packet.i);
  console.log(packet);
})

mcClient.on('window_items', (packet) => {
  // const jsonMsg = JSON.parse(packet);
  console.log(packet);
})
*/

client.login("NTM2OTMzOTI2Mzg4NjI5NTMx.Dyd6-w.v3Df1OWFe0_g5odd7BbW8JEk-as");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', async (msg) => {
  console.log(msg.author.username, msg.content, msg.guild.name);

  const splitMsg = msg.content.split(' ');

  if (splitMsg[0] === '~봇') {
    if (splitMsg[1] === '섬') {
      if (splitMsg[2] === '레벨') {
        if (splitMsg.length === 3 || splitMsg[3] === ' ') {
          await msg.reply('섬 레벨을 확인할 유저를 입력해주세요.');
          return;
        }
        mcClient.write('chat', { message: `/섬 레벨 ${splitMsg[3]}`});
        mcClient.on('chat', async (packet) => {
          if (!packet.message) return;

          const jsonMsg = await JSON.parse(packet.message);
          console.log(jsonMsg);
          const splitText = await jsonMsg.extra[1].text.split(' ');

          if (splitText[1] === '레벨:') {
            await msg.reply(`${splitMsg[3]}님의 섬 레벨: ${splitText[2]}`);
            mcClient.removeAllListeners('chat');
          }
        });
        await msg.reply('??');
      };

      if (splitMsg[2] === '순위') {
       await  mcClient.write('chat', { message: `/섬 순위`});
      }
    }
  }

  if (splitMsg[1] === '돈') {
      if (splitMsg[2] === '순위') {
        if (splitMsg.length === 3) {
          mcClient.write('chat', { message: '/돈 순위' });
          let balanceTop = {};
          mcClient.on('chat', async (packet) => {
            if (!packet.message) return;

            const jsonMsg = await JSON.parse(packet.message);

            console.log(jsonMsg);
            if (jsonMsg.extra[0].text.substring(0,5)=== '잔고 순위') {
              balanceTop.time = await jsonMsg.extra[0].text.replace('잔고 순위 ', '');
              msg.reply(jsonMsg.extra[0].text.replace('잔고 순위 ', ''), jsonMsg.extra[0].text);
            }
            else if (jsonMsg.extra[0].text === '서버 총 합계:') {
              balanceTop.totalMoney = jsonMsg.extra[1].text;

              console.log(jsonMsg.extra[1].text);
              await mcClient.removeAllListeners('chat');
              await msg.reply(`에브리팜 돈 순위 ${balanceTop.time}\n서버 총 합계: ${balanceTop.totalMoney}`);
            }
          });
        }
        else if (splitMsg.length === 4) {


        }
      }
    }
  }
});
