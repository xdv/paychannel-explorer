const toXDV = require('./dropsToXDV');

module.exports = nodes => {
  let node;
  let final;
  let prev;

  for (let affectedNode of nodes) {
    node = affectedNode.ModifiedNode || affectedNode.CreatedNode || affectedNode.DeletedNode;

    if (node.LedgerEntryType === 'PayChannel') {
      final = node.FinalFields || node.NewFields;
      prev = node.PreviousFields || {};

      return {
        changes: {
          channel_amount_change: prev.Amount ? toXDV(final.Amount, prev.Amount) : undefined,
          channel_balance_change: final.Balance ? toXDV(final.Balance, prev.Balance) : undefined,
          channel_final_amount: toXDV(final.Amount || 0),
          channel_final_balance: toXDV(final.Balance || 0)
        },
        source: final.Account,
        destination: final.Destination,
        prev_tx: node.PreviousTxnID
      };
    }
  }
}