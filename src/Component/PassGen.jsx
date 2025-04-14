import React, { useState } from "react";

const PassGen = () => {
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const GenPassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let gen = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      gen += chars[randomIndex];
    }
    setPassword(gen);
    checkStrength(gen);
  };
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score === 2 || score === 3) setStrength("Medium");
    else setStrength("Strong");
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="h-screen  flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center bg-slate-100 px-20 py-20 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center text-black mb-4">
          🔐Password Generator
        </h1>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="mb-4 px-3 py-2 border rounded text-center bg-white focus:outline-none text-black font-semibold focus:ring-2"
          min="4"
          max="32"
        />
        <button
          onClick={GenPassword}
          className="text-lg font-mono bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded shadow "
        >
          Generate Password
        </button>
        <p className="text-lg font-mono bg-white mt-4 px-4 py-2 rounded shadow mb-5">
          {password || "Your password will appear here"}
        </p>

 
        {password && (
        <>
          <button
            onClick={copyToClipboard}
            className="mb-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📋 Copy to Clipboard
          </button>
          <p className={`font-semibold ${
            strength === "Weak"
              ? "text-red-500"
              : strength === "Medium"
              ? "text-yellow-600"
              : "text-green-600"
          }`}>
            Strength: {strength}
          </p>
        </>
      )}
      </div>
    </div>
  );
};

export default PassGen;
