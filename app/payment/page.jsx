'use client'

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function PaymentPage() {
  const { getToken, router, setCartItems } = useAppContext()

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      return toast.error('Заполните все поля')
    }

    try {
      setLoading(true)

      const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'))

      const token = await getToken()

      const { data } = await axios.post('/api/order/create', pendingOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        localStorage.removeItem('pendingOrder')
        setCartItems({})

        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Оплата заказа</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Номер карты"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Имя владельца"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="border rounded-lg p-3"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg"
          >
            {loading ? 'Обработка...' : 'Оплатить'}
          </button>
        </div>
      </div>
    </div>
  )
}
