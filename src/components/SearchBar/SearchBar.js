import Logo from '../../assets/images/logo.svg'
import {useState} from 'react'
import  './SearchBar.css'
function SearchBar(props){
    const [isSearchActivated, setIsSearchActivated] = useState(false)
    const [place, setPlace] = useState("")
    const [host, setHost] = useState("")

    const onClickSearch = () => {
        setIsSearchActivated(!isSearchActivated)
    }

    const onPlaceChange = (event) => {
        setPlace(event.target.value)
        props.onPlaceChange(event.target.value)
    }

    const onHostChange = (event) => {
        setHost(event.target.value)
        props.onHostChange(event.target.value)
    }

    return (
        <div className={`search-overlay ${isSearchActivated ? 'is-activated' : ''}`}>
            <div className="search-bar-container bg-primary contrast-text d-flex justify-content-space-between">
                <div className="image-container d-flex align-items-center justify-content-center">
                    <img src={Logo}></img>
                </div>
                <div className="search-inputs-container bg-primary d-flex">
                    <div className="input-holder">
                        <input className="places" type="text" value={place} onChange={onPlaceChange}></input>
                        <ul>
                            <li>teste</li>
                            <li>teste</li>
                            <li>teste</li>
                            <li>teste</li>
                        </ul>
                    </div>
                    <div className="input-holder">
                        <input className="hosts" type="text" value={host} onChange={onHostChange}></input>
                        <ul>
                            <li>teste</li>
                            <li>teste</li>
                            <li>teste</li>
                            <li>teste</li>
                        </ul>
                    </div>
                    <button onClick={() => {onClickSearch()}}>search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar