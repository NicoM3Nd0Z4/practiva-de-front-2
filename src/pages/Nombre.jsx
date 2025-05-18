import { View, Text } from 'react-native'
import React from 'react'

const Nombre = () => {

  const nombre = "Nicolas Mendoza";
  const elemento = <h1>Hola , {nombre}</h1>;

  return (
    <View>
      <Text>{elemento}</Text>
    </View>
  )
}

export default Nombre