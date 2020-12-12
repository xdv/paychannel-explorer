const toXDV = require('./dropsToXDV');

module.exports = nodes => {
  const changes = {};
  let node;
  let final;
  let prev;
  let change;

  for (let affectedNode of nodes) {
    node = affectedNode.ModifiedNode || affectedNode.CreatedNode;

    if (node.LedgerEntryType === 'AccountRoot') {
      final = node.FinalFields || node.NewFields || {};
      prev = node.PreviousFields || {};

      if (final.Balance) {
        change = toXDV(final.Balance, prev.Balance);

        changes[final.Account] = {
          final_balance: toXDV(final.Balance),
          change
        };
      }
    }
  }

  return changes;
};
