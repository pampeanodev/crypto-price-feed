import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-senif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async () => {
        setLoading(true)
        setCotizacion({})
        
        const url = 
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.criptoMoneda}&tsyms=${monedas.moneda}`

        const result = await fetch(url)
        const resultJson = await result.json()
        setCotizacion(resultJson.DISPLAY[monedas.criptoMoneda][monedas.moneda])
        setLoading(false)

      }

      cotizarCripto()
    }
  
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes cripto"></Imagen>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {loading && <Spinner />}
        {cotizacion.PRICE && <Resultado cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  )
}

export default App
