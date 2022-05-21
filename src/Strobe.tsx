import React from 'react';

type StrobePropType = {
  toggle: Boolean;
};

export default function Strobe({ toggle }: StrobePropType) {
  if (toggle) return <div className="strobe">wack</div>;
  return <div>shit</div>;
}
