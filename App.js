import React, { useState } from 'react';
import { ScrollView, SafeAreaView, ImageBackground, Dimensions, Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Keyboard } from 'react-native';
import {BlurView} from '@react-native-community/blur';
//import { BlurView } from 'expo-blur';
import Task from './components/Task'; 


const screenHeight = Dimensions.get('window').height;
//const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  const handleAddTask = () => {
    Keyboard.dismiss(); //for dismiss the keyboard when added a task successfully
    setTaskItems([...taskItems, task]) //what kind of this array?
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]; //copy items from taskItems to an array
    itemsCopy.splice(index, 1); //1 is the number that will delete when press
    setTaskItems(itemsCopy); //call function with new task array (after deleted)
  }

  return (
    <View style = {styles.container}>
      <View style={styles.backgroundImageContainer}> 
        <ImageBackground 
        // light background
        //source={require ('./assets/apple-icon.png')}

        // dark background with bigger logo
        source={require ('./assets/apple.png')}

        style={styles.backgroundImage}
        >
          <View style = {styles.taskWrapper}>      
          <Text style = {styles.sectionTitled}>
            Today's Task
          </Text>
          <View style = {styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key = {index} onPress={() => completeTask()}>
                  <Task text = {item}></Task>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
          </ImageBackground>
        </View>

        {/* write a task section */}
      <KeyboardAvoidingView
      behavior = {Platform.OS === "ios" ? "padding" : "height"}
      style = {styles.writeTaskWrapper}
      >
        <TextInput style = {styles.input} placeholder = {'Write a task!'} value = {task} onChangeText = {text => setTask(text)}/>
        <TouchableOpacity onPress = {() => handleAddTask()}>
          <View style = {styles.addWrapper}>
            <Text style = {styles.addText}>+</Text>
           </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );

//  return (
//    <View style = {styles.container}>
//    <Image style = {styles.smallerImage} source={require ('./assets/apple.png')}></Image>
//      <Text style = {styles.textStyle}>Welcome to My App!</Text>
//    </View>
//  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    flex: 1, 
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute',  
    width: '100%', 
    height: '100%', 
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitled: {
    //for dark background
    color: '#fffefe',
    //
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input :{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper :{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderColor: '#C0C0C0',
  },
  addText :{

  },
});
