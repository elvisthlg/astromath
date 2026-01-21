import { h } from 'preact';
import { useState } from 'preact/hooks';
import InteractiveTape from './InteractiveTape';

// Helper to find LCD
const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default function MultiplicationCalculator() {
    const [num1, setNum1] = useState(1);
    const [den1, setDen1] = useState(2);
    const [num2, setNum2] = useState(3);
    const [den2, setDen2] = useState(4);

    // Steps: 0=Input, 1=Show 2nd Fraction, 2=Subdivide, 3=Select Overlap, 4=Result
    const [step, setStep] = useState(0);

    const commonDenom = den1 * den2;
    const bInCommon = num2 * den1;
    const resultNum = num1 * num2;

    const handleCalculate = () => {
        setStep(0);
        setTimeout(() => setStep(1), 100);  // Show B
        setTimeout(() => setStep(2), 2000); // Subdivide
        setTimeout(() => setStep(3), 4000); // Highlight Overlap
        setTimeout(() => setStep(4), 6000); // Result
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

                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&times;</div>

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
                        background: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    Animate
                </button>
            </div>

            <div style={{ transition: 'opacity 0.5s', opacity: step >= 1 ? 1 : 0 }}>
                <h3>Step 1: Visualize {num2}/{den2}</h3>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', minHeight: '1.5em' }}>
                    {step === 1 && "Start with the second fraction (the whole we are taking a part of)."}
                    {step === 2 && `Subdivide each part into ${den1} pieces to find ${num1}/${den1} of it.`}
                    {step >= 3 && `Take ${num1} out of every ${den1} subdivided parts.`}
                </p>

                <InteractiveTape
                    segments={step >= 2 ? commonDenom : den2}
                    shaded={step >= 2 ? bInCommon : num2}
                    label={`${num2}/${den2} ${step >= 2 ? `→ ${bInCommon}/${commonDenom}` : ''}`}
                    color="var(--primary-light)"
                />
            </div>

            {step >= 3 && (
                <div style={{ transition: 'opacity 0.5s', opacity: 1, marginTop: '2rem' }}>
                    <h3>Step 2: Overlap</h3>
                    <p>Identifying the pieces that represent {num1}/{den1} of the shaded area.</p>
                    <InteractiveTape
                        segments={commonDenom}
                        shaded={bInCommon}
                        secondShading={resultNum}
                        label={`Darker regions are the answer`}
                    />
                    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <span style={{ width: 16, height: 16, background: '#818cf8', display: 'inline-block' }}></span>
                        Result Area ({resultNum} segments)
                    </div>
                </div>
            )}

            {step >= 4 && (
                <div style={{ marginTop: '2rem', animation: 'slideUp 0.5s ease-out' }}>
                    <h3 style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>Result</h3>
                    <p>{num1}/{den1} of {num2}/{den2}</p>
                    <InteractiveTape
                        segments={commonDenom}
                        shaded={resultNum}
                        label={`Result: ${resultNum}/${commonDenom}`}
                        color="#818cf8"
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
