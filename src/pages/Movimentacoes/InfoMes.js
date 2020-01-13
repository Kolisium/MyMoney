import React from 'react'
import {useMesApi} from '../../api'

const InfoMes = ({data}) => {
  const {infoMes, alterarMes} = useMesApi(data)

  const alterarPrevisaoEntrada = (evt) => {
    alterarMes({previsao_entrada: evt.target.value})
    setTimeout(() => {
      infoMes.refetch()
    }, 2000)
  }

  const alterarPrevisaoSaida = (evt) => {
    alterarMes({previsao_saida: evt.target.value})
    setTimeout(() => {
      infoMes.refetch()
    }, 2000)
  }
  
  if(infoMes.loading){
    return <p>Carregando dados do mês...</p>
  }
  if(infoMes.data){
    return (
      <div>
        Previsão entrada: {infoMes.data.previsao_entrada} 
          <input type='text' onBlur={alterarPrevisaoEntrada} /> 
          / Previsão saida: {infoMes.data.previsao_saida} 
          <input type='text' onBlur={alterarPrevisaoSaida} /> <br />
        Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
      </div>
    )
  }
  return null
} 

export default InfoMes
