import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.3
};

class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props);
	// 	this.state={}
	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((sum, el) => sum + el, 0);
		this.setState({purchasable: sum > 0});
	};

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	closeModal = () => {
		this.setState({purchasing: false});
	};

	purchaseContinuedHandler = () => {
		alert("You continue!");
	};

	purchaseCancelledHandler = () => {
		this.setState({purchasing: false});
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {...this.state.ingredients};
		updatedIngredient[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ingredients: updatedIngredient, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredient);
	};
	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredient = {...this.state.ingredients};
		updatedIngredient[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ingredients: updatedIngredient, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredient);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} closed={this.closeModal}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelledHandler}
						purchaseContinued={this.purchaseContinuedHandler}
						totalPrice={this.state.totalPrice.toFixed(2)}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchase={this.state.purchasable}
					order={this.purchaseHandler}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
