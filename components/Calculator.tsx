
import React, { useState, useEffect } from 'react';
import { getAppSettings } from '../services/vaultService';

interface CalculatorProps {
  onUnlock: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onUnlock }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [settings, setSettings] = useState(getAppSettings());

  const handleDigit = (digit: string) => {
    setDisplay(prev => prev === '0' ? digit : prev + digit);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    // Hidden trigger
    if (display === settings.pin && settings.isSetupComplete) {
      onUnlock();
      return;
    }

    try {
      // Functional math
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '']
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-black p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="mb-6 px-4 text-right overflow-hidden h-32 flex flex-col justify-end">
        <div className="text-slate-500 text-sm font-mono h-6">{equation}</div>
        <div className="text-white text-6xl font-light tracking-tighter truncate">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, i) => {
          if (btn === '') return <div key={i}></div>;
          
          let color = "bg-slate-900 text-slate-100 hover:bg-slate-800";
          if (['/', '*', '-', '+', '='].includes(btn)) color = "bg-slate-800 text-orange-500 hover:bg-slate-700 font-bold";
          if (['C', '±', '%'].includes(btn)) color = "bg-slate-700 text-slate-300 hover:bg-slate-600";
          
          return (
            <button
              key={i}
              onClick={() => {
                if (btn === 'C') clear();
                else if (btn === '=') calculate();
                else if (['/', '*', '-', '+'].includes(btn)) handleOp(btn);
                else handleDigit(btn);
              }}
              className={`${color} h-14 w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center text-xl transition-all active:scale-90`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
