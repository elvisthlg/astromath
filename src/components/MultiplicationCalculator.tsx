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

    const [step, setStep] = useState(0);

    // For multiplication A * B (or A of B), we subdivide B.
    // Final total segments = den1 * den2
    // We first show num2/den2
    // Then split each den2 segment into den1 parts -> total (den1*den2) parts
    // Then we take num1 of those *groups* of parts.

    // Actually, standard algo:
    // Show B.
    // Subdivide B by den1.
    // Select num1 rows/groups of that subdivision.

    const commonDenom = den1 * den2;
    // B expressed in common denom
    const bInCommon = num2 * den1;

    // The actual result = num1 * num2
    const resultNum = num1 * num2;

    const handleCalculate = () => {
        setStep(0);
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

            <div style={{ transition: 'opacity 0.5s', opacity: step >= 0 ? 1 : 0 }}>
                <h3>1. Represents {num2}/{den2}</h3>
                <p>Start with the second fraction.</p>
                <InteractiveTape
                    segments={step >= 1 ? commonDenom : den2}
                    shaded={step >= 1 ? bInCommon : num2}
                    label={`${num2}/${den2} ${step >= 1 ? `subdivided by ${den1} → ${bInCommon}/${commonDenom}` : ''}`}
                    color="var(--primary-light)"
                />
            </div>

            {step >= 1 && (
                <div style={{ transition: 'opacity 0.5s', opacity: 1, marginTop: '2rem' }}>
                    <h3>2. Take {num1}/{den1} of the shaded area</h3>
                    <p>The shaded area has {bInCommon} small segments. We need {num1}/{den1} of {bInCommon}.</p>
                    <p>Wait, that logic handles simpler cases. Let's visualize the "double shading".</p>
                    <InteractiveTape
                        segments={commonDenom}
                        shaded={bInCommon}
                        secondShading={resultNum}
                        label={`Overlapping ${resultNum} segments`}
                    />
                    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <span style={{ width: 16, height: 16, background: '#818cf8', display: 'inline-block' }}></span>
                        Overlap is the answer
                    </div>
                </div>
            )}

            {step >= 2 && (
                <div style={{ marginTop: '2rem', animation: 'slideUp 0.5s ease-out' }}>
                    <h3 style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>Result</h3>
                    <p>{num1} * {num2} = {resultNum}</p>
                    <p>{den1} * {den2} = {commonDenom}</p>
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
