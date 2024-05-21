// BarcodeScanner.js
import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('');

  const handleScan = data => {
    if (data) {
      setBarcode(data);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  return (
    <div>
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
      />
      <p>{barcode}</p>
    </div>
  );
}

export default BarcodeScanner;
