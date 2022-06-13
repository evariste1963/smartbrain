import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className='w-100'>
      <div className='f3 white center pt4 '>
        {`${name}, your current entry count is...`}
      </div>
      <div className='f1 white'>{entries}</div>
    </div>
  );
};

export default Rank;
