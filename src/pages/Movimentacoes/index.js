import React, {useState} from 'react'

import { Redirect } from 'react-router-dom'
import {useMovimentacaoApi} from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({match}) => {
  const {movimentacoes, salvarNovaMovimentacao, removerMovimentacao} = useMovimentacaoApi(match.params.data)

  const salvarMovimentacao = async(dados) => {
    await salvarNovaMovimentacao(dados)
    movimentacoes.refetch()
    setTimeout(() => {
      //infoMes.refetch()
    }, 2000)
  
  }

  const removerMovimentacaoClick = async(id) => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)
    movimentacoes.refetch()
    setTimeout(() => {
      //infoMes.refetch()
    }, 2000)
  }

  if(movimentacoes.error === 'Permission denied'){
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h1>Movimentações</h1>
      <InfoMes data={match.params.data} />
      
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map(movimentacao => {
              return (
                <tr key={movimentacao}>
                  <td>{movimentacoes.data[movimentacao].descricao}</td>
                  <td>{movimentacoes.data[movimentacao].valor} {' '}
                  </td>
                  <td><button className='btn btn-danger' onClick={() => removerMovimentacaoClick(movimentacao)}>-</button></td>
                </tr>
              )
            })
          }
          <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes