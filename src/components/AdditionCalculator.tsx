import { h } from 'preact';
import { useState } from 'preact/hooks';
import InteractiveTape from './InteractiveTape';

// Helper to find LCD
const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default function AdditionCalculator() {
    const [num1, setNum1] = useState(1);
    const [den1, setDen1] = useState(2);
    const [num2, setNum2] = useState(1);
    const [den2, setDen2] = useState(3);

    const [step, setStep] = useState(0); // 0: input, 1: showing scaling, 2: showing result

    const commonDenom = lcm(den1, den2);
    const scaling1 = commonDenom / den1;
    const scaling2 = commonDenom / den2;

    const newNum1 = num1 * scaling1;
    const newNum2 = num2 * scaling2;
    const resultNum = newNum1 + newNum2;

    const handleCalculate = () => {
        setStep(0);
        // Sequence animations
        setTimeout(() => setStep(1), 100);
        setTimeout(() => setStep(2), 2500);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', background: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="number" value={num1} onInput={(e) => setNum1(parseInt(e.currentTarget.value) || 0)}
                        style={{ width: '3rem', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem' }}
                    />
                    <div style={{ borderTop: '2px solid black', width: '2.5rem', margin: '0.25rem 0' }}></div>
                    <input
                        type="number" value={den1} onInput={(e) => setDen1(parseInt(e.currentTarget.value) || 1)}
                        style={{ width: '3rem', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem' }}
                    />
                </div>

                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>+</div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="number" value={num2} onInput={(e) => setNum2(parseInt(e.currentTarget.value) || 0)}
                        style={{ width: '3rem', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem' }}
                    />
                    <div style={{ borderTop: '2px solid black', width: '2.5rem', margin: '0.25rem 0' }}></div>
                    <input
                        type="number" value={den2} onInput={(e) => setDen2(parseInt(e.currentTarget.value) || 1)}
                        style={{ width: '3rem', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem' }}
                    />
                </div>

                <button
                    onClick={handleCalculate}
                    style={{
                        marginLeft: 'auto',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    Show Animation
                </button>
            </div>

            <div style={{ transition: 'opacity 0.5s', opacity: step >= 0 ? 1 : 0 }}>
                <h3>Initial Fractions</h3>
                <InteractiveTape
                    segments={step >= 1 ? commonDenom : den1}
                    shaded={step >= 1 ? newNum1 : num1}
                    label={`${num1}/${den1} ${step >= 1 ? `becomes ${newNum1}/${commonDenom}` : ''}`}
                />
                <InteractiveTape
                    segments={step >= 1 ? commonDenom : den2}
                    shaded={step >= 1 ? newNum2 : num2}
                    color="var(--secondary)"
                    label={`${num2}/${den2} ${step >= 1 ? `becomes ${newNum2}/${commonDenom}` : ''}`}
                />
            </div>

            {step >= 2 && (
                <div style={{ marginTop: '2rem', animation: 'slideUp 0.5s ease-out' }}>
                    <h3 style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>Result</h3>
                    <p>Combine the shaded parts: {newNum1} + {newNum2} = {resultNum} parts.</p>
                    <InteractiveTape
                        segments={commonDenom}
                        shaded={resultNum}
                        label={`Result: ${resultNum}/${commonDenom}`}
                    />
                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
