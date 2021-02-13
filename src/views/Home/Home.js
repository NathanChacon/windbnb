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
            return <div> teste </div>
          })
        }
      </div>
    </section>
  )
}

export default Home;