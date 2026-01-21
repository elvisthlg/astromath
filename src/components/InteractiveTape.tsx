import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface InteractiveTapeProps {
    segments: number;
    shaded: number;
    label?: string;
    color?: string;
    secondShading?: number;
    animateChanges?: boolean;
}

export default function InteractiveTape({
    segments,
    shaded,
    label,
    color = 'var(--primary-light)',
    secondShading = 0,
    animateChanges = true,
}: InteractiveTapeProps) {

    // Local state to handle transition if needed, but CSS is usually enough
    // for simple width/grid changes. However, grid-template-columns changes are hard to animate smoothly.
    // We can use flexbox with percentage widths for better animation.

    return (
        <div style={{ marginBottom: '2rem' }}>
            {label && (
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    {label}
                </div>
            )}
            <div
                style={{
                    display: 'flex',
                    border: '2px solid #1f2937',
                    borderRadius: '4px',
                    background: 'white',
                    height: '80px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {Array.from({ length: segments }).map((_, i) => {
                    const isShaded = i < shaded;
                    const isSecondShaded = i < secondShading;

                    let bgColor = 'white';
                    if (isSecondShaded && isShaded) {
                        bgColor = '#818cf8';
                    } else if (isShaded) {
                        bgColor = color;
                    } else if (isSecondShaded) {
                        bgColor = 'var(--secondary-light)';
                    }

                    return (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                borderRight: i === segments - 1 ? 'none' : '1px solid #9ca3af',
                                backgroundColor: bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                color: '#4b5563',
                                transition: 'all 0.5s ease',
                            }}
                        >
                            <span style={{ opacity: 0.5 }}>1/{segments}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
