import { useState } from "react";
import RequirementModal from "./RequirementModal";

function RequirementBox() {
  const [requirement, setRequirement] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
  if (!requirement.trim()) {
    setError(true);
    return;
  }

  setError(false);

  try {
    const res = await fetch(
      "http://localhost:5000/requirements",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setOpen(true);

      console.log("Saved successfully");
    }

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-green-700 px-6 py-10">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded">

        <h2 className="text-xl font-bold text-green-800 mb-4">
          Tell Us What Are You Looking For ?
        </h2>

        <textarea
          value={requirement}
          onChange={(e) => {
            setRequirement(e.target.value);
            setError(false);
          }}
          className={`w-full p-4 h-32 border ${
            error ? "border-red-500 bg-red-50" : "border-green-300"
          }`}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">
            Please enter your requirement
          </p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleClick}
            className="bg-yellow-400 px-6 py-2 rounded"
          >
            ➤ Send it Now !
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      {open && (
        <RequirementModal
          requirement={requirement}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}

export default RequirementBox;