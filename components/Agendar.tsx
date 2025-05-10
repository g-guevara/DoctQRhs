import React, { useState, useEffect } from "react";
import { Calendar, Input, Button, Form, Skeleton } from "@nextui-org/react";
import { today, getLocalTimeZone, DateValue, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

export default function Agendar() {
  const now = today(getLocalTimeZone()); // Día actual
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [reservedData, setReservedData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(`${now.year}-${String(now.month).padStart(2, '0')}-${String(now.day).padStart(2, '0')}`); // Día actual como valor inicial
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para skeleton

  const { locale } = useLocale();

  const fetchReservedData = async () => {
    try {
      setIsLoading(true); // Activa el skeleton
      const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000' // Local
        : 'https://guillermo-guevara-invitacion.vercel.app'; // Producción
          const res = await fetch(`${baseUrl}/api/schedules`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setReservedData(data);
      } else {
        throw new Error('Error al obtener datos reservados');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Desactiva el skeleton
    }
  };
  

  useEffect(() => {
    fetchReservedData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const allHours = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);
      const reservedHours = reservedData
        .filter((item) => item.date === selectedDate)
        .map((item) => item.time);
      const available = allHours.filter((hour) => !reservedHours.includes(hour));
      setAvailableHours(available);
    }
  }, [selectedDate, reservedData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = {
      ...data,
      date: selectedDate,
      time: selectedHour,
    };

    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setAction('¡Agendado! Te llegara un mail de confirmación.');
        fetchReservedData();
        setSelectedHour(null);
      } else {
        throw new Error('Error al enviar datos');
      }
    } catch (error) {
      console.error(error);
      setAction('Error al enviar datos');
    }
  };

  const isDateUnavailable = (date: DateValue) => {
    return date.compare(now) < 0; // Deshabilitar fechas anteriores al día actual
  };

  return (
    <div className="grid gap-8 md:gap-12 lg:grid-cols-3 w-full max-w-5xl px-4 md:px-8 mx-auto">
      <div className="justify-self-center lg:justify-self-start mt-10 sm:mt-0 md:mt-0">
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Selecciona una fecha</h2>
        <Calendar
          aria-label="Selecciona una fecha"
          isDateUnavailable={isDateUnavailable}
          value={parseDate(selectedDate)} // Transforma selectedDate a DateValue
          onChange={(selectedDate) => {
            if (selectedDate) {
              const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
              setSelectedDate(formattedDate);
            }
          }}
          className="custom-calendar"
        />
      </div>

      {/* Botones de horarios */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left text-gray-800 dark:text-gray-200">
          Horarios disponibles
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-10 rounded-md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4">
            {availableHours.map((hour) => (
              <button
                key={hour}
                className={`w-full py-2 rounded-md shadow transition text-sm sm:text-base ${
                  selectedHour === hour
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#f4f5f4] text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                } hover:bg-gray-200 dark:hover:bg-gray-600`}
                onClick={() => setSelectedHour(hour)}
                disabled={reservedData.some((item) => item.date === selectedDate && item.time === hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formulario */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Completa tus datos</h2>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            errorMessage="Por favor ingresa tu nombre"
            label="Nombre"
            labelPlacement="outside"
            name="name"
            placeholder="Ingresa tu nombre"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Por favor ingresa un email válido"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Ingresa tu email"
            type="email"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button color="primary" type="submit" className="w-full sm:w-auto" disabled={!selectedHour}>
              Enviar
            </Button>
          </div>
          {action && (
            <div
              className="bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-md text-center relative max-w-full pr-6"
              role="alert"
            >
              <strong className="font-semibold">{action}</strong>
              <button
                type="button"
                className="absolute top-1 right-2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none"
                onClick={() => setAction(null)}
              >
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Cerrar</title>
                  <path d="M14.348 14.849a1 1 0 0 1-1.697 0L10 11.819l-2.651 3.029a1 1 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1 1 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1 1 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1 1 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
