import SearchBar from '../../components/SearchBar/SearchBar'
import {useState, useEffect} from 'react'
import './Home.css'
function Home() {
  const [stays, setStays] = useState([])

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

  const onPlaceChange = (place) => {
    console.log(place)
  }

  const onHostChange = (host) => {
    console.log(host)
  }

  return (
    <section className="main-container bg-primary contrast-text">
      <SearchBar onPlaceChange={onPlaceChange} onHostChange={onHostChange}></SearchBar>
      <div className="cards-container">
        {
          stays.map((stay) => {
            return <div className="card-container">
                      <figure>
                        <img src={stay.photo}/>
                      </figure>
                      <div className="type-container">
                        <div className="main-info">
                          {
                            stay.superHost 
                              ? <h5 className="super-host">
                                  SUPER HOST
                                </h5> 
                              : ''
                          }
                          <h6>{stay.type}</h6>
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