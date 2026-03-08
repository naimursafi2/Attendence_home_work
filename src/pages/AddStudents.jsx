import React, { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { toast, ToastContainer } from "react-toastify";

const AddStudents = () => {
  const db = getDatabase();
  const [batchList, setBatchList] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [batchId, setBatchid] = useState("");
  const handelAddStudents = () => {
    if (!studentName) {
      return toast.info("Enter The Student Name")
    }
    set(push(ref(db, "studentList/" + batchId)), {
      studentName,
    }).then(() => {
      setStudentName("");
    });
    // console.log(studentName);
  };
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
  useEffect(() => {
    onValue(ref(db, "batchList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
    });
  }, []);
  const handelDelete = (id) => {
    remove(ref(db, `studentList/${batchId}/${id}`));
  };
  return (
    <div className="bg-[url('/backround7.png')]  bg-no-repeat bg-cover bg-center flex justify-center h-screen items-center">
      <ToastContainer/>
      <div className="bg-slate-200/75 p-10 shadow rounded-2xl">
        <h1 className="text-3xl border-b w-lg font-bold">Add New Students</h1>
        <Select
          onChange={(e) => setBatchid(e.target.value)}
          option={batchList}
        />
        <div className="flex items-center gap-4 mt-3">
          <Input
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name.."
            value={studentName}
          />
          <Button onClick={handelAddStudents}>Add</Button>
        </div>
        <h1 className="text-2xl font-bold text-primary mt-10 border-b border-slate-300">
          Student List
        </h1>
        {studentList.length > 0 ? (
          studentList.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mt-4"
            >
              <p className="text-xl">{item.studentName}</p>
              <Button onClick={()=>handelDelete(item.id)} size="sm" variant="danger">
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="m-auto px-2 py-1 mt-10 bg-red-600 text-white rounded-2xl w-fit">
            Student Is Not Enrolled In This Batch
          </p>
        )}
      </div>
    </div>
  );
};

export default AddStudents;
