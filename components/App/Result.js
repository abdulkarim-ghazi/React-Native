/* @flow */

import React, { Component } from 'react';
import {
  YellowBox,
   
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import game from '../../assets/raw/gamelist.json';
import resultSetter from './Services/SetResult';

const quizzes =game.quizzes;

export default class GameResultsScreen extends Component {
 
  constructor(props){
super(props);


}

  static navigationOptions = {
          header: null
      }

  _onAcceptButton = () => {

    //  Navigate to the Themes list
    this.props.navigation.navigate(
      'registerPlayer'
    );

  }

  render() {
    YellowBox.ignoreWarnings(['Warning']);
    const result= resultSetter.get();

   
    return (
      <View style={styles.container}>

        <ImageBackground
         style = {styles.imageBackground}
         source = {require('../../assets/images/bg.png')}
         resizeMode = "cover"
        >

          <View style={styles.headerContainer}>
            <Text style = {styles.headerTitle}>Game Results</Text>
          </View>

          <View style={styles.gameDataContainer}>

            <View style={[{backgroundColor: game.color},styles.gameData]}>

              <Text style = {styles.gameName}>{game.name}</Text>

              <View style={styles.gameResultsContainer}>

                <View style={styles.gameResultsCorrectContainer}>
                  <Image style={styles.gameResultsCorrectImage}
                  source={require('../../assets/images/correct.png')}
                  />
                  <Text style = {styles.gameResultsCorrectCount}>{result}</Text>
                </View>

                <View style={styles.gameResultsWrongContainer}>
                  <Image style={styles.gameResultsWrongImage}
                  source={require('../../assets/images/wrong.png')}
                  />
                  <Text style = {styles.gameResultsWrongCount}>{quizzes.length-result}</Text>
                </View>

              </View>

            </View>

          </View>

          <View style={styles.actionsContainer}>

            <TouchableOpacity onPress={this._onAcceptButton}>
              <Image
                style={styles.acceptButton}
                source={require('../../assets/images/correct.png')}
              />
            </TouchableOpacity>

          </View>

        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },

  gameDataContainer : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameData: {
    flex: 1,

    alignSelf: 'stretch',

    padding: 24,

    margin : 16,
    marginTop : 32,
    marginBottom : 32,

    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
  },


  gameName: {
    color: '#000000',

    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 24,

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },

  gameDescription : {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },

  imageBackground : {
    flex: 1,
    height: '100%',
    width: '100%',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  gameInstructions : {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  actionsContainer : {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor : '#f4e842',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#f4bc42',
    margin : 8,

  },

  actionSeparator : {
    width : 16,
  },

  cancelButton : {
    width: 56,
    height: 56,
  },

  acceptButton : {
    width: 56,
    height: 56,
  },

  headerContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor : '#00BCD4',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    margin : 8,
    marginTop : 36,
  },

  headerTitle : {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',

  },

  gameResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
  },

  gameResultsCorrectContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  gameResultsCorrectImage: {
    width: 64,
    height: 64,
  },
  gameResultsCorrectCount: {
    marginTop: 12,
    fontSize: 64,
    fontWeight: '900',
    textAlign: 'center',

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },

  gameResultsWrongContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  gameResultsWrongImage: {
    width: 64,
    height: 64,
  },
  gameResultsWrongCount: {
    marginTop: 12,
    fontSize: 64,
    fontWeight: '900',
    textAlign: 'center',

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },

});
