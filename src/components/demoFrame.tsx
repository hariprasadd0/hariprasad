import { cn } from "@/lib/utils";
import { CopyIcon, Check } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DemoFrameProps {
    url: string;
    className?: string;
    onLoadError?: () => void;
    fallback?: React.ReactNode;
}

export function DemoFrame({ url, className, onLoadError, fallback }: DemoFrameProps) {
    const [copied, setCopied] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (url.trim() === "") {
        return <>{fallback}</>
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUrlClick = () => {
        window.open(url, "_blank");
    };

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
        onLoadError?.();
    };

    const handleLoad = () => {
        // Clear the timeout since iframe loaded
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsLoading(false);

        // Try to detect if iframe loaded an error page (limited by CORS)
        try {
            const iframe = iframeRef.current;
            if (iframe?.contentWindow) {
                // This will throw if cross-origin (which means it loaded something)
                // If it doesn't throw and document is empty, it might have failed
                const doc = iframe.contentWindow.document;
                if (!doc || doc.body?.innerHTML === '') {
                    handleError();
                }
            }
        } catch {
            // Cross-origin - means iframe loaded external content (good)
        }
    };

    useEffect(() => {
        // Set a timeout to detect if iframe fails to load
        // Many sites block iframes silently, so we use a timeout as fallback
        timeoutRef.current = setTimeout(() => {
            if (isLoading) {
                handleError();
            }
        }, 3000); // 5 second timeout

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [url]);

    // Show fallback if error
    if (hasError && fallback) {
        return <>{fallback}</>;
    }

    return (
        <div className={cn("flex flex-col overflow-hidden relative", className)}>
            {/* Loading indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-muted-foreground">Loading preview...</span>
                    </div>
                </div>
            )}

            {/* URL Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted border border-border absolute bottom-4 left-1/2 -translate-x-1/2 rounded-[2px] shadow-lg z-20">
                <div
                    onClick={handleUrlClick}
                    className="flex-1 px-3 py-1.5 rounded-[2px] bg-background border border-input text-sm text-muted-foreground truncate select-none cursor-pointer hover:text-foreground transition-colors"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.span
                                key="copied"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-green-500"
                            >
                                Copied!
                            </motion.span>
                        ) : (
                            <motion.span
                                key="url"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {url}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1 rounded-[2px] hover:bg-accent transition-colors"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <CopyIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Iframe */}
            <iframe
                ref={iframeRef}
                src={url}
                className="w-full flex-1 border-0"
                title="Demo"
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
}
