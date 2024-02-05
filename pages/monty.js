import React, {useEffect, useState} from 'react'

function index() {

    const [position, setPosition] = useState("Loading...")
    const [canBuy, setCanBuy] = useState("Loading...")
    const [canSell, setCanSell] = useState("Loading...")
    const [overbought, setOverbought] = useState("Loading...")
    const [oversold, setOversold] = useState("Loading...")
    const [sell_high, setSell_high] = useState("Loading...")
    const [sma_buy, setSma_buy] = useState("Loading...")

    useEffect(() => {
        // fetch('http://localhost:8080/api/home').then(
        fetch('/api/home').then(
        reponse => reponse.json()
        ).then(
        data => {
            setPosition(data.position);
            setCanBuy(data.can_buy);
            setCanSell(data.can_sell);
            setOverbought(data.sma_buy);
            setOversold(data.overbought);
            setSell_high(data.oversold);
            setSma_buy(data.sell_high);
        }
        )
    }, [])

    return (
        <div>

            <div className='monty-label'>
                <h1>Monty</h1>
                <p>Hands off. Trade on.</p>
            </div>

            <div className='monty-position'>
                <h1>Position: {position}</h1>
            </div>

            <div className='monty-data'>
                <p>Can Buy: {canBuy}</p>
                <p>Can Sell: {canSell}</p>
                <p>Overbought: {overbought}</p>
                <p>Oversold: {oversold}</p>
                <p>Sell High: {sell_high}</p>
                <p>SMA Buy: {sma_buy}</p>
            </div>

            <div className='monty-exp'>
                <p>Monty is a fully automated index trading algorithm leveraging constant computation on a live feed 
                    of a market.</p>
                <p>Auto-trading reimagined.</p>
            </div>

        </div>
    )
}

export default index
