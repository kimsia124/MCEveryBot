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

  else if (splitMsg[1] === '돈') {
    if (splitMsg[2] === '순위') {
      if (splitMsg.length === 3) {
        mcClient.write('chat', { message: '/돈 순위' });
        let balanceTop = {};
        balanceTop.ranking  = new Array;
        mcClient.on('chat', async (packet) => {
          if (!packet.message) return;

          const jsonMsg = await JSON.parse(packet.message);
          let cnt = 1;

          console.log(jsonMsg);
          if (jsonMsg.extra[0].text.substring(0,5)=== '잔고 순위') {
            balanceTop.time = await jsonMsg.extra[0].text.replace('잔고 순위 ', '');
            msg.reply(jsonMsg.extra[0].text.replace('잔고 순위 ', ''), jsonMsg.extra[0].text);
          }
          else if (jsonMsg.extra[0].text === '서버 총 합계:') {
            balanceTop.totalMoney = jsonMsg.extra[1].text;

          }
          else if (jsonMsg.extra[0].text.substring(0, 1) === String(cnt) + '.') {
            switch (jsonMsg.extra.length) {
              case 1:
                await balanceTop.ranking.push({ 
                  num: cnt,
                  name: jsonMsg.extra[0].text.split(' ')[1],
                  price: jsonMsg.extra[0].text.split(' ')[2],
                });

                cnt += 1;
                break;
              case 4:
                await balanceTop.ranking.push({
                  num: cnt,
                  name: jsonMsg.extra[2].text,
                  price: jsonMsg.extra[3].text.replace(', ', ''),
                });

                cnt += 1;
                break;
              case 6:
              await balanceTop.ranking.push({
                  num: cnt,
                  name: jsonMsg.extra[4].text,
                  price: jsonMsg.extra[5].text.replace(', ', ''),
                });

                cnt += 1;
                break;
            }
          }
          else if (jsonMsg.extra[0].text === '/balancetop 2 ') {
            let balanceMsg = `\
에브리팜 돈 순위 ${balanceTop.time}\
서버 총 합계: ${balanceTop.totalMoney}\
\`\`\``;
            
            await balanceTop.ranking.forEach((rank) => {
              balanceMsg += `${rank.num}. ${rank.name} - ${rank.price}`;
            });

            balanceMsg += '```';
            await mcClient.removeAllListeners('chat');
            await msg.reply(balanceMsg);
          }
        });
      }
      else if (splitMsg.length === 4) {
        const num = parseInt(splitMsg[3]);

        for(let cnt = 0; cnt > num % 8 +1; cnt++) {
          
        }
        
      }
    }
  }
});
