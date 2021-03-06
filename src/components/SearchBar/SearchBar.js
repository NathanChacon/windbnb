import Logo from '../../assets/images/logo.svg'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons'
import  './SearchBar.css'
function SearchBar(props){
    const [isSearchActivated, setIsSearchActivated] = useState(false)
    const [listData, setListData] = useState(props.listData)
    const [place, setPlace] = useState({string: '', country:null, city:null})
    const [host, setHost] = useState("")

    useEffect(() => {
        setListData(props.listData)
    },[props])

    const onClickSearch = () => {
            if(isSearchActivated){
                props.onSearch(place, host)
            }
            setIsSearchActivated(!isSearchActivated)
    }

    const onPlaceChange = (event) => {
        setPlace({...place, string: event.target.value, country: null, city: null})
        props.onPlaceChange(event.target.value)
    }

    const onClickPlace = (value) => {
        setPlace({...place, country: value.value.country, city: value.value.city, string: value.title})
    }

    const onClickHost = (value) => {

    }

    const onHostChange = (event) => {
        setHost(event.target.value)
    }

    const onClickOverlay = (event) => {
        if(event.target.id === 'overlay' || event.target.id === 'searchBar'){
            setIsSearchActivated(false)
        }
    }

    return (
        <div id="overlay" className={`search-overlay ${isSearchActivated ? 'is-activated' : ''}`} onClick = {(event) => {onClickOverlay(event)}}>
            <div id="searchBar" className="search-bar-container bg-primary contrast-text d-flex justify-content-space-between">
                <div className="image-container d-flex align-items-center justify-content-center">
                    <img src={Logo} style={{width:'100%', height:'100%'}}></img>
                </div>
                <div className="search-inputs-container bg-primary d-flex">
                    <div className="input-holder d-flex col">
                        <label htmlFor="places">location</label>
                        <input id="places" className="places" type="search" autoComplete="off" value={place.string} onChange={onPlaceChange}></input>
                        <ul>
                            {
                                listData.map((list) => {
                                    return <li className="list" onClick={() => {onClickPlace(list)}}>
                                                <FontAwesomeIcon style={{marginRight:'5px'}} icon={faMapMarkerAlt} />
                                                {list.title}
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="input-holder d-flex col">
                        <label htmlFor="hosts">guests</label>
                        <input id="hosts" className="hosts" type="number" value={host} onChange={onHostChange}></input>
                    </div>
                    <button onClick={() => {onClickSearch()}} className="search-button">
                        <FontAwesomeIcon className="search-icon" icon={faSearch}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar