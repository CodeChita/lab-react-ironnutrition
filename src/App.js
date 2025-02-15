import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import { Paper, Grid } from '@material-ui/core';
import foodsJson from './foods.json';
import FoodBox from './component/FoodBox';
import Search from './component/Search'
import Total from './component/Total';
import './App.css';

class App extends Component {
  state = {
    foods: foodsJson,
    filteredFoods: [],
    listFood: []
  }

  handelAddNewFood = (newFood) => {
    this.setState({
      foods: [newFood, ...this.state.foods]
    })

  }

  handleSearch = (event) => {
    let searchedMeal = event.target.value
    const { foods } = this.state
    console.log(searchedMeal)

    let filteredFoods = foods.filter((food) => {
      return food.name.toLowerCase().includes(searchedMeal.toLowerCase())
    })
    console.log(filteredFoods)
    this.setState({
      filteredFoods
    })
  }

  handelFoodList = (event, food) => {
    event.preventDefault()
    console.log(event.target.quantity.value)
    console.log("event", event.target)
    let objMeal = {
      name: food.name,
      calories: food.calories,
      image: food.image,
      quantity: Number(event.target.quantity.value)
    }
    console.log(objMeal)
    this.setState({
      listFood: [objMeal, ...this.state.listFood]
    })
  }

  render() {
    return (
      <div>
        <h1>IronNutrition</h1>
        <Search onSearch={this.handleSearch} />
        <Grid container spacing={3}>
          <Paper>
            <FoodBox foods={this.state.filteredFoods} onAddNewFood={this.handelAddNewFood} onFoodList={this.handelFoodList} />
          </Paper>
          <Paper>
            <Total list={this.state.listFood}/>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default App;
