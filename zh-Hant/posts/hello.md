---
title: 字體排印測試
---
# 字體排印測試

## 標點擠壓

測試標點符號在不同位置的排版效果：

行首標點：
、這是測試
。另一個測試
「引號測試」

行尾標點：
這是測試，
另一個測試。
「引號測試」

連續標點：
「『嵌套引號測試』」
（（雙括號測試））
，，，連續逗號

混合標點：
這是「測試」，另一個（示例）。
漢語標點與英文Punctuation混用。

## 中英文混排

測試中英文自動間距（無手動空格）：

- 漢語English漢語：這是English測試
- 漢語123漢語：版本2.0於2026年發布
- English漢語：VitePress博客
- 漢語English：個人Blog
- 混合句子：This is漢語test withEnglish混排

長段落測試：
這是一段包含English文字的漢語段落，用來測試VitePress的字體排印效果。這裡有JavaScript代碼、Python腳本、以及各種123數字。排版應該自動處理漢語和English之間的間距，不需要手動添加空格。

## 數字

阿拉伯數字：1234567890

百分比：99.9%

年份：2026年

## 引號測試

單引號：「這是單引號」

雙引號：『這是雙引號』

嵌套：「『嵌套引號測試』」

英文引號："English quotation"

## 代碼

測試代碼字體渲染（應使用0xProto字體）：

```javascript
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(10)); // 輸出: 55
```

```python
def fibonacci(n):
    """計算斐波那契數列"""
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

## 數學公式

測試數學公式的渲染效果：

### 行內公式

這是一個行內公式 $E = mc^2$，愛因斯坦的質能方程。

勾股定理：$a^2 + b^2 = c^2$

二次公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### 塊級公式

質能方程：

$$
E = mc^2
$$

歐拉公式：

$$
e^{i\pi} + 1 = 0
$$

### 積分與求和

定積分：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

求和公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 矩陣

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

### 希臘字母

$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$, $\omega$

### 其他數學符號

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$