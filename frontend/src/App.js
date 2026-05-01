import { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x3784D8b4ad8E5F0216bC8393626F2cA06A5F4bBA";

const abi = [
  "function registerDocument(bytes32 _hash, string _fileName)",
  "function verifyDocument(bytes32 _hash) view returns (bool, uint256, address, string)"
];

function App() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [result, setResult] = useState("");
  const [account, setAccount] = useState("");

  // hash file
  const hashFile = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  // connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  // register (write)
  const register = async () => {
    if (!file) return alert("Select file first");

    const fileHash = await hashFile(file);
    setHash(fileHash);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.registerDocument(fileHash, file.name);
    await tx.wait();

    setResult("Stored on blockchain ✅");
  };

  // verify (read only)
  const verify = async () => {
    if (!file) return alert("Select file first");

    const fileHash = await hashFile(file);
    setHash(fileHash);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const res = await contract.verifyDocument(fileHash);

    if (res[0]) {
      setResult("✅ Verified (Original)");
    } else {
      setResult("❌ Tampered");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Document Verifier</h1>

        <button onClick={connectWallet} style={styles.connectBtn}>
          {account ? `Connected: ${account.slice(0,6)}...` : "Connect Wallet"}
        </button>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <div style={styles.buttonGroup}>
          <button onClick={register} style={styles.primaryBtn}>
            Register
          </button>

          <button onClick={verify} style={styles.secondaryBtn}>
            Verify
          </button>
        </div>

        {hash && (
          <p style={styles.hash}>
            Hash: {hash.slice(0, 20)}...
          </p>
        )}

        {result && <h2 style={styles.result}>{result}</h2>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif"
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    width: "400px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)"
  },
  title: {
    marginBottom: "20px"
  },
  connectBtn: {
    background: "#334155",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "white",
    marginBottom: "20px",
    cursor: "pointer"
  },
  input: {
    marginBottom: "20px"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  primaryBtn: {
    background: "#3b82f6",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },
  secondaryBtn: {
    background: "#10b981",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },
  hash: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#94a3b8"
  },
  result: {
    marginTop: "20px"
  }
};

export default App;