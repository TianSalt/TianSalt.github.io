---
title: タイポグラフィテスト
---

# タイポグラフィテスト

## 約物の圧縮

約物（ punctuation）の配置と間隔をテスト：

行頭約物：
、これはテスト
。別のテスト
「引用テスト」

行尾約物：
これはテスト、
別のテスト。
「引用テスト」

連続約物：
「『ネスト引用テスト』」
（（二重括弧テスト））
、、、連続読点

混合約物：
これは「テスト」、別の（例）。
日本語約物とEnglish punctuationの混用。

## 日本語と英語の混植

日本語と英語の自動間隔（手動スペースなし）をテスト：

- 日本語English日本語：これはEnglishテスト
- 日本語123日本語：バージョン2.0が2026年にリリース
- English日本語：VitePressブログ
- 日本語English：個人Blog
- 混合文：This is日本語test withEnglish混植

長段落テスト：
これはEnglish文字を含む日本語段落で、VitePressのタイポグラフィ効果をテストします。ここにはJavaScriptコード、Pythonスクリプト、そして様々な123数字があります。タイポグラフィは日本語とEnglishの間の間隔を自動的に処理し、手動でスペースを追加する必要はありません。

## 数字

アラビア数字：1234567890

パーセント：99.9%

年：2026年

## 引用テスト

鍵括弧：「これは鍵括弧」

二重鍵括弧：『これは二重鍵括弧』

ネスト：「『ネスト引用テスト』」

英語引用符："English quotation"

## コード

コードフォントのレンダリングをテスト（0xProtoフォントを使用）：

```javascript
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(10)); // 出力: 55
```

```python
def fibonacci(n):
    """フィボナッチ数列を計算"""
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

## 数式

数式のレンダリングをテスト：

### インライン数式

これはインライン数式 $E = mc^2$ です。アインシュタインの質量エネルギー方程式。

ピタゴラスの定理：$a^2 + b^2 = c^2$

二次方程式の解の公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### ブロック数式

質量エネルギー方程式：

$$
E = mc^2
$$

オイラーの公式：

$$
e^{i\pi} + 1 = 0
$$

### 積分と総和

定積分：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

総和公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 行列

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

### ギリシャ文字

$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$, $\omega$

### その他の数学記号

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$