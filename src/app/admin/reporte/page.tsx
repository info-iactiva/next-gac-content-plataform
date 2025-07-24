'use client';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SpinnerOverlay } from "@/components/Spinner";
import { dividerClasses } from '@mui/material';

dayjs.locale('es'); 


type ApiResponse = {
  totalGlobal: number;
  totalByUser: { userId: number; total: number; nombre: string }[];
  totalByDay: {
    day: string;
    total: number;
  }[];
};



function generateCalendarGrid(totalByDay: { day: string; total: number }[], monthYear: dayjs.Dayjs) {
  const firstDay = monthYear.startOf('month');
  const lastDay = monthYear.endOf('month');

  // Lunes = 0 ... Domingo = 6
  const startWeekday = (firstDay.day() + 6) % 7;

  const dayMap = new Map<string, number>();
  totalByDay.forEach(({ day, total }) => {
    dayMap.set(day, total);
  });

  const weeks: { dayNumber: number | null; total: number | null }[][] = [];
  let week: { dayNumber: number | null; total: number | null }[] = [];

  // Rellenamos primeros días vacíos
  for (let i = 0; i < startWeekday; i++) {
    week.push({ dayNumber: null, total: null });
  }

  for (let day = 1; day <= lastDay.date(); day++) {
    const dateStr = firstDay.date(day).format('YYYY-MM-DD');
    const total = dayMap.get(dateStr) ?? 0;
    week.push({ dayNumber: day, total });

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Rellenar última semana si es incompleta
  while (week.length > 0 && week.length < 7) {
    week.push({ dayNumber: null, total: null });
  }
  if (week.length === 7) weeks.push(week);

  return weeks;
}




export default function ReportePage() {    
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const formatMonth = (month: number) => (month < 10 ? `0${month}` : `${month}`);
  const [data, setData] = useState<ApiResponse | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  useEffect(() => {
    if (!selectedDate) return;

    setIsLoading(true);
    const monthFormatted = formatMonth(selectedDate?.month() + 1);
    const year = selectedDate?.year();
    console.log(`${year}-${monthFormatted}`);
    handleGetNewData(`${year}-${monthFormatted}`);    
  }, [selectedDate]);

  const handleGetNewData = async (date:string) => {

    try {                
        const res = await fetch(`/api/requestdaily?month=${date}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },                                
        });              

        const jsonData: ApiResponse = await res.json();              
        setData(jsonData);
        setIsLoading(false);
        console.log("Respuesta de la API:", jsonData);              

    } catch (err) {
        console.log("Error generando contenido:", err);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {isLoading && <SpinnerOverlay />}
      
      <h1 className="text-3xl font-bold mb-6">Consulta de datos</h1>


      <div className='w-[100%]  flex justify-end mb-5'>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DatePicker
            label="Mes y Año"
            views={['year', 'month']}
            openTo="month"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>

      {/* Mostrar total global */}
      {data && (
        <div className="bg-blue-50 border border-blue-300 rounded shadow flex gap-1 mb-4">
          <h2 className="text-xl font-semibold ">Total Global: </h2>
          <p className="text-xl font-semibold text-blue-700"> {data.totalGlobal}</p>
        </div>
      )}

      {/* Mostrar totales por usuario */}
      {data && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Totales por usuario</h2>
          {data.totalByUser.length === 0 ? (
            <p className="text-gray-600 italic">No hay datos por usuario para este mes.</p>
          ) : (

            <div>
              <div className='flex justify-between items-center mb-2'>
                <h1>Nombre</h1>
                <h1>Total</h1>
              </div>
              
               <ul className="space-y-2">
                {data.totalByUser.map(({ userId, total, nombre }) => (
                <li
                  key={userId}
                  className="p-3 bg-gray-100 rounded shadow flex justify-between items-center"
                >
                  <span className="font-medium">{nombre}</span>
                  <span className="font-bold text-indigo-600">{total}</span>
                </li>
              ))}
            </ul>
            </div>
           
          )}
        </div>
      )}

      {/* Mostrar totales por día
      {data && data.totalByDay.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Totales por día</h2>
          <div className="overflow-x-auto border rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Día
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.totalByDay.map(({ day, total }) => (
                  <tr key={day}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dayjs(day).format('DD MMMM YYYY')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}


        {data && data.totalByDay.length > 0 && (
            <div>
                <h2 className="text-xl font-semibold mb-4">Totales por día (Calendario)</h2>
                <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Encabezado de días */}
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                    <div key={d} className="font-semibold text-gray-700 border-b pb-1">
                        {d}
                    </div>
                    ))}

                    {/* Filas de semanas */}
                    {generateCalendarGrid(data.totalByDay, selectedDate!).map((week, i) => (
                    <React.Fragment key={i}>
                        {week.map(({ dayNumber, total }, idx) => (
                        <div
                            key={idx}
                            className={`border h-20 p-2 flex flex-col justify-between rounded
                            ${dayNumber === dayjs().date() && selectedDate?.month() === dayjs().month() && selectedDate?.year() === dayjs().year() ? 'bg-blue-100' : ''}
                            ${dayNumber === null ? 'bg-gray-50' : 'bg-white'}`}
                        >
                            {dayNumber !== null ? (
                            <>
                                <span className="font-semibold text-left">{dayNumber}</span>
                                <span className="text-indigo-600 font-bold">{total}</span>
                            </>
                            ) : null}
                        </div>
                        ))}
                    </React.Fragment>
                    ))}
                </div>
                </div>
            </div>
            )}



    </div>
  );
}
