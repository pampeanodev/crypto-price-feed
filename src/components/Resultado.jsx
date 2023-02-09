import styled from '@emotion/styled'

const Cotizacion = styled.div`
  color: #FFF;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`

const Imagen = styled.img`
  display: block;
  width: 120px;
`

const Texto = styled.p`
  font-size: 20px;
  span {
    font-weight: 700;
  }
`

const Precio = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`

const Resultado = ({cotizacion}) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = cotizacion
  return (
    <Cotizacion>
      <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen de la criptomoneda" />
      <div>
        <Precio>El precio es de: <span>{PRICE}</span></Precio>
        <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
        <Texto>Variacion últimas 24hs: <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
      </div>
    </Cotizacion>
  )
}

export default Resultado