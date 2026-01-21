import { h } from 'preact';
import { useState } from 'preact/hooks';
import AdditionCalculator from './AdditionCalculator';
import SubtractionCalculator from './SubtractionCalculator';
import MultiplicationCalculator from './MultiplicationCalculator';
import DivisionCalculator from './DivisionCalculator';

type Operation = 'add' | 'sub' | 'mult' | 'div';

export default function MathWorkshop() {
  const [activeOp, setActiveOp] = useState<Operation>('add');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem', 
        marginBottom: '2rem',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem'
      }}>
        <button 
          onClick={() => setActiveOp('add')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            background: activeOp === 'add' ? '#4f46e5' : '#e5e7eb',
            color: activeOp === 'add' ? 'white' : '#374151',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Addition (+)
        </button>
        <button 
          onClick={() => setActiveOp('sub')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            background: activeOp === 'sub' ? '#ec4899' : '#e5e7eb',
            color: activeOp === 'sub' ? 'white' : '#374151',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Subtraction (-)
        </button>
        <button 
          onClick={() => setActiveOp('mult')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            background: activeOp === 'mult' ? '#8b5cf6' : '#e5e7eb',
            color: activeOp === 'mult' ? 'white' : '#374151',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Multiplication (×)
        </button>
        <button 
          onClick={() => setActiveOp('div')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            background: activeOp === 'div' ? '#059669' : '#e5e7eb',
            color: activeOp === 'div' ? 'white' : '#374151',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Division (÷)
        </button>
      </div>

      <div style={{ minHeight: '400px', animation: 'fadeIn 0.3s ease' }}>
        {activeOp === 'add' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#4f46e5', marginBottom: '0.5rem' }}>Adding Fractions</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Find a common unit to combine parts.</p>
            <AdditionCalculator />
          </div>
        )}
        {activeOp === 'sub' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#ec4899', marginBottom: '0.5rem' }}>Subtracting Fractions</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Remove parts from the whole.</p>
            <SubtractionCalculator />
          </div>
        )}
        {activeOp === 'mult' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#8b5cf6', marginBottom: '0.5rem' }}>Multiplying Fractions</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Find a "part of a part".</p>
            <MultiplicationCalculator />
          </div>
        )}
        {activeOp === 'div' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#059669', marginBottom: '0.5rem' }}>Dividing Fractions</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Count how many groups fit inside.</p>
            <DivisionCalculator />
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
