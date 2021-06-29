import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import '../stripe/PaymentFrom.scss'
import {Link} from 'react-router-dom'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Arial,Verdana,sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })

        console.log(handleSubmit)
    if(!error) {
        try {

            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4040/payment", {
                amount: 3900,
                id,
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
                
            }
            
            
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}



    return (
        <div className='payment-container'>
            <h1>Finish Sign up with a one time fee of $39.99</h1>
        {!success ? 
        <form className='pay-form' onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button id="check-button">Pay Now</button>
        </form>
        :
       <div >
          <Link style={{color: 'black'}} to='/dashboard'><h2 id="thank-you">Thank you for your purchase! Click here to continue</h2></Link> 
       </div> 
        } 
        </div>
    )
}

