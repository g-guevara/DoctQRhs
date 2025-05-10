import mongoose from 'mongoose';

// Conexión a la base de datos
const MONGODB_URI = "mongodb+srv://admin:AmjuBfihm8vtX8tq@test.gmqrn.mongodb.net/?retryWrites=true&w=majority&appName=test";

// Garantiza que la conexión a la base de datos solo se realice una vez
if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGODB_URI);
}

// Definir el esquema y modelo de producto
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Métodos API
export async function GET(req) {
  try {
    const products = await Product.find(); // Obtiene todos los productos
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los productos' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Lee el cuerpo de la solicitud
    const product = new Product(body); // Crea un nuevo producto
    await product.save(); // Guarda el producto en la base de datos
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al agregar producto' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updates } = body; // Obtén el ID y los datos a actualizar
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar producto' }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Obtén el ID desde los parámetros de la URL
    await Product.findByIdAndDelete(id); // Elimina el producto de la base de datos
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar producto' }), { status: 500 });
  }
}
