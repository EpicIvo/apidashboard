import React, {Component} from 'react';
import ReceiptService from '../services/ReceiptService';

class ReceiptDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Receipt: null
    };
    this.Receipt = new ReceiptService();
  }
  componentDidMount() {
    this.Receipt.getById(this.props.routeParams.id)
      .then(res => {
        this.setState({receipt: res});
      });
  }
  deleteMovie() {
    this.Receipt.deleteMovie(this.state.movie._id);
  }
  render() {
    const Receipt = this.state.receipt;
    if (!Receipt) {
      return null;
    }
    return (<div>
      <table className="table table-bordered table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{this.state.receipt.name}</td>
          <td>{this.state.receipt.amount}</td>
          <td>
            <a href={`edit/${this.state.receipt._id}`}>Edit Receipt</a>
          </td>
          <td>
            <a onClick={() => this.deleteMovie()}>Delete Receipt</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>);
  }
}
ReceiptDetailPage.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};
export default ReceiptDetailPage;
