import { useState, useEffect, useRef } from "react";
import { PlayIcon, StopIcon, TerminalWindowIcon, TrashIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const LOGS = [
    "   <...>-23456 [000] .... 1234.567890: sys_enter_execve: filename=/bin/ls argv=...",
    "   <...>-23456 [000] .N.. 1234.567900: bpf_trace_printk: Hello from kernel world!",
    "    bash-12345 [001] .... 1235.112233: sys_enter_execve: filename=/usr/bin/git argv=...",
    "    bash-12345 [001] .N.. 1235.112245: bpf_trace_printk: Hello from kernel world!",
    "    node-98765 [002] .... 1236.445566: sys_enter_execve: filename=/usr/local/bin/npm argv=...",
    "    node-98765 [002] .N.. 1236.445578: bpf_trace_printk: Hello from kernel world!",
];

export default function TraceDemo() {
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout>();

    const toggleTrace = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        } else {
            setIsRunning(true);
            // setLogs([]); // Keep logs, allow manual clear
            let index = 0;
            intervalRef.current = setInterval(() => {
                if (index < LOGS.length) {
                    setLogs((prev) => [...prev, LOGS[index]]);
                    index++;
                } else {
                    // Loop for continuous effect or stop
                    index = 0;
                }
            }, 800);
        }
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="my-8 border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b p-4 bg-muted/40">
                <div className="flex items-center gap-2">
                    <TerminalWindowIcon className="text-muted-foreground" size={20} />
                    <span className="font-mono text-sm font-medium">/sys/kernel/debug/tracing/trace_pipe</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setLogs([])}
                        className="flex items-center gap-2  border border-input bg-transparent px-3 py-1.5 text-xs font-medium hover:bg-muted text-muted-foreground transition-all"
                        title="Clear Output"
                    >
                        <TrashIcon weight="duotone" size={12} />
                    </button>
                    <button
                        onClick={toggleTrace}
                        className={cn(
                            "flex items-center gap-2  px-3 py-1.5 text-xs font-medium transition-all",
                            isRunning
                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                    >
                        {isRunning ? (
                            <>
                                <StopIcon weight="duotone" size={12} />
                                Stop Trace
                            </>
                        ) : (
                            <>
                                <PlayIcon weight="duotone" size={12} />
                                Start Trace
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="h-[200px] bg-black/95 p-4 font-mono text-xs text-green-500 overflow-y-auto w-full">
                {!isRunning && logs.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-500 italic">
                        Waiting for events...
                    </div>
                )}
                <div className="space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-150 whitespace-pre-wrap break-all">
                            {log}
                        </div>
                    ))}
                    {isRunning && (
                        <div className="animate-pulse opacity-50">_</div>
                    )}
                </div>
            </div>
        </div>
    );
}
