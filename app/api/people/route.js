import mongoose from 'mongoose';

// Conexión a la base de datos
const MONGODB_URI = "mongodb+srv://admin:AmjuBfihm8vtX8tq@test.gmqrn.mongodb.net/?retryWrites=true&w=majority&appName=test";

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Definir el esquema y modelo
const PersonSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const Person = mongoose.models.Person || mongoose.model('Person', PersonSchema);

export async function GET(req) {
  try {
    const people = await Person.find();
    return new Response(JSON.stringify(people), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener personas' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const person = new Person(body);
    await person.save();
    return new Response(JSON.stringify(person), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al agregar persona' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const updatedPerson = await Person.findByIdAndUpdate(id, updates, { new: true });
    return new Response(JSON.stringify(updatedPerson), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar persona' }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Person.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar persona' }), { status: 500 });
  }
}
