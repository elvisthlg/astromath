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

    const [step, setStep] = useState(0);

    const commonDenom = lcm(den1, den2);
    // scaling
    const newNum1 = num1 * (commonDenom / den1);
    const newNum2 = num2 * (commonDenom / den2);
    const resultNum = newNum1 - newNum2;

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

            <div style={{ transition: 'opacity 0.5s', opacity: step >= 0 ? 1 : 0 }}>
                <h3>1. Represent the first fraction</h3>
                <InteractiveTape
                    segments={step >= 1 ? commonDenom : den1}
                    shaded={step >= 1 ? newNum1 : num1}
                    label={`${num1}/${den1} ${step >= 1 ? `becomes ${newNum1}/${commonDenom}` : ''}`}
                />
            </div>

            {step >= 1 && (
                <div style={{ transition: 'opacity 0.5s', opacity: 1, marginTop: '2rem' }}>
                    <h3>2. Prepare to subtract {newNum2}/{commonDenom}</h3>
                    <p>We visualize this by highlighting {newNum2} blocks to remove.</p>
                    {/* Visual removal trick: shade the parts to be removed in red */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                            Removing {newNum2} parts...
                        </div>
                        <div style={{ display: 'flex', border: '2px solid #1f2937', borderRadius: '4px', background: 'white', height: '80px', overflow: 'hidden' }}>
                            {Array.from({ length: commonDenom }).map((_, i) => {
                                // First newNum1 blocks are blue
                                // BUT, the LAST 'newNum2' of those blocks should be RED

                                const isOriginallyShaded = i < newNum1;
                                // Indices to remove: [newNum1 - newNum2, newNum1 - 1]
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

            {step >= 2 && (
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
