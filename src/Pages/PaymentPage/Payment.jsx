import { useLocation } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk)

const Payment = () => {
    const location = useLocation();
    const { trainer, selectedSlot, classes, selectedPackage } = location.state || {};



    console.log('payment:', { trainer, selectedSlot, classes, selectedPackage })

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;