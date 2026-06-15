import connectDB from '@/config/db'
import Product from '@/models/Product'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request)

    const { productId } = await request.json()

    await connectDB()

    const product = await Product.findById(productId)

    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'Товар не найден',
      })
    }

    if (product.userId !== userId) {
      return NextResponse.json({
        success: false,
        message: 'Нет доступа',
      })
    }

    await Product.findByIdAndDelete(productId)

    return NextResponse.json({
      success: true,
      message: 'Товар удалён',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    })
  }
}
