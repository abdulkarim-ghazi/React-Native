
import React, { Component } from 'react';
import { createStackNavigator,createAppContainer  } from 'react-navigation';
import YellowBox from 'react-native';
//  Screens
import RegisterPlayer from './components/App/RegisterPlayer';
import QuizScreen from './components/App/QuizScreen';
import Result from './components/App/Result';



const Root = createStackNavigator(

  {
     RegisterPlayer: { screen : RegisterPlayer },
     QuizScreen: { screen : QuizScreen },
     Result: { screen : Result }
  },
   
  {
    initialRouteName : 'RegisterPlayer',
  }
);

class App extends React.Component {
  render() {
    YellowBox.ignoreWarnings(['Warning']);
    return <Root />;
  }
}

export default createAppContainer(Root);


