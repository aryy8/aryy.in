'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

declare global {
    interface Window {
        loadPyodide?: any;
        pyodide?: any;
    }
}

export function JupyterCell() {
    const outputRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLTextAreaElement>(null);
    const runButtonRef = useRef<HTMLButtonElement>(null);
    const pyodideRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPyodideReady, setIsPyodideReady] = useState(false);
    const [shouldLoadPyodide, setShouldLoadPyodide] = useState(false);
    const [sessionStarted, setSessionStarted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Initial code content
    const initialCode = `#press
#shift+enter
#to execute cell


import time
import sys
import random

WIDTH = 60
HEIGHT = 20

def clear():
    sys.stdout.write("\x1b[2J\x1b[H")

# Generate data (y = 0.5x + noise), first quadrant only
data = [(x, 0.5*x + random.uniform(-1, 1)) for x in range(1, 21)]

# Initial line y = mx + b
m = random.uniform(0, 1)
b = random.uniform(0, 2)
lr = 0.01

def predict(x):
    return m*x + b

for step in range(5):
    clear()\n    print('Linear Regression Learning\\n')\n    print(f'Step {step+1}/5 | slope={m:.2f} intercept={b:.2f}\\n')

    for y in range(HEIGHT, -1, -1):
        row = ""
        for x in range(WIDTH + 1):
            px = x / 3
            py = y / 2

            char = " "

            # Axes (first quadrant)
            if x == 0:
                char = "|"
            if y == 0:
                char = "-"
            if x == 0 and y == 0:
                char = "+"

            # Data points
            for dx, dy in data:
                if abs(px - dx) < 0.3 and abs(py - dy) < 0.3:
                    char = "●"

            # Regression line
            if abs(py - predict(px)) < 0.3:
                char = "="

            row += char
        print(row)

    # Gradient descent update
    dm = sum((predict(x) - y)*x for x, y in data) / len(data)
    db = sum(predict(x) - y for x, y in data) / len(data)

    m -= lr * dm
    b -= lr * db

    time.sleep(0.3)

print("\\n...where learning begins!")

`;

    // List of required packages
    const requiredPackages = [
        'numpy',
        'matplotlib',
        'scikit-learn',
        'pandas',
        'micropip'
    ];

    // Intersection Observer for lazy loading
    useEffect(() => {
        // Remove auto-loading - now requires manual start
        return () => {};
    }, []);

    // Start session function
    const startSession = () => {
        setSessionStarted(true);
        setShouldLoadPyodide(true);
    };

    // Initialize Pyodide only when section is visible
    useEffect(() => {
        if (!shouldLoadPyodide) return;

        const loadPyodide = async () => {
            setIsLoading(true);
            try {
                // Load Pyodide
                const pyodide = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
                    stdout: (text: string) => {
                        if (outputRef.current) {
                            const output = document.createElement('div');
                            output.className = 'text-sm font-mono whitespace-pre';
                            output.textContent = text;
                            outputRef.current.appendChild(output);
                        }
                    },
                });

                // Load required packages
                await pyodide.loadPackage(requiredPackages);

                // Set up matplotlib to output to the DOM
                await pyodide.runPythonAsync(`
          import matplotlib
          # Use the 'module' backend which works well with Pyodide
          matplotlib.use('module://matplotlib_inline.backend_inline')
          import matplotlib.pyplot as plt
          import io, base64
          from js import document
          
          # Custom display function for showing plots
          def show():
              buf = io.BytesIO()
              plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
              plt.close()
              buf.seek(0)
              # Get the base64 encoded image
              img_data = base64.b64encode(buf.getvalue()).decode('utf-8')
              # Create image element using JavaScript interop
              img = document.createElement('img')
              img.src = f'data:image/png;base64,{img_data}'
              # Append to output
              output = document.getElementById('output')
              if output:
                  output.appendChild(img)
              return img
        `);

                pyodideRef.current = pyodide;
                setIsPyodideReady(true);
            } catch (error) {
                console.error('Error loading Pyodide:', error);
                if (outputRef.current) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    outputRef.current.textContent = `Error initializing Python environment: ${errorMessage}`;
                }
            } finally {
                setIsLoading(false);
            }
        };

        // Only load Pyodide if it's not already loaded
        if (!window.pyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
            script.async = true;
            script.onload = loadPyodide;
            document.head.appendChild(script);
        } else {
            loadPyodide();
        }
    }, [shouldLoadPyodide]);

    // Set up keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key === 'Enter') {
                e.preventDefault();
                runCode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPyodideReady]);

    const runCode = async () => {
        if (!pyodideRef.current || !codeRef.current || !isPyodideReady) return;

        setIsRunning(true);
        if (outputRef.current) {
            outputRef.current.innerHTML = '';
        }

        try {
            // Add a small delay to ensure the UI updates
            await new Promise(resolve => setTimeout(resolve, 50));

            // Execute the code
            await pyodideRef.current.runPythonAsync(codeRef.current.value);
        } catch (error) {
            if (outputRef.current) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'text-red-500 text-sm font-mono whitespace-pre';
                const errorMessage = error instanceof Error ? error.message : String(error);
                errorDiv.textContent = errorMessage;
                outputRef.current.appendChild(errorDiv);
            }
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div ref={sectionRef} className="w-full max-w-4xl mx-auto my-6">
            {/* Main cell container */}
            <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm">
                {/* Code input area with left sidebar */}
                <div className="relative flex">
                    {/* Left sidebar with run button */}
                    <div className="flex flex-col items-center w-10 bg-background border-r border-border/50">
                        <button
                            ref={runButtonRef}
                            onClick={runCode}
                            disabled={!isPyodideReady || isRunning}
                            className="w-full py-2 flex items-center justify-center hover:bg-foreground/5 transition-colors group"
                            aria-label="Run cell"
                        >
                            <div className="w-0.5 h-6 bg-white mr-2"></div>
                            {isRunning ? (
                                <Loader2 className="h-4 w-4 text-foreground/70 animate-spin" />
                            ) : (
                                <svg
                                    className="h-4 w-4 text-foreground/70 group-hover:text-foreground transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Code editor area */}
                    <div className="flex-1 flex flex-col">
                        {/* Top bar with cell actions */}
                        <div className="flex justify-end px-2 py-1 bg-background border-b border-border/50">
                            <div className="flex items-center space-x-1 bg-foreground/5 rounded-md p-0.5">
                                {/* Start Session Button */}
                                {!sessionStarted && (
                                    <Button
                                        onClick={startSession}
                                        disabled={isLoading}
                                        size="sm"
                                        variant="ghost"
                                        className="text-xs h-7 px-2 text-foreground/60 hover:text-foreground/80 hover:bg-transparent"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                                Starting...
                                            </>
                                        ) : (
                                            'Start Session'
                                        )}
                                    </Button>
                                )}
                                
                                <button
                                    className="p-1 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded transition-colors"
                                    title="Move cell up"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                                <button
                                    className="p-1 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded transition-colors"
                                    title="Move cell down"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <button
                                    className="p-1 text-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                                    title="Delete cell"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Code input */}
                        <textarea
                            ref={codeRef}
                            className="w-full min-h-[120px] font-mono text-sm bg-background text-foreground p-4 focus:outline-none resize-none"
                            spellCheck="false"
                            defaultValue={initialCode}
                            style={{
                                fontFeatureSettings: '"liga" 0, "calt" 0',
                                fontVariantLigatures: 'none',
                                lineHeight: '1.5',
                                tabSize: 4
                            }}
                        />
                    </div>
                </div>

                {/* Output area */}
                <div
                    id="output"
                    ref={outputRef}
                    className="min-h-16 p-4 font-mono text-sm bg-background border-t border-border/50 overflow-auto text-foreground/90"
                    style={{
                        fontFeatureSettings: '"liga" 0, "calt" 0',
                        fontVariantLigatures: 'none',
                        lineHeight: '1.5'
                    }}
                >
                    {sessionStarted && isLoading && (
                        <div className="flex items-center justify-center h-16 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span className="text-sm">Starting Python environment...</span>
                        </div>
                    )}
                    {sessionStarted && !isLoading && !isPyodideReady && (
                        <div className="flex items-center justify-center h-16 text-muted-foreground">
                            <span className="text-sm">Python environment ready. Press Shift+Enter to run code.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
