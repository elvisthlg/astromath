import { h } from 'preact';
import { useState } from 'preact/hooks';
import InteractiveTape from './InteractiveTape';

// Helper to find LCD
const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default function SubtractionCalculator() {
    const [num1, setNum1] = useState(3);
    const [den1, setDen1] = useState(4);
    const [num2, setNum2] = useState(1);
    const [den2, setDen2] = useState(8);

    // Steps: 0=Input, 1=Show Original, 2=Convert to LCD, 3=Remove Parts, 4=Show Result
    const [step, setStep] = useState(0);

    const commonDenom = lcm(den1, den2);
    const newNum1 = num1 * (commonDenom / den1);
    const newNum2 = num2 * (commonDenom / den2);
    const resultNum = newNum1 - newNum2;

    const handleCalculate = () => {
        setStep(0);
        setTimeout(() => setStep(1), 100);  // Show
        setTimeout(() => setStep(2), 2000); // Convert
        setTimeout(() => setStep(3), 4000); // Remove visual
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

                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>-</div>

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
                        background: '#ec4899',
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
                <h3>Step 1: Setup</h3>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', minHeight: '1.5em' }}>
                    {step === 1 && "Start with the first fraction..."}
                    {step === 2 && `Convert to ${commonDenom}ths to match denominators.`}
                    {step >= 3 && `Remove ${newNum2} parts...`}
                </p>
                <InteractiveTape
                    segments={step >= 2 ? commonDenom : den1}
                    shaded={step >= 2 ? newNum1 : num1}
                    label={`${num1}/${den1} ${step >= 2 ? `→ ${newNum1}/${commonDenom}` : ''}`}
                />
            </div>

            {step >= 3 && (
                <div style={{ transition: 'opacity 0.5s', opacity: 1, marginTop: '2rem' }}>
                    <h3>Step 2: Subtraction</h3>
                    <p>Removing {newNum2}/{commonDenom} from {newNum1}/{commonDenom}.</p>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', border: '2px solid #1f2937', borderRadius: '4px', background: 'white', height: '80px', overflow: 'hidden' }}>
                            {Array.from({ length: commonDenom }).map((_, i) => {
                                const isOriginallyShaded = i < newNum1;
                                // Remove from the END of the shaded region for better visual
                                const isRemoved = i >= (newNum1 - newNum2) && i < newNum1;

                                let bg = 'white';
                                let content = <span>1/{commonDenom}</span>;

                                if (isRemoved) {
                                    bg = '#ef4444'; // Red
                                    content = <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>-</span>;
                                } else if (isOriginallyShaded) {
                                    bg = 'var(--primary-light)';
                                }

                                return (
                                    <div key={i} style={{ flex: 1, borderRight: '1px solid #9ca3af', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#4b5563', transition: 'all 0.5s ease' }}>
                                        {content}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {step >= 4 && (
                <div style={{ marginTop: '2rem', animation: 'slideUp 0.5s ease-out' }}>
                    <h3 style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>Result</h3>
                    <p>Remaining parts: {resultNum}</p>
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
