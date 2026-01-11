import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import Select from "../components/ui/Select";
import Switch from "../components/ui/Switch";

const Report = () => {
  const db = getDatabase();
  const [batchList, setBatchList] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [attendList, setAttendList] = useState([]);

  // Load all batches
  useEffect(() => {
    onValue(ref(db, "batchList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
    });
  }, []);

  // Load attendances of selected batch
  useEffect(() => {
    if (!batchId) return;

    onValue(ref(db, "attendList/" + batchId), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setAttendList(arr);
    });
  }, [batchId]);

  return (
    <div className="p-10 w-2xl m-auto">
      <h1 className="text-slate-500 text-3xl font-bold mb-4 text-center border-b-4 border-b-blue-800">Attendance Report</h1>

      <Select
        option={batchList}
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
      />

      {attendList.length > 0 ? (
        attendList.map((entry) => (
          <div
            key={entry.id}
            className="mt-6 bg-yellow-300 p-4 rounded-lg shadow-2xl "
          >
            <h2 className="font-bold text-xl">Date: {entry.attendDate}</h2>
            <table className="w-full mt-3 border">
              <thead>
                <tr className="bg-slate-200">
                  <td className="text-xl uppercase border p-2 w-[10%]">SL</td>
                  <td className="text-xl uppercase border p-2">Student Name</td>
                  <td className="text-xl uppercase border p-2 w-[20%]">Attendance</td>
                </tr>
              </thead>
              <tbody>
                {attendList.map((entry, i) =>
                  // console.log(entry.studentList.attend)

                  entry.studentList.map((student) => (
                    <tr key={student.id}>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2 text-lg">{student.studentName}</td>
                      <td className="border p-2">
                       
                        {student.attend ? "Present" : "Absent"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="mt-6 text-white bg-red-600 px-2 py-1 w-fit m-auto rou">
          No Attendance Found
        </p>
      )}
    </div>
  );
};

export default Report;
