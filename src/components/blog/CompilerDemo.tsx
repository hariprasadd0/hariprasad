import { useState } from "react";
import { PlayIcon, CheckIcon, FileCodeIcon, ArrowRightIcon, SparkleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CompilerDemo() {
    const [status, setStatus] = useState<"idle" | "compiling" | "success">("idle");

    const runCompiler = () => {
        setStatus("compiling");
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <div className="my-8 border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                    <FileCodeIcon className="text-muted-foreground" size={20} />
                    <span className="font-mono text-sm font-medium">hello.c</span>
                </div>
                <button
                    onClick={runCompiler}
                    disabled={status !== "idle"}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all",
                        status === "idle"
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : status === "success"
                                ? "bg-green-600 text-white cursor-default"
                                : "bg-muted text-muted-foreground cursor-wait"
                    )}
                >
                    {status === "idle" && (
                        <>
                            <PlayIcon weight="duotone" size={12} />
                            Run Clang
                        </>
                    )}
                    {status === "compiling" && "Compiling..."}
                    {status === "success" && (
                        <>
                            <CheckIcon weight="duotone" size={12} />
                            Compiled
                        </>
                    )}
                </button>
            </div>

            <div className="font-mono text-xs md:text-sm bg-[#282a36] overflow-hidden">
                <SyntaxHighlighter
                    language="c"
                    style={dracula}
                    customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                    wrapLongLines={true}
                >
                    {`#include <linux/bpf.h>
#include <bpf/bpf_helpers.h>

SEC("tracepoint/syscalls/sys_enter_execve")
int handle_execve(void *ctx) {
    char msg[] = "Hello from kernel world!\\n";
    bpf_trace_printk(msg, sizeof(msg));
    return 0;
}

char LICENSE[] SEC("license") = "Dual BSD/GPL";`}
                </SyntaxHighlighter>
            </div>

            {(status === "compiling" || status === "success") && (
                <div className="border-t bg-muted/30 p-4 font-mono text-xs">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRightIcon weight="duotone" size={12} />
                            <span>clang -O2 -g -target bpf -c hello.c -o hello.o</span>
                        </div>
                        {status === "success" && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300 text-green-600 dark:text-green-400 mt-2">
                                <span className="font-bold flex items-center gap-2"><SparkleIcon weight="duotone" size={12} /> Success: </span>
                                Generated ELF object file <span className="bg-muted px-1 rounded border">hello.o</span> (2.4 KB)
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
