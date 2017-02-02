import React, {Component} from 'react';
import ReceiptService from '../services/ReceiptService';

class ReceiptEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    this.Movie = new ReceiptService();
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.Receipt.getById(this.props.routeParams.id)
      .then(res => {
        this.setState({receipt: res});
      });
  }

  handleChangeName(event) {
    let receipt = this.state.receipt;
    receipt.receipt = event.target.value;
    this.setState({Receipt: receipt});
  }

  handleChangeAmount(event) {
    let receipt = this.state.receipt;
    receipt.receipt = event.target.value;
    this.setState({Receipt: receipt});
  }

  save() {
    this.Receipt.updateReceipt(this.state.movie._id, this.state.movie.name, this.state.movie.amount);
    console.log(this.state.receipt);
  }
 render() {
    const Receipt = this.state.receipt;
    if (!Receipt) {
      return null;
    }
    return (<div>
      <form>
        <div>
          <label>
            Title
          </label>
          <input onChange={this.handleChangeName} value={this.state.movie.name} />
        </div>
        <div>
          <label>
            Genre
          </label>
          <input onChange={this.handleChangeAmount} value={this.state.movie.amount} />
        </div>
        <div>
          <span onClick={() => this.save()}>Save</span>
        </div>
      </form>
    </div>);
  }
}
ReceiptEditPage.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};
export default ReceiptEditPage;
