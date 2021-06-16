import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51Ixex3IB3lMpev0pxB8ALety4aNSTMuiu6Uoz9JIXKT2U1DP1zluQG8LQFx9xXUfRMIFmQjx7hJLoohj80sT3OBF00I6rh3OwS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}