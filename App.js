import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Vibration, TextInput, ScrollView } from 'react-native';

export default function App() {

  const [titulo, setTitulo] = useState('Working time')
  const [buttonTitulo, setButtonTitulo] = useState('Start')
  const [min, setMin] = useState(1)
  const [seg, setSeg] = useState(0)
  const [intervalo, setIntervalo] = useState()
  const [workingMin, setWorkingMin] = useState(1)
  const [breakMin, setBreakMin] = useState(1)
  
  var formattedMin = ("0" + min).slice(-2)
  var formattedSeg = ("0" + seg).slice(-2)

  useEffect(() => {
    if (seg === -1){
      setSeg(59)
      setMin(prevMin => prevMin - 1)
      if (min === 0){
        if (titulo === 'Working time'){
          Vibration.vibrate(100)
          setTitulo('Break time')
          setMin(breakMin)
          setSeg(0)
        }
        else if (titulo === 'Break time'){
          Vibration.vibrate(100)
          setTitulo('Working time')
          setMin(workingMin)
          setSeg(0)
        }        
      }
    }
  }, [seg])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.titulo}>{formattedMin}:{seg === -1 ? '00' : formattedSeg}</Text>        
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button title={buttonTitulo} onPress={() => {
          if (buttonTitulo === 'Start'){
            setButtonTitulo('Stop')
            setIntervalo(ComenzarIntervalo(setSeg))
          } else if (buttonTitulo === 'Stop'){
            clearInterval(intervalo)
            setButtonTitulo('Start')
          }          
        }}/>
        <Button title='Reset' onPress={() => {
          clearInterval(intervalo)
          setButtonTitulo('Start')
          if (titulo === 'Working time'){
            setMin(workingMin)
            setSeg(0)
          }
          else if (titulo === 'Break time'){
            setMin(breakMin)
            setSeg(0)
          }
        }}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setWorkingMin(text)}
          value={String(workingMin)}
          placeholder='Work time'
          keyboardType='numeric'
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setBreakMin(text)}
          value={String(breakMin)}
          placeholder='Break time'
          keyboardType='numeric'
        />
        <Button title='Save' onPress={() => {
          if (titulo === 'Working time'){
            setMin(workingMin)
            setSeg(0)
          }
          else if (titulo === 'Break time'){
            setMin(breakMin)
            setSeg(0)
          }
        }}/>
      </View>
    </ScrollView>       
  );
}

function ComenzarIntervalo(setSeg) {
  return setInterval(() => {
    setSeg(prevSeg => prevSeg - 1)    
  }, 1000);  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 40,
  },
  inputContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
