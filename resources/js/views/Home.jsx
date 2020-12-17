import React from 'react'
import { cardList } from '../routes/routes'
import Row from 'react-bootstrap/Row'
import CardLink from './index/Card'
const style = {
  row: { position: 'absolute', top: "-30px" }
}
const Home = () => {
  return <Row className="justify-content-md-center" style={style.row}>
    {
      cardList.map(card => (<CardLink key={card.id} url={card.url} text={card.text} titulo={card.label} />))
    }
  </Row>
}
export default Home;

/* {
  cardList.map(card => (<CardLink key={card.id} url={card.url} text={card.text} titulo={card.label} />))
} */