import styled from '@emotion/styled'
import { useEffect, useState } from 'react';
import { monedas } from '../data/monedas';
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #7A7DFE
  }
`

const Formulario = ({setMonedas}) => {

  const [ criptos, SetCriptos ] = useState([]);
  const [ error, SetError ] = useState(false);

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
  const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  useEffect(() => {

    const getDataFromApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const respuesta = await fetch(url);
      const resultado = await respuesta.json()
      const criptos = resultado.Data.map(x => {
        const objeto = {
          id: x.CoinInfo.Name,
          nombre: x.CoinInfo.Name,
          nombreCompleto: x.CoinInfo.FullName
        }

        return objeto
      })
      
      SetCriptos(criptos)
    }
 
    getDataFromApi()
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if([moneda, criptoMoneda].includes('')){
      SetError(true)
      return
    }

    SetError(false)
    setMonedas({
      moneda,
      criptoMoneda
    })

  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptoMonedas />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario
