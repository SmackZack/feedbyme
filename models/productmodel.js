import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productDesc: {
            type: String,
            required: true
        },
        productPrice: {
            type: String,
            required: true
        },
        productCategory: {
            type: String,
            required: true
        },
        productSubCategory: {
            type: String,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        },
        relatedProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product