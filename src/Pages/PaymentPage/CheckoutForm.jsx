import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if( error ) {
            console.log('[Error]', error)
            alert(error.message)
        }
        else{
            console.log('[payment Method :]', paymentMethod)
        }

    }

    return (
        <div>
            <form
                className="text-center max-w-xl mx-auto space-y-5"
                onSubmit={handleSubmit}>
                <div className="p-3 border-2 border-gray-300 rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    className="bg-blue-500 text-xl md:text-3xl px-8 py-3 rounded-xl"
                    type="submit"
                    disabled={!stripe}>Pay</button>
            </form>
        </div>
    );
};

export default CheckoutForm;