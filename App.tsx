import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  const limparCampos = () => {
    setCep("");
    setLogradouro("");
    setBairro("");
    setLocalidade("");
    setUf("");
  }

  async function buscarCep() {
    if (cep === "") {
      Alert.alert("Cep inválido !");
      setCep("");
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log("ERRO", error);
    }
  }

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
          style={{
            borderColor: "black",
            borderWidth: 2,
            width: 370,
            fontSize: 18,
            marginTop: 20,
            marginEnd: 20,
            borderRadius: 10,
            padding: 15,
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Cep"
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotaoLimpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"
      />

      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
      />

      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"
      />

      <TextInput
        style={{
          borderColor: "black",
          borderWidth: 2,
          width: 370,
          fontSize: 18,
          marginTop: 10,
          marginEnd: 20,
          borderRadius: 10,
         
          marginHorizontal: 20,
          padding: 15,
        }}
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="Estado"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#018786",
    justifyContent: "center", // Adicionado para centralizar o texto
    alignItems: "center", // Adicionado para centralizar o texto
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },
  containerCep: {
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20,
    alignItems: "center", // Adicionado para alinhar os elementos verticalmente
  },
  botaoBuscar: {
    marginTop:820,
    marginLeft:-320,
    backgroundColor: "#018786",
    width: 120,
    height: 80,
    marginEnd: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center", // Adicionado para centralizar o texto
    alignItems: "center", // Adicionado para centralizar o texto
  },
  botaoLimpar: {
    marginTop:820,
    backgroundColor: "red",
    width: 120,
    height: 80,
    marginEnd: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center", // Adicionado para centralizar o texto
    alignItems: "center", // Adicionado para centralizar o texto
  },
  textoBotaoBuscar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    
  },
  textoBotaoLimpar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  caixaTexto: {
    color: "black",
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});
