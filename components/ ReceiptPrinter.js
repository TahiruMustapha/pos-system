// ReceiptPrinter.js
import React from 'react';
import { useReactToPrint } from 'react-to-print';

const ReceiptPrinter = ({ receiptContent }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Receipt</button>
      <div ref={componentRef}>
        {/* Your receipt content goes here */}
        <p>{receiptContent}</p>
      </div>
    </div>
  );
}

export default ReceiptPrinter;
