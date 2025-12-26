import { useState } from "react"
import { TerminalIcon } from "@phosphor-icons/react"
import { motion } from "framer-motion"

type CommandEntry = {
    command: string
    output: string | string[]
    type: 'input' | 'output'
}

export default function Shell({ children }: any) {
    const [input, setInput] = useState("")
    const [history, setHistory] = useState<CommandEntry[]>([
        { command: "", output: "Welcome to the Kernel Portal. Type 'help' to see available commands.", type: 'output' }
    ])
    const [isAnalyzing, setIsAnalyzing] = useState(false)


    const commands: Record<string, string | (() => string | string[])> = {
        help: "Available commands: help, analyze, plan, ls, cat, clear, whoami",
        ls: "Knowledge Objects: [ebpf_fundamentals], [verifier_checks], [jit_compilation], [kernel_hooks]",
        whoami: "You are an explorer in the kernel space.",
        cat: () => "Usage: cat [object_name]. Try 'cat ebpf_fundamentals'",
        ebpf_fundamentals: "eBPF allows you to run sandboxed programs in the Linux kernel without changing kernel source code or loading kernel modules.",
        verifier_checks: "The verifier ensures safety by checking for infinite loops, out-of-bounds memory access, and more.",
        jit_compilation: "JIT translates eBPF bytecode into native machine instructions for maximum performance.",
        kernel_hooks: "eBPF programs attach to hooks like kprobes, tracepoints, and network sockets.",
        analyze: () => {
            setIsAnalyzing(true)
            setTimeout(() => {
                setHistory(prev => [...prev, {
                    command: "",
                    output: [
                        ">>> Initializing deep scan...",
                        "✓ Context: Linux Kernel Observability",
                        "✓ Primary Tech: eBPF (Extended Berkeley Packet Filter)",
                        "✓ Components: Verifier, JIT, Maps, Hooks",
                        "Analysis Complete: The blog provides a solid mental model for eBPF entry points."
                    ],
                    type: 'output'
                }])
                setIsAnalyzing(false)
            }, 2000)
            return "Searching for kernel entry points..."
        },
        plan: () => [
            "Generated Learning Path:",
            "├─ Step 1: Master C for eBPF (Restricted C)",
            "├─ Step 2: Learn Libbpf and CO-RE (Compile Once – Run Everywhere)",
            "├─ Step 3: Implement a simple packet dropper (XDP)",
            "└─ Step 4: Explore advanced observability with BCC/bpftrace"
        ],
        clear: () => {
            setHistory([])
            return ""
        }
    }

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const cmd = input.trim().toLowerCase()
        const newEntry: CommandEntry = { command: cmd, output: "", type: 'input' }

        let output: string | string[] = "Error: Instruction not recognized. Type 'help'."

        if (commands[cmd]) {
            const result = commands[cmd]
            output = typeof result === 'function' ? result() : result
        }

        if (cmd !== 'clear') {
            setHistory(prev => [...prev, { ...newEntry, output }])
        }
        setInput("")
    }

    return (
        <div className="my-10 relative bg-[#0a0a0b]/90 backdrop-blur-md border border-white/10 overflow-hidden font-mono text-xs md:text-sm ">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <TerminalIcon weight="duotone" className="text-primary size-4" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Kernel::Interactive_Shell</span>
                    </div>
                </div>
                <div className="text-[10px] text-white/20 font-medium">TTY/01</div>
            </div>

            {/* Terminal Body */}
            <div
                className="p-6 h-[350px] overflow-y-auto scrollbar-none bg-black/40 selection:bg-primary/30 selection:text-primary-foreground"
            >
                <div className="space-y-4">
                    {history.map((entry, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {entry.type === 'input' && (
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="opacity-50 font-bold">❯</span>
                                    <span className="font-semibold tracking-tight">{entry.command}</span>
                                </div>
                            )}
                            {entry.output && (
                                <div className="pl-4 text-white/70 leading-relaxed font-light">
                                    {Array.isArray(entry.output) ? (
                                        <div className="space-y-1.5 border-l border-white/5 pl-4 py-1">
                                            {entry.output.map((line, j) => (
                                                <div key={j} className="flex gap-2">
                                                    <span className="text-primary/40">•</span>
                                                    <span>{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap">{entry.output}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pl-4 flex items-center gap-3 text-primary"
                        >
                            <span className="size-1.5 rounded-full bg-primary animate-ping" />
                            <span className="text-[10px] uppercase tracking-widest font-black italic">Synthesizing...</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-3 group">
                <span className="text-primary font-bold group-focus-within:animate-pulse transition-all">❯</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/10"
                    placeholder="Execute command..."
                    autoFocus
                />
            </form>

            <div className="hidden" aria-hidden="true">{children}</div>
        </div>
    )
}