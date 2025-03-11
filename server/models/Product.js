import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  mfgDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  expDate: {
    type: Date,
    required: true,
    default: function() {
      // Default expiry date is 1 year from manufacturing date
      const date = this.mfgDate || new Date();
      return new Date(date.setFullYear(date.getFullYear() + 1));
    }
  }
});

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  vendorName: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String
  },
  batches: {
    type: [batchSchema],
    default: []
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to update total quantity
productSchema.pre('save', function(next) {
  if (this.batches && this.batches.length > 0) {
    this.quantity = this.batches.reduce((total, batch) => total + (batch.quantity || 0), 0);
  }
  next();
});


// Static method to generate unique SKU
productSchema.statics.generateSku = async function() {
  const prefix = 'SKU';
  const padding = 4;
  let counter = 1;
  let sku;
  let isUnique = false;

  while (!isUnique) {
    sku = `${prefix}${String(counter).padStart(padding, '0')}`;
    // Check if SKU exists
    const existingProduct = await this.findOne({ sku });
    if (!existingProduct) {
      isUnique = true;
    } else {
      counter++;
    }
  }

  return sku;
};

export default mongoose.model('Product', productSchema);