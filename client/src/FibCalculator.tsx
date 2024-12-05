import axios from "axios";
import { useEffect, useState } from "react";

const FibCalculator = () => {
  const [state, setState] = useState({
    index: "",
    values: [],
    indexes: [],
  });

  const fetchValues = async () => {
    try {
      const resp = await axios.get("/api/values/current");
      if (resp.status === 200) {
        const indexes: any[] = [];
        for (var id in resp.data) indexes.push({ key: id, val: resp.data[id] });
        setState((p: any) => ({ ...p, values: indexes }));
      }
    } catch (error) {}
  };

  const fetchIndexes = async () => {
    try {
      const resp = await axios.get("/api/values/all");
      if (resp.status === 200) {
        setState((p: any) => ({ ...p, indexes: resp.data }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log("FIB-CAL");
    fetchValues();
    fetchIndexes();
  }, []);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post("/api/values", { index: state.index });
      setState((ps: any) => ({ ...ps, index: "" }));
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) => {
            setState((ps) => ({ ...ps, index: event.target.value }));
          }}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {state.indexes.map((id: any) => id.seq_no).join(", ")}

      <h3>Calculated Values:</h3>
      {state.values.map((val: any) => (
        <div key={val.key}>
          For index {val.key} I calculated {val.val}
        </div>
      ))}
    </div>
  );
};

export default FibCalculator;
