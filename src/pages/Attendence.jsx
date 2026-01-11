import React, { useEffect, useState } from "react";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import Switch from "../components/ui/Switch";
import Button from "../components/ui/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Attendence = () => {
  const [batchList, setBatchList] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [attendDate, setAttendDate] = useState("");
  const db = getDatabase();
  const navigate = useNavigate();
  const handelAttendence = () => {
    if (!batchId) return toast.warning("Please Select The Batch");
    if (!attendDate) return toast.warning("Please Select The Date");
    set(push(ref(db, "attendList/" + batchId)), {
      studentList,
      attendDate,
    }).then(() => {
      setAttendDate("");
      setBatchId("");
      toast.success("Attendance Submitted!");
      setTimeout(() => {
        navigate("/report");
      }, 2000);
    });
  };
  const handelAttendToggol = (id, attend) => {
    console.log(id, attend);
    const attendUpdate = studentList.map((item) => {
      if (item.id == id) {
        item.attend = attend;
      }
      return item;
    });
    setStudentList(attendUpdate);
  };
  useEffect(() => {
    onValue(ref(db, "batchList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key, attend: false });
      });
      setBatchList(arr);
    });
  }, []);
  useEffect(() => {
    if (!batchId) return;
    onValue(ref(db, "studentList/" + batchId), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setStudentList(arr);
    });
  }, [batchId]);

  return (
    <div className="w-5xl flex justify-center flex-col m-auto mt-7">
      <ToastContainer />
      <div className=" bg-slate-300 p-10 shadow rounded-2xl">
        <h1 className=" text-3xl border-b  font-bold">Select Batch & Date</h1>
        <div className="flex gap-3 mt-4 items-center">
          <Select
            onChange={(e) => setBatchId(e.target.value)}
            option={batchList}
            value={batchId}
          />
          <Input
            type="date"
            onChange={(e) => setAttendDate(e.target.value)}
            value={attendDate}
          />
        </div>
      </div>
      {studentList.length > 0 ? (
        <div className=" bg-yellow-100 p-10 rounded-2xl shadow-2xl mt-7 border">
          <table className="w-full">
            <thead className="text-xl uppercase">
              <tr>
                <td className="w-[10%] pb-3">SL</td>
                <td className="w-full pb-3">Student Name</td>
                <td className="w-[10%] pb-3">Attendence</td>
              </tr>
            </thead>
            <tbody className="tabel_bdy">
              {studentList.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.studentName}</td>
                  <td>
                    <Switch
                      attend={item.attend}
                      onChange={(e) =>
                        handelAttendToggol(item.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-7 ">
            <Button onClick={handelAttendence}>Submit</Button>
          </div>
        </div>
      ) : (
        <p className="m-auto mt-10 bg-red-600 px-2 py-1 text-2xl text-white rounded-2xl w-fit">
          No Data Found
        </p>
      )}
    </div>
  );
};

export default Attendence;
