import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [titulo, setTitulo] = useState('Working time')
  const [min, setMin] = useState(1)
  const [seg, setSeg] = useState(0)
  
  var formattedMin = ("0" + min).slice(-2)
  var formattedSeg = ("0" + seg).slice(-2)

  useEffect(() => {
    intervalo(setSeg)
  }, [])  

  useEffect(() => {
    if (seg === -1){
      setSeg(59)
      clearInterval(intervalo)
      setMin(prevMin => prevMin - 1)
      if (min === 0){
        setTitulo('Break time')
        setMin(5)
        setSeg(0)
      }
    }
  }, [seg])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.titulo}>{formattedMin}:{seg === -1 ? '00' : formattedSeg}</Text>      
    </View>
  );
}

function intervalo(setSeg) {
  setInterval(() => {
    setSeg(prevSeg => prevSeg - 1)    
  }, 1000);  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 40,
  }
});
