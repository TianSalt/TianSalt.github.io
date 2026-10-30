---
title: Cryptography
---
# Cryptography

This series is a self-contained introduction to modern cryptography, developed from Dan Boneh’s *Cryptography I* course (Stanford / Coursera). It is written at a textbook level: every primitive is introduced through the problem it solves, stated as a precise definition, and motivated by concrete attacks.

The series follows the three-step method that organizes the whole subject.

1. **Specify a threat model** — decide exactly what an attacker can do and what it means for her to succeed.
2. **Propose a construction** — give the algorithms that are supposed to realize the goal.
3. **Prove security** — show that any attacker who breaks the construction can be turned into an algorithm that solves a problem believed to be hard. This is a proof by contradiction (a *reduction*), and it is what separates modern cryptography from the “security by obscurity” era.

We assume comfort with discrete mathematics and a little probability; where a tool is needed it is developed in place (for instance, the discrete-probability toolbox in Chapter 1). No prior exposure to cryptography is required.

::: warning About the sources
This chapter is built from the lecture transcripts and slides of *Cryptography I*, cross-checked against Boneh and Shoup’s open textbook *A Graduate Course in Applied Cryptography*. Historical and numerical details are corrected where the auto-generated captions garbled them (for example the name of Vigenère’s cipher or the size of the Enigma keyspace). Any remaining error is the author’s own.
:::
