import SearchBar from '../../components/SearchBar/SearchBar'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Home.css'
function Home() {
  const [staysDataSource, setStaysDataSource] = useState([])
  const [placesListDataSource, setPlacesListDataSource] = useState([
      {
        city: "Helsinki",
        country: "Finland"
      },
      {
        city: "Oulu",
        country: "Finland"
      },
      {
        city: "Vaasa",
        country: "Finland"
      },
      {
        city: "Turku",
        country: "Finland"
      }
  ]) 
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
      setStaysDataSource(data)
      setStays(data)
    });
  }

  const onPlaceChange = (placeString) => {
    const filteredStays = filterStaysByString(placesListDataSource, placeString)
    const listValues = filteredStays.map((filteredStay) => {
      return {
        title: filteredStay.city + ', ' + filteredStay.country,
        value: {
          country: filteredStay.country,
          city: filteredStay.city
        }
      }
    })
    setListData(listValues)
  }

  const filterStaysByString = (stays, string) => {
    const filteredStays = stays.filter((stay) => stay.country.toLowerCase().includes(string.toLowerCase()) || stay.city.toLowerCase().includes(string.toLowerCase()))
    return filteredStays
  }

  const filterStaysByPlace = (stays, country, city) => {
    const filteredStays = stays.filter((stay) => stay.country.toLowerCase().includes(country.toLowerCase()) && stay.city.toLowerCase().includes(city.toLowerCase()))
    return filteredStays
  }

  const filterStaysByNumberOfHosts = (stays, number) => {
    const filteredStays = stays.filter((stay) => number <= stay.maxGuests)

    return filteredStays
  }

  const onSearch = (place, hostsNumber) => {
    let filteredStays
    if(place.country && place.city){
      filteredStays = filterStaysByPlace(staysDataSource, place.country, place.city)
    }
    else{
      filteredStays = filterStaysByString(staysDataSource, place.string)
    }
    if(!isNaN(parseInt(hostsNumber))){
      filteredStays = filterStaysByNumberOfHosts(filteredStays, hostsNumber)
    }

    setStays(filteredStays)
  }

  return (
    <section className="main-container bg-primary contrast-text">
      <SearchBar onPlaceChange={onPlaceChange} listData = {listData} onSearch={onSearch}></SearchBar>
      <div className="cards-container">
        {
          stays.map((stay) => {
            return <div className="card-container d-flex col">
                      <figure>
                        <img src={stay.photo}/>
                      </figure>
                      <div className="w-100 d-flex align-items-center justify-content-space-between">
                        <div className="d-flex">
                          {
                            stay.superHost 
                                ? <h5 className="super-host">SUPER HOST</h5> 
                                : ''
                          }
                          <h6>{stay.type}</h6>
                        </div>
                        <div className="d-flex">
                          <FontAwesomeIcon icon={faStar} style={{color:'#EB5757'}}/>
                          <p style={{padding:0, margin:0}}>{stay.rating}</p>
                        </div>
                      </div>
                      <h4 className="title">{stay.title}</h4>
                  </div>
          })
        }
      </div>
    </section>
  )
}

export default Home;