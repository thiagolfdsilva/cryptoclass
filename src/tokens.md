# Tokens
É frequente a questão de chamar ou não criptomoedas de moedas. A principal diferença é:

**Moeda** - Moeda nativa de uma rede decentralizada, parte integral de seu funcionamento, sendo utilizada no pagamento de transações e, frequentemente, sendo o principal par de negociação de tokens definidos em sua rede.

Exemplos: Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB)

**Token** - São criptoativos que funcionam usando a blockchain de outra criptomoeda [Coinbase](https://www.coinbase.com/pt-br/learn/crypto-basics/what-is-a-token)

Mais especificamente, na rede Ethereum, em geral se considera Token um contrato inteligente que implementa o padrão [ERC-20](https://eips.ethereum.org/EIPS/eip-20). Esse padrão foi sugerido em 2015 por Fabian Volgesteller e Vitalik Buterin. A definição de um padrão não altera a rede, simplesmente cria uma interface padronizada sugerida. Com essa interface, carteiras podem criar visualizações, serviços de empréstimo e troca podem ser criados, aceitando trabalhar com qualquer token que implemente as funções no modelo proposto.

## Métodos Obrigatórios

| Método | Descrição | Assinatura |
|--------|-----------|------------|
| **totalSupply** | Retorna a oferta total de tokens na rede | `function totalSupply() public view returns (uint256)` |
| **balanceOf** | Retorna o saldo de tokens de um endereço específico | `function balanceOf(address _owner) public view returns (uint256 balance)` |
| **transfer** | Transfere tokens do endereço do chamador para outro endereço | `function transfer(address _to, uint256 _value) public returns (bool success)` |
| **transferFrom** | Transfere tokens de um endereço para outro, permitindo que contratos gastem tokens em nome de usuários | `function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)` |
| **approve** | Permite que um endereço gaste uma quantidade específica de tokens em nome do dono | `function approve(address _spender, uint256 _value) public returns (bool success)` |
| **allowance** | Retorna a quantidade de tokens que um spender ainda pode gastar em nome do dono | `function allowance(address _owner, address _spender) public view returns (uint256 remaining)` |

## Métodos Opcionais

| Método | Descrição | Assinatura |
|--------|-----------|------------|
| **name** | Nome do token (ex: "Meu Token") | `function name() public view returns (string)` |
| **symbol** | Símbolo do token (ex: "MTK") | `function symbol() public view returns (string)` |
| **decimals** | Número de casas decimais que o token usa (geralmente 18) | `function decimals() public view returns (uint8)` |

## Eventos

| Evento | Descrição | Assinatura |
|--------|-----------|------------|
| **Transfer** | Emitido quando tokens são transferidos | `event Transfer(address indexed _from, address indexed _to, uint256 _value)` |
| **Approval** | Emitido quando uma aprovação de gastos é realizada | `event Approval(address indexed _owner, address indexed _spender, uint256 _value)` |

## Outros Padrões de Tokens

| Padrão | Descrição |
|--------|-----------|
| **ERC-721** | Tokens não-fungíveis (NFTs), onde cada token é único |
| **ERC-1155** | Padrão multi-token que suporta tokens fungíveis e não-fungíveis |
| **ERC-777** | Versão melhorada do ERC-20 com mais funcionalidades |
| **BEP-20** | Padrão similar ao ERC-20 para a Binance Smart Chain |