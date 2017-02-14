import React, {Component} from 'react';
import ReceiptService from '../services/ReceiptService';

class ReceiptOverviewPage extends Component {

  constructor() {
    super();
    this.state = {
      receipts: null
    };
    this.Receipt = new ReceiptService();
  }
  componentDidMount() {
    this.Receipt.get()
      .then((res) => {
        this.setState({receipts: res.items});
        console.log(this.state.receipts);
      });
  }
  render() {
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>View</th>
          </tr>
          </thead>
          <tbody>
          { this.state.receipts && this.state.receipts.map((Receipt) => <tr key={Receipt.item._id}>
            <td>{Receipt.item.name}</td>
            <td>{Receipt.item.amount}</td>
            <td>
              <a href={`v1/receipt/${Receipt.item._id}`}>View receipt</a>
            </td>
          </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ReceiptOverviewPage;
