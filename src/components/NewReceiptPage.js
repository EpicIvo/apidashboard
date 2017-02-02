import React, {Component} from 'react';
import ReceiptService from '../services/ReceiptService';

class NewReceiptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: {
        name: null,
        amount: null
      }
    };
    this.Receipt = new ReceiptService();
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeReceipt = this.handleChangeReceipt.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
  }

  handleChangeName(event) {
    let receipt = this.state.receipt;
    receipt.title = event.target.value;
    this.setState({Receipt: receipt});
  }

  handleChangeReceipt(event) {
    let receipt = this.state.receipt;
    receipt.genre = event.target.value;
    this.setState({Receipt: receipt});
  }
  save() {
    this.Receipt.newReceipt(this.state.receipt.name, this.state.receipt.amount);
    console.log(this.state.receipt);
  }
  render() {
    return (<div>
      <form>
        <div>
          <label>
            Title
          </label>
          <input onChange={this.handleChangeName} />
        </div>
        <div>
          <label>
            Genre
          </label>
          <input onChange={this.handleChangeAmount} />
        </div>
        <div>
          <span onClick={() => this.save()}>Save</span>
        </div>
      </form>
    </div>);
  }
}
NewReceiptPage.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};
export default NewReceiptPage;
