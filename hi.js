var hi = {
  extra: [{
          color: 'yellow',
          text: ' ---- '
      },
      {
          color: 'gold',
          text: 'Balancetop '
      },
      {
          color: 'yellow',
          text: '--'
      },
      {
          color: 'gold',
          text: ' 페이지 '
      },
      {
          color: 'red',
          text: '1'
      },
      {
          color: 'gold',
          text: '/'
      },
      {
          color: 'red',
          text: '1,436 '
      },
      {
          color: 'yellow',
          text: '----'
      }
  ],
  text: ''
}
hi.extra.forEach((one) => {
  console.log(one.text);
});