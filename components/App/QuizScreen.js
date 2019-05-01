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
  FlatList,
  Dimensions,
  Modal,
  TouchableHighlight,
 
  
} from 'react-native';

import game from '../../assets/raw/gamelist.json';

import QuizOptionItem from './QuizOptionItem';
import resultSetter from './Services/SetResult'
const imageCorrect = require('../../assets/images/correct.png')
const imageWrong = require('../../assets/images/wrong.png')

const quizzes =game.quizzes
export default class QuizScreen extends Component {
  
  static navigationOptions = {
    header: null
  }

  constructor (props) {
   
    super(props);
   
 
    const quiz = quizzes[0];
    const id=0;
    const Answer=0;
     
    this.actualQuizOption = -1;
    
    this.state = {
      Answer,Answer,
      id: id,
      quiz: quiz,
      modalCorrectVisible: false,
      modalWrongVisible: false,
    };
    /*
    this.state = {
      modalCorrectVisible: false,
    };*/
  }

  _onCancelButton = () => {
    console.log ("_onCancelButton");
    this.props.navigation.goBack();
  }

  _onAcceptButton = () => {
    console.log ("_onAcceptButton");
    //  Navigate to the first quiz
    this.props.navigation.navigate('QuizScreen');
  }

  _onPressOption = (quizOption) => {
      console.log ("_onPressOption");
      console.log (quizOption);
      //console.log (index);

      this.actualQuizOption = quizOption;

      this._checkValidAnswer (quizOption);
     // this._moveNext();

  };

  

    

   
  _checkValidAnswer = (quizOption) => {
    if (this.state.quiz.quiz_option_code == quizOption.code) {

      this._setModalCorrectVisible();
  
    } else {

      this._setModalWrongVisible();
    
     }

  }

  _renderQuizOption = ({item}) => (
    <QuizOptionItem
      quizOption={item}
      onPressItem={this._onPressOption}
      />
  );

  _keyExtractor = (item, index) => index;

  _setModalCorrectVisible() {
    this.setState({modalCorrectVisible: true});
    this.setState({modalWrongVisible: false});
  }

  _setModalWrongVisible() {
    this.setState({modalCorrectVisible: false});
    this.setState({modalWrongVisible: true});
  }

  _hideModals () {
    this.setState({modalCorrectVisible: false});
    this.setState({modalWrongVisible: false});
  }


  _renderQuizStatus = () => {
    

      const image = (this.state.modalCorrectVisible) ? imageCorrect : imageWrong;
      YellowBox.ignoreWarnings(['Warning']);
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={(this.state.modalCorrectVisible || this.state.modalWrongVisible)}
         
          >
            <View style={styles.statusContainer}>

              <TouchableHighlight
                  onPress={() => {
                   // this._hideModals();
                  }}>
                <Image
                  style={styles.statusImage}
                  source={image}
                />
              </TouchableHighlight>
                </View ><View style={styles.headerContainer}>
<Text style={styles.quizzAnswer}>{quizzes[this.state.id].quiz_answer}</Text>

                </View>
            <View>
            <Button 
title="Next"
style={styles.button}
onPress={() => {
  this.state.Answer=(this.state.modalCorrectVisible) ? this.state.Answer+1 : this.state.Answer;
 
  if(this.state.id < quizzes.length-1){
  this.state.id= this.state.id+1;
    this._hideModals();
    resultSetter.set(this.state.Answer)
   this.props.navigation.navigate('QuizScreen');
}
else{
   this._hideModals();
   resultSetter.set(this.state.Answer)
  this.props.navigation.navigate('Result');
}


 }}
/>
            </View>
        </Modal>
      );

  }


  render() {
    YellowBox.ignoreWarnings(['Warning']);
    console.ignoredYellowBox = true;
    
    this._hideModals;
   
    let actualQuizNumber = this.state.id + 1;
    
    let totalQuizNumber = quizzes.length;
    this.state.quiz = quizzes[this.state.id];
    this.actualQuizNumber=this.state.quiz;
    return (
      <View style={styles.container}>

        <ImageBackground
         style = {styles.imageBackground}
         source = {require('../../assets/images/bg.png')}
         resizeMode = "cover"
        >

          <View style={styles.headerContainer}>
            <Text style = {styles.headerTitle}>Quiz {actualQuizNumber}/{totalQuizNumber}</Text>
          </View>

          <View style={styles.quizDataContainer}>

            <View style={[{backgroundColor: game.color},styles.quizData]}>

              <Text style = {styles.quizDescription}>{this.state.quiz.description}</Text>

            </View>

            <FlatList
              style={styles.quizOptions}
              data={this.state.quiz.options}
              renderItem={this._renderQuizOption}
              keyExtractor={this._keyExtractor}
              onPressItem={this._onPressOption}
              scrollEnabled={true}
              />

          </View>

        </ImageBackground>

        {this._renderQuizStatus()}

      </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgb(230, 206, 144)',
  },

  quizDataContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 16,
    marginRight: 16,
  },

  quizData: {
    padding: 16,

    marginTop: 8,
    marginBottom: 8,

    alignSelf: 'stretch',

    maxHeight: 280,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',

    justifyContent: 'center',
  },
  quizzAnswer:{

    color: 'green',

    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 24,

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0

  },


  quizName: {
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

  quizDescription : {
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
    fontWeight: '300',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },

  quizOptions : {
    width : '100%',
  },
  button : {
    flex: 1,
  justifyContent: 'flex-end',
 
  },

  //  Modal status
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  statusImage: {
    width: 120,
    height: 120,
  }
});
