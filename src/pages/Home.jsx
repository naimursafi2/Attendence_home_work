import React, { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import ListLoading from "../components/ui/ListLoading";

const Home = () => {
  const db = getDatabase();
  const [batchName, setBatchName] = useState("");
  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handelAdd = () => {
    if (!batchName) {
      return;
    }
    set(push(ref(db, "batchList/")), {
      batchName,
    }).then(() => {
      setBatchName("");
    });
    // console.log(batchName);
  };
  useEffect(() => {
    onValue(ref(db, "batchList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
      setLoading(false);
      // console.log(arr);
    });
  }, []);
  const handelDelete = (id) => {
    remove(ref(db, "batchList/" + id));
  };
  return (
    <div className="bg-[url('backround1.jpg')]  bg-no-repeat bg-cover bg-center flex justify-center h-screen items-center">
      <div className="bg-slate-200/70 p-10 shadow rounded-2xl">
        <h1 className="text-3xl border-b w-lg font-bold">Create New Batch</h1>
        <div className="flex items-center gap-4 mt-3">
          <Input
            onChange={(e) => setBatchName(e.target.value)}
            placeholder="Batch Name.."
            value={batchName}
          />
          <Button onClick={handelAdd}>Add</Button>
        </div>
        <h2 className="mt-4 text-xl font-bold border-b border-b-slate-300">
          Batch List
        </h2>
        {loading ? (
          <ListLoading />
        ) : (
          <div className="mt-5">
            {batchList.length > 0 ? (
              batchList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-1 justify-between"
                >
                  <p className="text-lg">{item.batchName}</p>
                  <Button
                    onClick={() => handelDelete(item.id)}
                    size="sm"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="bg-red-500 px-2 py-1 rounded-xl text-white w-fit m-auto">
                No Data Pound
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
