import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = [
  "All-day", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"
];

export default function ScheduleGrid() {
  return (
    <div className="bg-white rounded shadow p-4 mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="border-b p-2"></th>
              {days.map((day) => (
                <th key={day} className="border-b p-2 font-semibold text-gray-600">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, i) => (
              <tr key={hour}>
                <td className="border-b p-2 font-semibold text-gray-500">{hour}</td>
                {days.map((day, j) => (
                  <td key={day + hour} className={`border-b p-2 ${i === 7 && (j === 1 || j === 4) ? 'bg-green-200' : 'bg-gray-100'}`}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
