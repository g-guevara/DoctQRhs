import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// Conexión a la base de datos
const MONGODB_URI = "mongodb+srv://admin:AmjuBfihm8vtX8tq@test.gmqrn.mongodb.net/?retryWrites=true&w=majority&appName=test";

if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGODB_URI);
}

// Definir el esquema y modelo de agenda
const ScheduleSchema = new mongoose.Schema({
  date: String, // Fecha seleccionada
  time: String, // Hora seleccionada
  name: String, // Nombre del usuario
  email: String, // Email del usuario
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

// Configuración de Nodemailer
const userGmail = "3rfv4edc5tgb@gmail.com";
const passAppGmail = "xepiqshjnwqjdpkg";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      to: to,
      subject: subject,
      html: text,
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
}

// Métodos API
export async function GET(req) {
  try {
    const schedules = await Schedule.find(); // Obtén todas las agendas
    return new Response(JSON.stringify(schedules), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener agendas' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Lee el cuerpo de la solicitud
    const schedule = new Schedule(body); // Crea una nueva agenda
    await schedule.save(); // Guarda la agenda en la base de datos

    // Enviar correo al usuario que agendó
    const userMessage = `
      <h1>Confirmación de agenda</h1>
      <p>Hola ${body.name},</p>
<p>Tu agenda para el día ${body.date} a las ${body.time} ha sido registrada exitosamente. Puedes unirte a través del siguiente enlace de Google Meet: <a href="https://meet.google.com/mrd-zvjv-dpk" target="_blank">https://meet.google.com/mrd-zvjv-dpk</a></p>
    `;
    sendEmail(body.email, 'Confirmación de agenda', userMessage);

    // Enviar correo al administrador
    const adminMessage = `
      <h1>Nueva agenda registrada</h1>
      <p>Un nuevo evento ha sido agendado:</p>
      <ul>
        <li><strong>Nombre:</strong> ${body.name}</li>
        <li><strong>Email:</strong> ${body.email}</li>
        <li><strong>Fecha:</strong> ${body.date}</li>
        <li><strong>Hora:</strong> ${body.time}</li>
      </ul>
    `;
    sendEmail(userGmail, 'Nueva agenda registrada', adminMessage);

    return new Response(JSON.stringify(schedule), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear la agenda' }), { status: 500 });
  }
}
