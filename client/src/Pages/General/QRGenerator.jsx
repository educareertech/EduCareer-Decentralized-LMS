import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ data }) => {
  return (
    <div>
      <QRCode value={data} size={65} fgColor="#000" bgColor="#fff" />
    </div>
  );
};

export default QRCodeGenerator;