import React, {useEffect, useState} from 'react'

function index() {

    const [position, setPosition] = useState(0)
    const [canBuy, setCanBuy] = useState("Loading...")
    const [canSell, setCanSell] = useState("Loading...")
    const [overbought, setOverbought] = useState("Loading...")
    const [oversold, setOversold] = useState("Loading...")
    const [sell_high, setSell_high] = useState("Loading...")
    const [sma_buy, setSma_buy] = useState("Loading...")
    const [no_trades, setNoTrades] = useState("Loading...")

    const [new_position, setNewPosition] = useState("Loading...")
    const [error_msg, setErrorMsg] = useState("Loading...")

    const [symbol, setSymbol] = useState("Loading...")
    const [side, setSide] = useState("Loading...")
    const [qty, setQty] = useState("Loading...")
    const [last_buy, setLastBuy] = useState("Loading...")
    const [latest_close, setLatestClose] = useState("Loading...")

    const link = 'https://a4b3seikge7ffzjhuljleppfee0jdsnr.lambda-url.us-east-1.on.aws/';

    useEffect(() => {

        fetch(link).then(
        reponse => reponse.json()
        ).then(
        data => {
            setPosition(data.truth_vals.position);
            setCanBuy(data.truth_vals.able_buy);
            setCanSell(data.truth_vals.able_sell);
            setOverbought(data.truth_vals.should_buy_sma);
            setOversold(data.truth_vals.o_bought);
            setSell_high(data.truth_vals.o_sold);
            setSma_buy(data.truth_vals.sell_high);
            setNoTrades(data.truth_vals.no_trades_two_days);

            setNewPosition(data.new_position);
            setErrorMsg(data.error_msg);

            setSymbol(data.order_info.symbol);
            setSide(data.order_info.side);
            setQty(data.order_info.quantity);
            setLastBuy(data.order_info.last_buy);
            setLatestClose(data.order_info.latest_close);
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
                <h1>Position: {position.toFixed(2)}</h1>
            </div>

            <div className='monty-data'>
                <h2 className='monty-data-header'>Truth Values</h2>
                <p>Can Buy: {canBuy}</p>
                <p>Can Sell: {canSell}</p>
                <p>Overbought: {overbought}</p>
                <p>Oversold: {oversold}</p>
                <p>Sell High: {sell_high}</p>
                <p>SMA Buy: {sma_buy}</p>
                <p>No Trades in Two Days: {no_trades}</p>

                <h2 className='monty-data-header'>Order Info</h2>
                <p>Symbol: {symbol}</p>
                <p>Order Type: {side}</p>
                <p>Quantity: {qty}</p>
                <p>Last Buy Value: {last_buy}</p>
                <p>Latest Closing Value: {latest_close}</p>
                <p>New Position: {new_position}</p>
                <p>Error Message: {error_msg}</p>
            </div>

            <div className='monty-exp'>
                <p>Monty was a fully automated index trading algorithm leveraging constant computation on a live feed 
                    of the BTC market.</p>
                <p>You would simply refresh the page to see that Monty would do.</p>
                <p>Monty used AWS Lambda in the backend, and the free tier has since expired.</p>
                <p>Therefore, Monty has been retired as a live trading agent.</p>
                <p>View the <a className='blue-links' target='_blank' href='https://github.com/shighton/DiamondEyes'>GitHub</a> page.</p>

                <p>See other <a href='/projects' className='blue-links'>projects</a>.</p>
            </div>

        </div>
    )
}

export default index
