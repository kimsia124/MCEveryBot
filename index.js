const Discord = require('discord.js');
const client = new Discord.Client();

const mc = require('minecraft-protocol');
const mcClient = mc.createClient({
  host: 'everyF.kr',
  username: 'whddlqn@naver.com',
  password: 'sia740822',
  version: '1.12.2',
});

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

       await mcClient.on('window_items', (packet) => {
        packet.items.forEach((item) => {
          if (item.blockId !== -1) {
            console.log(item.nbtData.value.display.value.Name.value.replace('§a§l[EveryFarm] §7섬주인: §6§n', '').replace('§r§7', ''));
            console.log(item.nbtData.value.display.value.Lore.value.value[0].replace('§e§a§l[EveryFarm] §7', ''));
          }
        });
      })
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

            console.log(jsonMsg);
            if (jsonMsg.extra[0].text.substring(0,5)=== '잔고 순위') {
              balanceTop.time = await jsonMsg.extra[0].text.replace('잔고 순위 ', '');
            }
            else if (jsonMsg.extra[0].text === '서버 총 합계:') {
              balanceTop.totalMoney = jsonMsg.extra[1].text;
            }
            else if (jsonMsg.extra[0].text.substring(1, 2) === '.') {
              switch (jsonMsg.extra.length) {
                case 1:
                  await balanceTop.ranking.push({ 
                    num: jsonMsg.extra[0].text.substring(0, 1),
                    name: jsonMsg.extra[0].text.split(' ')[1],
                    price: jsonMsg.extra[0].text.split(' ')[2],
                  });
                  break;
                case 4:
                  await balanceTop.ranking.push({
                    num: jsonMsg.extra[0].text.substring(0, 1),
                    name: jsonMsg.extra[2].text,
                    price: jsonMsg.extra[3].text.replace(', ', ''),
                  });
                  break;
                case 6:
                await balanceTop.ranking.push({
                    num: jsonMsg.extra[0].text.substring(0, 1),
                    name: jsonMsg.extra[4].text,
                    price: jsonMsg.extra[5].text.replace(', ', ''),
                  });
                  break;
              }
            }
            else if (jsonMsg.extra[0].text === '/balancetop 2 ') {
              let balanceMsg = `에브리팜 돈 순위 ${balanceTop.time}\n서버 총 합계: ${balanceTop.totalMoney}\n\`\`\``;
              
              await balanceTop.ranking.forEach((rank) => {
                balanceMsg += `\n${rank.num}. ${rank.name} - ${rank.price}`;
                console.log(balanceMsg);
              });

              balanceMsg += '\n```';
              await mcClient.removeAllListeners('chat');
              await msg.channel.send(balanceMsg);
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
  }
});
