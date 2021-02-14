import SearchBar from '../../components/SearchBar/SearchBar'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Home.css'
function Home() {
  const [stays, setStays] = useState([])
  const [listData, setListData] = useState([])

  useEffect(() => {
    startStaysData()
  },[])

  const startStaysData = ( ) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    fetch('stays.json', {headers: headers})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('teste', data)
      setStays(data)
    });
  }

  const onPlaceChange = (placeString) => {
    const filteredStays = stays.filter(
      (stay) => stay.country.toLowerCase().includes(placeString) || stay.city.toLowerCase().includes(placeString)
      )
      .map((filteredStay) => {
        return {
          title: filteredStay.city + ', ' + filteredStay.country,
          value: {
            country: filteredStay.country,
            city: filteredStay.city
          }
        }
      })
    setListData(filteredStays)
  }

  const onHostChange = (host) => {
    console.log(host)
  }

  return (
    <section className="main-container bg-primary contrast-text">
      <SearchBar onPlaceChange={onPlaceChange} onHostChange={onHostChange} listData = {listData}></SearchBar>
      <div className="cards-container">
        {
          stays.map((stay) => {
            return <div className="card-container">
                      <figure>
                        <img src={stay.photo}/>
                      </figure>
                      <div className="type-container">
                        <div className="main-info">
                          <div className="d-flex">
                            {
                              stay.superHost 
                                ? <h5 className="super-host">
                                    SUPER HOST
                                  </h5> 
                                : ''
                            }
                            <h6>{stay.type}</h6>
                          </div>
                          <div className="rating">
                            <FontAwesomeIcon icon={faStar} style={{color:'#EB5757'}}/>
                            <p>{stay.rating}</p>
                          </div>
                        </div>
                        <h4 className="title">{stay.title}</h4>
                      </div>
                  </div>
          })
        }
      </div>
    </section>
  )
}

export default Home;