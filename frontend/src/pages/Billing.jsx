import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BillingPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('all');
  const [billsByStudent, setBillsByStudent] = useState({});
  const [balances, setBalances] = useState({});
  const [billMonth, setBillMonth] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const fetchBillsAndBalances = async () => {
    const idsToFetch =
      selectedStudentId === 'all'
        ? students.map((s) => s.STUDENT_ID)
        : [parseInt(selectedStudentId)];

    const newBills = {};
    const newBalances = {};

    await Promise.all(
      idsToFetch.map(async (id) => {
        const billsRes = await axios.get(`http://localhost:3000/api/billing/${id}`);
        const balanceRes = await axios.get(`http://localhost:3000/api/billing/balance/${id}`);
        newBills[id] = billsRes.data;
        newBalances[id] = balanceRes.data.BALANCE;
      })
    );

    setBillsByStudent(newBills);
    setBalances(newBalances);
  };

  useEffect(() => {
    if (students.length > 0) {
      fetchBillsAndBalances();
    }
  }, [students, selectedStudentId]);

  const generateBill = async () => {
    if (!billMonth) return;
    const ids =
      selectedStudentId === 'all'
        ? students.map((s) => s.STUDENT_ID)
        : [parseInt(selectedStudentId)];

    for (let id of ids) {
      await axios.post('http://localhost:3000/api/billing/generate', {
        student_id: id,
        bill_month: billMonth,
      });
    }

    setBillMonth('');
    fetchBillsAndBalances();
  };

  const handlePay = async (billId, amount) => {
    await axios.post('http://localhost:3000/api/billing/pay', {
      bill_id: billId,
      amount: amount,
    });
    fetchBillsAndBalances();
  };

  const totalBalance = Object.values(balances).reduce((sum, val) => sum + Number(val), 0);

  const renderTable = (studentId) => {
    const student = students.find((s) => s.STUDENT_ID === studentId);
    const bills = billsByStudent[studentId] || [];

    return (
      <div key={studentId} className="mb-8">
        {selectedStudentId === 'all' && (
          <div className="mb-2">
            <h3 className="text-lg font-semibold">
              {student?.NAME} (ID: {studentId})
            </h3>
            <p className="text-sm text-gray-600">Balance: ₹{balances[studentId]}</p>
          </div>
        )}
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Total Meals</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.BILL_ID} className="border-b">
                <td className="p-3">{bill.MONTH}</td>
                <td className="p-3">{bill.TOTAL_MEALS}</td>
                <td className="p-3">₹{bill.TOTAL_AMOUNT}</td>
                <td className="p-3">
                  {bill.IS_PAID === 'Y' ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </td>
                <td className="p-3">
                  {bill.IS_PAID === 'N' && (
                    <button
                      onClick={() => handlePay(bill.BILL_ID, bill.TOTAL_AMOUNT)}
                      className="bg-green-500 text-white p-2 rounded-md"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Monthly Bills</h2>
        <div className="flex gap-4 items-center">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All</option>
            {students.map((student) => (
              <option key={student.STUDENT_ID} value={student.STUDENT_ID}>
                {student.STUDENT_ID}: {student.NAME}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={billMonth}
            onChange={(e) => setBillMonth(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={generateBill}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Generate Bill
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">
          Unpaid Balance: ₹{totalBalance}
        </label>
      </div>

      {selectedStudentId === 'all'
        ? students.map((s) => renderTable(s.STUDENT_ID))
        : renderTable(parseInt(selectedStudentId))}
    </div>
  );
}
