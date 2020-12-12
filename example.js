const divvyd = require('./src/divvyd');

(async() => {
  const resp = await divvyd.getAccountChannels('rEE1JVZrpEjgZibGddhVv4ESmFpcxnjNUv')

  resp.channels[0].details = {
    source_balance: await divvyd.getXDVBalance(resp.channels[0].source, resp.ledger_index),
    destination_balance: await divvyd.getXDVBalance(resp.channels[0].destination, resp.ledger_index),
    history: await divvyd.getChannelHistory(resp.channels[0].marker, 5)
  };

  console.log(JSON.stringify(resp.channels[0], null, 2));
  process.exit();
})();