class ReceiptService {
  constructor() {
    this.base = 'https://flg-money.herokuapp.com';
  }
  get() {
    return fetch(this.base + '/v1/receipts/').then(res => res.json());
  }
  getById(id) {
    return fetch(this.base + '/v1/receipts/' + id).then(res => res.json());
  }
  updateReceipt(id, name, amount){
    return fetch(this.base + '/v1/receipts/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': name,
        'amount': amount
      })
    });
  }
  newReceipt(name, amount){
    return fetch(this.base + '/v1/receipts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': name,
        'amount': amount
      })
    });
  }
  deleteReceipt(id){
    return fetch(this.base + '/v1/receipts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

export default ReceiptService;
