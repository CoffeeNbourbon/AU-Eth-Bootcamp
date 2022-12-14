import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, signature, setSignature }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const [recovery, setRecovery] = useState(0);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient,
        signature,
        recovery: parseInt(recovery)
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      
      <label>
        Signature
        <input
          placeholder="Type a signature"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      
      <label>
        Recovery
        <input
          placeholder="Recovery Bit"
          value={recovery}
          onChange={setValue(setRecovery)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;