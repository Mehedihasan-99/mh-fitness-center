import { useLocation } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    const location = useLocation();
    const bookInfo = location.state || {};

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm bookInfo={bookInfo} />
            </Elements>
        </div>
    );
};

export default Payment;