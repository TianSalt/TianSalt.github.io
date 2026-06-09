---
title: Typography Test
---

# Typography Test

## Italic Text

*This is italic text.* The font should render italic style correctly.

## Ligatures

Test common ligatures:

- **ff**: office, effort, afford
- **fi**: efficient, figure, fiction
- **fl**: fluffy, afflict, reflect
- **ffi**: efficient, sufficient
- **ffl**: ruffle, waffle

Combined: The efficient office staff reflects on their efforts.

## Punctuation

Test punctuation placement and spacing:

- Period: This is a sentence.
- Comma: First, second, third.
- Quotation: "Hello, world!" she said.
- Parentheses: (This is parenthetical text).
- Apostrophe: It's a test.
- Dashes: hyphenated-word, en–dash, em—dash

## Numbers

1234567890

## Mixed Script

English with Arabic numerals: Version 2.0 released in 2026.

## Code

Test code font rendering with different languages:

```javascript
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(10)); // Output: 55
```

```python
def fibonacci(n):
    """Calculate Fibonacci sequence"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i))
```

```rust
fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("{}", fibonacci(i));
    }
}
```

## Math Equations

Test math equation rendering:

### Inline Math

This is an inline equation $E = mc^2$, Einstein's mass-energy equation.

Pythagorean theorem: $a^2 + b^2 = c^2$

Quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### Block Math

Mass-energy equation:

$$
E = mc^2
$$

Euler's formula:

$$
e^{i\pi} + 1 = 0
$$

### Integrals and Sums

Definite integral:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

Sum formula:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### Matrices

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

### Greek Letters

$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$, $\omega$

### Other Mathematical Symbols

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$