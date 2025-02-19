import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ bookInfo }) => {
    const { trainer, selectedSlot, classes, selectedPackage } = bookInfo
    const [error, setError] = useState(' ')
    const [clientSecret, setClientSecret] = useState(' ')
    const [transactionId, setTransactionId] = useState(' ');
    const { user, loading } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const price = selectedPackage.price ;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[Error]', error)
            setError(error.message)
        }
        else {
            console.log('[payment Method :]', paymentMethod)
            setError(" ")
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (confirmError) {
            console.log('confirm Error :', confirmError)
            alert(confirmError)
        }
        else {
            console.log('payment intent : ', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log("id", paymentIntent.id)
                const id = paymentIntent.id
                setTransactionId(id);
                Swal.fire({
                    title: "Payment Successful!",
                    html: `<p class="text-2xl font-bold text-green-600">Transaction Amount: $${paymentIntent.amount / 100}</p>
                     <p class="text-lg text-gray-700"><strong>Transaction ID:</strong> ${id}</p>`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                // now save the payment in the  database 
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price,
                    package: selectedPackage?.name,
                    orderDate: new Date(),
                    transactionId: id,
                    trainerInfo: {
                        name: trainer?.name,
                        email: trainer?.email,
                    },
                    slot: selectedSlot,
                    classInfo: classes,
                }
                console.log('payment', payment)

                const res = await axiosSecure.patch('/payments', payment);
                console.log('payment update Successfully :');
                navigate('/dashboard/booked-trainer')
            }
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <form
                className="text-center max-w-xl mx-auto"
                onSubmit={handleSubmit}>
                <div className="p-3 mb-2 border-2 border-gray-300 rounded-md">
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
                {
                    error &&
                    <p className="text-red-400 text-sm">{error}</p>
                }
                {
                    transactionId &&
                    <p className="text-green-400">{transactionId}</p>
                }
                <button
                    className="mt-2 bg-blue-500 text-sm  px-8 py-1 rounded-xl"
                    type="submit"
                    disabled={!stripe || !clientSecret}>Pay {price}</button>
            </form>
        </div>
    );
};

export default CheckoutForm;