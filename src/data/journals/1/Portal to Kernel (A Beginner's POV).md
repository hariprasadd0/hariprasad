---
title: "Portal to Kernel (A Beginner's POV)"
description: "Exploring eBPF and how it allows safe interaction with the Linux kernel without complex kernel modules"
category: "system"
date: "Oct 28, 2025"
author: "Hariprasad"
readTime: "5 min"
---


## Portal to Kernel (A Beginner's POV)
![pk](/images/pk.svg)

When I first discovered [**eBPF**](https://ebpf.io/what-is-ebpf/) aka *"Extended Berkeley Packet Filter"*, my curiosity reached its peak. I’ve always been fascinated by operating systems, but I never imagined I could explore their inner workings so deeply — at least not without diving into complex `.ko` modules.

## The Basics 

eBPF has been part of the Linux ecosystem for years, quietly transforming how developers observe and extend the kernel. I only stumbled upon it recently, and it completely changed how I think about operating systems.

It is essentially a restricted form of C - we write programs in familiar C like syntax , but they're compiled into special bytecode that runs safely inside the kernel. But how does a simple C program get permission to interact with kernel ? 

![ebpf](/images/ebpf.png)

The source `hello.c` is compiled using `clang` to an eBPF bytecode, stored inside an `ELF` object file. Then a loader (like `bpftool` or `libbpf`) calls the `bpf()` syscall with the command `BPF_PROG_LOAD`, which loads the object file into the kernel.

## Verifier 

The eBPF verifier is a form of static analysis. It validates that the program meets several conditions, such as not entering an infinite loop, not using memory with undefined contents, not accessing memory out of bounds etc.

## JIT Compiler 

Just In Time Compilation isn't unique to eBPF . Its a general technique used in many environments `JVM` to modern JS engines to make interpreted or bytecode based programs run faster.
In the case of eBPF, programs are normally loaded as **bytecode** a portable, hardware-agnostic instruction set that the kernel’s **eBPF virtual machine (VM)** can interpret. But running each instruction through an interpreter slows things down.

To reduce that cost, the kernel includes a **JIT compiler**. After the verifier approves the eBPF bytecode, the JIT can translate it into **native machine instructions** for the host CPU (x86, ARM, etc.).

## Attach to Hook/Event

eBPF programs are event-driven and are run when the kernel or an application passes a certain hook point. Pre-defined hooks include system calls, function entry/exit, kernel tracepoints, network events, and several others.

user-space loader (libbpf, bpftool, custom loader, or bpf() syscall with `BPF_PROG_ATTACH`) tells the kernel to attach this verified program to this specific hook or object


## The Data Flow 

As our program is running inside the kernel the program cannot directly `printf()` or write to `stdout` . eBPF have some helper functions such as 
`bpf_printk()` writes messages into the kernel’s trace ring buffer, readable via `/sys/kernel/debug/tracing/trace_pipe`. These buffers are ephemeral , meaning they’re cleared on reboot or when the tracing subsystem resets 

## eBPF Maps

eBPF maps can be used to store and retrieve collected information from both kernel and user space . Maps are special memory regions managed by the kernel. There are several types we could use for eg:- `Hash Tables` ,
`LRU` , `Array` , `Ring Buffer` etc. 

![ebpfmap](/images/ebpfmap.png)


---

That wraps up my first dive into eBPF. I’m still connecting the dots, but understanding how it runs safely inside the kernel already changed how I see Linux. happy coding :)