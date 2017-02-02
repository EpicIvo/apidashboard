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
          </tr>
          </thead>
          <tbody>
          { this.state.receipts && this.state.receipts.map((Receipt) => <tr key={Receipt.item._id}>
            <td>{Receipt.item.title}</td>
            <td>
              <a href={`api/movies/${Receipt.item._id}`}>View receipt</a>
            </td>
          </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ReceiptOverviewPage;