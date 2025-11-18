# Liquidity Pools

Nos mercados tradicionais, para que alguém compre um ativo é necessário que alguém esteja vendendo esse ativo ao mesmo tempo. Para garantir boa liquidez e spreads, o mercado precisa da ação constante de Market Makers constantemente comprando e vendendo.

Em mercados decentralizados, onde esse modelo de ação seria muito mais difícil, existem os Automated Market Makers. No caso mais simplificado, da Uniswap v2, são contratos inteligentes onde o usuário deposita um par de tokens, que são relacionados por uma fórmula de produto constante. O contrato pode realizar trocas envolvendo os tokens depositados, desde que o produto se mantenha. Por exemplo:

Por exemplo, em um contrato tem 1000 USD e 1000 reais, o produto entre os valores depositados é um milhão, poderia aceitar uma proposta que deposita 1000 reais e retira 500 usd, já que mantem o produto constante em 1 milhão.

## Operação na Pool de Liquidez

### Estado Inicial
- **Pool**: 1000 USD | 1000 BRL
- **Produto constante (k)**: 1000 × 1000 = 1,000,000
- **Preço implícito**: 1 USD = 1 BRL

### Operação do Usuário
O usuário deposita 1000 BRL na pool e retira 500 USD.

**Transação:**
```
1000 USD | 1000 BRL
    + 1000 BRL
    - 500 USD
─────────────────────
 500 USD | 2000 BRL
```

### Estado Final
- **Pool**: 500 USD | 2000 BRL
- **Produto constante (k)**: 500 × 2000 = 1,000,000 ✓
- **Preço implícito**: 1 USD = 4 BRL

### Análise
O produto constante foi mantido (k = 1,000,000), mas o preço implícito mudou significativamente:
- **Preço original**: 1 USD = 1 BRL
- **Preço final**: 1 USD = 4 BRL
- **Variação**: USD valorizou 300% em relação ao BRL na pool

Eu fiz uma demonstração simples dessa piscina liquidez aqui: https://www.thiago.wiki.br/toolkit

Onde no início temos uma piscina de liquidez com 1000 Reais e 1000 Dólares, além de 1000 Reais em carteira para trocar por dólar. Sugiro fazer de pouco em pouco para ver como o preço muda de acordo com que a negociação é feita. As proporções, taxas, ... podem ser mudadas em "Settings".
