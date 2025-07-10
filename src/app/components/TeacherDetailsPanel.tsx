import React from "react";

export default function TeacherDetailsPanel() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Details */}
      <section className="col-span-3 bg-white rounded shadow p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">AA</div>
          <div>
            <div className="font-bold text-lg">Alynia Allan</div>
            <div className="text-gray-500 text-sm">Teacher</div>
            <div className="text-xs text-gray-400">Birth Date</div>
          </div>
        </div>
      </section>
      {/* Email, Phone, Address */}
      <section className="col-span-3 bg-white rounded shadow p-4 flex flex-col gap-2">
        <div className="font-semibold">Email</div>
        <div className="text-sm">alyniaallan@example.com</div>
        <div className="font-semibold mt-2">Phone</div>
        <div className="text-sm">(415) 646-9507</div>
        <div className="font-semibold mt-2">Addresses</div>
        <div className="text-sm">36 Oakwood Dr Santo Cir<br/>North York, Ontario<br/>Canada</div>
      </section>
      {/* Private Qualifications */}
      <section className="col-span-3 bg-white rounded shadow p-4">
        <div className="font-semibold mb-2">Private Qualifications</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th>Name</th>
              <th>Rate ($/hr)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Vocal Contemporary</td><td>$28.00</td></tr>
            <tr><td>Vocal Core</td><td>$28.00</td></tr>
            <tr><td>Vocal Prep</td><td>$28.00</td></tr>
            <tr><td>Instruments</td><td>$28.00</td></tr>
          </tbody>
        </table>
      </section>
      {/* Group Qualifications */}
      <section className="col-span-3 bg-white rounded shadow p-4">
        <div className="font-semibold mb-2">Group Qualifications</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th>Name</th>
              <th>Rate ($/hr)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td></td><td></td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
